import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

type Node = { group: THREE.Group; color: THREE.Color };
type SignalParticle = { curve: THREE.CurvePath<THREE.Vector3>; offset:number; speed:number; reverse:boolean; channel:0|1 };
const ivory = 0xe7e3d8, ink = 0x152d30, gold = 0xb99d72, aqua = 0x79c5b7;
const smooth = (a:number,b:number,v:number) => { const t = Math.max(0,Math.min(1,(v-a)/(b-a))); return t*t*(3-2*t); };

export function createWorld(host:HTMLElement, chapterAlignments:readonly ('left'|'right')[] = []) {
  // The scene's core signal animation is on by default, including desktop Chrome.
// Explicit reduceMotion=1 preserves the user's choice to disable motion.
  const reduceMotion = new URLSearchParams(location.search).get('reduceMotion')==='1';
  const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true, powerPreference:'high-performance' });
  renderer.setClearColor(0x03090d,0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = false;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x03090d,0.006);
  const camera = new THREE.PerspectiveCamera(38,1,0.1,170);
  const root = new THREE.Group(); scene.add(root);
  scene.add(new THREE.HemisphereLight(0xb8d4d0,0x071318,.82));
  const sun = new THREE.DirectionalLight(0xffefd7,1.85);
  sun.position.set(-20,28,22); sun.castShadow=false; sun.shadow.mapSize.set(512,512);
  sun.shadow.camera.left=-45;sun.shadow.camera.right=45;sun.shadow.camera.top=45;sun.shadow.camera.bottom=-45;sun.shadow.camera.near=1;sun.shadow.camera.far=100;
  sun.shadow.bias=-0.0002;
  scene.add(sun);
  const rim = new THREE.DirectionalLight(0x63b7bd,.85);rim.position.set(18,18,-18);scene.add(rim);
  const material = (color:number,metalness=0.3,roughness=0.42,extra:Record<string,unknown>={}) =>
    new THREE.MeshStandardMaterial({color,metalness,roughness,...extra});
  const dark=material(0x1b3235,.67,.3), stone=material(0xd9d5ca,.18,.68), concrete=material(0xa9b1ad,.18,.62);
  const brass=material(gold,.86,.27), glass=material(0x77bac0,.28,.12,{transparent:true,opacity:.24,depthWrite:false,side:THREE.DoubleSide});
  const windowGlow=material(0x74cfb8,.33,.24,{emissive:0x398b7c,emissiveIntensity:.8});
  const whiteLight=material(0xe7fff4,.3,.23,{emissive:0x8be7ce,emissiveIntensity:2.1});
  const muted=material(0x476466,.44,.4);
  function put(parent:THREE.Object3D, geo:THREE.BufferGeometry, mat:THREE.Material, x=0,y=0,z=0) {
    const mesh = new THREE.Mesh(geo,mat); mesh.position.set(x,y,z);mesh.castShadow=false;mesh.receiveShadow=false;parent.add(mesh);return mesh;
  }
  function box(parent:THREE.Object3D,w:number,h:number,d:number,x:number,y:number,z:number,mat:THREE.Material,r=0) {
    return put(parent,r?new RoundedBoxGeometry(w,h,d,2,Math.min(r,w/2,h/2,d/2)):new THREE.BoxGeometry(w,h,d),mat,x,y,z);
  }
  function cyl(parent:THREE.Object3D,r:number,h:number,x:number,y:number,z:number,mat:THREE.Material,segments=48) {
    return put(parent,new THREE.CylinderGeometry(r,r,h,segments),mat,x,y,z);
  }
  function rod(parent:THREE.Object3D,from:THREE.Vector3,to:THREE.Vector3,r:number,mat:THREE.Material) {
    const delta=to.clone().sub(from);
    const mesh=put(parent,new THREE.CylinderGeometry(r,r,delta.length(),9),mat,...(from.clone().add(to).multiplyScalar(.5).toArray() as [number,number,number]));
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return mesh;
  }
  function ring(parent:THREE.Object3D,r:number,tube:number,y:number,mat:THREE.Material) {
    const mesh=put(parent,new THREE.TorusGeometry(r,tube,7,110),mat,0,y,0);mesh.rotation.x=Math.PI/2;return mesh;
  }
  const haloMat=new THREE.MeshBasicMaterial({color:0x77cebb,transparent:true,opacity:.2,depthWrite:false});
  const floor=put(root,new THREE.PlaneGeometry(170,170),new THREE.MeshStandardMaterial({color:0x050c10,metalness:.06,roughness:.92}),0,-2.45,0);
  floor.rotation.x=-Math.PI/2;
  const grid = new THREE.GridHelper(158,79,0x28474c,0x1d3237);grid.position.y=-2.42;
  (grid.material as THREE.Material).transparent=true;(grid.material as THREE.Material).opacity=.11;root.add(grid);
  // A gallery of symbolic, architectural problems; no literal toy buildings or avatars.
  const metal=material(0xa58e73,.88,.26), charcoal=material(0x15242b,.62,.39);
  const smoked=new THREE.MeshStandardMaterial({color:0x82a4a6,metalness:.28,roughness:.3,transparent:true,opacity:.33,depthWrite:false,side:THREE.DoubleSide});
  const signal=material(0x7bcbb9,.26,.27,{emissive:0x349684,emissiveIntensity:.75});
  const ghost=new THREE.MeshBasicMaterial({color:0x82d3c9,transparent:true,opacity:.16,depthWrite:false,side:THREE.DoubleSide});
  const mutedGlass=material(0x38575a,.44,.3);
  function wireRectangle(parent:THREE.Object3D,w:number,d:number,y:number,mat:THREE.Material){
    const v=[new THREE.Vector3(-w/2,y,-d/2),new THREE.Vector3(w/2,y,-d/2),new THREE.Vector3(w/2,y,d/2),new THREE.Vector3(-w/2,y,d/2)];
    for(let i=0;i<4;i++)rod(parent,v[i],v[(i+1)%4],.028,mat);
  }
  function galleryNode(x:number,z:number){
    const group=new THREE.Group();group.position.set(x,0,z);root.add(group);
    box(group,9.2,.12,8.3,0,-.72,0,charcoal,.025);
    wireRectangle(group,9.4,8.5,-.59,metal);
    const corners=[[-4.55,-4.12],[4.55,-4.12],[-4.55,4.12],[4.55,4.12]];
    for(const [a,b] of corners)box(group,.22,.026,.26,a,-.5,b,signal);
    return group;
  }
  // Six widely-spaced story nodes, with visual hierarchy and negative space.
  const nodePositions=[[22,-17],[27,8],[15,28],[-12,27],[-27,9],[-22,-17],[0,-34]] as const;
  const worlds=nodePositions.map(([x,z])=>({group:galleryNode(x,z)}));
  const center=new THREE.Group();root.add(center);
  box(center,8.7,.14,8.7,0,-.7,0,charcoal,.04);
  wireRectangle(center,9.2,9.2,-.59,metal);
  for(let i=0;i<4;i++){
    const a=i*Math.PI/2+.25;
    const x=Math.cos(a)*3.1,z=Math.sin(a)*3.1;
    rod(center,new THREE.Vector3(x,-.42,z),new THREE.Vector3(x*.45,2.7,z*.45),.036,metal);
  }
  // A small static microchip is the hub; circuit traces visibly leave its edge.
  const chipBody=material(0x183a3d,.76,.24,{emissive:0x0b2929,emissiveIntensity:.45});
  box(center,1.62,.48,1.62,0,3.05,0,chipBody,.075);
  put(center,new THREE.BoxGeometry(1.72,.54,1.72),new THREE.MeshBasicMaterial({color:0x9ed9ce,wireframe:true,transparent:true,opacity:.48,toneMapped:false}),0,3.05,0);
  const inner=box(center,.38,.075,.38,0,3.33,0,whiteLight,.025);
  for(const offset of [-.48,0,.48]){
    box(center,.29,.09,.13,offset,3.05,-.9,metal,.02);
    box(center,.29,.09,.13,offset,3.05,.9,metal,.02);
    box(center,.13,.09,.29,-.9,3.05,offset,metal,.02);
    box(center,.13,.09,.29,.9,3.05,offset,metal,.02);
  }
  for(const x of [-.48,.48])for(const z of [-.48,.48])box(center,.12,.025,.12,x,3.33,z,signal,.012);
  const coreRing=new THREE.Group();coreRing.position.y=3.05;center.add(coreRing);
  ring(coreRing,1.72,.018,0,metal);ring(coreRing,2.08,.014,.08,signal);
  const glow=put(center,new THREE.SphereGeometry(2.8,24,16),new THREE.MeshBasicMaterial({color:0x61cbb6,transparent:true,opacity:.028,depthWrite:false,blending:THREE.AdditiveBlending}),0,3.05,0);
  const nodeRings=worlds.map(({group})=>{
    const ringMaterial=new THREE.MeshBasicMaterial({color:0x91ffe5,transparent:true,opacity:.045,depthWrite:false,toneMapped:false});
    const halo=put(group,new THREE.TorusGeometry(4.38,.027,5,80),ringMaterial,0,-.55,0);
    halo.rotation.x=Math.PI/2;
    return halo;
  });
  // 01 — Construction mismatch: the built doorway and the displaced plan disagree.
  {
    const g=worlds[0].group;
    box(g,1.55,3.1,.22,-2.02,1.15,-2.1,concrete,.025);
    box(g,1.55,3.1,.22,1.02,1.15,-2.1,concrete,.025);
    box(g,1.5,.42,.22,-.5,2.84,-2.1,concrete,.025);
    for(const x of [-1.25,.25])rod(g,new THREE.Vector3(x,-.38,-1.94),new THREE.Vector3(x,3.1,-1.94),.045,metal);
    rod(g,new THREE.Vector3(-1.25,3.1,-1.94),new THREE.Vector3(.25,3.1,-1.94),.045,metal);
    for(const x of [-.78,.72])rod(g,new THREE.Vector3(x,-.3,-1.18),new THREE.Vector3(x,3.35,-1.18),.035,signal);
    rod(g,new THREE.Vector3(-.78,3.35,-1.18),new THREE.Vector3(.72,3.35,-1.18),.035,signal);
    rod(g,new THREE.Vector3(-.78,-.3,-1.18),new THREE.Vector3(.72,-.3,-1.18),.035,signal);
    box(g,3.5,.025,.04,-.2,2.55,-1.55,ghost);
    box(g,3.5,.025,.04,.28,2.25,-1.2,signal);
  }
  // 02 — Three actual work participants connected to one shared model.
  {
    const g=worlds[1].group;
    const positions=[[-2.7,-1.55],[2.5,-1.55],[.1,2.4]];
    for(const [x,z] of positions){
      cyl(g,.52,.12,x,-.35,z,metal,32);
      cyl(g,.22,.78,x,1.15,z,smoked,24);
      put(g,new THREE.SphereGeometry(.24,18,14),stone,x,1.78,z);
      rod(g,new THREE.Vector3(x-.18,1.38,z),new THREE.Vector3(x-.46,.98,z),.045,metal);
      rod(g,new THREE.Vector3(x+.18,1.38,z),new THREE.Vector3(x+.46,.98,z),.045,metal);
      rod(g,new THREE.Vector3(x-.11,.77,z),new THREE.Vector3(x-.15,.12,z),.055,metal);
      rod(g,new THREE.Vector3(x+.11,.77,z),new THREE.Vector3(x+.15,.12,z),.055,metal);
      rod(g,new THREE.Vector3(x,2.04,z),new THREE.Vector3(x*.18,3.0,z*.18),.022,signal);
    }
    box(g,4.0,.075,2.35,0,3.35,0,smoked,.015);
    wireRectangle(g,3.8,2.2,3.39,signal);
    for(let i=0;i<3;i++)box(g,.035,.025,1.2,-1.15+i*1.15,3.44,0,metal);
  }
  // 03 — An inhabitable room, furniture and a translucent AR placement preview.
  {
    const g=worlds[2].group;
    for(const x of [-2.8,2.8])for(const z of [-2.25,2.25])
      rod(g,new THREE.Vector3(x,-.42,z),new THREE.Vector3(x,3.4,z),.046,stone);
    wireRectangle(g,5.6,4.5,3.4,stone);
    const transparentWall=box(g,5.5,3.7,.025,0,1.5,-2.23,smoked);
    transparentWall.rotation.y=.06;
    box(g,2.15,.46,.78,-.72,-.12,.48,stone,.09);
    box(g,2.15,.78,.2,-.72,.39,.78,smoked,.07);
    box(g,.25,.54,.78,-1.67,.12,.48,metal,.06);
    box(g,.25,.54,.78,.23,.12,.48,metal,.06);
    box(g,.92,1.35,.55,1.78,.28,.12,charcoal,.045);
    box(g,.86,.055,.58,1.78,.98,.12,metal,.02);
    for(const y of [.1,.45,.75])box(g,.66,.025,.02,1.78,y,.405,signal);
    wireRectangle(g,4.25,3.25,1.1,signal);
    for(let i=0;i<3;i++)box(g,.035,2.8,.025,-2.2+i*2.2,1.18,-2.12,ghost);
    ring(g,2.0,.018,1.65,signal);
  }
  // 04 — One model moves between a desktop design viewport, web card and phone.
  {
    const g=worlds[3].group;
    box(g,2.2,1.52,.16,-2.28,1.95,0,charcoal,.08);
    box(g,1.98,1.28,.035,-2.28,1.95,.105,smoked,.025);
    for(let i=0;i<4;i++)box(g,1.5,.035,.025,-2.28,2.35-i*.24,.13,i===0?signal:metal);
    rod(g,new THREE.Vector3(-2.28,1.18,.04),new THREE.Vector3(-2.28,.62,.04),.07,metal);
    box(g,1.0,.09,.48,-2.28,.56,.04,metal,.035);
    box(g,1.12,1.72,.12,0,1.86,0,stone,.05);
    for(const x of [-.28,0,.28])rod(g,new THREE.Vector3(x,.95,-.04),new THREE.Vector3(x,2.4,-.04),.025,metal);
    box(g,.9,1.72,.13,2.28,1.82,0,charcoal,.12);
    box(g,.73,1.48,.035,2.28,1.82,.085,smoked,.07);
    for(let i=0;i<4;i++)box(g,.48,.035,.025,2.28,2.2-i*.25,.11,i===0?signal:metal);
    rod(g,new THREE.Vector3(-1.12,2.45,.02),new THREE.Vector3(-.62,2.45,.02),.035,signal);
    rod(g,new THREE.Vector3(.62,2.45,.02),new THREE.Vector3(1.78,2.45,.02),.035,signal);
    for(const x of [-.88,0,1.12])put(g,new THREE.SphereGeometry(.09,12,8),whiteLight,x,2.45,.04);
  }
  // 05 — A project ledger, cost columns and a settled stack of payments.
  {
    const g=worlds[4].group;
    box(g,2.2,2.65,.14,-.55,1.28,0,smoked,.045);
    for(let i=0;i<5;i++){
      const y=2.15-i*.42;
      box(g,1.5,.035,.025,-.55,y,.095,metal);
      box(g,.55,.035,.025,-.92,y-.16,.095,signal);
    }
    for(let i=0;i<5;i++){
      const x=-2.9+i*.62;
      const h=.55+i*.42;
      box(g,.34,h,.42,x,-.38+h/2,-.2,i===4?signal:metal,.025);
    }
    for(let i=0;i<4;i++)cyl(g,.42,.13,2.35,-.28+i*.15,.55,brass,32);
    cyl(g,.42,.08,2.35,.37,.55,signal,32);
    wireRectangle(g,6.9,4.25,3.45,metal);
    box(g,6.65,.06,4.05,0,3.42,0,ghost);
  }
  // 06 — A browser-like architectural portfolio showing a recognizable facade.
  {
    const g=worlds[5].group;
    for(const x of [-3.3,3.3])
      rod(g,new THREE.Vector3(x,-.5,-.55),new THREE.Vector3(x,5.0,-.55),.085,metal);
    for(const y of [-.3,5.0])
      rod(g,new THREE.Vector3(-3.3,y,-.55),new THREE.Vector3(3.3,y,-.55),.085,metal);
    box(g,6.2,4.9,.08,0,2.2,-.57,charcoal,.045);
    box(g,5.9,4.5,.035,0,2.2,-.49,smoked,.02);
    box(g,2.05,2.25,.12,-1.2,1.45,-.39,stone,.025);
    rod(g,new THREE.Vector3(-2.35,2.58,-.36),new THREE.Vector3(-1.2,3.55,-.36),.045,metal);
    rod(g,new THREE.Vector3(-1.2,3.55,-.36),new THREE.Vector3(-.05,2.58,-.36),.045,metal);
    for(const x of [-1.85,-1.2,-.55])for(const y of [1.0,1.7,2.4])
      box(g,.28,.42,.035,x,y,-.30,signal,.015);
    box(g,.32,.72,.04,-1.2,.85,-.29,charcoal,.015);
    for(let i=0;i<3;i++){
      box(g,.95,.68,.04,1.8,3.1-i*1.02,-.39,ghost,.025);
      box(g,.63,.035,.025,1.8,3.25-i*1.02,-.35,metal);
      box(g,.48,.035,.025,1.73,3.02-i*1.02,-.35,signal);
    }
    for(let i=0;i<5;i++)box(g,1.75,.022,.03,1.35,1.85-i*.35,-.26,signal);
  }
  // 07 — A restrained neural lattice for future intelligence, not a glowing crystal.
  {
    const g=worlds[6].group;
    const layers=[
      [[-1.55,.45,-1.05],[0,.45,-1.05],[1.55,.45,-1.05]],
      [[-1.55,1.75,0],[0,1.75,0],[1.55,1.75,0]],
      [[-1.55,3.05,1.05],[0,3.05,1.05],[1.55,3.05,1.05]]
    ].map(layer=>layer.map(([x,y,z])=>new THREE.Vector3(x,y,z)));
    for(let layer=0;layer<layers.length-1;layer++){
      for(const from of layers[layer])for(const to of layers[layer+1])rod(g,from,to,.018,layer===1?signal:mutedGlass);
    }
    for(let layer=0;layer<layers.length;layer++)for(let j=0;j<layers[layer].length;j++){
      const p=layers[layer][j];
      put(g,new THREE.SphereGeometry(.2,12,8),layer===1?whiteLight:signal,p.x,p.y,p.z);
      put(g,new THREE.SphereGeometry(.34,10,7),new THREE.MeshBasicMaterial({color:0x7effdf,transparent:true,opacity:.07,blending:THREE.AdditiveBlending,depthWrite:false}),p.x,p.y,p.z);
    }
    wireRectangle(g,4.5,4.5,3.7,metal);
  }
  // Thin board traces plus a *single* GPU point-cloud for all moving light packets.
  // Previous implementations created separate orb/halo/trail meshes per signal;
  // this version renders up to 98 independently phased dots in ONE draw call.
  const track=new THREE.MeshBasicMaterial({color:0x36585a,transparent:true,opacity:.58,depthWrite:false});
  const filament=new THREE.MeshBasicMaterial({color:0x91ebd3,transparent:true,opacity:.92,depthWrite:false,toneMapped:false});
  const traceGlow=new THREE.MeshBasicMaterial({
    color:0x65e9ce,transparent:true,opacity:.14,
    blending:THREE.AdditiveBlending,depthWrite:false,depthTest:true,toneMapped:false
  });
  const signalDots:SignalParticle[]=[];
  let randomSeed=0x52414d41; // Stable pseudo-random motion; never randomize every frame.
  const random=()=>{randomSeed=(1664525*randomSeed+1013904223)>>>0;return randomSeed/4294967296;};
  // True rounded PCB traces: linear straights joined by quadratic corners.
  // CurvePath preserves precise on-track particle positioning, unlike a low-poly polyline.
  function roundedRoute(points:THREE.Vector3[],radius:number){
    const route=new THREE.CurvePath<THREE.Vector3>();
    let cursor=points[0].clone();
    for(let i=1;i<points.length-1;i++){
      const corner=points[i],prev=points[i-1],next=points[i+1];
      const distanceIn=corner.distanceTo(prev),distanceOut=corner.distanceTo(next);
      if(distanceIn<.04||distanceOut<.04)continue;
      const cut=Math.min(radius,distanceIn*.34,distanceOut*.34);
      const entry=corner.clone().lerp(prev,cut/distanceIn);
      const exit=corner.clone().lerp(next,cut/distanceOut);
      if(cursor.distanceTo(entry)>.008)route.add(new THREE.LineCurve3(cursor,entry));
      route.add(new THREE.QuadraticBezierCurve3(entry,corner.clone(),exit));
      cursor=exit;
    }
    const last=points[points.length-1];
    if(cursor.distanceTo(last)>.008)route.add(new THREE.LineCurve3(cursor,last.clone()));
    return route;
  }
  const dotsPerLane=innerWidth<740?6:11;
  for(let i=0;i<worlds.length;i++){
    const destination=worlds[i].group.position;
    const direction=destination.clone().normalize();
    for(let lane=0;lane<2;lane++){
      const side=lane===0?-.17:.17;
      const lateral=new THREE.Vector3(-direction.z,0,direction.x).multiplyScalar(side);
      const start=new THREE.Vector3(direction.x*.83+lateral.x,3.34,direction.z*.83+lateral.z);
      const drop=new THREE.Vector3(start.x,.12,start.z);
      const railStart=new THREE.Vector3(direction.x*4.6+lateral.x,.12,direction.z*4.6+lateral.z);
      const end=new THREE.Vector3(destination.x-direction.x*4.9+lateral.x,.12,destination.z-direction.z*4.9+lateral.z);
      const midX=Math.abs(destination.x)>8?destination.x*.52+lateral.x:destination.x+lateral.x;
      const midZ=destination.z*.67+lateral.z;
      const route=roundedRoute([
        start,drop,railStart,
        new THREE.Vector3(midX,.12,railStart.z),
        new THREE.Vector3(midX,.12,midZ),
        new THREE.Vector3(end.x,.12,midZ),end
      ],.83);
      put(root,new THREE.TubeGeometry(route,128,.046,8,false),track);
      put(root,new THREE.TubeGeometry(route,128,.078,8,false),traceGlow);
      put(root,new THREE.TubeGeometry(route,128,.016,8,false),filament);
      for(let dot=0;dot<dotsPerLane;dot++){
        signalDots.push({
          curve:route,reverse:lane===1,channel:lane===1?1:0,
          offset:(dot+random()*.85)/dotsPerLane,
          speed:.095+random()*.16
        });
      }
    }
  }
  const signalPositions=new Float32Array(signalDots.length*3);
  const signalColors=new Float32Array(signalDots.length*3);
  for(let i=0;i<signalDots.length;i++){
    const idx=3*i,jitter=.84+random()*.16;
    if(signalDots[i].channel===1){
      signalColors[idx]=.62*jitter;signalColors[idx+1]=1;signalColors[idx+2]=.88*jitter;
    }else{
      signalColors[idx]=1;signalColors[idx+1]=.83*jitter;signalColors[idx+2]=.55*jitter;
    }
  }
  // A 32x32 soft sprite uses a tiny (~4 KB) procedural texture and no network fetch.
  const spriteSize=32;
  const pixels=new Uint8Array(spriteSize*spriteSize*4);
  for(let y=0;y<spriteSize;y++)for(let x=0;x<spriteSize;x++){
    const dx=(x+0.5-spriteSize/2)/(spriteSize/2);
    const dy=(y+0.5-spriteSize/2)/(spriteSize/2);
    const radius=Math.hypot(dx,dy);
    const a=Math.exp(-4.4*radius*radius)*Math.max(0,1-radius*radius);
    const j=(y*spriteSize+x)*4;
    pixels[j]=255;pixels[j+1]=255;pixels[j+2]=255;pixels[j+3]=Math.round(255*a);
  }
  const sprite=new THREE.DataTexture(pixels,spriteSize,spriteSize,THREE.RGBAFormat);
  sprite.magFilter=THREE.LinearFilter;sprite.minFilter=THREE.LinearFilter;sprite.needsUpdate=true;
  const signalsGeometry=new THREE.BufferGeometry();
  signalsGeometry.setAttribute('position',new THREE.BufferAttribute(signalPositions,3).setUsage(THREE.DynamicDrawUsage));
  signalsGeometry.setAttribute('color',new THREE.BufferAttribute(signalColors,3));
  // Soft halo + crisp micro-point share one dynamic position buffer and sprite.
  // Two draw calls for every dot together, independent of particle count.
  const glowPointsMaterial=new THREE.PointsMaterial({
    color:0xffffff,map:sprite,vertexColors:true,size:innerWidth<740?9:11,
    sizeAttenuation:false,transparent:true,opacity:.27,
    blending:THREE.AdditiveBlending,depthWrite:false,depthTest:false,toneMapped:false
  });
  const signalsMaterial=new THREE.PointsMaterial({
    color:0xffffff,map:sprite,vertexColors:true,size:innerWidth<740?2.4:3.0,
    sizeAttenuation:false,transparent:true,opacity:.93,
    blending:THREE.AdditiveBlending,depthWrite:false,depthTest:false,toneMapped:false
  });
  const signalsGlow=new THREE.Points(signalsGeometry,glowPointsMaterial);
  signalsGlow.frustumCulled=false;signalsGlow.renderOrder=1;
  root.add(signalsGlow);
  const signalsCloud=new THREE.Points(signalsGeometry,signalsMaterial);
  signalsCloud.frustumCulled=false; // Dynamic positions cannot use a static bounding sphere.
  signalsCloud.renderOrder=2;
  root.add(signalsCloud);
  const scratchSignal=new THREE.Vector3();
  // Eight chapter approaches occupy the first 82% of the scene; the last 18% returns to the chip.
  const clamp=(v:number,a=0,b=1)=>Math.max(a,Math.min(b,v));
  const storyEnd=0.82;
  const chapterTargets=[
    new THREE.Vector3(0,1.65,0),
    ...worlds.map(({group})=>group.position.clone().add(new THREE.Vector3(0,2.1,0)))
  ];
  type CameraMark={position:THREE.Vector3;focus:THREE.Vector3};
  const makeMark=(target:THREE.Vector3,index:number):CameraMark=>{
    const radial=new THREE.Vector3(target.x,0,target.z);
    if(radial.lengthSq()<.01)radial.set(0,0,1);else radial.normalize();
    const right=new THREE.Vector3(radial.z,0,-radial.x);
    const mobile=innerWidth<740;
    const align=chapterAlignments[index]??(index%2===0?'right':'left');
    const shift=mobile?0:(align==='right'?4.4:-4.4);
    const focus=target.clone().addScaledVector(right,shift);
    if(mobile)focus.y-=2.25;
    const position=target.clone().addScaledVector(radial,mobile?14.2:15.5);
    position.y=target.y+(mobile?8.6:7.7);
    return {position,focus};
  };
  let marks=chapterTargets.map(makeMark);
  const establishing:CameraMark={position:new THREE.Vector3(0,27,94),focus:new THREE.Vector3(0,1.5,0)};
  const closingMark:CameraMark={position:new THREE.Vector3(0,13,25),focus:new THREE.Vector3(0,2.1,0)};
  function transitionCurve(from:THREE.Vector3,to:THREE.Vector3,height:number){
    const control=from.clone().add(to).multiplyScalar(.5);
    control.y+=height;
    return new THREE.QuadraticBezierCurve3(from,control,to);
  }
  let disposed=false;
  function update(progress:number,seconds:number){
    if(disposed)return;
    if(progress<storyEnd){
      const storyProgress=clamp(progress/storyEnd);
      const chapterCount=marks.length;
      const chapterPhase=storyProgress*chapterCount;
      const chapterIndex=Math.min(chapterCount-1,Math.floor(chapterPhase));
      const local=chapterPhase-chapterIndex;
      const from=chapterIndex===0?establishing:marks[chapterIndex-1];
      const to=marks[chapterIndex];
      const distance=from.position.distanceTo(to.position);
      const travel=smooth(0,1,clamp(local/.78));
      const cameraCurve=transitionCurve(from.position,to.position,Math.min(2.4,1.1+distance*.025));
      const focusCurve=transitionCurve(from.focus,to.focus,.55);
      camera.position.copy(cameraCurve.getPoint(travel));
      camera.lookAt(focusCurve.getPoint(travel));
    }else{
      const returnProgress=smooth(0,1,clamp((progress-storyEnd)/(1-storyEnd)));
      const distance=marks[marks.length-1].position.distanceTo(closingMark.position);
      const cameraCurve=transitionCurve(marks[marks.length-1].position,closingMark.position,Math.min(8,distance*.055));
      const focusCurve=transitionCurve(marks[marks.length-1].focus,closingMark.focus,1.1);
      camera.position.copy(cameraCurve.getPoint(returnProgress));
      camera.lookAt(focusCurve.getPoint(returnProgress));
    }
    const returnWeight=smooth(storyEnd,.99,progress);
    const centerWeight=1-smooth(.12,.72,Math.abs(progress/storyEnd*marks.length-Math.round(progress/storyEnd*marks.length)));
    coreRing.rotation.z=Math.sin(seconds*.18)*.014;
    inner.scale.setScalar(1+Math.sin(seconds*.65)*.018);
    glow.scale.setScalar(1+returnWeight*.07+centerWeight*.025);
    (glow.material as THREE.MeshBasicMaterial).opacity=.022+returnWeight*.045+centerWeight*.02;
    for(let i=0;i<nodeRings.length;i++){
      const chapterPhase=clamp(progress/storyEnd)*marks.length;
      const distanceFromBeat=Math.abs(chapterPhase-(i+1+.68));
      const weight=progress<storyEnd?1-smooth(.12,.66,distanceFromBeat):0;
      const halo=nodeRings[i];
      (halo.material as THREE.MeshBasicMaterial).opacity=.025+weight*.2;
      halo.scale.setScalar(1+weight*.018);
    }
    for(let i=0;i<signalDots.length;i++){
      const q=signalDots[i];
      const pulseTravel=reduceMotion?.5:(seconds*q.speed+q.offset)%1;
      const along=q.reverse?1-pulseTravel:pulseTravel;
      q.curve.getPoint(along,scratchSignal);
      const k=i*3;
      signalPositions[k]=scratchSignal.x;
      signalPositions[k+1]=scratchSignal.y+.08;
      signalPositions[k+2]=scratchSignal.z;
    }
    (signalsGeometry.attributes.position as THREE.BufferAttribute).needsUpdate=true;
    renderer.render(scene,camera);
  }
  function resize(){
    if(disposed)return;
    const w=Math.max(1,host.clientWidth),h=Math.max(1,host.clientHeight);
    camera.aspect=w/h;camera.fov=w<740?51:38;camera.updateProjectionMatrix();
    marks=chapterTargets.map(makeMark);
    renderer.setPixelRatio(Math.min(devicePixelRatio,w<740?1:1.25));
    renderer.setSize(w,h,false);
  }
  const ro=new ResizeObserver(resize);ro.observe(host);resize();
  return {update,resize,dispose(){
    disposed=true;ro.disconnect();
    const geometries=new Set<THREE.BufferGeometry>();
    const materials=new Set<THREE.Material>();
    scene.traverse(o=>{if(o instanceof THREE.Mesh || o instanceof THREE.Line || o instanceof THREE.Points){
      geometries.add(o.geometry);
      const mats=Array.isArray(o.material)?o.material:[o.material];
      for(const mat of mats)materials.add(mat);
    }});
    for(const geo of geometries)geo.dispose();
    for(const mat of materials)mat.dispose();
    sprite.dispose();renderer.dispose();renderer.domElement.remove();
  }};
}
