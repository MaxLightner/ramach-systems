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
const chapterIcons = [
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 2v5m6-5v5M9 17v5m6-5v5M2 9h5m-5 6h5m10-6h5m-5 6h5"/><path d="M10 10h4v4h-4z"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V4h16v16z"/><path d="M4 9h16M9 4v16M14 9v11"/><path d="M14 13h6"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2.5 20c.3-4 2.3-6 5.5-6s5.2 2 5.5 6M14 15c3.8-.8 6.4 1.1 7 4"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5M12 7v5"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="12" r="2.2"/><circle cx="19" cy="5" r="2.2"/><circle cx="19" cy="19" r="2.2"/><path d="m7 11 9.8-5M7 13l9.8 5"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 13h4m-4 3h8m-8-7v9"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M8 21h8m-4-4v4M7 7h10M7 11h6"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><circle cx="12" cy="12" r="2"/><path d="m11 6-5 11m7-11 5 11m-11 2h10M12 6v4"/></svg>'
] as const;

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
      <svg class="opening-wordmark-svg" viewBox="0 0 1200 340" role="img" aria-label="RAMACH SYSTEMS" xmlns="http://www.w3.org/2000/svg">
        <text class="wordmark-line wordmark-primary" x="50%" y="139" text-anchor="middle" pathLength="1000">RAMACH</text>
        <text class="wordmark-line wordmark-secondary" x="50%" y="285" text-anchor="middle" pathLength="1000">SYSTEMS</text>
      </svg>
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
          <p class="chapter-eyebrow"><span class="chapter-symbol" aria-hidden="true">${chapterIcons[i]}</span><span class="chapter-eyebrow-text">${c.eyebrow}</span></p>
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
  <section class="ecosystem-strip" aria-label="محصولات اکوسیستم راماچ">
    <div class="ecosystem-strip-head">
      <span>محصولات اکوسیستم</span>
      <span dir="ltr">BUILT AROUND REAL WORKFLOWS</span>
    </div>
    <div class="ecosystem-marquee" aria-label="Archiyar, Chido, Kitchyar, Kamcheh, Mizato">
      <div class="ecosystem-track">
        <span>ARCHIYAR <i>SPATIAL DESIGN</i></span><span>CHIDO <i>FURNITURE AR</i></span><span>KITCHYAR <i>KITCHEN AR</i></span><span>KAMCHEH <i>CONSTRUCTION OPS</i></span><span>MIZATO <i>HOSPITALITY TECH</i></span>
        <span aria-hidden="true">ARCHIYAR <i>SPATIAL DESIGN</i></span><span aria-hidden="true">CHIDO <i>FURNITURE AR</i></span><span aria-hidden="true">KITCHYAR <i>KITCHEN AR</i></span><span aria-hidden="true">KAMCHEH <i>CONSTRUCTION OPS</i></span><span aria-hidden="true">MIZATO <i>HOSPITALITY TECH</i></span>
      </div>
    </div>
  </section>
  <section class="ending" id="contact">
    <div class="ending-detail" dir="ltr"><span>RAMACH SYSTEMS</span><span>LET'S CONNECT WHAT MATTERS</span></div>
    <div class="ending-layout">
      <div class="ending-inner">
        <p class="ending-label">آغاز یک همکاری</p>
        <h2>آینده را <em>با هم</em><br>می‌سازیم.</h2>
        <p>برای توسعه نرم‌افزار، طراحی تجربه دیجیتال یا ساخت راهکاری تازه برای صنعت ساختمان، گفت‌وگو را شروع کنیم.</p>
        <a class="ending-cta" href="#callback-form"><span class="ending-cta-text">درخواست تماس</span><span class="ending-cta-icon" aria-hidden="true">↗</span></a>
      </div>
      <form class="callback-form" id="callback-form">
        <p class="callback-kicker">گفت‌وگوی اولیه</p>
        <h3>شماره‌ات را بگذار</h3>
        <p class="callback-description">برای هماهنگی یک گفت‌وگوی کوتاه درباره پروژه یا همکاری.</p>
        <label for="callback-phone">شماره تماس</label>
        <input id="callback-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="مثلاً 0912 000 0000" pattern="[0-9۰-۹٠-٩+() \-]{8,22}" minlength="8" maxlength="22" required>
        <label for="callback-topic">موضوع گفت‌وگو</label>
        <select id="callback-topic" name="topic">
          <option value="general">آشنایی و همکاری</option>
          <option value="architecture">معماری و ساخت‌وساز</option>
          <option value="spatial">فناوری فضایی و AR</option>
          <option value="digital">وب و نرم‌افزار</option>
        </select>
        <button class="callback-submit" type="submit">درخواست تماس <span aria-hidden="true">↗</span></button>
        <p class="callback-status" id="callback-status" role="status" aria-live="polite">ارسال درخواست پس از اتصال مقصد دریافت تماس فعال می‌شود؛ فعلاً اطلاعات شما ذخیره یا ارسال نمی‌شود.</p>
      </form>
    </div>
    <footer class="site-footer">
      <span>© ${new Date().getFullYear()} RAMACH SYSTEMS</span>
      <span>SOFTWARE · SPATIAL TECHNOLOGY · AI · WEB</span>
      <a href="#start">بازگشت به بالا ↑</a>
    </footer>
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
const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting))requestWorld();},{rootMargin:'300px 0px'});
observer.observe(journey);
const visibilityObserver=new IntersectionObserver(entries=>{enabled=entries.some(e=>e.isIntersecting);journey.classList.toggle('is-in-view',enabled);},{rootMargin:'150px'});
visibilityObserver.observe(journey);
function scrollTarget(){
  const rect=journey.getBoundingClientRect();
  const distance=Math.max(1,journey.offsetHeight-innerHeight);
  target=clamp(-rect.top/distance);
  const introP=clamp(scrollY/(Math.max(1,opening.offsetHeight*.95)));
  opening.style.setProperty('--intro-scroll',introP.toFixed(4));
  // Absolutely no navigation, decorative labels, or CTAs over the opening brand animation.
  document.body.classList.toggle('has-entered',scrollY>=opening.offsetHeight-2);
  document.body.classList.toggle('in-ending',document.querySelector<HTMLElement>('.ending')!.getBoundingClientRect().top < 82);
}
addEventListener('scroll',scrollTarget,{passive:true});
addEventListener('resize',scrollTarget,{passive:true});
scrollTarget();
function frame(now:number){
  const delta=Math.min(.06,Math.max(.001,(now-last)/1000));last=now;
  // Scroll sets a destination, never raw camera position. Exponential damping is frame-rate independent.
  displayed += (target-displayed)*(1-Math.exp(-delta*12));
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
const callbackForm=document.querySelector<HTMLFormElement>('#callback-form')!;
const callbackStatus=document.querySelector<HTMLElement>('#callback-status')!;
callbackForm.addEventListener('submit',async event=>{
  event.preventDefault();
  if(!callbackForm.reportValidity())return;
  const formData=new FormData(callbackForm);
  const phone=String(formData.get('phone')??'').trim();
  const digits=phone.replace(/[^0-9۰-۹٠-٩]/g,'').replace(/[۰-۹]/g,d=>String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d))).replace(/[٠-٩]/g,d=>String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
  if(digits.length<8){callbackStatus.textContent='شماره تماس کامل نیست؛ لطفاً شماره را بررسی کنید.';return;}
  const endpoint=(import.meta.env.VITE_CONTACT_ENDPOINT as string|undefined)?.trim();
  if(!endpoint){
    callbackStatus.textContent='فرم آماده است، اما مقصد دریافت درخواست هنوز تنظیم نشده؛ شماره شما ارسال یا ذخیره نشد.';
    return;
  }
  const submit=callbackForm.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  submit.disabled=true;callbackStatus.textContent='در حال ارسال درخواست…';
  try{
    const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone,topic:formData.get('topic'),source:'ramach-systems',createdAt:new Date().toISOString()})});
    if(!response.ok)throw new Error('Contact endpoint rejected the request');
    callbackStatus.textContent='درخواست تماس ارسال شد.';
    callbackForm.reset();
  }catch(error){
    console.error('Callback request failed',error);
    callbackStatus.textContent='ارسال انجام نشد؛ اتصال سامانه دریافت درخواست را بررسی کنید.';
  }finally{submit.disabled=false;}
});
document.addEventListener('visibilitychange',()=>{last=performance.now();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');}});
