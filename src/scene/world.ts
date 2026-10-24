import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

type Node = { group: THREE.Group; color: THREE.Color };
type PathPulse = { curve: THREE.CurvePath<THREE.Vector3>; orb: THREE.Mesh; halo: THREE.Mesh; offset: number; reverse: boolean };
const ivory = 0xe7e3d8, ink = 0x152d30, gold = 0xb99d72, aqua = 0x79c5b7;
const smooth = (a:number,b:number,v:number) => { const t = Math.max(0,Math.min(1,(v-a)/(b-a))); return t*t*(3-2*t); };

export function createWorld(host:HTMLElement) {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true, powerPreference:'high-performance' });
  renderer.setClearColor(0x03090d,0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x03090d,0.006);
  const camera = new THREE.PerspectiveCamera(38,1,0.1,170);
  const root = new THREE.Group(); scene.add(root);
  scene.add(new THREE.HemisphereLight(0xb8d4d0,0x071318,.82));
  const sun = new THREE.DirectionalLight(0xffefd7,1.85);
  sun.position.set(-20,28,22); sun.castShadow=true; sun.shadow.mapSize.set(1536,1536);
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
  // A gallery of symbolic, architectural problems; no literal toy buildings or avatars.
  const metal=material(0xa58e73,.88,.26), charcoal=material(0x15242b,.62,.39);
  const smoked=new THREE.MeshPhysicalMaterial({color:0x82a4a6,metalness:.28,roughness:.17,transmission:.2,transparent:true,opacity:.33,depthWrite:false,side:THREE.DoubleSide});
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
  const nodePositions=[[23,-16],[-24,-15],[24,19],[-25,19],[2,-39],[2,40]] as const;
  const worlds=nodePositions.map(([x,z])=>({group:galleryNode(x,z)}));
  const center=new THREE.Group();root.add(center);
  box(center,8.7,.14,8.7,0,-.7,0,charcoal,.04);
  wireRectangle(center,9.2,9.2,-.59,metal);
  for(let i=0;i<4;i++){
    const a=i*Math.PI/2+.25;
    const x=Math.cos(a)*3.1,z=Math.sin(a)*3.1;
    rod(center,new THREE.Vector3(x,-.42,z),new THREE.Vector3(x*.45,2.7,z*.45),.036,metal);
  }
  const core=put(center,new THREE.OctahedronGeometry(1.75,0),material(0x527779,.62,.14,{emissive:0x153c39,emissiveIntensity:.5}),0,3.05,0);
  const inner=put(center,new THREE.OctahedronGeometry(.86,0),whiteLight,0,3.05,0);
  const wire=put(center,new THREE.OctahedronGeometry(2.0,0),new THREE.MeshBasicMaterial({color:0xa4d2c7,wireframe:true,transparent:true,opacity:.54}),0,3.05,0);
  const coreRing=new THREE.Group();coreRing.position.y=3.05;center.add(coreRing);
  ring(coreRing,2.6,.021,0,metal);ring(coreRing,2.3,.019,.15,signal);
  const glow=put(center,new THREE.SphereGeometry(3.6,28,18),new THREE.MeshBasicMaterial({color:0x61cbb6,transparent:true,opacity:.045,depthWrite:false,blending:THREE.AdditiveBlending}),0,3.05,0);
  // 01 — A section of a building. The ghost blueprint is misaligned with the actual frame.
  {
    const g=worlds[0].group;
    for(const x of [-2.8,2.8])for(const z of [-2.1,2.1])rod(g,new THREE.Vector3(x,-.4,z),new THREE.Vector3(x,4,z),.07,metal);
    for(const y of [1.5,4])wireRectangle(g,5.6,4.2,y,stone);
    box(g,3.45,2.7,.07,-1.06,1.0,-2.1,smoked);
    box(g,2.0,2.0,.04,.8,2.2,2.15,ghost);
    box(g,2.0,.035,.025,.8,3.28,2.15,signal);
    const misplaced=box(g,3.45,.025,2.4,-.55,2.9,-1.25,ghost);
    misplaced.rotation.z=.055;
    for(const y of [.9,1.15,1.4])box(g,.04,.04,3.7,2.99,y,0,signal);
  }
  // 02 — Three separated participants and a single floating shared plane.
  {
    const g=worlds[1].group;
    const positions=[[-2.7,-1.55],[2.5,-1.55],[.1,2.4]];
    for(const [x,z] of positions){
      cyl(g,.64,.12,x,-.35,z,metal,38);
      rod(g,new THREE.Vector3(x,.05,z),new THREE.Vector3(x,1.75,z),.037,metal);
      put(g,new THREE.OctahedronGeometry(.34),smoked,x,2.12,z);
      rod(g,new THREE.Vector3(x,2.25,z),new THREE.Vector3(x*.22,3.08,z*.22),.026,signal);
    }
    box(g,4.0,.075,2.35,0,3.35,0,smoked,.015);
    wireRectangle(g,3.8,2.2,3.39,signal);
    for(let i=0;i<3;i++)box(g,.035,.025,1.2,-1.15+i*1.15,3.44,0,metal);
  }
  // 03 — Minimal room outline and its floating AR overlay.
  {
    const g=worlds[2].group;
    for(const x of [-2.8,2.8])for(const z of [-2.25,2.25])
      rod(g,new THREE.Vector3(x,-.42,z),new THREE.Vector3(x,3.4,z),.046,stone);
    wireRectangle(g,5.6,4.5,3.4,stone);
    const transparentWall=box(g,5.5,3.7,.025,0,1.5,-2.23,smoked);
    transparentWall.rotation.y=.06;
    box(g,2.45,2.5,.025,.75,1.13,-2.19,ghost);
    wireRectangle(g,4.25,3.25,1.1,signal);
    for(let i=0;i<3;i++)box(g,.04,2.8,.025,-2.2+i*2.2,1.18,-2.12,signal);
    ring(g,2.0,.018,1.65,signal);
  }
  // 04 — Data synchronization: independent glass layers traversed by a signal.
  {
    const g=worlds[3].group;
    for(let i=0;i<7;i++){
      const x=-2.95+i*.98;
      box(g,.11,3.1,.12,x,1.15,-1.28,charcoal);
      box(g,.065,3.65,3.5,x,1.3,0,i===3?smoked:mutedGlass);
      box(g,.12,.05,3.4,x,3.2,0,metal);
      box(g,.12,.06,2.7,x,.35,0,signal);
    }
    rod(g,new THREE.Vector3(-3.6,2,-.8),new THREE.Vector3(3.6,2,-.8),.048,signal);
    for(let i=0;i<5;i++)put(g,new THREE.OctahedronGeometry(.13),whiteLight,-2.7+i*1.35,2.0,-.8);
  }
  // 05 — Scattered ledgers converge into one readable plane; not coins or cartoons.
  {
    const g=worlds[4].group;
    for(let i=0;i<5;i++){
      const x=-2.8+i*1.4;
      const h=.5+i*.45;
      box(g,1.05,.065,2.3,x,h,0,smoked,.01);
      box(g,.74,.029,.08,x,h+.045,-.64,metal);
      box(g,.58,.029,.08,x,h+.045,-.24,signal);
    }
    wireRectangle(g,6.9,4.25,3.45,metal);
    box(g,6.65,.06,4.05,0,3.42,0,ghost);
    for(let i=0;i<7;i++)box(g,5.75,.018,.02,0,3.49,-1.6+i*.49,signal);
  }
  // 06 — Architecture becomes a responsive digital gallery, shown as a single portal.
  {
    const g=worlds[5].group;
    for(const x of [-3.3,3.3])
      rod(g,new THREE.Vector3(x,-.5,-.55),new THREE.Vector3(x,5.0,-.55),.085,metal);
    for(const y of [-.3,5.0])
      rod(g,new THREE.Vector3(-3.3,y,-.55),new THREE.Vector3(3.3,y,-.55),.085,metal);
    box(g,6.2,4.9,.045,0,2.2,-.57,smoked);
    box(g,3.5,2.3,.15,-.7,1.1,-.43,stone,.025);
    box(g,2.55,.1,.95,-.65,2.1,-.15,metal);
    box(g,2.7,2.2,.032,1.55,2.45,-.32,ghost);
    for(let i=0;i<5;i++)box(g,1.75,.022,.03,1.35,3.2-i*.35,-.26,signal);
  }
  // Engraved 90° routes with short 45° chamfers, not arcs or floating cables.
  // Gold packets depart the hub; cyan packets return, on discrete paired lanes.
  const pulses:PathPulse[]=[];
  const track = new THREE.MeshBasicMaterial({color:0x31504e,transparent:true,opacity:.8,depthWrite:false});
  const filament = new THREE.MeshBasicMaterial({color:0x508b7f,transparent:true,opacity:.52,depthWrite:false,toneMapped:false});
  const outgoing = new THREE.MeshBasicMaterial({color:0xffdda3,toneMapped:false});
  const incoming = new THREE.MeshBasicMaterial({color:0x9effe6,toneMapped:false});
  const warmHalo = new THREE.MeshBasicMaterial({color:0xffcf83,transparent:true,opacity:.28,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false});
  const coolHalo = new THREE.MeshBasicMaterial({color:0x87ffe4,transparent:true,opacity:.3,blending:THREE.AdditiveBlending,depthWrite:false,toneMapped:false});
  // Generate crisp segments; corner bevels preserve the board-routing geometry.
  function beveled(points:THREE.Vector3[],cut:number){
    const out:THREE.Vector3[]=[points[0].clone()];
    for(let i=1;i<points.length-1;i++){
      const p=points[i],prev=points[i-1],next=points[i+1];
      const length1=p.distanceTo(prev),length2=p.distanceTo(next);
      if(length1<.03||length2<.03)continue;
      const step=Math.min(cut,length1*.33,length2*.33);
      out.push(p.clone().lerp(prev,step/length1),p.clone().lerp(next,step/length2));
    }
    out.push(points[points.length-1].clone());
    const route=new THREE.CurvePath<THREE.Vector3>();
    for(let i=0;i<out.length-1;i++)if(out[i].distanceTo(out[i+1])>.02)
      route.add(new THREE.LineCurve3(out[i],out[i+1]));
    return route;
  }
  for(let i=0;i<worlds.length;i++){
    const destination=worlds[i].group.position;
    const direction=destination.clone().normalize();
    for(let lane=0;lane<2;lane++){
      const side=lane===0?-.21:.21;
      const start=new THREE.Vector3(direction.x*4.6+side,.1,direction.z*4.6+side);
      const end=new THREE.Vector3(destination.x-direction.x*5.25+side,.12,destination.z-direction.z*4.75+side);
      const midX=Math.abs(destination.x)>8?destination.x*.52+side:destination.x+side;
      const midZ=destination.z*.67+side;
      const route=beveled([
        start,new THREE.Vector3(midX,.1,start.z),
        new THREE.Vector3(midX,.1,midZ),
        new THREE.Vector3(end.x,.12,midZ),end
      ],.8);
      const spine=put(root,new THREE.TubeGeometry(route,115,.061,6,false),track);
      const shine=put(root,new THREE.TubeGeometry(route,115,.022,6,false),filament);
      spine.castShadow=false;spine.receiveShadow=false;shine.castShadow=false;shine.receiveShadow=false;
      for(let j=0;j<3;j++){
        const reverse=lane===1;
        const orb=put(root,new THREE.SphereGeometry(.19,13,9),reverse?incoming:outgoing);
        const halo=put(root,new THREE.SphereGeometry(.48,12,9),reverse?coolHalo:warmHalo);
        pulses.push({curve:route,orb,halo,offset:(j/3+i*.07)%1,reverse});
      }
    }
  }
  // Camera stages match the eight flat editorial chapters; art stays opposite copy.
  const views=[
    {pos:[59,58,95],look:[0,1,0],side:13},
    {pos:[37,21,-3],look:[23,1,-16],side:-8},
    {pos:[-37,21,0],look:[-24,1,-15],side:8},
    {pos:[38,20,37],look:[24,1,19],side:-8},
    {pos:[-39,22,35],look:[-25,1,19],side:8},
    {pos:[15,24,-58],look:[2,1,-39],side:-8},
    {pos:[-15,22,58],look:[2,1,40],side:8},
    {pos:[26,20,28],look:[0,2,0],side:-8},
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
