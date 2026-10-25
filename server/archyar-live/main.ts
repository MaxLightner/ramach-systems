/**
 * Archyar ephemeral live relay (Deno Deploy or self-hosted Deno).
 * Models and camera transforms, never a live video stream.
 * No database, authentication accounts or external dependencies.
 */
type Json = Record<string, unknown>;
type Client = {socket: WebSocket; role: "viewer" | "editor" | "owner"};
type Room = {
 id: string; created: number; expires: number;
 project: Json; revision: number;
 ownerToken: string; viewerToken: string; editorToken: string;
 clients: Set<Client>; camera?: Json; sequence: number;
};
const rooms = new Map<string, Room>();
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const LIMIT = 2 * 1024 * 1024;
const MAX_ROOMS = 75;
const MAX_CLIENTS = 24;
const TTL = 60 * 60 * 1000;
const HEADERS = {"content-type":"application/json; charset=utf-8","cache-control":"no-store","x-content-type-options":"nosniff"};
const record = (v: unknown): v is Json => v !== null && typeof v === "object" && !Array.isArray(v);
const finite = (v: unknown) => typeof v === "number" && Number.isFinite(v);
const uuid = (v: unknown) => typeof v === "string" && UUID.test(v);
const three = (v: unknown): v is number[] => Array.isArray(v) && v.length === 3 && v.every(finite);
const four = (v: unknown) => Array.isArray(v) && v.length === 4 && v.every(finite);
function secret() {
 const buffer = new Uint8Array(32); crypto.getRandomValues(buffer);
 return btoa(String.fromCharCode(...buffer)).replaceAll("+","-").replaceAll("/","_").replaceAll("=","");
}
function response(status: number, data: Json, headers: Record<string,string> = {}) {
 return new Response(JSON.stringify(data),{status,headers:{...HEADERS,...headers}});
}
function allowedOrigin(req:Request) {
 const configured = Deno.env.get("ARCHYAR_VIEWER_ORIGIN");
 const origin = req.headers.get("origin");
 return !origin || (!!configured && origin === configured) || (!configured && /^https?:\/\/localhost(?::\d+)?$/.test(origin));
}
function corsHeaders(req:Request):Record<string,string> {
 const origin=req.headers.get("origin");
 return origin && allowedOrigin(req)
  ?{"access-control-allow-origin":origin,"vary":"Origin","access-control-allow-headers":"authorization,content-type,if-match","access-control-allow-methods":"GET,POST,PUT,PATCH,DELETE,OPTIONS"}
  :{};
}
async function readJson(req:Request):Promise<unknown>{
 const stream=req.body;
 if(!stream)throw Error("empty_body");
 const reader=stream.getReader();
 const chunks:Uint8Array[]=[];let length=0;
 try{
  while(true){
   const {done,value}=await reader.read();if(done)break;
   length+=value.byteLength;if(length>LIMIT)throw Error("payload_too_large");
   chunks.push(value);
  }
 }finally{reader.releaseLock()}
 const merged=new Uint8Array(length);
 let at=0;for(const chunk of chunks){merged.set(chunk,at);at+=chunk.length}
 try{return JSON.parse(new TextDecoder().decode(merged))}
 catch{throw Error("invalid_json")}
}
function validateProject(value:unknown):value is Json{
 if(!record(value)||value.schemaVersion!==1||!uuid(value.projectId)||typeof value.name!=="string"||!Array.isArray(value.floors)||value.floors.length<1||!Array.isArray(value.objects)||!Number.isSafeInteger(value.revision)||Number(value.revision)<0)return false;
 const coord=value.coordinateSystem;
 if(!record(coord)||coord.id!=="archyar-project-v1"||coord.units!=="m"||coord.upAxis!=="Y"||coord.groundPlane!=="XZ"||coord.handedness!=="right"||!three(coord.origin)||coord.origin.some((n:unknown)=>n!==0))return false;
 const floors=new Map<string,Json>();const ids=new Map<string,Json>();
 for(const f of value.floors) {
  if(!record(f)||!uuid(f.id)||floors.has(f.id as string)||!finite(f.elevation)||!finite(f.ceilingHeight)||Number(f.ceilingHeight)<=0)return false;
  floors.set(f.id as string,f);
 }
 if(!uuid(value.originFloorId)||!floors.has(value.originFloorId as string)||floors.get(value.originFloorId as string)?.elevation!==0)return false;
 for(const o of value.objects) {
  if(!record(o)||o.schemaVersion!==1||!uuid(o.id)||ids.has(o.id as string)||!uuid(o.floorId)||!floors.has(o.floorId as string)||!record(o.parameters)||typeof o.kind!=="string")return false;
  ids.set(o.id as string,o);
 }
 for(const o of ids.values()){
  if(o.hostId!==undefined&&o.hostId!==null&&(!uuid(o.hostId)||!ids.has(o.hostId as string)))return false;
  if(o.kind==="opening"&&(!o.hostId||ids.get(o.hostId as string)?.kind!=="wall"))return false;
 }
 return true;
}
function validatePose(value:unknown,room:Room) {
 if(!record(value)||value.schemaVersion!==1||value.sessionId!==room.id||value.projectId!==room.project.projectId||!three(value.position)||!four(value.rotation)||!uuid(value.floorId)||!Number.isSafeInteger(value.sequence)||Number(value.sequence)<0||!finite(value.fovYDegrees)||Number(value.fovYDegrees)<10||Number(value.fovYDegrees)>150||!finite(value.aspectRatio)||Number(value.aspectRatio)<=0)return false;
 const q=value.rotation as number[];return Math.hypot(...q)>.000001;
}
function emit(room:Room,eventType:string,payload:Json) {
 room.sequence++;
 const msg=JSON.stringify({schemaVersion:1,eventType,projectId:room.project.projectId,sessionId:room.id,sequence:room.sequence,payload});
 for(const c of room.clients){
  if(c.socket.readyState===WebSocket.OPEN){
   try{c.socket.send(msg)}catch{room.clients.delete(c)}
  }
 }
}
function clean(){
 const now=Date.now();
 for(const [id,room] of rooms){
  if(now>room.expires){
   for(const c of room.clients)try{c.socket.close(1000,"Session expired")}catch{/* closed */}
   rooms.delete(id);
  }
 }
}
function getRole(room:Room,token:string):Client["role"]|null {
 if(token===room.ownerToken)return "owner";
 if(token===room.editorToken)return "editor";
 if(token===room.viewerToken)return "viewer";
 return null;
}
function bearer(req:Request,room:Room) {
 const header=req.headers.get("authorization");
 if(!header?.startsWith("Bearer "))return null;
 return getRole(room,header.slice(7));
}
function getRoom(id:string):Room|undefined {
 clean();return rooms.get(id);
}
function connect(req:Request):Response {
 if(!allowedOrigin(req))return response(403,{error:"origin_not_allowed"});
 const {socket,response:upgrade}=Deno.upgradeWebSocket(req);
 let member:Client|null=null;
 let pending=true;
 const joinedBy=setTimeout(()=>{if(pending)socket.close(1008,"Join required")},8000);
 socket.onmessage=(message)=>{
  if(typeof message.data!=="string"||message.data.length>LIMIT){socket.close(1009,"Message too large");return}
  let input:unknown;
  try{input=JSON.parse(message.data)}catch{socket.close(1003,"Invalid JSON");return}
  if(!record(input)){socket.close(1003,"Invalid message");return}
  if(!member){
   if(input.type!=="session.join"||!uuid(input.sessionId)||typeof input.token!=="string"){
    socket.close(1008,"Join required");return;
   }
   const room=getRoom(input.sessionId as string);
   const role=room?getRole(room,input.token as string):null;
   if(!room||!role||room.clients.size>=MAX_CLIENTS){
    socket.close(1008,"Access denied");return;
   }
   member={socket,role};room.clients.add(member);
   pending=false;clearTimeout(joinedBy);
   socket.send(JSON.stringify({eventType:"session.joined",payload:{role,sessionId:room.id}}));
   socket.send(JSON.stringify({eventType:"project.snapshot",payload:{project:room.project}}));
   if(room.camera)socket.send(JSON.stringify({eventType:"camera.pose",payload:room.camera}));
   return;
  }
  // WebSocket is subscription-only in v1. Edits use the revision-checked HTTP API.
  socket.send(JSON.stringify({eventType:"error",payload:{error:"use_authorized_http_api"}}));
 };
 socket.onclose=()=>{
  clearTimeout(joinedBy);
  if(member)for(const room of rooms.values())room.clients.delete(member);
 };
 socket.onerror=()=>{clearTimeout(joinedBy)};
 return upgrade;
}
export async function handleRequest(req:Request):Promise<Response> {
 clean();
 if(!allowedOrigin(req))return response(403,{error:"origin_not_allowed"});
 const cors=corsHeaders(req);
 if(req.method==="OPTIONS")return new Response(null,{status:204,headers:{...cors,...HEADERS}});
 const url=new URL(req.url);
 const pathname=url.pathname.replace(/\/$/,"");
 if(req.method==="GET"&&pathname==="/health")return response(200,{status:"ok",activeSessions:rooms.size},cors);
 if(req.method==="GET"&&pathname==="/ws")return connect(req);
 if(req.method==="POST"&&pathname==="/api/sessions"){
  if(rooms.size>=MAX_ROOMS)return response(429,{error:"session_capacity_reached"},cors);
  let body:unknown;
  try{body=await readJson(req)}catch(e){return response(400,{error:String(e)},cors)}
  if(!record(body)||!validateProject(body.project))return response(422,{error:"invalid_project"},cors);
  const id=crypto.randomUUID(),ownerToken=secret(),viewerToken=secret(),editorToken=secret();
  const project=structuredClone(body.project);const now=Date.now();
  const room:Room={id,created:now,expires:now+TTL,project,revision:project.revision as number,
                   ownerToken,viewerToken,editorToken,clients:new Set(),sequence:0};
  rooms.set(id,room);
  const page=Deno.env.get("ARCHYAR_VIEWER_URL")||"http://localhost:5173/archyar.html";
  const link=new URL(page);link.searchParams.set("session",id);link.searchParams.set("token",viewerToken);
  return response(201,{sessionId:id,ownerToken,viewerToken,editorToken,expiresAt:new Date(room.expires).toISOString(),viewerUrl:link.toString()},cors);
 }
 const match=pathname.match(/^\/api\/sessions\/([0-9a-f-]+)\/(camera|project|objects)$/i);
 if(!match)return response(404,{error:"not_found"},cors);
 const room=getRoom(match[1]);
 if(!room)return response(404,{error:"session_not_found"},cors);
 const role=bearer(req,room);
 if(!role)return response(401,{error:"invalid_session_token"},cors);
 if(req.method==="GET"&&match[2]==="project")return response(200,{project:room.project,revision:room.revision},cors);
 if(req.method!=="POST"&&req.method!=="PUT"&&req.method!=="PATCH")return response(405,{error:"method_not_allowed"},cors);
 if(role==="viewer")return response(403,{error:"viewer_read_only"},cors);
 let body:unknown;
 try{body=await readJson(req)}catch(e){return response(400,{error:String(e)},cors)}
 if(!record(body))return response(400,{error:"invalid_payload"},cors);
 if(match[2]==="camera"&&req.method==="POST"){
  if(role!=="owner")return response(403,{error:"owner_camera_only"},cors);
  if(!validatePose(body,room))return response(422,{error:"invalid_camera_pose"},cors);
  if(room.camera&&Number(body.sequence)<=Number(room.camera.sequence))return response(409,{error:"stale_camera_sequence"},cors);
  room.camera=structuredClone(body);emit(room,"camera.pose",room.camera);return response(202,{status:"broadcast"},cors);
 }
 const base=body.baseRevision;
 if(!Number.isSafeInteger(base)||base!==room.revision)return response(409,{error:"revision_conflict",currentRevision:room.revision},cors);
 if(match[2]==="project"&&req.method==="PUT"){
  if(role!=="owner")return response(403,{error:"owner_only"},cors);
  if(!validateProject(body.project)||body.project.projectId!==room.project.projectId)return response(422,{error:"invalid_project"},cors);
  room.revision++;
  room.project=structuredClone(body.project);
  room.project.revision=room.revision;
  emit(room,"project.snapshot",{project:room.project});
  return response(200,{revision:room.revision},cors);
 }
 if(match[2]==="objects"&&req.method==="PATCH"){
  const next=structuredClone(room.project);
  let eventType:string,payload:Json;
  if(body.operation==="upsert"){
   const object=body.object;
   if(!record(object)||!uuid(object.id))return response(422,{error:"invalid_object"},cors);
   const i=(next.objects as Json[]).findIndex(o=>o.id===object.id);
   if(i>=0)(next.objects as Json[])[i]=object;else(next.objects as Json[]).push(object);
   eventType="object.upsert";payload={object};
  }else if(body.operation==="delete"&&uuid(body.objectId)){
   const id=body.objectId;
   if((next.objects as Json[]).some(o=>o.hostId===id))return response(409,{error:"object_has_dependents"},cors);
   next.objects=(next.objects as Json[]).filter(o=>o.id!==id);
   eventType="object.delete";payload={objectId:id};
  }else return response(422,{error:"invalid_operation"},cors);
  if(!validateProject(next))return response(422,{error:"invalid_updated_project"},cors);
  room.revision++;next.revision=room.revision;room.project=next;
  emit(room,eventType,payload);
  return response(200,{revision:room.revision},cors);
 }
 return response(405,{error:"method_not_allowed"},cors);
}
if(import.meta.main){
 const port=Number(Deno.env.get("PORT")||"8787");
 Deno.serve({port},handleRequest);
}
