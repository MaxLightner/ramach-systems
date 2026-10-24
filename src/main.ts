import '@fontsource-variable/vazirmatn';
import '@fontsource-variable/manrope';
import './styles.css';

type World = ReturnType<typeof import('./scene/world').createWorld>;
const chapters = [
  {
    "k": "00 / RAMACH SYSTEMS",
    "eyebrow": "راماچ چه مسئله‌ای را حل می‌کند؟",
    "title": "ساختمان را افراد مختلف می‌سازند؛ <em>اطلاعاتشان جداست.</em>",
    "body": "<span class='problem-context'>طراح در دفتر است، مجری در کارگاه و مالک در جای دیگر؛ نقشه‌ها و تصمیم‌ها میان آن‌ها پراکنده می‌مانند.</span><span class='solution-context'><strong>راهکار راماچ</strong> نرم‌افزار و فناوری‌هایی می‌سازیم که افراد، مدل‌ها و فرایندهای ساختمان را به هم متصل کنند.</span>",
    "note": "THE CONNECTED BUILT WORLD",
    "align": "right"
  },
  {
    "k": "01 / DESIGN ↔ SITE",
    "eyebrow": "مشکل در کارگاه",
    "title": "نقشه درست است؛ <em>اجرا همیشه مطابق آن نیست.</em>",
    "body": "<span class='problem-context'>اختلاف وقتی رخ می‌دهد که نیروی کار باید خط‌های نقشه را به دیوار و بازشوی واقعی تبدیل کند.</span><span class='solution-context'><strong>راهکار راماچ</strong> آرچیار را برای دیدن و بررسی طرح در مقیاس واقعی در محل پروژه توسعه می‌دهیم.</span>",
    "note": "ARCHITECTURE / REAL WORLD",
    "align": "left"
  },
  {
    "k": "02 / REMOTE COORDINATION",
    "eyebrow": "مشکل در هماهنگی",
    "title": "معمار، مجری و مالک <em>کنار هم نیستند.</em>",
    "body": "<span class='problem-context'>پرسش کارگاه به طراح می‌رسد و تغییرات باید به کارفرما هم نشان داده شوند؛ هرکس در مکانی متفاوت است.</span><span class='solution-context'><strong>راهکار راماچ</strong> زیرساخت مشاهده مشترک مدل و ارتباط موبایل، وب و نرم‌افزار طراحی را توسعه می‌دهیم.</span>",
    "note": "PEOPLE / SHARED MODEL",
    "align": "right"
  },
  {
    "k": "03 / SPATIAL EXPERIENCE",
    "eyebrow": "مشکل پیش از اجرا",
    "title": "تصور فضا، <em>معادل دیدن آن نیست.</em>",
    "body": "<span class='problem-context'>ابعاد کابینت، محل دیوار یا چیدمان مبلمان روی نقشه برای همه قابل درک نیست.</span><span class='solution-context'><strong>راهکار راماچ</strong> با چیدو، کیچیار و آرچیار طرح را در فضای واقعی نشان می‌دهیم تا تصمیم پیش از اجرا آسان‌تر شود.</span>",
    "note": "CHIDO / KITCHYAR / ARCHIYAR",
    "align": "left"
  },
  {
    "k": "04 / DATA BRIDGE",
    "eyebrow": "مشکل میان نرم‌افزارها",
    "title": "مدل نباید <em>بین ابزارها گم شود.</em>",
    "body": "<span class='problem-context'>وقتی یک فایل در Blender تغییر می‌کند، نسخه موبایل یا مرورگر ممکن است اطلاعات قبلی را نشان دهد.</span><span class='solution-context'><strong>راهکار راماچ</strong> ارتباط و همگام‌سازی مدل‌ها میان محیط طراحی، اپلیکیشن و وب را در دست توسعه داریم.</span>",
    "note": "BLENDER / WEB / MOBILE",
    "align": "right"
  },
  {
    "k": "05 / OPERATIONS",
    "eyebrow": "مشکل در مدیریت پروژه",
    "title": "هزینه‌های پراکنده، <em>کنترل را دشوار می‌کنند.</em>",
    "body": "<span class='problem-context'>حساب افراد، پرداخت‌ها و تصمیم‌های اجرایی در دفترها و پیام‌های جدا ثبت می‌شوند.</span><span class='solution-context'><strong>راهکار راماچ</strong> ابزارهای ثبت و مدیریت مالی و اجرایی را توسعه می‌دهیم تا پیگیری پروژه روشن‌تر شود.</span>",
    "note": "FINANCE / PROJECT PROCESS",
    "align": "left"
  },
  {
    "k": "06 / ARCHITECTURAL WEB",
    "eyebrow": "مشکل در معرفی پروژه",
    "title": "ساختمان خوب با <em>یک گالری معمولی</em> شناخته نمی‌شود.",
    "body": "<span class='problem-context'>سایت‌های آماده اغلب هویت دفتر معماری، کیفیت فضا و داستان طراحی را منتقل نمی‌کنند.</span><span class='solution-context'><strong>راهکار راماچ</strong> سایت‌های اختصاصی معماری با روایت بصری، انیمیشن هدفمند و تجربه سه‌بعدی طراحی می‌کنیم.</span>",
    "note": "WEB EXPERIENCE / ARCHITECTURE",
    "align": "right"
  },
  {
    "k": "07 / NEXT INTELLIGENCE",
    "eyebrow": "مسیر توسعه آینده",
    "title": "داده ساختمان باید <em>به تصمیم هوشمند</em> برسد.",
    "body": "<span class='problem-context'>اطلاعات نقشه، اجرا و مدیریت زیاد است؛ تحلیل و تصمیم‌گیری هنوز زمان‌بر است.</span><span class='solution-context'><strong>مسیر آینده راماچ</strong> طراحی هوشمند، تحلیل مبتنی بر AI و اتوماسیون ساختمان حوزه‌های توسعه آینده‌اند؛ نه امکانات آماده امروز.</span>",
    "note": "AI / AUTOMATION / FUTURE",
    "align": "left"
  }
] as const;
const mark='<svg viewBox="0 0 380 310" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path class="mark-line line-a" d="M59 252V56H206C286 56 317 147 253 183L208 203H133"/><path class="mark-line line-b" d="M132 251V117H207C246 117 251 170 205 171H133"/><path class="mark-line line-c" d="M221 196L314 252"/><path class="mark-line line-d" d="M59 271H314"/><circle class="mark-dot" cx="314" cy="252" r="5"/><circle class="mark-dot" cx="59" cy="56" r="5"/></svg>';
const app=document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = `
<a class="skip-link" href="#journey">رفتن به محتوای اصلی</a>
<header class="site-header">
  <a class="brand" href="#start" dir="ltr" aria-label="RAMACH SYSTEMS — ابتدا"><span class="brand-symbol">R<span class="brand-slash">/</span></span><span class="brand-words">RAMACH<small>SYSTEMS</small></span></a>
  <nav aria-label="ناوبری اصلی" class="site-nav" id="nav">
    <a href="#journey">اکوسیستم</a><a href="#journey">تخصص‌ها</a><a href="#contact">همکاری</a>
  </nav>
  <span class="header-status" dir="ltr"><i></i> BUILT WORLD / DIGITAL FUTURE</span>
  <button type="button" class="menu-toggle" aria-label="باز کردن منو" aria-controls="nav" aria-expanded="false"><span></span><span></span></button>
</header>
<main>
  <section class="opening" id="start" aria-label="معرفی راماچ سیستم">
    <div class="opening-center"><div class="opening-wordmark">
      <svg class="signature-logo" viewBox="0 0 1080 300" role="img" aria-label="RAMACH SYSTEMS" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="signature-ink" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#c3ae8b"/><stop offset=".45" stop-color="#eee7d8"/><stop offset="1" stop-color="#9fb5ac"/></linearGradient></defs>
        <g class="signature-strokes" fill="none" stroke="url(#signature-ink)" stroke-width="4.1" stroke-linejoin="round" stroke-linecap="round">
          <path style="--order:0" d="M44 237 V49 H116 C174 49 181 132 119 143 H44 M116 143 L190 237"/>
          <path style="--order:1" d="M212 237 L276 49 L340 237 M234 173 H319"/>
          <path style="--order:2" d="M376 237 V49 L449 162 L521 49 V237"/>
          <path style="--order:3" d="M557 237 L622 49 L687 237 M579 173 H665"/>
          <path style="--order:4" d="M840 78 C793 21 727 56 725 140 C722 226 802 264 844 207"/>
          <path style="--order:5" d="M884 49 V237 M884 145 H1019 M1019 49 V237"/>
        </g>
        <path class="signature-accent" d="M44 260 H1019" fill="none" stroke="#aa916d" stroke-width=".8"/>
      </svg>
      <span class="opening-systems" dir="ltr">SYSTEMS</span>
    </div></div>
  </section>
  <section id="journey" class="journey" aria-label="سفر تعاملی در اکوسیستم راماچ">
    <div class="stage">
      <div id="world" class="world" aria-hidden="true"></div>
      <div class="world-shade" aria-hidden="true"></div>
      <div class="stage-frame" aria-hidden="true"><span class="corner corner-a"></span><span class="corner corner-b"></span><span class="corner corner-c"></span><span class="corner corner-d"></span></div>
      <div class="stage-top" dir="ltr"><span>R / SYSTEMS</span><span class="stage-live"><i></i> CONNECTED BUILT WORLD</span></div>
      <div class="stage-copy" aria-live="off">
        ${chapters.map((c,i)=>`<article class="chapter ${i===0?'is-active':''}" data-chapter="${i}" data-align="${c.align}">
          <div class="chapter-count" dir="ltr">${c.k}</div>
          <span class="chapter-rule"></span>
          <p class="chapter-eyebrow">${c.eyebrow}</p>
          <h1>${c.title}</h1>
          <p class="chapter-body">${c.body}</p>
          <span class="chapter-note" dir="ltr">${c.note}</span>
        </article>`).join('')}
      </div>
      <div class="stage-bottom"><span class="stage-instruction">↓ اسکرول برای حرکت · ↑ برای بازگشت</span><span class="stage-number" dir="ltr"><b id="stage-index">01</b> / 08</span></div>
      <div class="chapter-progress" aria-hidden="true"><span id="progress-fill"></span></div>
      <div class="webgl-message" id="webgl-message" hidden>نمای سه‌بعدی در این مرورگر بارگذاری نشد؛ محتوای معرفی شرکت همچنان در دسترس است.</div>
    </div>
  </section>
  <section class="ending" id="contact">
    <div class="ending-detail" dir="ltr"><span>RAMACH SYSTEMS</span><span>LET'S CONNECT WHAT MATTERS</span></div>
    <div class="ending-inner">
      <p class="ending-label">آغاز یک همکاری</p>
      <h2>آینده را <em>با هم</em><br>می‌سازیم.</h2>
      <p>برای توسعه یک نرم‌افزار، طراحی تجربه دیجیتال یا ساخت راهکاری تازه برای صنعت ساختمان، گفت‌وگو را شروع کنیم.</p>
      <a class="ending-cta" href="https://github.com/MaxLightner/ramach-systems/discussions" target="_blank" rel="noopener noreferrer">شروع گفت‌وگو <span aria-hidden="true">↗</span></a>
    </div>
    <footer class="site-footer"><span>© ${new Date().getFullYear()} RAMACH SYSTEMS</span><span>SOFTWARE · SPATIAL TECHNOLOGY · AI · WEB</span><a href="#start">بازگشت به بالا ↑</a></footer>
  </section>
</main>`;

const menu = document.querySelector<HTMLButtonElement>('.menu-toggle')!;
const nav = document.querySelector<HTMLElement>('.site-nav')!;
menu.addEventListener('click',()=>{
  const active=menu.getAttribute('aria-expanded')!=='true';
  menu.setAttribute('aria-expanded',String(active));nav.classList.toggle('is-open',active);
});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');}));
const journey=document.querySelector<HTMLElement>('.journey')!;
const worldEl=document.querySelector<HTMLElement>('#world')!;
const articles=[...document.querySelectorAll<HTMLElement>('.chapter')];
const progressFill=document.querySelector<HTMLElement>('#progress-fill')!;
const stageIndex=document.querySelector<HTMLElement>('#stage-index')!;
const opening=document.querySelector<HTMLElement>('.opening')!;
let world:World|null=null,requested=false;
let target=0,displayed=0,last=performance.now(),active=0;
let enabled=true;
const clamp=(v:number,a=0,b=1)=>Math.max(a,Math.min(b,v));
function requestWorld(){
  if(requested)return;requested=true;
  import('./scene/world').then(({createWorld})=>{world=createWorld(worldEl);world.update(displayed,performance.now()*.001);})
    .catch(error=>{console.error('WebGL scene unavailable',error);document.querySelector<HTMLElement>('#webgl-message')!.hidden=false;});
}
const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting))requestWorld();},{rootMargin:'800px'});
observer.observe(journey);
const visibilityObserver=new IntersectionObserver(entries=>{enabled=entries.some(e=>e.isIntersecting);},{rootMargin:'150px'});
visibilityObserver.observe(journey);
function scrollTarget(){
  const rect=journey.getBoundingClientRect();
  const distance=Math.max(1,journey.offsetHeight-innerHeight);
  target=clamp(-rect.top/distance);
  const introP=clamp(scrollY/(Math.max(1,opening.offsetHeight*.95)));
  opening.style.setProperty('--intro-scroll',introP.toFixed(4));
  // Absolutely no navigation, decorative labels, or CTAs over the opening brand animation.
  document.body.classList.toggle('has-entered',scrollY > opening.offsetHeight-innerHeight*.2);
  document.body.classList.toggle('in-ending',document.querySelector<HTMLElement>('.ending')!.getBoundingClientRect().top < 82);
}
addEventListener('scroll',scrollTarget,{passive:true});
addEventListener('resize',scrollTarget,{passive:true});
scrollTarget();
function frame(now:number){
  const delta=Math.min(.06,Math.max(.001,(now-last)/1000));last=now;
  // Scroll sets a destination, never raw camera position. Exponential damping is frame-rate independent.
  displayed += (target-displayed)*(1-Math.exp(-delta*3.1));
  if(Math.abs(target-displayed)<0.00005)displayed=target;
  if(enabled){
    const idx=Math.min(chapters.length-1,Math.floor(clamp(displayed)*chapters.length));
    if(idx!==active){active=idx;articles.forEach((el,i)=>el.classList.toggle('is-active',i===idx));stageIndex.textContent=String(idx+1).padStart(2,'0');}
    progressFill.style.transform='scaleY('+displayed.toFixed(5)+')';
    world?.update(displayed,now*.001);
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
document.addEventListener('visibilitychange',()=>{last=performance.now();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');}});
