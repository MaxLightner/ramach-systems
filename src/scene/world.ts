import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

type Node = { group: THREE.Group; color: THREE.Color };
type PathPulse = { curve: THREE.CatmullRomCurve3; orb: THREE.Mesh; halo: THREE.Mesh; offset: number; reverse: boolean };
const ivory = 0xe7e3d8, ink = 0x152d30, gold = 0xb99d72, aqua = 0x79c5b7;
const smooth = (a:number,b:number,v:number) => { const t = Math.max(0,Math.min(1,(v-a)/(b-a))); return t*t*(3-2*t); };

export function createWorld(host:HTMLElement) {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true, powerPreference:'high-performance' });
  renderer.setClearColor(0x03090d,0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.17;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x03090d,0.006);
  const camera = new THREE.PerspectiveCamera(38,1,0.1,170);
  const root = new THREE.Group(); scene.add(root);
  scene.add(new THREE.HemisphereLight(0xb8d4d0,0x071318,1.45));
  const sun = new THREE.DirectionalLight(0xffefd7,2.75);
  sun.position.set(-20,28,22); sun.castShadow=true; sun.shadow.mapSize.set(1536,1536);
  sun.shadow.camera.left=-45;sun.shadow.camera.right=45;sun.shadow.camera.top=45;sun.shadow.camera.bottom=-45;sun.shadow.camera.near=1;sun.shadow.camera.far=100;
  sun.shadow.bias=-0.0002;
  scene.add(sun);
  const rim = new THREE.DirectionalLight(0x63b7bd,1.75);rim.position.set(18,18,-18);scene.add(rim);
  const material = (color:number,metalness=0.3,roughness=0.42,extra:Record<string,unknown>={}) =>
    new THREE.MeshStandardMaterial({color,metalness,roughness,...extra});
  const dark=material(0x1b3235,.67,.3), stone=material(0xd9d5ca,.18,.68), concrete=material(0xa9b1ad,.18,.62);
  const brass=material(gold,.86,.27), glass=material(0x77bac0,.28,.12,{transparent:true,opacity:.24,depthWrite:false,side:THREE.DoubleSide});
  const windowGlow=material(0x74cfb8,.33,.24,{emissive:0x398b7c,emissiveIntensity:.8});
  const whiteLight=material(0xe7fff4,.3,.23,{emissive:0x8be7ce,emissiveIntensity:2.1});
  const muted=material(0x476466,.44,.4);
  function put(parent:THREE.Object3D, geo:THREE.BufferGeometry, mat:THREE.Material, x=0,y=0,z=0) {
    const mesh = new THREE.Mesh(geo,mat); mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
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
  const platform=(x:number,z:number,r=5.1):Node=>{
    const group=new THREE.Group();group.position.set(x,0,z);root.add(group);
    cyl(group,r,1.05,0,-1.33,0,dark,80);
    cyl(group,r+.1,.16,0,-.72,0,brass,80);
    cyl(group,r-.08,.14,0,-.60,0,stone,80);
    ring(group,r-.30,.035,-.51,windowGlow);
    for(let n=0;n<26;n++){const a=n/26*Math.PI*2;
      box(group,.28,.06,.045,Math.cos(a)*(r-.6),-.48,Math.sin(a)*(r-.6),brass,.008).rotation.y=-a;
    }
    return {group,color:new THREE.Color(aqua)};
  };
  // Widely separated sites: each zone reads as an independent architectural vignette.
  const nodePositions = [
    [-24,-14], [24,-14], [24,18], [0,-35], [-24,18]
  ] as const;
  const worlds = nodePositions.map(([x,z],i)=>platform(x,z,[5.25,5.15,4.9,4.85,5.0][i]));
  const center=platform(0,0,4.35).group;
  // RAMACH intelligence core: a quiet sculptural object, not a computer processor.
  cyl(center,2.7,.16,0,.05,0,brass);
  cyl(center,2.4,.15,0,.17,0,dark);
  const core=put(center,new THREE.IcosahedronGeometry(1.74,1),material(0x668e87,.64,.16,{transparent:true,opacity:.92}),0,3.4,0);
  const inner=put(center,new THREE.IcosahedronGeometry(1.03,1),whiteLight,0,3.4,0);
  const wire=put(center,new THREE.IcosahedronGeometry(1.82,1),new THREE.MeshBasicMaterial({color:0xc6f7df,wireframe:true,transparent:true,opacity:.65}),0,3.4,0);
  const coreRing=new THREE.Group();coreRing.position.y=3.4; center.add(coreRing);
  ring(coreRing,2.58,.025,-.01,brass);ring(coreRing,2.23,.018,.35,windowGlow);
  for(let i=0;i<6;i++){const a=i*Math.PI/3;const start=new THREE.Vector3(Math.cos(a)*2.7,.4,Math.sin(a)*2.7);
    const end=new THREE.Vector3(Math.cos(a)*1.65,2.35,Math.sin(a)*1.65);
    rod(center,start,end,.035,brass);
  }
  const glow=put(center,new THREE.SphereGeometry(3.4,30,16),haloMat,0,3.4,0);
  glow.scale.y=.84;
  // ARCHITECT: open-plan studio with cantilever, drawing surface and glazing.
  {
    const g=worlds[0].group;
    box(g,7.1,.30,5.2,-.1,.05,0,concrete,.055);
    for(const x of [-3.3,3.0])for(const z of [-2.28,2.24])box(g,.10,3.65,.10,x,1.88,z,brass);
    box(g,7.65,.16,5.6,-.1,3.77,0,dark,.06);
    const roof=box(g,3.7,.08,5.62,1.82,3.9,0,stone,.035);roof.rotation.z=-.07;
    for(const z of [-2.27,2.27])box(g,6.8,3.1,.045,-.1,1.9,z,glass);
    for(const x of [-3.29,2.98])box(g,.045,3.1,4.55,x,1.9,0,glass);
    for(let i=0;i<7;i++)box(g,.028,2.94,.05,-3.07+i*.95,1.95,-2.25,brass);
    box(g,2.7,.14,1.3,-.8,1.0,-.05,stone,.07);
    for(const x of [-1.95,.35])for(const z of [-.52,.42])box(g,.06,.96,.06,x,.55,z,dark);
    const monitor=box(g,1.4,.91,.06,-.68,1.70,-.56,dark,.035);monitor.rotation.x=-.12;
    box(g,1.21,.69,.01,-.68,1.73,-.525,windowGlow);
    for(let i=0;i<5;i++)box(g,.72+i*.15,.025,.018,-.68,1.55+i*.10,-.5,whiteLight);
    box(g,1.6,.035,.95,1.26,1.25,.55,glass);
    box(g,.6,.42,.54,1.25,1.47,.55,stone);
    box(g,.25,.69,.35,.83,1.62,.3,dark);
    box(g,.2,.9,.24,1.65,1.72,.45,stone);
    box(g,1.8,.045,.025,1.24,1.27,-.0,brass);
    for(let i=0;i<8;i++)box(g,1.5,.014,.012,1.23,1.28,.1+i*.095,brass);
    // architectural roll drawings and a floorplan tucked under glass
    for(let i=0;i<3;i++){const roll=cyl(g,.09,1.1,-2.12+i*.26,.74,1.6,stone,12);roll.rotation.z=Math.PI/2;}
  }
  // BUILD: exposed slabs, columns, partial glazing, crane and a field technician.
  {
    const g=worlds[1].group;
    const footprint=[[-2.7,-2.15],[2.5,-2.15],[-2.7,2.05],[2.5,2.05]];
    for(let f=0;f<3;f++)box(g,6.4,.23,5.2,-.13,.15+f*1.55,0,concrete,.04);
    for(const [x,z] of footprint)box(g,.25,4.9,.25,x,2.5,z,stone);
    for(let f=1;f<3;f++){
      for(let i=0;i<6;i++){box(g,.08,1.18,.08,-2.6+i*1.02,.85+(f-1)*1.55,-2.08,brass);}
    }
    for(let i=0;i<7;i++)box(g,.05,.9,.065,-2.6+i*.81,4.94,-1.95,brass);
    box(g,2.85,1.38,.1,1.08,.85,2.05,glass);
    // Site gantry crane: visible in silhouette.
    rod(g,new THREE.Vector3(3.1,-.25,-2.55),new THREE.Vector3(3.1,7.55,-2.55),.095,brass);
    rod(g,new THREE.Vector3(.55,7.55,-2.55),new THREE.Vector3(4.15,7.55,-2.55),.12,brass);
    rod(g,new THREE.Vector3(2.95,6.85,-2.55),new THREE.Vector3(.55,7.55,-2.55),.035,brass);
    rod(g,new THREE.Vector3(3.4,6.85,-2.55),new THREE.Vector3(4.15,7.55,-2.55),.035,brass);
    rod(g,new THREE.Vector3(.78,7.50,-2.55),new THREE.Vector3(.78,5.1,-2.55),.015,whiteLight);
    box(g,.43,.38,.36,.78,4.91,-2.55,brass,.04);
    person(g,-3.35,.05,.55,0x9dd1b4,true);
    box(g,1.5,.07,.9,-3.0,.15,1.9,dark);
  }
  // OWNER: glazed observation room and digital project overview.
  {
    const g=worlds[2].group;
    cyl(g,3.05,.12,0,.15,0,dark,64);
    for(let i=0;i<6;i++){const a=i*Math.PI/3;
      const x=Math.cos(a)*3.0,z=Math.sin(a)*3.0;
      box(g,.10,3.1,.10,x,1.78,z,brass);
    }
    cyl(g,3.1,.12,0,3.38,0,stone,64);
    const band=ring(g,3.08,.045,3.32,brass);band.rotation.z=.006;
    for(let i=0;i<6;i++){const a=i*Math.PI/3,b=(i+1)*Math.PI/3;
      const v1=new THREE.Vector3(Math.cos(a)*3,1.78,Math.sin(a)*3),v2=new THREE.Vector3(Math.cos(b)*3,1.78,Math.sin(b)*3);
      const panel=box(g,v1.distanceTo(v2),2.92,.038,(v1.x+v2.x)/2,1.76,(v1.z+v2.z)/2,glass);
      panel.rotation.y=-Math.atan2(v2.z-v1.z,v2.x-v1.x);
    }
    cyl(g,1.55,.11,0,1.05,0,stone);
    cyl(g,1.44,.012,0,1.12,0,windowGlow);
    const project=box(g,1.25,.67,.95,0,1.57,0,stone,.02);
    project.rotation.y=.3;
    for(let f=0;f<3;f++)box(g,1.35,.042,1.02,0,1.32+f*.28,0,brass);
    person(g,1.8,.12,.65,0xe9e3d5,false);
    box(g,1.35,1.45,.04,-1.85,1.96,0,windowGlow,.02).rotation.y=-.15;
    for(let i=0;i<5;i++)box(g,.85,.025,.04,-1.82,1.47+i*.24,.06,whiteLight);
  }
  // DATA: server hall with light matrices and a structural illuminated spine.
  {
    const g=worlds[3].group;
    box(g,7.15,.28,5.1,0,.06,0,dark,.04);
    for(let side of [-1,1])for(let i=0;i<4;i++){
      const x=side*1.65,z=-2+i*1.31;
      box(g,1.16,3.3,1.02,x,1.83,z,dark,.08);
      box(g,.89,2.98,.05,x,1.85,z+.52,muted,.035);
      for(let k=0;k<9;k++)box(g,.56,.045,.052,x,0.58+k*.31,z+.56,k%3===0?whiteLight:brass,.013);
      cyl(g,.045,.03,x-.34,3.22,z+.55,windowGlow,14);
    }
    box(g,.15,4.25,.15,0,2.2,0,brass);
    const ringLight=ring(g,1.27,.04,4.3,windowGlow);
    ringLight.scale.z=.7;
    for(let i=0;i<5;i++)box(g,5.8,.045,.045,0,4.1,-2+i,brass);
  }
  // FINANCE / OPERATIONS: physical information sculpture; no coins or clipart.
  {
    const g=worlds[4].group;
    cyl(g,2.6,.17,0,.14,0,dark);
    for(let i=0;i<7;i++){
      const h=.68+i*.4, x=-2.22+i*.75,z=-.15+Math.sin(i*.65)*.5;
      box(g,.39,h,.48,x,h/2+.28,z,i===6?brass:stone,.035);
      box(g,.42,.065,.53,x,h+.3,z,windowGlow,.014);
    }
    const points=[[-2.25,1.4,.8],[-1.4,1.75,.65],[-.6,2.1,.8],[.2,2.55,.72],[1.13,3.2,.85],[2.13,3.45,1.0]];
    for(let i=0;i<points.length-1;i++)rod(g,new THREE.Vector3(...points[i] as [number,number,number]),new THREE.Vector3(...points[i+1] as [number,number,number]),.05,whiteLight);
    const arc=put(g,new THREE.TorusGeometry(3.1,.055,8,64,Math.PI*1.33),brass,0,2,0);arc.rotation.x=Math.PI/2;arc.rotation.z=.8;
    box(g,4.7,.15,.12,0,4.2,-2.2,dark);
    for(let k=0;k<4;k++)box(g,.12,2.2,.12,-2+k*1.35,3.1,-2.2,brass);
  }
  function person(parent:THREE.Object3D,x:number,y:number,z:number,tint:number,hardhat:boolean){
    const human=new THREE.Group();human.position.set(x,y,z);parent.add(human);
    const cloth=material(tint,.13,.64);
    cyl(human,.22,.9,0,1.25,0,cloth,12);
    const head=put(human,new THREE.SphereGeometry(.20,16,12),stone,0,1.93,0);head.castShadow=true;
    for(const xx of [-.13,.13])rod(human,new THREE.Vector3(xx,.8,0),new THREE.Vector3(xx,.2,.07),.085,dark);
    for(const xx of [-.31,.31])rod(human,new THREE.Vector3(xx*.72,1.6,0),new THREE.Vector3(xx,1.03,.08),.062,cloth);
    if(hardhat){const hat=cyl(human,.3,.1,0,2.12,0,brass,18);hat.scale.z=.9;}
  }
  // Bi-directional luminous transfer: warm packets leave the hub, cool packets return.
  const pulses:PathPulse[]=[];
  const routeTrack = new THREE.MeshBasicMaterial({color:0x42796f,transparent:true,opacity:.72});
  const routeFilament = new THREE.MeshBasicMaterial({color:0xb3ebdb,transparent:true,opacity:.85,toneMapped:false});
  const sendMat = new THREE.MeshBasicMaterial({color:0xffdca4,toneMapped:false});
  const returnMat = new THREE.MeshBasicMaterial({color:0x94f4e3,toneMapped:false});
  const sendHalo = new THREE.MeshBasicMaterial({color:0xffd39b,transparent:true,opacity:.17,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false});
  const returnHalo = new THREE.MeshBasicMaterial({color:0x69e6d1,transparent:true,opacity:.18,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false});
  const destinations=worlds.map(n=>n.group.position.clone());
  for(let i=0;i<destinations.length;i++){
    const p=destinations[i],dir=p.clone().normalize();
    const start=dir.clone().multiplyScalar(4.15);start.y=.45;
    const end=p.clone().addScaledVector(dir,-5.2);end.y=.55;
    const length=start.distanceTo(end);
    const curve=new THREE.CatmullRomCurve3([
      start,
      start.clone().lerp(end,.30).add(new THREE.Vector3(0,1.25+length*.023,0)),
      start.clone().lerp(end,.71).add(new THREE.Vector3(0,.95+length*.025,0)),
      end
    ]);
    const spine=put(root,new THREE.TubeGeometry(curve,100,.075,8,false),routeTrack);
    spine.castShadow=false;spine.receiveShadow=false;
    const filament=put(root,new THREE.TubeGeometry(curve,100,.022,6,false),routeFilament);
    filament.castShadow=false;filament.receiveShadow=false;
    for(let j=0;j<4;j++){
      const reverse=j>=2;
      const orb=put(root,new THREE.SphereGeometry(.145,12,10),reverse?returnMat:sendMat);
      const halo=put(root,new THREE.SphereGeometry(.37,12,9),reverse?returnHalo:sendHalo);
      pulses.push({curve,orb,halo,offset:((j%2)*.49+i*.137)%1,reverse});
    }
  }
  const guides=new THREE.Group();root.add(guides);
  ring(guides,25,.015,-2.32,new THREE.MeshBasicMaterial({color:0x476568,transparent:true,opacity:.35}));
  ring(guides,31,.013,-2.32,new THREE.MeshBasicMaterial({color:0x2a5151,transparent:true,opacity:.25}));
  // 'side' is camera-relative framing: positive puts the subject LEFT, negative RIGHT.
  // This opposes the flat HTML captions at every narrative stop.
  const views=[
    {pos:[57,55,90],look:[0,1,0],side:13},
    {pos:[-43,21,5],look:[-24,1,-14],side:-8},
    {pos:[44,21,6],look:[24,1,-14],side:8},
    {pos:[45,21,44],look:[24,1,18],side:-8},
    {pos:[-3,22,-67],look:[0,1,-35],side:8},
    {pos:[-46,20,45],look:[-24,1,18],side:-8},
    {pos:[58,56,87],look:[0,1,0],side:13},
  ];
  let disposed=false;
  function update(progress:number,seconds:number){
    if(disposed)return;
    const p=Math.max(0,Math.min(views.length-1,progress*views.length-.5));
    const i=Math.floor(p), t=smooth(0,1,p-i),from=views[i],to=views[Math.min(i+1,views.length-1)];
    const xyz=(a:number[],b:number[])=>new THREE.Vector3(a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t);
    camera.position.copy(xyz(from.pos,to.pos));
    const center=xyz(from.look,to.look);
    const screenRight=center.clone().sub(camera.position).normalize().cross(new THREE.Vector3(0,1,0)).normalize();
    const framing=(from.side+(to.side-from.side)*t)*(innerWidth<740?.25:1);
    camera.lookAt(center.addScaledVector(screenRight,framing));
    if(!reduceMotion){
      core.rotation.y=seconds*.09;wire.rotation.y=-seconds*.08;inner.rotation.y=-seconds*.05;
      coreRing.rotation.z=Math.sin(seconds*.45)*.07;
      glow.scale.setScalar(1+Math.sin(seconds*.64)*.045);
      for(const q of pulses){
        const travel=(seconds*.12+q.offset)%1;
        q.orb.position.copy(q.curve.getPoint(q.reverse?1-travel:travel));
        q.halo.position.copy(q.orb.position);
      }
    }
    renderer.render(scene,camera);
  }
  function resize(){
    if(disposed)return;
    const w=Math.max(1,host.clientWidth),h=Math.max(1,host.clientHeight);
    camera.aspect=w/h;camera.fov=w<740?51:38;camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(devicePixelRatio,w<740?1.15:1.65));
    renderer.setSize(w,h,false);
  }
  const ro=new ResizeObserver(resize);ro.observe(host);resize();
  return {update,resize,dispose(){
    disposed=true;ro.disconnect();
    scene.traverse(o=>{if(o instanceof THREE.Mesh || o instanceof THREE.Line){
      o.geometry.dispose();
      const mats=Array.isArray(o.material)?o.material:[o.material];
      for(const mat of mats)mat.dispose();
    }});
    renderer.dispose();renderer.domElement.remove();
  }};
}
