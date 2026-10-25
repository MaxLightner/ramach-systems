import '@fontsource-variable/vazirmatn';
import '@fontsource-variable/manrope';
import './styles.css';

type ProductKey='archiyar'|'chido'|'kitchyar'|'kamcheh'|'mizato'|'websites';
type ProductInfo={
  en:string; fa:string; type:string; subtitle:string; description:string;
  features:string[]; phase:string; link?:string; linkLabel?:string; external?:boolean;
};
const catalog:Record<ProductKey,ProductInfo>={
  archiyar:{
    en:'ARCHIYAR',fa:'آرچیار',type:'معماری / واقعیت افزوده',
    subtitle:'مدل ساختمان؛ از نقشه تا کارگاه.',
    description:'آرچیار برای ترسیم، مشاهده و تطبیق جانمایی معماری در محیط واقعی طراحی شده است. نمایشگر وب آن مدل پروژه را در مرورگر نشان می‌دهد؛ اتصال زنده و ویرایش اشتراکی هنوز نیازمند زیرساخت سرور است.',
    features:['مدل‌سازی و مشاهده پلان در مقیاس واقعی','نمای دو‌بعدی و ماکت مقیاس‌دار','پیش‌نمایش سه‌بعدی تحت وب'],
    phase:'پیش‌نمایش وب در دسترس',link:'./archyar.html',linkLabel:'باز کردن نمایشگر وب آرچیار'
  },
  chido:{
    en:'CHIDO',fa:'چیدو',type:'فضای داخلی / واقعیت افزوده',
    subtitle:'مبلمان را پیش از انتخاب، در فضا ببینید.',
    description:'چیدو تجربه جانمایی مبلمان در فضای واقعی را ساده می‌کند: تشخیص کف، نمایش ابعاد و بررسی چیدمان. لینک زیر نسخه دموی عمومی پروژه مبلمان را باز می‌کند.',
    features:['جانمایی مبلمان روی سطح کف','بررسی مقیاس و جهت قرارگیری','نمایش اولیه چیدمان در فضای واقعی'],
    phase:'نسخه نمایشی در دسترس',link:'https://maxlightner.github.io/tolica-ar/',linkLabel:'مشاهده دموی چیدو',external:true
  },
  kitchyar:{
    en:'KITCHYAR',fa:'کیچیار',type:'آشپزخانه / واقعیت افزوده',
    subtitle:'طراحی آشپزخانه با شناخت فضای واقعی.',
    description:'کیچیار محصول در دست توسعه راماچ برای جانمایی و بررسی عناصر آشپزخانه و کابینت است. هنوز نسخه عمومی آنلاین برای اجرای مستقیم ارائه نشده است.',
    features:['چیدمان کابینت متناسب با ابعاد فضا','بررسی حجم و موقعیت تجهیزات','پیش‌بینی توسعه به مدل‌های سفارشی'],
    phase:'در مسیر توسعه'
  },
  kamcheh:{
    en:'KAMCHEH',fa:'کمچه',type:'ساخت‌وساز / مدیریت پروژه',
    subtitle:'اجرا، هزینه و تصمیم‌ها در یک مسیر.',
    description:'کمچه برای سامان‌دهی عملیات ساختمانی و ثبت اطلاعات مالی کارگاه طراحی شده است. لینک زیر نسخه نمایشی وب پروژه را باز می‌کند.',
    features:['دفتر ثبت پروژه و جریان اجرا','برآورد و ثبت هزینه‌های ساخت','دسترسی ساده برای کاربر کارگاهی'],
    phase:'دموی وب در دسترس',link:'https://maxlightner.github.io/kamcheh/',linkLabel:'ورود به دموی کمچه',external:true
  },
  mizato:{
    en:'MIZATO',fa:'میزاتو',type:'رستوران / نرم‌افزار عملیاتی',
    subtitle:'منوی دیجیتال و فرایند سفارش یکپارچه.',
    description:'میزاتو برای نمایش منوی دیجیتال، مدیریت سفارش و هماهنگی بخش‌های رستوران طراحی می‌شود. لینک زیر به نمونه منتشرشده سامانه منو می‌رود؛ عملکرد نهایی سفارش‌گیری وابسته به استقرار سامانه است.',
    features:['منوی دیجیتال قابل مدیریت','ساختار سفارش مشتری و گارسون','پنل‌های مدیریتی و عملیات آشپزخانه'],
    phase:'نمونه منوی وب موجود',link:'https://maxlightner.github.io/menosaz/',linkLabel:'مشاهده نمونه منوی میزاتو',external:true
  },
  websites:{
    en:'SPECIALIZED WEB DESIGN',fa:'طراحی سایت تخصصی',type:'خدمات دیجیتال / راماچ',
    subtitle:'سایتی که خود پروژه شما را معرفی کند، نه یک قالب عمومی.',
    description:'راماچ سایت‌هایی برای معماران، شرکت‌های صنعتی، محصولات فنی و مجموعه‌هایی می‌سازد که محتوای تصویری و مدل سه‌بعدی بخش مهمی از کارشان است. طراحی بصری، روایت پروژه، ساختار سئو و تجربه تعاملی متناسب با محصول تعریف می‌شود.',
    features:['وب‌سایت تخصصی معماری با پروژه و معرفی دفتر','وب‌سایت صنعتی و نمایش فرایند یا محصول سه‌بعدی','طراحی تجربه تعاملی، رابط کاربری و ساختار محتوایی','بهینه‌سازی فنی و معماری اولیه سئو'],
    phase:'خدمت قابل سفارش',link:'https://maxlightner.github.io/poyara/websites/',linkLabel:'مشاهده نمونه کارهای وب',external:true
  }
};

const websiteCases=[
  {id:'nikabana',label:'نیکابنا',latin:'NIKA BANA',sector:'معماری و ساختمان',type:'وب‌سایت واقعی · در حال تکمیل',
    summary:'برای شرکت معماری، سایت باید خود پروژه‌ها، روند ساخت و اعتبار دفتر را نشان دهد؛ نه فقط یک عکس پس‌زمینه.',
    url:'https://www.nikabana.ir/',style:'architecture'},
  {id:'mizato',label:'میزاتو',latin:'MIZATO',sector:'رستوران و نرم‌افزار',
    type:'معرفی محصول · نسخه عمومی آزمایشی',
    summary:'معرفی سرویس رستورانی و تجربه‌ای که کاربر می‌تواند از معرفی محصول به منوی دیجیتال برسد.',
    url:'https://mizato.ir/',style:'hospitality'},
  {id:'industrial',label:'دموی تجهیزات صنعتی',latin:'P–101',sector:'صنعت و مهندسی',
    type:'دموی فنی مستقل · WebGL',
    summary:'وقتی محصول صنعتی پیچیده است، بازدیدکننده باید بتواند اجزا و مکانیزم را ببیند؛ نه فقط عکس کاتالوگ.',
    url:'https://maxlightner.github.io/industrial-pump-demo/',style:'engineering'},
  {id:'velora',label:'Maison Velora',latin:'MAISON VELORA',sector:'تجربه لوکس و موشن',
    type:'کانسپت شخصی · پروژه مشتری نیست',
    summary:'آزمایشی برای روایت بصری، تایپوگرافی و انیمیشن؛ نمونه‌ای از رویکردی متفاوت برای یک برند فرضی.',
    url:'https://maxlightner.github.io/maison-velora-motion-lab/',style:'editorial'}
] as const;

const webDifferentiators=[
 {number:'01',title:'از مسئله کسب‌وکار شروع می‌کنیم',explain:'معمار به معرفی پروژه و دریافت درخواست مشاوره نیاز دارد؛ سازنده تجهیزات به توضیح دقیق محصول. برای این دو، یک قالب یکسان نمی‌نویسیم.'},
 {number:'02',title:'پروژه خودتان محور سایت است',explain:'گالری، مشخصات، نقشه، روند تصمیم‌ها و محتوای واقعی پروژه را به تجربه قابل‌فهم تبدیل می‌کنیم؛ افکت صرفاً تزئینی کافی نیست.'},
 {number:'03',title:'تعامل، فقط وقتی ارزش دارد',explain:'نمایش سه‌بعدی، واقعیت افزوده، تایم‌لاین و موشن را وقتی اضافه می‌کنیم که شناخت محصول یا تصمیم مشتری را بهتر کنند؛ با توجه به عملکرد موبایل.'},
 {number:'04',title:'سایت باید قابل اداره و پیدا شدن باشد',explain:'ساختار محتوا، مدیریت پروژه‌ها و مقالات، مبانی سئو، سرعت و مسیر روشن ارتباط با مشتری را از ابتدا در طراحی در نظر می‌گیریم.'}
] as const;

const keys:ProductKey[]=['archiyar','chido','kitchyar','kamcheh','mizato','websites'];
const raw=new URLSearchParams(location.search).get('product')??'archiyar';
const selected=(keys as string[]).includes(raw)?raw as ProductKey:'archiyar';
const product=catalog[selected];
document.title=product.fa+' | RAMACH SYSTEMS';
const root=document.querySelector<HTMLDivElement>('#catalog-app');
if(!root)throw new Error('Missing catalog container');

const websiteSection=selected==='websites'? `
<section class="web-case-section" id="website-samples" aria-labelledby="web-samples-title">
  <div class="web-section-heading">
    <div><span class="web-eyebrow">SELECTED PUBLIC WORK</span><h2 id="web-samples-title">چند نمونه، چند مسئله متفاوت</h2></div>
    <p>هر نمونه به یک سایت عمومی واقعی یا دموی قابل بازدید وصل است. نمونه‌های آزمایشی و کانسپت را از پروژه مشتری جدا مشخص کرده‌ایم.</p>
  </div>
  <div class="web-case-grid">
    ${websiteCases.map(item=>`
    <article class="web-case-card">
      <a class="web-case-preview web-case-preview--${item.style}" href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="مشاهده ${item.label}">
        <div class="web-preview-toolbar" aria-hidden="true"><span class="web-preview-dots">● ● ●</span><span>${item.latin}</span></div>
        <div class="web-preview-cover" aria-hidden="true"><span class="web-preview-kicker">${item.sector}</span><strong dir="ltr">${item.latin}</strong><span>EXPLORE THE PROJECT ↗</span></div>
      </a>
      <div class="web-case-content"><span class="web-case-status">${item.type}</span>
        <h3>${item.label}</h3><p>${item.summary}</p>
        <a class="web-case-open" href="${item.url}" target="_blank" rel="noopener noreferrer">مشاهده نمونه <span aria-hidden="true">↗</span></a>
      </div>
    </article>`).join('')}
  </div>
  <p class="web-preview-disclaimer">پیش‌نمایش‌های تصویری این بخش طراحی نمایشی هستند، نه اسکرین‌شات دقیق صفحات. با انتخاب «مشاهده نمونه» سایت اصلی باز می‌شود.</p>
</section>
<section class="web-advantage" id="why-ramach" aria-labelledby="web-advantage-title">
  <div class="web-section-heading">
    <div><span class="web-eyebrow">WHY A SPECIALIST WEBSITE?</span><h2 id="web-advantage-title">چه فرقی می‌کند سایت را راماچ طراحی کند؟</h2></div>
    <p>ما صرفاً صفحات کنار هم نمی‌چینیم؛ تلاش می‌کنیم ابزار معرفی، اعتمادسازی و ارتباط یک کسب‌وکار را طراحی کنیم.</p>
  </div>
  <div class="web-diff-grid">
    ${webDifferentiators.map(item=>`<article class="web-diff-item"><span dir="ltr">${item.number}</span><h3>${item.title}</h3><p>${item.explain}</p></article>`).join('')}
  </div>
</section>
<section class="web-timeline-feature" id="timeline-plugin" aria-labelledby="timeline-title">
  <div class="web-timeline-copy">
    <span class="web-eyebrow">RAMACH / PROJECT TIMELINE</span>
    <h2 id="timeline-title">تایم‌لاین پروژه، بخشی از تجربه سایت معماری</h2>
    <p>وب‌سایت معماری می‌تواند فراتر از گالری باشد؛ مراحل ساخت، تصمیم‌های فنی، گزارش‌های رسمی و پیگیری‌ها در یک تاریخچه منظم ثبت شوند. ماژول اولیه این قابلیت در پلاگین Mojarrad Core وردپرس توسعه یافته است.</p>
    <div class="web-timeline-tags"><span>مراحل اجرا</span><span>گزارش رسمی</span><span>پیگیری</span><span>سطح دسترسی</span></div>
    <a class="catalog-cta" href="./timeline.html">آزمایش دمو تایم‌لاین <span aria-hidden="true">↗</span></a>
    <p class="web-timeline-footnote">دموی عمومی با داده‌های فرضی است و به داده‌ها یا حساب‌های خصوصی پروژه نیکابنا متصل نیست. نمایش عمومی معادل نصب کامل پلاگین وردپرس نیست.</p>
  </div>
  <div class="web-timeline-visual" aria-hidden="true">
    <div class="web-timeline-head"><span>PROJECT / 01</span><span>1405</span></div>
    <div class="web-timeline-stages"><span class="is-complete">فنداسیون</span><span class="is-complete">اسکلت</span><span class="is-active">تأسیسات</span><span>تحویل</span></div>
    <div class="web-timeline-spine">
      <div><i></i><span>گزارش مرحله اسکلت</span><small>گزارش رسمی</small></div>
      <div><i></i><span>بازدید مهندس ناظر</span><small>بازدید</small></div>
      <div><i></i><span>پیگیری تأمین مصالح</span><small>نیازمند پیگیری</small></div>
    </div>
  </div>
</section>
`:'';

const cta=product.link
 ? `<a class="catalog-cta" href="${product.link}" ${product.external?'target="_blank" rel="noopener noreferrer"':''}>${product.linkLabel}<span aria-hidden="true">↗</span></a>`
 : `<span class="catalog-unavailable">نسخه آنلاین عمومی هنوز منتشر نشده است</span>`;
root.innerHTML=`
<div class="catalog-background" aria-hidden="true"></div>
<header class="catalog-header">
 <a href="./index.html" class="catalog-brand" dir="ltr"><b>R<span>/</span></b> RAMACH SYSTEMS</a>
 <a href="./index.html#contact" class="catalog-home">بازگشت به راماچ <span aria-hidden="true">↗</span></a>
</header>
<main class="catalog-container">
 <div class="catalog-meta"><span>RAMACH / PRODUCTS & SERVICES</span><span class="catalog-phase">${product.phase}</span></div>
 <div class="catalog-hero">
  <div class="catalog-copy">
   <span class="catalog-type">${product.type}</span>
   <div class="catalog-product" dir="ltr">${product.en}</div>
   <h1>${product.fa}</h1>
   <h2>${product.subtitle}</h2>
   <p>${product.description}</p>
   <div class="catalog-actions">${cta}<a href="./index.html#contact" class="catalog-secondary">گفت‌وگو درباره همکاری <span aria-hidden="true">←</span></a></div>
  </div>
  <div class="catalog-visual" aria-hidden="true">
   <div class="catalog-orbit catalog-orbit-a"></div><div class="catalog-orbit catalog-orbit-b"></div>
   <div class="catalog-monogram" dir="ltr">${product.en.split(' ').map(word=>word[0]).join('')}</div>
  </div>
 </div>
 <section class="catalog-capabilities" aria-label="حوزه‌ها و قابلیت‌ها">
  <h3>حوزه‌های اصلی</h3>
  <div class="catalog-grid">${product.features.map((feature,i)=>`<div class="catalog-feature"><span dir="ltr">0${i+1}</span><p>${feature}</p></div>`).join('')}</div>
 </section>
 ${websiteSection}
 <nav class="catalog-switcher" aria-label="سایر محصولات و خدمات">
  ${keys.map(key=>`<a href="./catalog.html?product=${key}" ${key===selected?'aria-current="page"':''}>${catalog[key].fa}</a>`).join('')}
 </nav>
</main>
<footer class="catalog-footer"><span dir="ltr">© 2026 RAMACH SYSTEMS</span><a href="./index.html">صفحه اصلی</a></footer>`;
