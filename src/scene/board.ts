import * as T from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { ecosystem } from '../config/ecosystem';

/** Minimal circuit board: a shared processor and five independently selectable modules. */
export function createBoard(){
 const group=new T.Group();
 const materials={
  board:new T.MeshStandardMaterial({color:'#142b26',metalness:.35,roughness:.6}),
  edge:new T.MeshStandardMaterial({color:'#273d35',metalness:.7,roughness:.32}),
  chip:new T.MeshStandardMaterial({color:'#1d2927',metalness:.65,roughness:.35}),
  metal:new T.MeshStandardMaterial({color:'#ae9470',metalness:.85,roughness:.3}),
  trace:new T.MeshStandardMaterial({color:'#b89b70',metalness:.7,roughness:.45,emissive:'#c3a477',emissiveIntensity:.3}),
  light:new T.MeshStandardMaterial({color:'#f4d9a5',emissive:'#efc789',emissiveIntensity:2}),
 };
 const add=(geometry:T.BufferGeometry,mat:T.Material,x=0,y=0,z=0)=>{const mesh=new T.Mesh(geometry,mat);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);return mesh;};
 const box=(w:number,h:number,d:number,x:number,y:number,z:number,mat:T.Material,r=.1)=>add(new RoundedBoxGeometry(w,h,d,2,r),mat,x,y,z);
 box(39,.35,30,0,-.28,0,materials.board,.18);
 box(38.7,.08,29.7,0,-.49,0,materials.edge,.04);
 for(const x of [-18,18])for(const z of [-13.5,13.5]){
  add(new T.CylinderGeometry(.22,.22,.035,24),materials.metal,x,-.075,z);
  add(new T.CylinderGeometry(.115,.115,.04,20),materials.chip,x,-.05,z);
 }
 for(let i=0;i<16;i++)box(.26,.035,.75,-11.2+i*1.5,-.075,14.3,materials.metal,.03);
 // Sparse companion traces, rather than a busy full-board texture.
 for(const side of [-1,1])for(let lane=0;lane<3;lane++){
  const pts=[new T.Vector3(side*(17.1-lane*.3),-.06,11),new T.Vector3(side*(17.1-lane*.3),-.06,-9+lane*.6),new T.Vector3(side*(14.1-lane*.3),-.06,-12+lane*.6),new T.Vector3(side*6,-.06,-12+lane*.6)];
  group.add(new T.Line(new T.BufferGeometry().setFromPoints(pts),new T.LineBasicMaterial({color:'#4d6049',transparent:true,opacity:.45})));
 }
 box(7.4,.1,6.1,0,.03,0,materials.metal,.2);
 const coreGlow=box(6.85,.11,5.55,0,.16,0,materials.light,.18);
 box(6.65,1,5.35,0,.72,0,materials.chip,.2);
 box(6.1,.06,4.8,0,1.25,0,materials.edge,.16);
 for(let i=0;i<12;i++)for(const side of [-1,1]){
  box(.17,.13,.5,-2.75+i*.5,.18,side*2.95,materials.metal,.02);
  box(.5,.13,.17,side*3.6,.18,-2.2+i*.4,materials.metal,.02);
 }
 function decal(text:string,subtitle:string,x:number,y:number,z:number,w:number,d:number){
  const c=document.createElement('canvas');c.width=1024;c.height=512;const ctx=c.getContext('2d')!;
  ctx.textAlign='center';ctx.fillStyle='#ead4b0';ctx.font=`500 ${text==='RAMACH'?160:110}px sans-serif`;ctx.fillText(text,512,245);
  ctx.fillStyle='#8eaa9b';ctx.font='31px sans-serif';ctx.fillText(subtitle,512,330);
  const texture=new T.CanvasTexture(c);texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=4;
  const mesh=add(new T.PlaneGeometry(w,d),new T.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false}),x,y,z);mesh.rotation.x=-Math.PI/2;
 }
 decal('RAMACH','S  Y  S  T  E  M  S',0,1.29,0,5.6,2.8);
 const modules:T.Mesh[]=[];const indicators:T.Mesh[]=[];const curves:T.CurvePath<T.Vector3>[]=[];const pulses:T.Mesh[][]=[];
 ecosystem.forEach((zone,index)=>{
  const [x,,z]=zone.position;
  box(4.65,.1,3.85,x,.02,z,materials.metal,.14);
  const module=box(4.4,.65,3.6,x,.4,z,materials.chip,.16);module.userData.index=index;modules.push(module);
  const top=box(4.05,.04,3.25,x,.75,z,materials.edge,.1);top.userData.index=index;modules.push(top);
  decal(zone.number,['DESIGN','BUILD','MANAGE','DATA','OPERATE'][index],x,.79,z,3.2,1.6);
  const indicator=box(.5,.04,.045,x-1.3,.79,z+1.28,materials.light,.015);indicators.push(indicator);
  for(const side of [-1,1])for(let i=0;i<6;i++)box(.15,.09,.35,x-1.5+i*.6,.04,z+side*1.98,materials.metal,.02);
  const sign=Math.sign(x)||1;
  const points=index===3?[new T.Vector3(0,.03,-3.1),new T.Vector3(0,.03,-10.1)]:[
   new T.Vector3(sign*3.8,.03,Math.sign(z)*.5),new T.Vector3(sign*5.5,.03,Math.sign(z)*.5),
   new T.Vector3(sign*8,.03,Math.sign(z)*3),new T.Vector3(sign*8,.03,z),new T.Vector3(x-sign*2.4,.03,z),
  ];
  const path=new T.CurvePath<T.Vector3>();for(let i=0;i<points.length-1;i++)path.add(new T.LineCurve3(points[i],points[i+1]));curves.push(path);
  add(new T.TubeGeometry(path,36,.028,5,false),materials.trace);
  add(new T.TubeGeometry(path,36,.012,5,false),materials.light);
  const routePulses:T.Mesh[]=[];
  for(let i=0;i<3;i++){const p=add(new T.SphereGeometry(.065,8,6),materials.light);p.position.copy(path.getPoint(i/3));routePulses.push(p);}pulses.push(routePulses);
  const companion=new T.BufferGeometry().setFromPoints(points.map(p=>p.clone().add(new T.Vector3(0,0,.2))));group.add(new T.Line(companion,new T.LineBasicMaterial({color:'#667258',transparent:true,opacity:.6})));
 });
 return {group,modules,coreGlow,indicators,curves,pulses,materials};
}
