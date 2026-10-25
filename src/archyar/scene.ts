import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import type {ArchProject,ArchObject,CameraPose,Point3} from './project';
export class Viewer3D {
 private renderer:THREE.WebGLRenderer;
 private scene=new THREE.Scene();
 private camera=new THREE.PerspectiveCamera(64,1,.02,900);
 private controls:OrbitControls;
 private root=new THREE.Group();
 private currentPose:CameraPose|null=null;
 private follow=false;
 private targetPosition=new THREE.Vector3();
 private targetRotation=new THREE.Quaternion();
 private material=new THREE.MeshStandardMaterial({color:0xe1ebf4,roughness:.73,metalness:.06});
 private edgeMaterial=new THREE.LineBasicMaterial({color:0x71899d,transparent:true,opacity:.36});
 private frameMaterial=new THREE.MeshStandardMaterial({color:0x5795ae,roughness:.44,metalness:.22});
 private glassMaterial=new THREE.MeshStandardMaterial({color:0x8ddbea,transparent:true,opacity:.26,depthWrite:false,side:THREE.DoubleSide});
 private project:ArchProject|null=null;
 private raf=0;
 constructor(private container:HTMLElement){
  this.renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
  this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));
  this.renderer.setClearColor(0x0c1824);
  this.container.appendChild(this.renderer.domElement);
  this.scene.add(new THREE.HemisphereLight(0xd8f4ff,0x263a46,2.3));
  const sun=new THREE.DirectionalLight(0xffffff,2);sun.position.set(5,11,7);this.scene.add(sun);
  this.scene.add(this.root);
  this.camera.position.set(5,3.8,6.2);this.camera.lookAt(1,1,0);
  this.controls=new OrbitControls(this.camera,this.renderer.domElement);
  this.controls.enableDamping=true;this.controls.dampingFactor=.09;
  this.controls.target.set(1,1,0);this.controls.minDistance=.2;this.controls.maxDistance=150;
  const grid=new THREE.GridHelper(100,100,0x315365,0x203646);grid.name='projectGrid';this.scene.add(grid);
  window.addEventListener('resize',this.resize);this.resize();this.animate();
 }
 private resize=()=>{
  const w=Math.max(1,this.container.clientWidth),h=Math.max(1,this.container.clientHeight);
  this.camera.aspect=w/h;this.camera.updateProjectionMatrix();this.renderer.setSize(w,h,false);
 };
 private animate=()=>{
  this.raf=requestAnimationFrame(this.animate);
  if(this.follow&&this.currentPose){
   this.camera.position.lerp(this.targetPosition,.35);
   this.camera.quaternion.slerp(this.targetRotation,.32);
  } else this.controls.update();
  this.renderer.render(this.scene,this.camera);
 };
 setFollow(active:boolean){this.follow=active&&!!this.currentPose;this.controls.enabled=!this.follow;if(this.follow)this.setPose(this.currentPose!);}
 isFollowing(){return this.follow;}
 private addSolid(group:THREE.Group,dimensions:Point3,position:Point3,mat=this.material){
  const [w,h,d]=dimensions;
  if(!Number.isFinite(w*h*d)||w<=0||h<=0||d<=0)return;
  const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);
  mesh.position.set(...position);group.add(mesh);
  if(mat===this.material){
   const edges=new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry),this.edgeMaterial);
   edges.position.copy(mesh.position);group.add(edges);
  }
 }
 private renderWall(obj:ArchObject,openingObjects:ArchObject[]){
  const p=obj.parameters;
  const a=p.start as [number,number],b=p.end as [number,number];
  const span=Math.hypot(b[0]-a[0],b[1]-a[1]);
  if(!Number.isFinite(span)||span<.001)return;
  const wallH=Number(p.height),thick=Number(p.thickness),base=Number(p.baseElevation||0);
  if(!(wallH>0&&thick>0))return;
  const group=new THREE.Group();
  group.position.set(a[0],base,a[1]);group.rotation.y=-Math.atan2(b[1]-a[1],b[0]-a[0]);
  const add=(left:number,right:number,bottom:number,top:number)=>{
   if(right-left>.0005&&top-bottom>.0005)this.addSolid(group,[right-left,top-bottom,thick],[(left+right)/2,(bottom+top)/2,0]);
  };
  const sorted=openingObjects.map(o=>{
   const op=o.parameters,width=Number(op.width),height=Number(op.height);
   return {obj:o,left:span*Number(op.hostT)-width/2,right:span*Number(op.hostT)+width/2,sill:Number(op.sill||0),top:Number(op.sill||0)+height};
  }).filter(o=>[o.left,o.right,o.top,o.sill].every(Number.isFinite)&&o.right>o.left&&o.sill>=0&&o.top<=wallH).sort((x,y)=>x.left-y.left);
  let cursor=0;
  for(const o of sorted){
   if(o.left<cursor-.001||o.left<-.001||o.right>span+.001)continue;
   add(cursor,o.left,0,wallH);add(o.left,o.right,0,o.sill);add(o.left,o.right,o.top,wallH);
   const jamb=.055;
   this.addSolid(group,[jamb,o.top-o.sill,thick+.025],[(o.left+jamb/2),(o.sill+o.top)/2,0],this.frameMaterial);
   this.addSolid(group,[jamb,o.top-o.sill,thick+.025],[(o.right-jamb/2),(o.sill+o.top)/2,0],this.frameMaterial);
   this.addSolid(group,[o.right-o.left,jamb,thick+.025],[(o.left+o.right)/2,o.top-jamb/2,0],this.frameMaterial);
   if(o.sill>0)this.addSolid(group,[o.right-o.left,jamb,thick+.025],[(o.left+o.right)/2,o.sill+jamb/2,0],this.frameMaterial);
   if(!['door','sliding-door'].includes(String(o.obj.parameters.style))){
    this.addSolid(group,[o.right-o.left-.11,o.top-o.sill-.11,.012],[(o.left+o.right)/2,(o.sill+o.top)/2,0],this.glassMaterial);
   }
   cursor=o.right;
  }
  add(cursor,span,0,wallH);
  this.root.add(group);
 }
 private applyTransform(group:THREE.Group,obj:ArchObject){
  const t=obj.transform;
  if(!t)return;
  if(t.position)group.position.set(...t.position);
  if(t.rotation)group.quaternion.set(...t.rotation).normalize();
  if(t.scale)group.scale.set(...t.scale);
 }
 private renderObject(obj:ArchObject){
  const p=obj.parameters,kind=obj.kind,g=new THREE.Group();
  if(kind==='stair'){
   const count=Math.floor(Number(p.stairCount||10)),run=Number(p.run||3),rise=Number(p.rise||1.8),width=Number(p.width||1);
   if(count>=1&&count<=50&&run>0&&rise>0&&width>0){
    for(let i=0;i<count;i++){const h=(i+1)*rise/count;
     this.addSolid(g,[run/count,kind==='stair'&&p.style==='stair-filled'?h:.05,width],[(-run/2+(i+.5)*run/count),p.style==='stair-filled'?h/2:h-.025,0]);}
   }
  }else if(['pipe','duct','conduit'].includes(kind)){
   const route=p.route;
   if(Array.isArray(route)){
    for(let i=1;i<route.length;i++){
     const a=new THREE.Vector3(...(route[i-1] as Point3)),b=new THREE.Vector3(...(route[i] as Point3));
     const dir=b.clone().sub(a),distance=dir.length();
     if(distance<.001)continue;
     const width=Math.max(.008,Number(p.width)||.05);
     const mesh=kind==='duct'
      ?new THREE.Mesh(new THREE.BoxGeometry(width,Number(p.height)||width,distance),this.frameMaterial)
      :new THREE.Mesh(new THREE.CylinderGeometry(width/2,width/2,distance,10),this.frameMaterial);
     mesh.position.copy(a).add(b).multiplyScalar(.5);
     mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,kind==='duct'?0:1,kind==='duct'?1:0),dir.normalize());
     g.add(mesh);
    }
   }
  }else{
   const width=Math.max(.03,Number(p.width)||4),height=Math.max(.02,Number(p.height)||.14),depth=Math.max(.03,Number(p.depth)||4);
   if(['floor','ceiling'].includes(kind)){
    const outline=p.outline;
    if(Array.isArray(outline)&&outline.length>=3){
     const shape=new THREE.Shape();
     outline.forEach((point,index)=>{
      const xy=point as [number,number];if(index===0)shape.moveTo(xy[0],-xy[1]);else shape.lineTo(xy[0],-xy[1]);
     });
     shape.closePath();
     const mesh=new THREE.Mesh(new THREE.ShapeGeometry(shape),this.material);
     mesh.rotation.x=-Math.PI/2;
     g.add(mesh);
    }else this.addSolid(g,[width,.14,depth],[0,kind==='ceiling'?3:0,0]);
   }else if(kind==='furniture'){
    this.addSolid(g,[Math.max(.1,Number(p.width)||1),Math.max(.1,Number(p.height)||.8),Math.max(.1,Number(p.depth)||.8)],[0,Math.max(.1,Number(p.height)||.8)/2,0],this.frameMaterial);
   }else if(['column','railing','custom'].includes(kind)){
    this.addSolid(g,[width,height,depth],[0,height/2,0]);
   }else return;
  }
  this.applyTransform(g,obj);this.root.add(g);
 }
 setProject(project:ArchProject){
  this.project=project;
  this.root.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();}else if(o instanceof THREE.LineSegments)o.geometry.dispose()});
  this.root.clear();
  const openings=new Map<string,ArchObject[]>();
  for(const o of project.objects)if(o.kind==='opening'&&o.hostId){
   if(!openings.has(o.hostId))openings.set(o.hostId,[]);
   openings.get(o.hostId)!.push(o);
  }
  const visible=new Set(project.floors.filter(f=>f.visible).map(f=>f.id));
  for(const o of project.objects)if(visible.has(o.floorId)){
   if(o.kind==='wall')this.renderWall(o,openings.get(o.id)||[]);
   else if(o.kind!=='opening')this.renderObject(o);
  }
  this.fitProject();
 }
 private fitProject(){
  if(this.follow)return;
  const bounds=new THREE.Box3().setFromObject(this.root);
  if(bounds.isEmpty())return;
  const center=bounds.getCenter(new THREE.Vector3()),size=bounds.getSize(new THREE.Vector3());
  const radius=Math.max(size.length()*.75,3);
  this.controls.target.copy(center);
  this.camera.position.copy(center).add(new THREE.Vector3(radius*.8,radius*.72,radius));
  this.controls.update();
 }
 setPose(pose:CameraPose){
  if(this.project&&pose.projectId!==this.project.projectId)return;
  if(this.currentPose&&this.currentPose.sessionId===pose.sessionId&&pose.sequence<=this.currentPose.sequence)return;
  this.currentPose=pose;
  this.targetPosition.set(...pose.position);
  this.targetRotation.set(...pose.rotation).normalize();
  this.camera.fov=pose.fovYDegrees;this.camera.updateProjectionMatrix();
 }
 dispose(){cancelAnimationFrame(this.raf);window.removeEventListener('resize',this.resize);this.controls.dispose();this.renderer.dispose();}
}
