import * as T from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createBoard } from './board';
import { ecosystem } from '../config/ecosystem';

type Options={low:boolean;paused:boolean;onSelect:(index:number)=>void};
export function createEcosystem(container:HTMLElement,options:Options){
 const renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
 renderer.setClearColor('#111714',0);renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;
 renderer.shadowMap.enabled=!options.low;renderer.shadowMap.type=T.PCFSoftShadowMap;
 container.appendChild(renderer.domElement);
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(38,1,.1,180);
 const overview=new T.Vector3(22,27,29),destination=overview.clone(),desiredTarget=new T.Vector3();camera.position.copy(overview);
 const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.dampingFactor=.06;controls.enablePan=false;controls.enableZoom=false;controls.minPolarAngle=.3;controls.maxPolarAngle=1.05;controls.rotateSpeed=.45;
 renderer.domElement.style.touchAction='pan-y';
 const environment=new RoomEnvironment(),pmrem=new T.PMREMGenerator(renderer),env=pmrem.fromScene(environment,.03);scene.environment=env.texture;scene.environmentIntensity=.65;environment.dispose();pmrem.dispose();
 scene.add(new T.HemisphereLight('#dce5d2','#12221e',2));
 const sun=new T.DirectionalLight('#ffe0ae',3.5);sun.position.set(-12,25,10);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-27,right:27,top:24,bottom:-24,far:75});sun.shadow.normalBias=.03;scene.add(sun);
 const fill=new T.DirectionalLight('#9bc5b7',2);fill.position.set(15,10,-12);scene.add(fill);
 const board=createBoard();scene.add(board.group);
 const floor=new T.Mesh(new T.PlaneGeometry(200,200),new T.ShadowMaterial({color:'#000000',opacity:.25}));floor.rotation.x=-Math.PI/2;floor.position.y=-.55;floor.receiveShadow=true;scene.add(floor);
 const labels=Array.from(document.querySelectorAll<HTMLButtonElement>('.scene-label'));
 const labelPositions=ecosystem.map(z=>new T.Vector3(z.position[0],1.3,z.position[2]+2.2));const projected=new T.Vector3(),raycaster=new T.Raycaster(),pointer=new T.Vector2();
 let low=options.low,paused=options.paused,active=-1,visible=true,disposed=false,transitioning=true,userMoved=false,lastFrame=0,simTime=0,overviewScale=1,downX=0,downY=0;
 renderer.domElement.addEventListener('pointerdown',e=>{downX=e.clientX;downY=e.clientY;});
 renderer.domElement.addEventListener('pointerup',e=>{if(Math.hypot(e.clientX-downX,e.clientY-downY)>6)return;const r=container.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects(board.modules)[0];if(hit)options.onSelect(hit.object.userData.index);});
 controls.addEventListener('start',()=>{transitioning=false;userMoved=true;});
 function resize(){const w=container.clientWidth,h=container.clientHeight;if(!w||!h)return;camera.aspect=w/h;camera.updateProjectionMatrix();overviewScale=Math.max(1,1.42/camera.aspect);renderer.setPixelRatio(Math.min(devicePixelRatio,low?1.25:1.8));renderer.setSize(w,h);if(active===-1&&!userMoved){destination.copy(overview).multiplyScalar(overviewScale);transitioning=true;}}
 const observer=new ResizeObserver(resize);observer.observe(container);resize();
 const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;},{rootMargin:'100px'});intersection.observe(container);
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();container.closest('.experience')?.classList.remove('ready');document.querySelector('.scene-loader')!.textContent='برای بارگذاری دوبارهٔ نمای سه‌بعدی، صفحه را تازه کنید.';visible=false;});
 function frame(time:number){if(disposed)return;requestAnimationFrame(frame);if(time-lastFrame<(low?32:16))return;const dt=Math.min((time-lastFrame)/1000,.05);lastFrame=time;if(!visible||document.hidden)return;
  if(!paused){simTime+=dt;board.coreGlow.scale.setScalar(1+Math.sin(simTime*1.1)*.006);board.pulses.forEach((packets,i)=>packets.forEach((p,j)=>p.position.copy(board.curves[i].getPoint((simTime*.07+j/3)%1))));}
  if(transitioning){const ease=1-Math.exp(-dt*4);camera.position.lerp(destination,ease);controls.target.lerp(desiredTarget,ease);if(camera.position.distanceTo(destination)<.02)transitioning=false;}
  else if(!paused&&!userMoved&&active===-1)camera.position.x=destination.x+Math.sin(simTime*.12)*.65;
  controls.update();labelPositions.forEach((p,i)=>{projected.copy(p).project(camera);const x=(projected.x*.5+.5)*container.clientWidth,y=(-projected.y*.5+.5)*container.clientHeight;labels[i].style.transform=`translate(${x}px,${y}px) translate(-50%,-50%)`;labels[i].style.visibility=x<35||x>container.clientWidth-35||y<45||y>container.clientHeight-55||projected.z>1?'hidden':'visible';});renderer.render(scene,camera);
 }
 requestAnimationFrame(frame);
 return {
  focus(index:number){active=index;userMoved=false;transitioning=true;if(index<0){destination.copy(overview).multiplyScalar(overviewScale);desiredTarget.set(0,0,0);}else{const p=ecosystem[index].position;desiredTarget.set(p[0]*.65,0,p[2]*.65);destination.copy(desiredTarget).add(new T.Vector3(15,22,24).multiplyScalar(Math.max(1,overviewScale*.65)));}board.indicators.forEach((m,i)=>{m.scale.x=index<0||i===index?1:.4;});if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){camera.position.copy(destination);controls.target.copy(desiredTarget);}},
  setPaused(v:boolean){paused=v;},
  setLowQuality(v:boolean){low=v;renderer.shadowMap.enabled=!v;resize();},
  dispose(){disposed=true;observer.disconnect();intersection.disconnect();controls.dispose();env.dispose();scene.traverse(o=>{if(o instanceof T.Mesh||o instanceof T.Line){o.geometry.dispose();const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>{if('map' in m&&(m as T.MeshBasicMaterial).map)(m as T.MeshBasicMaterial).map!.dispose();m.dispose();});}});renderer.dispose();renderer.domElement.remove();},
 };
}
