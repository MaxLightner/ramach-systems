import '@fontsource-variable/vazirmatn';
import '@fontsource-variable/manrope';
import './styles.css';
import '../ui/finish.css';

// Public UI demonstration only; not the authenticated WordPress plugin and no real data.
type Viewer='manager'|'owner';
type Filter='all'|'report'|'followup';
type Event={id:number;date:string;iso:string;type:string;stage:string;title:string;description:string;author:string;report:boolean;followup:boolean;media:string};
const events:Event[]=[
 {id:6,date:'۲۳ مهر ۱۴۰۵',iso:'2026-10-15',type:'اجرای کار',stage:'اسکلت',title:'پایان اجرای سقف طبقه اول',description:'پایان بتن‌ریزی سقف پس از کنترل آرماتورها و تأیید مرحله. ساختار گزارش رسمی در این مثال قابل مشاهده است.',author:'سرپرست کارگاه',report:true,followup:false,media:'گزارش کنترل کیفیت (نمونه)'},
 {id:5,date:'۲۱ مهر ۱۴۰۵',iso:'2026-10-13',type:'تصمیم',stage:'اسکلت',title:'تصمیم درباره مسیر تأسیسات',description:'مسیر پیشنهادی کانال و هماهنگی آن با پلان معماری برای بررسی بعدی ثبت شد.',author:'مهندس پروژه',report:false,followup:true,media:'نقشه اصلاحی (نمونه)'},
 {id:4,date:'۱۹ مهر ۱۴۰۵',iso:'2026-10-11',type:'بازدید',stage:'اسکلت',title:'بازدید مهندس ناظر',description:'بازدید دوره‌ای انجام شد و نتیجه برای کارفرما به‌صورت گزارش رسمی ثبت شد.',author:'مهندس ناظر',report:true,followup:false,media:'چک‌لیست بازدید (نمونه)'},
 {id:3,date:'۱۷ مهر ۱۴۰۵',iso:'2026-10-09',type:'تأمین مصالح',stage:'اسکلت',title:'پیگیری تأمین مصالح',description:'یک پیگیری داخلی و غیررسمی برای هماهنگی سفارش مصالح، که برای کارفرما نمایش داده نمی‌شود.',author:'مجری پروژه',report:false,followup:true,media:'یادداشت سفارش (نمونه)'},
 {id:2,date:'۱۲ مهر ۱۴۰۵',iso:'2026-10-04',type:'اجرای کار',stage:'فنداسیون',title:'پایان مرحله فنداسیون',description:'اتمام فنداسیون و ثبت گزارش رسمی و مدارک کنترل کیفیت در این پروژه فرضی.',author:'مجری پروژه',report:true,followup:false,media:'صورت‌جلسه مرحله (نمونه)'},
 {id:1,date:'۰۴ مهر ۱۴۰۵',iso:'2026-09-26',type:'اجرای کار',stage:'فنداسیون',title:'شروع عملیات فنداسیون',description:'رویداد آغاز مرحله همراه با تاریخ و مسئول ثبت‌کننده در تایم‌لاین ثبت می‌شود.',author:'سرپرست کارگاه',report:true,followup:false,media:'ثبت آغاز مرحله (نمونه)'}
];
let viewer:Viewer='manager';
let filter:Filter='all';
let expanded=6;
const root=document.querySelector<HTMLDivElement>('#timeline-app');
if(!root)throw new Error('Timeline root is missing');
const eligible=(e:Event)=>(viewer==='manager'||e.report)&&(filter==='all'||(filter==='report'&&e.report)||(filter==='followup'&&e.followup));
const eventCard=(e:Event)=>{
 const open=expanded===e.id;
 return '<article class="timeline-event">'+
 '<span class="timeline-event-dot" aria-hidden="true"></span>'+
 '<div class="timeline-event-panel"><button class="timeline-event-toggle" type="button" data-event="'+e.id+'" aria-expanded="'+open+'" aria-controls="timeline-detail-'+e.id+'">'+
 '<span class="timeline-event-identity"><time datetime="'+e.iso+'">'+e.date+'</time><span>'+e.type+'</span></span>'+
 '<strong>'+e.title+'</strong>'+
 '<span class="timeline-event-tags"><span>'+e.stage+'</span>'+(e.report?'<span class="is-official">گزارش رسمی</span>':'')+(e.followup?'<span class="is-followup">پیگیری باز</span>':'')+'</span>'+
 '<span class="timeline-open-label">'+(open?'بستن جزئیات':'مشاهده جزئیات')+' <i aria-hidden="true">'+(open?'−':'+')+'</i></span></button>'+
 '<div class="timeline-event-details" id="timeline-detail-'+e.id+'"'+(open?'':' hidden')+'><p>'+e.description+'</p><div><span>ثبت‌کننده: '+e.author+'</span><span>پیوست: '+e.media+'</span></div></div></div></article>';
};
function render(){
 const visible=events.filter(eligible);
 const cards=visible.length?visible.map(eventCard).join(''):'<p class="timeline-empty">در این نما رویدادی وجود ندارد. فیلتر یا نقش را تغییر دهید.</p>';
 root!.innerHTML=`
 <div class="timeline-shell">
  <a class="timeline-skip" href="#timeline-main">رفتن به محتوای اصلی</a>
  <header class="timeline-header"><a href="./catalog.html?product=websites#timeline-plugin">بازگشت به خدمات طراحی سایت <span aria-hidden="true">↗</span></a><a class="timeline-brand" href="./index.html" dir="ltr">RAMACH SYSTEMS</a></header>
  <main class="timeline-main" id="timeline-main">
   <div class="timeline-kicker" dir="ltr">MOJARRAD CORE / PROJECT TIMELINE</div>
   <div class="timeline-hero"><div><h1>تایم‌لاین پروژه ساختمانی</h1><p>مراحل اجرا، گزارش‌های رسمی و تصمیم‌ها در یک تاریخچه منظم؛ با نمای متفاوت برای مدیر و کارفرما.</p></div><span class="timeline-demo-badge">دموی تعاملی / داده فرضی</span></div>
   <div class="timeline-notice" role="note"><b>این نسخه فقط نمایش عمومی است.</b> رویدادها ساختگی‌اند و هیچ اطلاعاتی ذخیره یا ارسال نمی‌شود. نسخه وردپرسی اصلی برای هر پروژه احراز هویت و کنترل دسترسی دارد.</div>
   <div class="timeline-board">
    <div class="timeline-board-top">
      <div><span class="timeline-project-code" dir="ltr">PROJECT / DEMO 01</span><h2>پروژه نمونه مسکونی</h2><p>نمای فرضی یک پروژه در حال ساخت</p></div>
      <div class="timeline-role" role="group" aria-label="نقش نمایشی"><span>نمایش به‌عنوان</span><button data-role="manager" aria-pressed="${viewer==='manager'}">مدیر پروژه</button><button data-role="owner" aria-pressed="${viewer==='owner'}">کارفرما</button></div>
    </div>
    <div class="timeline-stages" aria-label="مراحل پروژه">
      <div class="is-done"><small>۰۱</small><strong>فنداسیون</strong><span>تکمیل</span></div>
      <div class="is-current"><small>۰۲</small><strong>اسکلت</strong><span>در حال اجرا</span></div>
      <div><small>۰۳</small><strong>تأسیسات</strong><span>در برنامه</span></div>
      <div><small>۰۴</small><strong>نازک‌کاری</strong><span>در برنامه</span></div>
    </div>
    <div class="timeline-filter-bar">
      <div class="timeline-filters" role="group" aria-label="فیلتر تایم‌لاین"><button data-filter="all" aria-pressed="${filter==='all'}">همه رویدادها</button><button data-filter="report" aria-pressed="${filter==='report'}">گزارش رسمی</button><button data-filter="followup" aria-pressed="${filter==='followup'}">پیگیری باز</button></div>
      <span class="timeline-count">${visible.length.toLocaleString('fa-IR')} رویداد نمایشی</span>
    </div>
    <div class="timeline-feed">${cards}</div>
    <p class="timeline-board-note">در حالت «کارفرما» فقط گزارش رسمی نمایش داده می‌شود. محدودیت واقعی در پلاگین وردپرس سمت سرور اعمال می‌شود؛ این دمو فقط رفتار رابط را نمایش می‌دهد.</p>
   </div>
   <section class="timeline-value"><div><span class="timeline-kicker">FROM WEBSITE TO WORKSPACE</span><h2>وب‌سایت می‌تواند ابزار اداره پروژه هم باشد.</h2></div><p>تایم‌لاین فقط یک جلوه اسکرول نیست؛ زمان‌بندی، گزارش، تصمیم‌ها و پیگیری‌ها را منظم می‌کند. پلاگین Mojarrad Core این منطق را در وردپرس با کنترل دسترسی و پیوست‌های خصوصی پیاده‌سازی کرده است.</p><a href="./catalog.html?product=websites">خدمات طراحی سایت تخصصی <span aria-hidden="true">↗</span></a></section>
  </main>
  <footer class="timeline-footer"><span dir="ltr">© 2026 RAMACH SYSTEMS</span><a href="./index.html">صفحه اصلی</a></footer>
 </div>`;
 root!.querySelectorAll<HTMLButtonElement>('[data-role]').forEach(b=>b.addEventListener('click',()=>{viewer=b.dataset.role as Viewer;render();}));
 root!.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter as Filter;render();}));
 root!.querySelectorAll<HTMLButtonElement>('[data-event]').forEach(b=>b.addEventListener('click',()=>{
   const id=Number(b.dataset.event);expanded=expanded===id?0:id;render();
   root!.querySelector<HTMLButtonElement>('[data-event="'+id+'"]')?.focus({preventScroll:true});
 }));
}
render();
