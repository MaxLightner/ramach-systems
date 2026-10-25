import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const catalog=await readFile(new URL('../src/catalog/main.ts',import.meta.url),'utf8');
const page=await readFile(new URL('../catalog.html',import.meta.url),'utf8');
const css=await readFile(new URL('../src/catalog/styles.css',import.meta.url),'utf8');
const vite=await readFile(new URL('../vite.config.ts',import.meta.url),'utf8');

test('Vite builds a real catalog page as a separate GitHub Pages HTML entry',()=>{
  assert.match(vite,/catalog:resolve\(root,'catalog\.html'\)/);
  assert.match(page,/src="\/src\/catalog\/main\.ts"/);
  assert.match(page,/id="catalog-app"/);
});
test('six query routes provide distinct product or service pages without false product readiness',()=>{
  for(const key of ['archiyar','chido','kitchyar','kamcheh','mizato','websites']){
    assert.match(catalog,new RegExp('  '+key+':\\{'));
  }
  assert.match(catalog,/new URLSearchParams\(location\.search\)\.get\('product'\)/);
  assert.match(catalog,/const product=catalog\[selected\]/);
  assert.match(catalog,/document\.title=product\.fa/);
  assert.match(catalog,/نسخه آنلاین عمومی هنوز منتشر نشده است/);
  assert.match(catalog,/در مسیر توسعه/);
  assert.match(catalog,/خدمات دیجیتال/);
  assert.match(catalog,/سایت‌هایی برای معماران/);
});
test('only confirmed existing demos have launch links, and the in-repo Archiyar viewer is reused',()=>{
  for(const url of ['./archyar.html','https://maxlightner.github.io/tolica-ar/','https://maxlightner.github.io/kamcheh/','https://maxlightner.github.io/menosaz/'])assert.ok(catalog.includes(url),url);
  assert.match(catalog,/external\?'target="_blank" rel="noopener noreferrer"'/);
  assert.match(catalog,/phase:'در مسیر توسعه'/);
});
test('the catalog has accessible navigation and a mobile responsive layout at readable sizes',()=>{
  assert.match(catalog,/class="catalog-switcher" aria-label="سایر محصولات و خدمات"/);
  assert.match(catalog,/aria-current="page"/);
  assert.match(page,/lang="fa" dir="rtl"/);
  assert.match(css,/@media\(max-width:740px\)/);
  assert.match(css,/\.catalog-feature p\{font-size:16px/);
  const decl=[...css.matchAll(/(?:font-size|font)\s*:\s*([^;}]+)/g)].map(m=>m[1]);
  for(const val of decl)for(const m of val.matchAll(/(\d+(?:\.\d+)?)px/g))assert.ok(Number(m[1])>=13,val);
});

test('specialized web design shows four grounded site examples with meaningful status labels',()=>{
  assert.match(catalog,/id:'nikabana'/);
  assert.match(catalog,/id:'mizato'/);
  assert.match(catalog,/id:'industrial'/);
  assert.match(catalog,/id:'velora'/);
  for(const url of ['https://www.nikabana.ir/','https://mizato.ir/','https://maxlightner.github.io/industrial-pump-demo/','https://maxlightner.github.io/maison-velora-motion-lab/'])
    assert.ok(catalog.includes(url),url);
  assert.match(catalog,/کانسپت شخصی · پروژه مشتری نیست/);
  assert.match(catalog,/نسخه عمومی آزمایشی/);
  assert.match(catalog,/طراحی نمایشی هستند، نه اسکرین‌شات دقیق/);
  assert.match(catalog,/selected==='websites'/);
  assert.match(css,/\.web-case-grid/);
});
test('service differentiation explains customer-specific problem, project proof, practical interactions and operations',()=>{
  for(const phrase of ['از مسئله کسب‌وکار شروع می‌کنیم','پروژه خودتان محور سایت است','تعامل، فقط وقتی ارزش دارد','قابل اداره و پیدا شدن'])
    assert.ok(catalog.includes(phrase),phrase);
  assert.match(catalog,/id="why-ramach"/);
  assert.match(css,/\.web-diff-grid/);
});
test('the real WordPress plugin is presented separately from its isolated public timeline demo',()=>{
  assert.match(catalog,/Mojarrad Core وردپرس/);
  assert.match(catalog,/href="\.\/timeline\.html"/);
  assert.match(catalog,/دموی عمومی با داده‌های فرضی/);
  assert.match(catalog,/به داده‌ها یا حساب‌های خصوصی/);
  assert.match(css,/\.web-timeline-feature/);
});
