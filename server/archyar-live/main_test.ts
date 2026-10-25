import {assertEquals,assert,assertStringIncludes} from "jsr:@std/assert@1";
import {handleRequest} from "./main.ts";
const project={
 schemaVersion:1,projectId:"550e8400-e29b-41d4-a716-446655440000",name:"Test",revision:0,
 originFloorId:"550e8400-e29b-41d4-a716-446655440001",
 coordinateSystem:{id:"archyar-project-v1",units:"m",upAxis:"Y",groundPlane:"XZ",handedness:"right",origin:[0,0,0]},
 floors:[{id:"550e8400-e29b-41d4-a716-446655440001",name:"Ground",elevation:0,ceilingHeight:3,visible:true}],
 objects:[]
};
Deno.test("creates time-limited session with separate viewer, editor and owner tokens",async()=>{
 const res=await handleRequest(new Request("http://localhost:8787/api/sessions",{
  method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({project})
 }));
 assertEquals(res.status,201);
 const data=await res.json();
 assert(data.ownerToken!==data.viewerToken);
 assert(data.viewerToken!==data.editorToken);
 assertStringIncludes(data.viewerUrl,data.sessionId);
 const forbidden=await handleRequest(new Request("http://localhost:8787/api/sessions/"+data.sessionId+"/project"));
 assertEquals(forbidden.status,401);
 const read=await handleRequest(new Request("http://localhost:8787/api/sessions/"+data.sessionId+"/project",{headers:{authorization:"Bearer "+data.viewerToken}}));
 assertEquals(read.status,200);
 const mutate=await handleRequest(new Request("http://localhost:8787/api/sessions/"+data.sessionId+"/objects",{
  method:"PATCH",headers:{authorization:"Bearer "+data.viewerToken},body:JSON.stringify({baseRevision:0,operation:"delete",objectId:project.projectId})
 }));
 assertEquals(mutate.status,403);
});
Deno.test("rejects malformed projects and invalid coordinate frames",async()=>{
 const invalid=structuredClone(project);invalid.coordinateSystem.upAxis="Z";
 const res=await handleRequest(new Request("http://localhost:8787/api/sessions",{method:"POST",body:JSON.stringify({project:invalid})}));
 assertEquals(res.status,422);
});
Deno.test("does not grant access by guessing a session ID",async()=>{
 const res=await handleRequest(new Request("http://localhost:8787/api/sessions/550e8400-e29b-41d4-a716-446655440099/project"));
 assertEquals(res.status,404);
});
