export const ecosystem = [
  { id: 'architecture', number: '01', en: 'ARCHITECTURE', title: 'از اولین خطِ طراحی', label: 'دفتر معماری', description: 'جایی که ایده شکل می‌گیرد. ابزارهای دیجیتال، مدل‌های معماری و تجربه‌های تعاملی، زبان مشترکی میان طراح و دیگر اعضای پروژه می‌سازند.', position: [-12, 0, -6] },
  { id: 'construction', number: '02', en: 'CONSTRUCTION', title: 'تا واقعیتِ ساخته‌شده', label: 'کارگاه و اجرا', description: 'ارتباط میان نقشه و کارگاه باید زنده بماند. فناوری ساختمان، اطلاعات طراحی و فرایندهای اجرایی را در یک مسیر قابل پیگیری به هم نزدیک می‌کند.', position: [12, 0, -6] },
  { id: 'oversight', number: '03', en: 'PROJECT OVERSIGHT', title: 'تصویر بزرگ‌تر، تصمیم بهتر', label: 'مالک و مدیر پروژه', description: 'دیدن تصویر یکپارچهٔ پروژه، پایهٔ تصمیم‌گیری آگاهانه است؛ از مرور پیشرفت کار تا گفت‌وگو دربارهٔ تغییرات، منابع و اولویت‌های اجرا.', position: [12, 0, 8] },
  { id: 'data', number: '04', en: 'DIGITAL INFRASTRUCTURE', title: 'زیرساختی برای جریان اطلاعات', label: 'مرکز داده', description: 'نرم‌افزار و زیرساخت دیجیتال، بستر ارتباط اجزای اکوسیستم‌اند. معماری ماژولار، توسعهٔ تدریجی ابزارها و اتصال آیندهٔ آن‌ها را ممکن می‌کند.', position: [0, 0, -12] },
  { id: 'finance', number: '05', en: 'FINANCE & OPERATIONS', title: 'هماهنگی فراتر از اجرا', label: 'مالی و مدیریت', description: 'هماهنگی پروژه فقط به طراحی و ساخت محدود نیست. فرایندهای مالی، مدیریتی و گردش اطلاعات نیز بخشی از همان تصویر مشترک‌اند.', position: [-12, 0, 8] },
] as const;
// No production endpoints are assumed. Add verified subdomain URLs when each product is ready.
export const products = [
  {name:'Archiyar',fa:'آرکیار',index:'01',status:'در مسیر اتصال'},
  {name:'Kitchyar',fa:'کیچیار',index:'02',status:'در مسیر اتصال'},
  {name:'Chido',fa:'چیدو',index:'03',status:'در مسیر اتصال'},
] as const;

