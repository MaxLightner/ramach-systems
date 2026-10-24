import '@fontsource-variable/vazirmatn';
import '@fontsource-variable/manrope';
import './styles.css';
import { ecosystem, products } from './config/ecosystem';
import { services } from './content/home';

const arrow = '<span aria-hidden="true">↗</span>';
const mark = '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M8 38V9h18c17 0 17 20 0 20H17m9-1 14 10M17 17v21" stroke="currentColor" stroke-width="2.5"/></svg>';
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<header class="header">
  <a href="#" class="brand" aria-label="راماچ سیستم، خانه" dir="ltr">${mark}<span>RAMACH<small>S Y S T E M S</small></span></a>
  <nav class="nav" id="navigation" aria-label="ناوبری اصلی"><a href="#ecosystem">اکوسیستم راماچ</a><a href="#expertise">تخصص‌های ما</a><a href="#about">دربارهٔ راماچ</a><a href="#horizon">افق پیش رو</a></nav>
  <a class="header-cta" href="#conversation">بیایید گفت‌وگو کنیم ${arrow}</a>
  <button class="menu-toggle" aria-label="باز کردن منو" aria-expanded="false" aria-controls="navigation"><span></span><span></span></button>
</header>
<main id="main">
<section class="hero" aria-labelledby="hero-title">
  <div class="hero-heading"><div><p class="eyebrow"><i></i> پیوند معماری و هوشمندی</p><h1 id="hero-title">آینده، <em>متصل</em> است.</h1></div><div class="hero-intro"><p>ایده‌ها، آدم‌ها و فرایندها.<br>ما میان آن‌ها ارتباط می‌سازیم.</p><a href="#ecosystem" class="text-link">کشف اکوسیستم <span>↓</span></a></div></div>
  <div class="hero-meta" dir="ltr"><span>RAMACH / CONNECTED BUILT WORLD</span><span>AN INTERACTIVE PERSPECTIVE — 001</span></div>
  <div class="experience" id="ecosystem" aria-label="تجربهٔ تعاملی اکوسیستم ساختمان">
    <div class="scene-fallback" aria-hidden="true"><div class="fallback-orbit"></div><span>RAMACH</span></div>
    <div id="scene" role="img" aria-label="برد دیجیتال سه‌بعدی با پردازندهٔ مرکزی راماچ و پنج ماژول طراحی، اجرا، مدیریت، داده و مالی"></div>
    <div class="scene-loader"><span class="loader-line"></span><span>در حال شکل‌گیری یک جهان متصل</span></div>
    <div class="scene-labels">${ecosystem.map((z,i)=>`<button class="scene-label" data-zone="${i}" tabindex="-1"><i></i><span>${z.label}</span><small>${z.number}</small></button>`).join('')}</div>
    <div class="scene-top"><span class="live"><i></i> یک هسته، پنج جریان</span><span class="scene-note">ماژول‌ها را انتخاب کنید</span></div>
    <div class="scene-tools"><button id="motion" aria-pressed="false" aria-label="توقف حرکت خودکار">Ⅱ</button><button id="reset" aria-label="بازگشت به نمای کلی">⤢</button><button id="quality" aria-pressed="false">کیفیت سبک</button></div>
    <div class="scene-bottom"><span><span class="drag-icon">↔</span> برای چرخش بکشید · برای کشف انتخاب کنید</span><span dir="ltr">DESIGNED TO CONNECT.</span></div>
  </div>
  <div class="ecosystem-panel"><div class="ecosystem-switcher" role="group" aria-label="انتخاب محیط اکوسیستم"><button class="zone-tab active" data-zone="-1" aria-pressed="true"><span>●</span> نمای یکپارچه</button>${ecosystem.map((z,i)=>`<button class="zone-tab" data-zone="${i}" aria-pressed="false"><small>${z.number}</small>${z.label}</button>`).join('')}</div><div class="zone-detail" aria-live="polite"><span class="zone-en" dir="ltr">ONE CONNECTED ECOSYSTEM</span><h2 id="zone-title">از پراکندگی، به یکپارچگی.</h2><p id="zone-description">دفتر طراحی، کارگاه، مدیریت و زیرساخت دیجیتال، جزیره‌های جدا از هم نیستند. راماچ با فناوری، آن‌ها را به اجزای یک اکوسیستم متصل تبدیل می‌کند.</p><span class="detail-arrow" aria-hidden="true">↗</span></div></div>
</section>
<section class="intro section-pad" id="about"><div class="section-kicker"><span>01 / OUR PERSPECTIVE</span><span>نگاه ما</span></div><div class="intro-body"><h2>ساختمان‌ها را آدم‌ها می‌سازند.<br><span>ارتباط‌ها را، فناوری.</span></h2><div class="intro-copy"><p>صنعت ساختمان از تخصص‌های مختلف شکل می‌گیرد؛ اما اطلاعات و تصمیم‌ها همیشه هم‌مسیر نیستند. راماچ سیستم در نقطهٔ تلاقی نرم‌افزار، معماری و فناوری فعالیت می‌کند تا این فاصله‌ها را کمتر کند.</p><p>ما نرم‌افزار توسعه می‌دهیم، تجربه‌های فضایی خلق می‌کنیم و فرایندها را هوشمند می‌سازیم؛ با این باور که فناوری زمانی ارزشمند است که به آدم‌ها کمک کند بهتر ببینند، بهتر تصمیم بگیرند و هماهنگ‌تر عمل کنند.</p></div></div><div class="principles"><span><b>معماری‌محور</b><small>درک فضا، پیش از انتخاب ابزار</small></span><span><b>انسان‌محور</b><small>فناوری در خدمت تجربهٔ واقعی</small></span><span><b>آمادهٔ رشد</b><small>ساختاری برای توسعهٔ پیوسته</small></span></div></section>
<section class="expertise section-pad" id="expertise"><div class="section-kicker"><span>02 / OUR EXPERTISE</span><span>حوزه‌های تخصصی</span></div><div class="section-heading"><h2>فناوری‌های متفاوت.<br><em>یک نگاه مشترک.</em></h2><p>از زیرساخت نرم‌افزار تا تجربهٔ نهایی کاربر،<br>هر لایه بخشی از یک تصویر بزرگ‌تر است.</p></div><div class="service-list">${services.map((s,i)=>`<details class="service" ${i===0?'open':''}><summary><span class="service-n">${s.n}</span><h3>${s.title}</h3><span class="service-en" dir="ltr">${s.en}</span><span class="plus" aria-hidden="true">+</span></summary><div class="service-content"><p>${s.text}</p><span>${s.tags}</span></div></details>`).join('')}</div></section>
<section class="manifesto section-pad"><div class="manifesto-visual" aria-hidden="true"><div class="blueprint"><span>R</span></div><div class="coordinate" dir="ltr">IDEA → INFORMATION → IMPACT</div></div><div class="manifesto-copy"><p class="eyebrow">فاصلهٔ ایده تا واقعیت</p><h2>پیچیدگی، در زیرساخت.<br><em>سادگی، در تجربه.</em></h2><p>یک تجربهٔ خوب، حاصل هماهنگی جزئیات است. از منطق نرم‌افزار و گردش اطلاعات تا نور، حرکت و تعامل؛ برای ما مهندسی و طراحی دو بخش از یک کارند.</p><a class="text-link" href="#conversation">دربارهٔ پروژه‌تان گفت‌وگو کنیم ${arrow}</a></div></section>
<section class="horizon section-pad" id="horizon"><div class="section-kicker"><span>03 / THE NEXT CHAPTER</span><span>افق پیش رو</span></div><div class="section-heading"><h2>یک هسته.<br><em>افق‌های تازه.</em></h2><p>راماچ بستری برای رشد یک خانوادهٔ دیجیتال است.<br>این سه نام در آینده به اکوسیستم متصل خواهند شد.</p></div><div class="product-list">${products.map(p=>`<article class="product"><span class="product-num">${p.index} /</span><h3 dir="ltr">${p.name}</h3><div><span>${p.fa}</span><span class="product-status"><i></i>${p.status}</span></div></article>`).join('')}</div><p class="horizon-note">در این مرحله، تمرکز ما بر هویت و زیرساخت راماچ است. اتصال محصولات در مراحل بعد انجام می‌شود.</p></section>
<section class="conversation section-pad" id="conversation"><span class="eyebrow">LET’S BUILD WHAT’S NEXT</span><h2>ایدهٔ بعدی شما،<br><em>می‌تواند نقطهٔ اتصال باشد.</em></h2><p>برای تعریف یک مسئله، بررسی یک امکان یا آغاز همکاری،<br>پروژهٔ راماچ را در GitHub دنبال کنید.</p><a class="contact-button" href="https://github.com/MaxLightner/ramach-systems/discussions" target="_blank" rel="noopener noreferrer">شروع گفت‌وگو در GitHub ${arrow}</a><span class="contact-note">مسیر ارتباطی این نسخه · GitHub Discussions</span></section>
</main>
<footer class="footer"><a href="#" class="brand" dir="ltr">${mark}<span>RAMACH<small>S Y S T E M S</small></span></a><p>هوشمندی برای جهانی که می‌سازیم.</p><div dir="ltr"><span>© ${new Date().getFullYear()} RAMACH SYSTEMS</span><a href="https://github.com/MaxLightner/ramach-systems" target="_blank" rel="noopener noreferrer">GITHUB ↗</a><a href="#">BACK TO TOP ↑</a></div></footer>`;

const menu = document.querySelector<HTMLButtonElement>('.menu-toggle')!;
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true'; menu.setAttribute('aria-expanded',String(open)); menu.setAttribute('aria-label',open?'بستن منو':'باز کردن منو'); document.querySelector('.nav')!.classList.toggle('open',open);});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','باز کردن منو');document.querySelector('.nav')!.classList.remove('open');}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','باز کردن منو');document.querySelector('.nav')!.classList.remove('open');}});

let scene: Awaited<ReturnType<typeof import('./scene/ecosystem').createEcosystem>> | undefined;
let selected=-1;
function selectZone(index:number){
 selected=index;
 document.querySelectorAll<HTMLButtonElement>('[data-zone]').forEach(b=>{const active=Number(b.dataset.zone)===index;b.classList.toggle('active',active);if(b.classList.contains('zone-tab'))b.setAttribute('aria-pressed',String(active));});
 const zone=ecosystem[index];
 document.querySelector('#zone-title')!.textContent=zone?.title??'از پراکندگی، به یکپارچگی.';
 document.querySelector('#zone-description')!.textContent=zone?.description??'دفتر طراحی، کارگاه، مدیریت و زیرساخت دیجیتال، جزیره‌های جدا از هم نیستند. راماچ با فناوری، آن‌ها را به اجزای یک اکوسیستم متصل تبدیل می‌کند.';
 document.querySelector('.zone-en')!.textContent=zone?.en??'ONE CONNECTED ECOSYSTEM';
 scene?.focus(index);
}
document.querySelectorAll<HTMLButtonElement>('[data-zone]').forEach(b=>b.addEventListener('click',()=>selectZone(Number(b.dataset.zone))));
document.querySelector('#reset')!.addEventListener('click',()=>selectZone(-1));
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const motion=document.querySelector<HTMLButtonElement>('#motion')!;
let paused=reduced.matches;
function setMotion(){motion.setAttribute('aria-pressed',String(paused));motion.setAttribute('aria-label',paused?'ادامهٔ حرکت خودکار':'توقف حرکت خودکار');motion.textContent=paused?'▷':'Ⅱ';scene?.setPaused(paused);}
motion.addEventListener('click',()=>{paused=!paused;setMotion();});setMotion();
reduced.addEventListener('change',e=>{paused=e.matches;setMotion();});
let low=window.matchMedia('(max-width: 760px)').matches;
const quality=document.querySelector<HTMLButtonElement>('#quality')!;
function setQuality(){quality.setAttribute('aria-pressed',String(low));quality.textContent=low?'کیفیت بالا':'کیفیت سبک';scene?.setLowQuality(low);}
quality.addEventListener('click',()=>{low=!low;setQuality();});setQuality();
const container=document.querySelector<HTMLElement>('#scene')!;
const sceneObserver=new IntersectionObserver(entries=>{if(!entries.some(e=>e.isIntersecting))return;sceneObserver.disconnect();
import('./scene/ecosystem').then(({createEcosystem})=>{
 scene=createEcosystem(container,{onSelect:selectZone,low,paused});
 scene.focus(selected);document.querySelector('.experience')!.classList.add('ready');
}).catch((error)=>{
 console.warn('The interactive scene is unavailable.',error);
 document.querySelector('.experience')!.classList.add('unavailable');
 document.querySelector('.scene-loader')!.textContent='نمای سه‌بعدی در این مرورگر در دسترس نیست؛ بخش‌ها را از فهرست زیر کشف کنید.';
 document.querySelector('.scene-tools')!.setAttribute('hidden','');
});
},{rootMargin:'250px'});sceneObserver.observe(container);
