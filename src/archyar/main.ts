import '@fontsource-variable/vazirmatn';
import '@fontsource-variable/manrope';
import './styles.css';
import {Viewer3D} from './scene';
import {parsePose,parseProject,UUID} from './project';
import type {ArchProject,ArchObject} from './project';

const app=document.querySelector<HTMLDivElement>('#archyar-app');
if(!app)throw Error('Viewer root unavailable');
app.innerHTML=`
<header class="ax-top"><a class="ax-brand" href="./"><span class="ax-logo">A</span><span><b>ARCHYAR</b><small>RAMACH SYSTEMS / 3D PROJECT VIEWER</small></span></a><span class="ax-pill" id="connection-state">بدون اتصال زنده</span></header>
<main class="ax-layout">
<section class="ax-panel" aria-label="مدیریت نمایشگر">
 <span class="ax-kicker">ARCHYAR / SHARED SPACE</span>
 <h1>مدل مشترک.<br><em>دید مشترک.</em></h1>
 <p class="ax-intro">پیش‌نمایش سه‌بعدی پروژه بدون ارسال تصویر دوربین. فایل پروژه را باز کنید، یا مدل آزمایشی را ببینید.</p>
 <div class="ax-actions">
  <button id="load-demo" type="button" class="ax-btn ax-primary">نمایش پروژه نمونه</button>
  <label for="file-upload" class="ax-btn ax-outline">باز کردن JSON پروژه</label>
  <input id="file-upload" type="file" accept=".json,application/json" hidden>
 </div>
 <div class="ax-section"><span class="ax-label">پروژه</span><strong id="project-title">پروژه‌ای بارگذاری نشده</strong><span id="project-stats" class="ax-hint">نمایشگر قرارداد داده نسخه ۱</span></div>
 <div class="ax-section"><span class="ax-label">دوربین</span><div class="ax-segment">
 <button id="free-camera" type="button" class="is-active">آزاد</button>
 <button id="follow-camera" type="button" disabled>دنبال‌کردن منبع</button></div><p id="camera-info" class="ax-hint">در حالت آزاد، با ماوس یا لمس زاویه دید را تغییر دهید.</p></div>
 <div class="ax-section"><span class="ax-label">ویرایش مدل</span>
 <label class="ax-field" for="object-picker">انتخاب آبجکت</label><select id="object-picker"><option value="">ابتدا پروژه‌ای بارگذاری کنید</option></select>
 <label class="ax-field" for="object-height">ارتفاع دیوار (متر)</label><input id="object-height" type="number" min="0.3" max="12" step="0.01" disabled>
 <div class="ax-actions"><button id="apply-edit" class="ax-btn ax-outline" type="button" disabled>اعمال در پیش‌نمایش</button><button id="export-json" class="ax-btn ax-outline" type="button" disabled>ذخیره JSON</button></div>
 <p class="ax-hint" id="edit-info">ویرایش بدون اتصال فقط محلی است؛ نشست‌های Editor و Owner پس از تأیید سرور امکان ویرایش خواهند داشت.</p></div>
 <div class="ax-section ax-connect"><span class="ax-label">اتصال زنده</span><p class="ax-hint">نشست‌های واقعی با سرویس جداگانه متصل می‌شوند؛ GitHub Pages سرور زنده نیست.</p>
 <label class="ax-field" for="relay-address">آدرس WebSocket سرویس</label><input id="relay-address" type="url" placeholder="wss://…">
 <label class="ax-field" for="session-id">شناسه نشست</label><input id="session-id" type="text" placeholder="UUID">
 <label class="ax-field" for="session-token">توکن دسترسی</label><input id="session-token" type="password" autocomplete="off" placeholder="توکن نشست">
 <button id="join-session" type="button" class="ax-btn ax-outline">اتصال به نشست</button></div>
</section>
<section class="ax-stage" aria-label="صحنه سه‌بعدی آرچیار">
 <div id="view3d" class="ax-canvas"></div>
 <div class="ax-overlay ax-overlay-top"><span>3D / METRIC REFERENCE</span><span id="model-revision">REV —</span></div>
 <div class="ax-empty" id="empty-state"><span class="ax-empty-logo">A</span><strong>ARCHYAR 3D</strong><p>برای نمایش مدل، فایل JSON آرچیار را باز کنید.</p></div>
 <div class="ax-overlay ax-overlay-bottom"><span>PROJECT FRAME</span><span>X / Z افقی · Y ارتفاع · متر</span></div>
</section>
</main>
<div class="ax-notice" role="status" aria-live="polite" id="notice"></div>`;
const byId=<T extends HTMLElement>(id:string)=>{const e=document.getElementById(id);if(!e)throw Error(id);return e as T};
const viewer=new Viewer3D(byId('view3d'));
const notice=byId('notice');
let current:ArchProject|null=null;
let socket:WebSocket|null=null;
let joined=false;
let sessionId='';
let lastEventSequence=-1;
let connectedRole:'viewer'|'editor'|'owner'|null=null;
const editorInfo=byId('edit-info');
function refreshEditorControls(){
 const obj=current?.objects.find(o=>o.id===picker.value);
 const viewerOnly=connectedRole==='viewer';
 const enabled=obj?.kind==='wall'&&!obj.locked&&!viewerOnly;
 heightInput.disabled=!enabled;applyBtn.disabled=!enabled;
 editorInfo.textContent=viewerOnly
  ?'این نشست فقط مجوز مشاهده دارد؛ امکان ویرایش مدل وجود ندارد.'
  :connectedRole==='editor'||connectedRole==='owner'
  ?'تغییرات پس از تأیید سرور برای تمام بینندگان نشست ارسال می‌شوند.'
  :'بدون اتصال، تغییرات فقط در همین مرورگر اعمال می‌شوند.';
}
function notify(message:string,kind:'ok'|'error'|'info'='info'){
 notice.textContent=message;notice.dataset.kind=kind;
}
const projectName=byId('project-title');
const stats=byId('project-stats');
const revision=byId('model-revision');
const picker=byId<HTMLSelectElement>('object-picker');
const heightInput=byId<HTMLInputElement>('object-height');
const applyBtn=byId<HTMLButtonElement>('apply-edit');
const exportBtn=byId<HTMLButtonElement>('export-json');
const followBtn=byId<HTMLButtonElement>('follow-camera');
const freeBtn=byId<HTMLButtonElement>('free-camera');
const connectionState=byId('connection-state');
function setProject(project:ArchProject){
 current=parseProject(project);
 viewer.setProject(current);
 projectName.textContent=current.name;
 stats.textContent=`${current.floors.length} طبقه · ${current.objects.length} آبجکت`;
 revision.textContent=`REV ${current.revision}`;
 byId('empty-state').hidden=true;
 picker.replaceChildren(new Option('آبجکت را انتخاب کنید',''));
 current.objects.filter(o=>o.kind==='wall').forEach(o=>picker.add(new Option(o.name||'Wall '+o.id.slice(0,6),o.id)));
 exportBtn.disabled=false;
 heightInput.disabled=true;applyBtn.disabled=true;
 refreshEditorControls();
}
byId('load-demo').addEventListener('click',async()=>{
 try{
  const resp=await fetch(`${import.meta.env.BASE_URL}archyar-demo.json`,{cache:'no-store'});
  if(!resp.ok)throw Error('نمونه بارگذاری نشد.');
  setProject(parseProject(await resp.json()));notify('پروژه نمونه نمایش داده شد.','ok');
 }catch(e){notify(String(e),'error')}
});
byId<HTMLInputElement>('file-upload').addEventListener('change',async e=>{
 const file=(e.target as HTMLInputElement).files?.[0];
 if(!file)return;
 if(file.size>10*1024*1024){notify('فایل بزرگ‌تر از ۱۰ مگابایت است.','error');return;}
 try{setProject(parseProject(JSON.parse(await file.text())));notify('مدل با موفقیت بارگذاری شد.','ok')}
 catch(e){notify('خواندن پروژه ناموفق بود: '+String(e),'error')}
 finally{(e.target as HTMLInputElement).value=''}
});
picker.addEventListener('change',()=>{
 const obj=current?.objects.find(o=>o.id===picker.value);
 if(obj?.kind==='wall')heightInput.value=String(obj.parameters.height);
 refreshEditorControls();
});
applyBtn.addEventListener('click',async()=>{
 if(!current)return;
 const height=Number(heightInput.value);
 if(!Number.isFinite(height)||height<.3||height>12){notify('ارتفاع باید بین ۰٫۳ و ۱۲ متر باشد.','error');return;}
 const obj=current.objects.find(o=>o.id===picker.value);
 if(!obj||obj.kind!=='wall'||obj.locked)return;
 // Avoid breaking hosted opening clearances.
 const tallest=current.objects.filter(o=>o.kind==='opening'&&o.hostId===obj.id)
  .reduce((max,o)=>Math.max(max,Number(o.parameters.sill||0)+Number(o.parameters.height||0)),0);
 if(height<tallest){notify('دیوار نمی‌تواند کوتاه‌تر از بازشوهایش باشد.','error');return;}
 const next=structuredClone(current);
 const target=next.objects.find(o=>o.id===obj.id)!;
 target.parameters.height=height;target.revision++;next.revision++;
 if(socket&&socket.readyState===WebSocket.OPEN){
  if(connectedRole!=='editor'&&connectedRole!=='owner'){
   notify('این نشست فقط دسترسی مشاهده دارد.','error');return;
  }
  const serverUrl=byId<HTMLInputElement>('relay-address').value.trim();
  const token=byId<HTMLInputElement>('session-token').value.trim();
  try{
   const server=new URL(serverUrl);
   server.protocol=server.protocol==='wss:'?'https:':'http:';
   server.pathname=server.pathname.replace(/\\/ws\\/?$/,'');
   const endpoint=server.toString().replace(/\\/$/,'')+'/api/sessions/'+sessionId+'/objects';
   applyBtn.disabled=true;
   const res=await fetch(endpoint,{method:'PATCH',headers:{
    'Content-Type':'application/json','Authorization':'Bearer '+token
   },body:JSON.stringify({baseRevision:current.revision,operation:'upsert',object:target})});
   if(!res.ok){
    notify(res.status===409
     ?'نسخه پروژه در سرور تغییر کرده است؛ ابتدا نسخه جدید را دریافت کنید.'
     :'ویرایش در سرور پذیرفته نشد (HTTP '+res.status+').','error');
    return;
   }
   notify('تغییر روی سرور ثبت شد و برای بینندگان ارسال می‌شود.','ok');
  }catch(e){notify('ارتباط ویرایش برقرار نشد: '+String(e),'error')}
  finally{refreshEditorControls()}
  return;
 }
 try{setProject(next);picker.value=obj.id;picker.dispatchEvent(new Event('change'));notify('تغییر در پیش‌نمایش محلی اعمال شد.','ok')}
 catch(e){notify(String(e),'error')}
});
exportBtn.addEventListener('click',()=>{
 if(!current)return;
 const blob=new Blob([JSON.stringify(current,null,2)],{type:'application/json'});
 const url=URL.createObjectURL(blob);
 const link=document.createElement('a');link.href=url;link.download='archyar-project-'+current.projectId+'.json';link.click();
 queueMicrotask(()=>URL.revokeObjectURL(url));
});
function setFollowing(active:boolean){
 viewer.setFollow(active);
 followBtn.classList.toggle('is-active',viewer.isFollowing());
 freeBtn.classList.toggle('is-active',!viewer.isFollowing());
}
freeBtn.addEventListener('click',()=>setFollowing(false));
followBtn.addEventListener('click',()=>setFollowing(true));
function applyRemote(message:unknown){
 if(!message||typeof message!=='object')return;
 const ev=message as Record<string,unknown>;
 const type=typeof ev.eventType==='string'?ev.eventType:ev.type;
 const payload=ev.payload as Record<string,unknown>|undefined;
 if(type==='session.joined'){
  const role=payload?.role;
  if(role==='viewer'||role==='editor'||role==='owner'){
   connectedRole=role;joined=true;
   connectionState.textContent=role==='viewer'?'نشست زنده · مشاهده':'نشست زنده · ویرایش';
   refreshEditorControls();
  }
 }
 else if(type==='project.snapshot'){
  const project=payload?.project??ev.project;
  if(!project)return;
  try{setProject(parseProject(project));notify('مدل نشست دریافت شد.','ok')}
  catch(e){notify('مدل دریافتی ناسازگار است: '+String(e),'error')}
 }
 else if(type==='camera.pose'){
  try{
   const pose=parsePose(payload??ev);
   if(!current||pose.projectId!==current.projectId||pose.sessionId!==sessionId)return;
   viewer.setPose(pose);followBtn.disabled=false;
   byId('camera-info').textContent='منبع: '+pose.source+' · فریم '+pose.sequence;
   // Follow by default when the first valid remote camera pose arrives.
   if(!viewer.isFollowing())setFollowing(true)
  }catch{notify('اطلاعات دوربین دریافتی معتبر نیست.','error')}
 }
 else if((type==='object.upsert'||type==='object.delete')&&current){
  const eventId=Number(ev.sequence);
  if(ev.projectId!==current.projectId||!Number.isSafeInteger(eventId)||eventId<=lastEventSequence)return;
  const next=structuredClone(current);
  if(type==='object.upsert'){
   const obj=payload?.object as ArchObject|undefined;
   if(!obj||obj.floorId===undefined)return;
   const idx=next.objects.findIndex(o=>o.id===obj.id);
   if(idx<0)next.objects.push(obj);else next.objects[idx]=obj;
  }else{
   const id=payload?.objectId;
   if(typeof id!=='string')return;
   next.objects=next.objects.filter(o=>o.id!==id);
  }
  next.revision++;
  const selected=picker.value;
  try{setProject(next);picker.value=selected;picker.dispatchEvent(new Event('change'));lastEventSequence=eventId}
  catch(e){notify('تغییر دریافتی رد شد: '+String(e),'error')}
 }
}
function joinSession(){
 if(socket){socket.onclose=null;socket.close();socket=null;}
 connectedRole=null;refreshEditorControls();
 const raw=byId<HTMLInputElement>('relay-address').value.trim();
 const token=byId<HTMLInputElement>('session-token').value.trim();
 const session=byId<HTMLInputElement>('session-id').value.trim();
 try{
  const uri=new URL(raw);
  if(uri.protocol!=='wss:'&&!(uri.protocol==='ws:'&&['localhost','127.0.0.1'].includes(uri.hostname)))throw Error('اتصال باید امن (WSS) باشد.');
  if(!UUID.test(session)||!token)throw Error('شناسه نشست یا توکن معتبر نیست.');
  sessionId=session;joined=false;lastEventSequence=-1;
  socket=new WebSocket(uri.toString());
  connectionState.textContent='در حال اتصال';
  socket.onopen=()=>{socket?.send(JSON.stringify({type:'session.join',sessionId:session,token,role:'viewer'}));notify('درخواست ورود به نشست ارسال شد.')};
  socket.onmessage=event=>{try{applyRemote(JSON.parse(event.data as string))}catch{notify('پیام ناشناخته از سرویس دریافت شد.','error')}};
  socket.onerror=()=>notify('اتصال به سرویس برقرار نشد.','error');
  socket.onclose=()=>{connectedRole=null;refreshEditorControls();connectionState.textContent='ارتباط قطع شد';followBtn.disabled=true;setFollowing(false)};
  connectionState.textContent='در حال اتصال';
 }catch(e){notify(String(e),'error')}
}
byId('join-session').addEventListener('click',joinSession);
const args=new URLSearchParams(location.search);
if(args.has('session'))byId<HTMLInputElement>('session-id').value=args.get('session')||'';
const defaultRelay=import.meta.env.VITE_ARCHYAR_RELAY_WS as string|undefined;
if(defaultRelay)byId<HTMLInputElement>('relay-address').value=defaultRelay;
if(args.has('token'))byId<HTMLInputElement>('session-token').value=args.get('token')||'';
// Clear access tokens from browser location to reduce accidental disclosure.
if(args.has('token')){
 args.delete('token');
 history.replaceState(null,'',location.pathname+(args.size?'?'+args.toString():'')+location.hash);
}
if(defaultRelay&&args.has('session')&&byId<HTMLInputElement>('session-token').value){
 // Auto-join only a trusted relay configured at build time, never arbitrary URL parameters.
 joinSession();
}
