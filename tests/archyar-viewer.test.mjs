import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const root=new URL('../',import.meta.url);
const project=await readFile(new URL('src/archyar/project.ts',root),'utf8');
const viewer=await readFile(new URL('src/archyar/scene.ts',root),'utf8');
const main=await readFile(new URL('src/archyar/main.ts',root),'utf8');
const demo=JSON.parse(await readFile(new URL('public/archyar-demo.json',root),'utf8'));
const vite=await readFile(new URL('vite.config.ts',root),'utf8');

test('archyar is a distinct Vite entry without changing the RAMACH storytelling home',()=>{
 assert.match(vite,/archyar:resolve\(root,'archyar.html'\)/);
 assert.match(main,/from '\.\/scene'/);
 assert.match(main,/load-demo/);
});
test('the demo is a metric shared project with stable host IDs',()=>{
 assert.equal(demo.schemaVersion,1);
 assert.equal(demo.coordinateSystem.id,'archyar-project-v1');
 assert.equal(demo.coordinateSystem.upAxis,'Y');
 assert.equal(demo.coordinateSystem.groundPlane,'XZ');
 assert.deepEqual(demo.coordinateSystem.origin,[0,0,0]);
 assert.ok(demo.floors.some(f=>f.id===demo.originFloorId&&f.elevation===0));
 assert.ok(demo.objects.some(o=>o.kind==='wall'));
 for(const o of demo.objects.filter(o=>o.kind==='opening')){
  assert.ok(demo.objects.some(w=>w.kind==='wall'&&w.id===o.hostId));
 }
});
test('the viewer actually renders segmented walls, openings, and follows source camera quaternions',()=>{
 assert.match(viewer,/renderWall\(obj:ArchObject/);
 assert.match(viewer,/add\(o.left,o.right,0,o.sill\)/);
 assert.match(viewer,/this\.camera\.quaternion\.slerp/);
 assert.match(viewer,/this\.targetRotation\.set\(\.\.\.pose\.rotation\)/);
 assert.match(project,/export function parsePose/);
 assert.match(project,/export function parseProject/);
});
test('no fabricated live session success and no unauthenticated remote edits',()=>{
 assert.match(main,/new WebSocket\(uri\.toString\(\)\)/);
 assert.match(main,/type:'session.join'/);
 assert.match(main,/sessionId:session,token,role:'viewer'/);
 assert.match(main,/history\.replaceState/);
 assert.match(main,/ویرایش فعلاً فقط در همین مرورگر/);
 assert.doesNotMatch(main,/socket\?\.send\(JSON\.stringify\(\{type:'object.upsert'/);
});

test('trusted QR auto-join and role-confirmed web edit operations',()=>{
 assert.match(main,/VITE_ARCHYAR_RELAY_WS/);
 assert.match(main,/if\(defaultRelay&&args.has\('session'\)/);
 assert.match(main,/type==='session.joined'/);
 assert.match(main,/connectedRole==='viewer'/);
 assert.match(main,/baseRevision:current.revision,operation:'upsert'/);
 assert.match(main,/method:'PATCH'/);
 assert.match(main,/res.status===409/);
});
