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

const wordmarkGlyphPaths = {
  R: ["M8 118V8H66C86 8 96 19 96 37C96 53 86 63 68 66L98 118H69L43 70H32V118Z","M32 30H64C72 30 76 33 76 39C76 45 72 48 64 48H32Z"],
  A: ["M3 118L25 8H75L97 118H70L64 87H36L30 118Z","M41 62H59L54 35H46Z"],
  M: ["M6 118V8H33L50 48L67 8H94V118H68V57L50 93L32 57V118Z"],
  C: ["M93 25L77 8H29C14 8 7 16 7 31V95C7 110 14 118 29 118H77L93 101L77 83L69 93H34V33H69L77 43Z"],
  H: ["M7 8H32V48H68V8H93V118H68V72H32V118H7Z"],
  S: ["M88 18L74 8H27C14 8 7 16 7 29V40C7 52 15 59 28 63L69 75V94H31V82H7V98C7 111 15 118 28 118H72C85 118 93 110 93 97V81C93 68 86 62 72 58L31 46V32H69V43H93V28C93 22 91 20 88 18Z"],
  Y: ["M5 8H34L50 38L66 8H95L64 61V118H36V61Z"],
  T: ["M5 8H95V33H64V118H36V33H5Z"],
  E: ["M8 8H94V32H34V49H81V73H34V94H94V118H8Z"]
} as const;
const wordmarkTopRow = [
  {letter:"R",x:225},{letter:"A",x:355},{letter:"M",x:485},{letter:"A",x:615},{letter:"C",x:745},{letter:"H",x:875}
].map(g=>({...g,letter:g.letter as keyof typeof wordmarkGlyphPaths}));
const wordmarkBottomRow = [
  {letter:"S",x:200},{letter:"Y",x:317},{letter:"S",x:434},{letter:"T",x:551},{letter:"E",x:668},{letter:"M",x:785},{letter:"S",x:902}
].map(g=>({...g,letter:g.letter as keyof typeof wordmarkGlyphPaths}));

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
    <div class="opening-blue-halo" aria-hidden="true"></div>
    <div class="opening-loader" role="status" aria-label="در حال آماده‌سازی سایت"><span class="opening-loader-ring" aria-hidden="true"></span></div>
    <div class="opening-center"><div class="opening-wordmark">
      <svg class="opening-wordmark-svg" viewBox="0 0 1200 350" role="img" aria-label="RAMACH SYSTEMS" xmlns="http://www.w3.org/2000/svg">
        <defs><linearGradient id="wordmark-stroke" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b99b6c"/><stop offset=".48" stop-color="#f0ede3"/><stop offset="1" stop-color="#8dc8b7"/></linearGradient></defs>
        <g class="wordmark-row wordmark-row-primary" aria-hidden="true">
          ${wordmarkTopRow.map((glyph,i)=>`<g class="wordmark-glyph" transform="translate(${glyph.x} 34)" style="--line-delay:.12s;--glyph-delay:${(i*.12).toFixed(2)}s">${wordmarkGlyphPaths[glyph.letter].map(d=>`<path d="${d}"/>`).join('')}</g>`).join('')}
        </g>
        <g class="wordmark-row wordmark-row-secondary" aria-hidden="true">
          ${wordmarkBottomRow.map((glyph,i)=>`<g class="wordmark-glyph" transform="translate(${glyph.x} 190)" style="--line-delay:1.90s;--glyph-delay:${(i*.12).toFixed(2)}s">${wordmarkGlyphPaths[glyph.letter].map(d=>`<path d="${d}" />`).join('')}</g>`).join('')}
        </g>
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
      <div class="closing-brand" id="closing-brand" aria-hidden="true"><span class="closing-brand-main">RAMACH</span><span class="closing-brand-sub">SYSTEMS</span></div>
      <div class="stage-bottom"><span class="stage-instruction">↓ اسکرول برای حرکت · ↑ برای بازگشت</span><span class="stage-number" dir="ltr"><b id="stage-index">01</b> / 08</span></div>
      <div class="chapter-progress" aria-hidden="true"><span id="progress-fill"></span></div>
      <div class="webgl-message" id="webgl-message" hidden>نمای سه‌بعدی در این مرورگر بارگذاری نشد؛ محتوای معرفی شرکت همچنان در دسترس است.</div>
    </div>
  </section>
  <section class="ending" id="contact" aria-label="ارتباط و همکاری">
    <div class="ecosystem-strip" aria-label="نوار محصولات راماچ">
      <div class="ecosystem-marquee" aria-label="RAMACH, Archiyar, Chido, Kitchyar, Kamcheh, Mizato">
        <div class="ecosystem-track">
          <span class="ticker-brand ticker-ramach">RAMACH SYSTEMS</span><span class="ticker-separator">✦</span>
          <span class="ticker-brand">ARCHIYAR</span><span class="ticker-separator">✦</span>
          <span class="ticker-brand">CHIDO</span><span class="ticker-separator">✦</span>
          <span class="ticker-brand">KITCHYAR</span><span class="ticker-separator">✦</span>
          <span class="ticker-brand">KAMCHEH</span><span class="ticker-separator">✦</span>
          <span class="ticker-brand">MIZATO</span><span class="ticker-separator">✦</span>
          <span class="ticker-brand ticker-ramach" aria-hidden="true">RAMACH SYSTEMS</span><span class="ticker-separator" aria-hidden="true">✦</span>
          <span class="ticker-brand" aria-hidden="true">ARCHIYAR</span><span class="ticker-separator" aria-hidden="true">✦</span>
          <span class="ticker-brand" aria-hidden="true">CHIDO</span><span class="ticker-separator" aria-hidden="true">✦</span>
          <span class="ticker-brand" aria-hidden="true">KITCHYAR</span><span class="ticker-separator" aria-hidden="true">✦</span>
          <span class="ticker-brand" aria-hidden="true">KAMCHEH</span><span class="ticker-separator" aria-hidden="true">✦</span>
          <span class="ticker-brand" aria-hidden="true">MIZATO</span><span class="ticker-separator" aria-hidden="true">✦</span>
        </div>
      </div>
    </div>
    <div class="ending-center">
      <button class="ending-cta" id="open-callback" type="button" aria-haspopup="dialog" aria-controls="callback-overlay">
        <span class="ending-cta-text">شروع همکاری</span>
        <span class="ending-cta-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18 18 6M7 6h11v11"/></svg></span>
      </button>
    </div>
    <footer class="site-footer" aria-label="پیوندهای سایت">
      <span class="footer-copy" dir="ltr">© 2026 RAMACH SYSTEMS</span>
      <nav class="footer-links" aria-label="پیوندهای اصلی">
        <a href="#journey">محصولات</a>
        <a href="#articles" data-coming-soon="مقالات">مقالات</a>
        <a href="#register" data-coming-soon="ثبت‌نام">ثبت‌نام</a>
        <a href="#start">درباره راماچ</a>
        <a href="#contact" id="footer-contact">تماس</a>
      </nav>
      <div class="footer-social" aria-label="شبکه‌های اجتماعی">
        <span class="footer-social-label">شبکه‌ها</span>
        <button type="button" class="social-placeholder" data-coming-soon="LinkedIn" aria-label="LinkedIn">in</button>
        <button type="button" class="social-placeholder" data-coming-soon="Instagram" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="18" cy="6" r="1" fill="currentColor" stroke="none"/></svg></button>
      </div>
      <span class="footer-notice" id="footer-notice" role="status" aria-live="polite"></span>
    </footer>
    <div class="callback-overlay" id="callback-overlay" hidden>
      <div class="callback-dialog" role="dialog" aria-modal="true" aria-labelledby="callback-title" tabindex="-1">
        <button class="callback-close" type="button" aria-label="بستن فرم">×</button>
        <form class="callback-form" id="callback-form">
          <p class="callback-kicker">گفت‌وگوی اولیه</p>
          <h3 id="callback-title">شماره‌ات را بگذار</h3>
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
    </div>
  </section>
</main><div class="cursor-aura" aria-hidden="true"></div>`;

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
const closingBrand=document.querySelector<HTMLElement>('#closing-brand')!;
const storyEnd=0.82;
let world:World|null=null,requested=false;
// Drive SVG stroke drawing with Web Animations and actual measured path lengths.
// CSS reduced-motion overrides previously hid every animation in some desktop browsers.
async function beginLogoAfterLoad(){
  if(document.readyState!=='complete')await new Promise<void>(resolve=>addEventListener('load',()=>resolve(),{once:true}));
  if(document.fonts)await document.fonts.ready;
  await new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve())));
  window.setTimeout(()=>{
    document.body.classList.add('loader-complete');
    window.setTimeout(()=>{
      const glyphs=[...document.querySelectorAll<SVGGElement>('.opening-wordmark-svg .wordmark-glyph')];
    glyphs.forEach((glyph,index)=>{
      const secondLine=index>=6;
      const offset=secondLine?index-6:index;
      const delay=(secondLine?1530:0)+offset*165;
      glyph.querySelectorAll<SVGPathElement>('path').forEach(path=>{
        const length=Math.max(1,path.getTotalLength()+2);
        path.style.animation='none';
        path.style.strokeDasharray=String(length);
        path.style.strokeDashoffset=String(length);
        path.style.opacity='1';
        if(new URLSearchParams(location.search).get('reduceMotion')==='1'){
          path.style.strokeDashoffset='0';
        }else{
          path.animate(
            [{strokeDashoffset:String(length)},{strokeDashoffset:'0'}],
            {duration:1950,delay,easing:'cubic-bezier(.65,.02,.2,1)',fill:'forwards'}
          );
        }
      });
    });
      document.body.classList.add('logo-drawing');
    },430);
  },1150);
}
void beginLogoAfterLoad();
let target=0,displayed=0,last=performance.now(),active=-1;
const cursorAura=document.querySelector<HTMLElement>('.cursor-aura')!;
let mouseX=-500,mouseY=-500,haloX=-500,haloY=-500;
addEventListener('pointermove',event=>{
  if(event.pointerType!=='mouse')return;
  mouseX=event.clientX;mouseY=event.clientY;
  document.body.classList.add('cursor-glow-enabled');
},{passive:true});
addEventListener('pointerleave',()=>document.body.classList.remove('cursor-glow-enabled'));
let enabled=true;
const clamp=(v:number,a=0,b=1)=>Math.max(a,Math.min(b,v));
// Eight chapter landings plus the final return-to-core landing.
const stageStops=[...chapters.map((_,i)=>storyEnd*(i+.96)/chapters.length),.983];
const cameraArrivalThreshold=.001;
const minimumReadMs=2150;
const cameraTravelMs=2500;
const easeInOutCubic=(v:number)=>v<.5?4*v*v*v:1-Math.pow(-2*v+2,3)/2;
let transitionFrom=0,transitionTo=0,transitionStarted=0,transitioning=false;
let currentStop=-1;
let awaitingArrival=false;
let holdUntil=0;
let programmaticScroll=false;
let idleSnapTimer=0;
let wheelAccum=0;
let lastWheelAt=0;
// RAMACH is an animation-led experience: core motion is on unless explicitly disabled
// via the reduce-motion query argument; desktop OS preferences must not silently
// turn all cinematic scenes into instant jumps.
const prefersReducedMotion=new URLSearchParams(location.search).get('reduceMotion')==='1';
document.body.classList.toggle('motion-paused',prefersReducedMotion);
const stageRect=()=>journey.getBoundingClientRect();
const stageDistance=()=>Math.max(1,journey.offsetHeight-innerHeight);
function stageIsActive(){
  const r=stageRect();
  return r.top<=20&&r.bottom>innerHeight-20;
}
function nearestStopIndex(progress:number){
  let best=0,dist=Infinity;
  for(let i=0;i<stageStops.length;i++){
    const d=Math.abs(progress-stageStops[i]);
    if(d<dist){dist=d;best=i;}
  }
  return best;
}
function goToStop(index:number){
  currentStop=Math.max(0,Math.min(stageStops.length-1,index));
  const destination=stageStops[currentStop];
  transitionFrom=displayed;
  transitionTo=destination;
  transitionStarted=performance.now();
  transitioning=!prefersReducedMotion && Math.abs(destination-displayed)>.002;
  target=destination;
  awaitingArrival=true;
  holdUntil=Infinity;
  clearTimeout(idleSnapTimer);
  // Do not teleport the physical scrollbar here. The animation frame moves
  // the browser scrollbar and 3D camera together over the full 2.5 seconds.
}
function stageStep(direction:number){
  if(!stageIsActive())return false;
  if(awaitingArrival||performance.now()<holdUntil)return true;
  if(direction>0&&currentStop>=stageStops.length-1)return false;
  if(direction<0&&currentStop<=0){currentStop=-1;return false;}
  if(currentStop<0){
    const physical=clamp(-stageRect().top/stageDistance());
    currentStop=physical>.045?nearestStopIndex(physical):-1;
  }
  goToStop(currentStop+direction);
  return true;
}
addEventListener('wheel',event=>{
  if(event.ctrlKey||document.body.classList.contains('modal-open'))return;
  if(!stageIsActive())return;
  if((event.target as Element)?.closest?.('input,textarea,select,[contenteditable]'))return;
  const now=performance.now();
  if(now-lastWheelAt>240)wheelAccum=0;
  lastWheelAt=now;
  wheelAccum+=event.deltaY;
  if(Math.abs(wheelAccum)<24&&now>=holdUntil&&!awaitingArrival){event.preventDefault();return;}
  const handled=stageStep(wheelAccum>0?1:-1);
  if(handled)event.preventDefault();
  wheelAccum=0;
},{passive:false});
let touchY=0;
journey.addEventListener('touchstart',event=>{
  if(event.touches.length===1)touchY=event.touches[0].clientY;
},{passive:true});
journey.addEventListener('touchmove',event=>{
  if(event.touches.length!==1||!stageIsActive()||document.body.classList.contains('modal-open'))return;
  const dy=touchY-event.touches[0].clientY;
  if((dy>0&&currentStop<stageStops.length-1)||(dy<0&&currentStop>0)||awaitingArrival||performance.now()<holdUntil)
    event.preventDefault();
},{passive:false});
journey.addEventListener('touchend',event=>{
  if(!event.changedTouches.length)return;
  const dy=touchY-event.changedTouches[0].clientY;
  if(Math.abs(dy)>35)stageStep(dy>0?1:-1);
},{passive:true});
addEventListener('keydown',event=>{
  if(event.altKey||event.ctrlKey||event.metaKey||document.body.classList.contains('modal-open'))return;
  if((event.target as Element)?.closest?.('a,button,input,textarea,select,[contenteditable]'))return;
  const direction=['ArrowDown','PageDown',' '].includes(event.key)?1:['ArrowUp','PageUp'].includes(event.key)?-1:0;
  if(direction&&stageStep(direction))event.preventDefault();
});
function requestWorld(){
  if(requested)return;requested=true;
  import('./scene/world').then(({createWorld})=>{world=createWorld(worldEl,chapters.map(c=>c.align));world.update(displayed,performance.now()*.001);})
    .catch(error=>{console.error('WebGL scene unavailable',error);document.querySelector<HTMLElement>('#webgl-message')!.hidden=false;});
}
const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting))requestWorld();},{rootMargin:'300px 0px'});
observer.observe(journey);
const visibilityObserver=new IntersectionObserver(entries=>{enabled=entries.some(e=>e.isIntersecting);journey.classList.toggle('is-in-view',enabled);},{rootMargin:'150px'});
visibilityObserver.observe(journey);
const endingSection=document.querySelector<HTMLElement>('.ending')!;
const endingObserver=new IntersectionObserver(entries=>{
  endingSection.classList.toggle('is-visible',entries.some(e=>e.isIntersecting));
},{threshold:0.08});
endingObserver.observe(endingSection);
function scrollTarget(){
  const rect=journey.getBoundingClientRect();
  const distance=Math.max(1,journey.offsetHeight-innerHeight);
  const physical=clamp(-rect.top/distance);
  if(!programmaticScroll){
    if(!awaitingArrival&&performance.now()>=holdUntil)target=physical;
    if(stageIsActive()&&!awaitingArrival&&performance.now()>=holdUntil){
      // Scrollbar dragging and history restoration still snap to a camera mark.
      clearTimeout(idleSnapTimer);
      idleSnapTimer=window.setTimeout(()=>{
        if(stageIsActive()&&Math.abs(target-stageStops[nearestStopIndex(target)])>.003)
          goToStop(nearestStopIndex(target));
      },160);
    }
  }
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
  if(!prefersReducedMotion){
    const k=1-Math.exp(-delta*8);
    haloX+=(mouseX-haloX)*k;haloY+=(mouseY-haloY)*k;
    cursorAura.style.transform='translate3d('+haloX.toFixed(1)+'px,'+haloY.toFixed(1)+'px,0) translate(-50%,-50%)';
  }
  // Each scroll step owns a complete 2.5-second, reversible, eased camera journey.
  // The reading hold starts only after the camera has actually reached its destination.
  if(transitioning){
    const t=clamp((now-transitionStarted)/cameraTravelMs);
    displayed=transitionFrom+(transitionTo-transitionFrom)*easeInOutCubic(t);
    // Keep sticky section positioning and 3D camera progress on one timeline.
    // No instant scrollTop change on wheel, so movement cannot look like a cut.
    programmaticScroll=true;
    window.scrollTo({top:journey.getBoundingClientRect().top+scrollY+displayed*stageDistance(),behavior:'instant'});
    programmaticScroll=false;
    if(t>=1){transitioning=false;displayed=transitionTo;}
  }else if(awaitingArrival && prefersReducedMotion){
    displayed=target;
  }else if(!awaitingArrival){
    displayed+=(target-displayed)*(1-Math.exp(-delta*12));
    if(Math.abs(target-displayed)<0.00005)displayed=target;
  }
  if(awaitingArrival&&!transitioning&&Math.abs(target-displayed)<=cameraArrivalThreshold){
    // Reduced-motion opt-out still needs to land on the requested native scroll mark.
    if(prefersReducedMotion){
      programmaticScroll=true;
      window.scrollTo({top:journey.getBoundingClientRect().top+scrollY+target*stageDistance(),behavior:'instant'});
      programmaticScroll=false;
    }
    awaitingArrival=false;
    holdUntil=now+minimumReadMs;
  }
  if(enabled){
    const storyProgress=clamp(displayed/storyEnd);
    const chapterPhase=storyProgress*chapters.length;
    const idx=Math.min(chapters.length-1,Math.floor(chapterPhase));
    const local=chapterPhase-idx;
    let settledIndex=-1;
    if(displayed<storyEnd){
      if(local>=.77)settledIndex=idx;
      else if(local<.16&&idx>0)settledIndex=idx-1;
    }
    if(settledIndex!==active){
      active=settledIndex;
      articles.forEach((el,i)=>el.classList.toggle('is-active',i===settledIndex));
    }
    closingBrand.classList.toggle('is-visible',displayed>=.965);
    journey.classList.toggle('is-returning',displayed>=storyEnd);
    stageIndex.textContent=String(idx+1).padStart(2,'0');
    progressFill.style.transform='scaleY('+displayed.toFixed(5)+')';
    world?.update(displayed,now*.001);
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
const callbackForm=document.querySelector<HTMLFormElement>('#callback-form')!;
const callbackStatus=document.querySelector<HTMLElement>('#callback-status')!;
const callbackOverlay=document.querySelector<HTMLElement>('#callback-overlay')!;
const callbackDialog=document.querySelector<HTMLElement>('.callback-dialog')!;
const openCallback=document.querySelector<HTMLButtonElement>('#open-callback')!;
const closeCallback=document.querySelector<HTMLButtonElement>('.callback-close')!;
const footerContact=document.querySelector<HTMLAnchorElement>('#footer-contact')!;
const footerNotice=document.querySelector<HTMLElement>('#footer-notice')!;
function showCallback(){
  callbackOverlay.hidden=false;
  requestAnimationFrame(()=>{callbackOverlay.classList.add('is-open');callbackDialog.focus();});
  document.body.classList.add('modal-open');
}
function hideCallback(){
  callbackOverlay.classList.remove('is-open');
  callbackOverlay.hidden=true;
  document.body.classList.remove('modal-open');
  openCallback.focus();
}
openCallback.addEventListener('click',showCallback);
footerContact.addEventListener('click',event=>{event.preventDefault();showCallback();});
closeCallback.addEventListener('click',hideCallback);
callbackOverlay.addEventListener('click',event=>{if(event.target===callbackOverlay)hideCallback();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!callbackOverlay.hidden)hideCallback();});
document.querySelectorAll<HTMLElement>('[data-coming-soon]').forEach(item=>item.addEventListener('click',event=>{
  event.preventDefault();
  const label=item.dataset.comingSoon??'این بخش';
  footerNotice.textContent=label==='LinkedIn'||label==='Instagram'
    ? 'نشانی رسمی شبکه‌های اجتماعی هنوز تنظیم نشده است.'
    : 'بخش «'+label+'» هنوز آماده انتشار نیست.';
  footerNotice.classList.add('is-visible');
}));
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
