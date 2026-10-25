const assert = {
 equal(actual:unknown,expected:unknown){if(actual!==expected)throw Error("Expected "+String(expected)+", got "+String(actual))},
 ok(condition:unknown){if(!condition)throw Error("Assertion failed")}
};
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
 assert.equal(res.status,201);
 const data=await res.json();
 assert.ok(data.ownerToken!==data.viewerToken);
 assert.ok(data.viewerToken!==data.editorToken);
 assert.ok(data.viewerUrl.includes(data.sessionId));
 const forbidden=await handleRequest(new Request("http://localhost:8787/api/sessions/"+data.sessionId+"/project"));
 assert.equal(forbidden.status,401);
 const read=await handleRequest(new Request("http://localhost:8787/api/sessions/"+data.sessionId+"/project",{headers:{authorization:"Bearer "+data.viewerToken}}));
 assert.equal(read.status,200);
 const mutate=await handleRequest(new Request("http://localhost:8787/api/sessions/"+data.sessionId+"/objects",{
  method:"PATCH",headers:{authorization:"Bearer "+data.viewerToken},body:JSON.stringify({baseRevision:0,operation:"delete",objectId:project.projectId})
 }));
 assert.equal(mutate.status,403);
});
Deno.test("rejects malformed projects and invalid coordinate frames",async()=>{
 const invalid=structuredClone(project);invalid.coordinateSystem.upAxis="Z";
 const res=await handleRequest(new Request("http://localhost:8787/api/sessions",{method:"POST",body:JSON.stringify({project:invalid})}));
 assert.equal(res.status,422);
});
Deno.test("does not grant access by guessing a session ID",async()=>{
 const res=await handleRequest(new Request("http://localhost:8787/api/sessions/550e8400-e29b-41d4-a716-446655440099/project"));
 assert.equal(res.status,404);
});

Deno.test("only the owner can revoke a live session immediately",async()=>{
 const create=await handleRequest(new Request("http://localhost:8787/api/sessions",{method:"POST",body:JSON.stringify({project})}));
 assert.equal(create.status,201);
 const s=await create.json();
 const url="http://localhost:8787/api/sessions/"+s.sessionId+"/project";
 const viewerAttempt=await handleRequest(new Request(url,{method:"DELETE",headers:{authorization:"Bearer "+s.viewerToken}}));
 assert.equal(viewerAttempt.status,403);
 const ownerRevoke=await handleRequest(new Request(url,{method:"DELETE",headers:{authorization:"Bearer "+s.ownerToken}}));
 assert.equal(ownerRevoke.status,200);
 const after=await handleRequest(new Request(url,{headers:{authorization:"Bearer "+s.viewerToken}}));
 assert.equal(after.status,404);
});
