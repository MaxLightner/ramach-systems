/** Transport-independent Archyar v1 documents. Never treat JSON as HTML. */
export type Point2=[number,number];
export type Point3=[number,number,number];
export type Quaternion4=[number,number,number,number];
export interface Floor {id:string;name:string;elevation:number;ceilingHeight:number;visible:boolean}
export interface ArchObject {
 schemaVersion:1;id:string;kind:string;floorId:string;hostId?:string|null;
 name?:string;layer?:string;revision:number;locked?:boolean;source?:string;
 parameters:Record<string,unknown>;
 transform?:{position?:Point3;rotation?:Quaternion4;scale?:Point3};
}
export interface ArchProject {
 schemaVersion:1;projectId:string;name:string;revision:number;
 originFloorId:string;
 coordinateSystem:{id:'archyar-project-v1';units:'m';upAxis:'Y';groundPlane:'XZ';handedness:'right';origin:Point3};
 floors:Floor[];objects:ArchObject[];
}
export interface CameraPose {
 schemaVersion:1;projectId:string;sessionId:string;floorId:string;
 sequence:number;timestampMs:number;source:string;projectRevision:number;
 position:Point3;rotation:Quaternion4;fovYDegrees:number;aspectRatio:number;
}
export const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const finite=(n:unknown):n is number=>typeof n==='number'&&Number.isFinite(n);
const record=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);
const tuple=(v:unknown,n:number):v is number[]=>Array.isArray(v)&&v.length===n&&v.every(finite);
export function parseProject(input:unknown):ArchProject {
 if(!record(input)||input.schemaVersion!==1||typeof input.name!=='string'||!UUID.test(String(input.projectId))||!Number.isSafeInteger(input.revision)||Number(input.revision)<0)throw Error('نسخه یا مشخصات پروژه معتبر نیست.');
 const c=input.coordinateSystem;
 if(!record(c)||c.id!=='archyar-project-v1'||c.units!=='m'||c.upAxis!=='Y'||c.groundPlane!=='XZ'||c.handedness!=='right'||!tuple(c.origin,3)||c.origin.some(v=>v!==0))throw Error('دستگاه مختصات با قرارداد آرچیار سازگار نیست.');
 if(!Array.isArray(input.floors)||!input.floors.length||!Array.isArray(input.objects))throw Error('اطلاعات طبقات یا آبجکت‌ها معتبر نیست.');
 const floors=new Map<string,Floor>();
 for(const f of input.floors){
  if(!record(f)||!UUID.test(String(f.id))||floors.has(String(f.id))||typeof f.name!=='string'||!finite(f.elevation)||!finite(f.ceilingHeight)||f.ceilingHeight<=0||typeof f.visible!=='boolean')throw Error('شناسه یا مشخصات یکی از طبقات معتبر نیست.');
  floors.set(f.id as string,f as unknown as Floor);
 }
 if(!floors.has(String(input.originFloorId))||Math.abs(floors.get(String(input.originFloorId))!.elevation)>1e-7)throw Error('کف مرجع پروژه معتبر نیست.');
 const ids=new Map<string,ArchObject>();
 for(const obj of input.objects){
  if(!record(obj)||obj.schemaVersion!==1||!UUID.test(String(obj.id))||ids.has(String(obj.id))||typeof obj.kind!=='string'||!floors.has(String(obj.floorId))||!record(obj.parameters)||!Number.isSafeInteger(obj.revision)||Number(obj.revision)<0)throw Error('آبجکت یا شناسه تکراری/نامعتبر است.');
  if(obj.transform!==undefined){
   if(!record(obj.transform)||(obj.transform.position!==undefined&&!tuple(obj.transform.position,3))||(obj.transform.rotation!==undefined&&!tuple(obj.transform.rotation,4))||(obj.transform.scale!==undefined&&!tuple(obj.transform.scale,3)))throw Error('تبدیل مکانی آبجکت معتبر نیست.');
  }
  ids.set(obj.id as string,obj as unknown as ArchObject);
 }
 for(const obj of ids.values()){
  if(obj.hostId&&!ids.has(obj.hostId))throw Error('دیوار میزبان آبجکت پیدا نشد.');
  if(obj.kind==='opening'&&(!obj.hostId||ids.get(obj.hostId)?.kind!=='wall'))throw Error('بازشو باید به یک دیوار مرتبط باشد.');
  if(obj.kind==='wall'){
   const p=obj.parameters;
   if(!tuple(p.start,2)||!tuple(p.end,2)||!finite(p.thickness)||p.thickness<=0||!finite(p.height)||p.height<=0)throw Error('مختصات یا ابعاد دیوار نامعتبر است.');
  }
 }
 return input as unknown as ArchProject;
}
export function parsePose(value:unknown):CameraPose {
 if(!record(value)||value.schemaVersion!==1||!UUID.test(String(value.projectId))||!UUID.test(String(value.sessionId))||!UUID.test(String(value.floorId))||!tuple(value.position,3)||!tuple(value.rotation,4)||!finite(value.fovYDegrees)||value.fovYDegrees<10||value.fovYDegrees>150||!Number.isSafeInteger(value.sequence)||Number(value.sequence)<0)throw Error('موقعیت دوربین معتبر نیست.');
 const norm=Math.hypot(...(value.rotation as number[]));
 if(norm<1e-6)throw Error('چرخش دوربین معتبر نیست.');
 return value as unknown as CameraPose;
}
