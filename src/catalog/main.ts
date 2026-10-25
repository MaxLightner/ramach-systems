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
const keys:ProductKey[]=['archiyar','chido','kitchyar','kamcheh','mizato','websites'];
const raw=new URLSearchParams(location.search).get('product')??'archiyar';
const selected=(keys as string[]).includes(raw)?raw as ProductKey:'archiyar';
const product=catalog[selected];
document.title=product.fa+' | RAMACH SYSTEMS';
const root=document.querySelector<HTMLDivElement>('#catalog-app');
if(!root)throw new Error('Missing catalog container');
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
 <nav class="catalog-switcher" aria-label="سایر محصولات و خدمات">
  ${keys.map(key=>`<a href="./catalog.html?product=${key}" ${key===selected?'aria-current="page"':''}>${catalog[key].fa}</a>`).join('')}
 </nav>
</main>
<footer class="catalog-footer"><span dir="ltr">© 2026 RAMACH SYSTEMS</span><a href="./index.html">صفحه اصلی</a></footer>`;
