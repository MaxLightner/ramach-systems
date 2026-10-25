import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const source=await readFile(new URL('../src/timeline/main.ts',import.meta.url),'utf8');
const css=await readFile(new URL('../src/timeline/styles.css',import.meta.url),'utf8');
const html=await readFile(new URL('../timeline.html',import.meta.url),'utf8');
const vite=await readFile(new URL('../vite.config.ts',import.meta.url),'utf8');

test('standalone timeline preview is a distinct Vite page with a navigation back to web services',()=>{
  assert.match(vite,/timeline:resolve\(root,'timeline\.html'\)/);
  assert.match(html,/lang="fa" dir="rtl"/);
  assert.match(html,/src="\/src\/timeline\/main\.ts"/);
  assert.match(source,/href="\.\/catalog\.html\?product=websites#timeline-plugin"/);
});
test('the demo uses exclusively authored sample events with no private WordPress API',()=>{
  assert.match(source,/Public UI demonstration only/);
  assert.equal((source.match(/\{id:\d+,date:/g)||[]).length,6);
  assert.match(source,/هیچ اطلاعاتی ذخیره یا ارسال نمی‌شود/);
  assert.doesNotMatch(source,/fetch\s*\(/);
  assert.doesNotMatch(source,/wp-json\/mojarrad/);
  assert.doesNotMatch(source,/localStorage|sessionStorage/);
});
test('demo role access and interactive report/followup filtering are explicit',()=>{
  assert.match(source,/type Viewer='manager'\|'owner'/);
  assert.match(source,/type Filter='all'\|'report'\|'followup'/);
  assert.match(source,/viewer==='manager'\|\|e\.report/);
  assert.match(source,/filter==='report'&&e\.report/);
  assert.match(source,/filter==='followup'&&e\.followup/);
  assert.match(source,/data-role="manager"/);
  assert.match(source,/data-role="owner"/);
  assert.match(source,/data-filter="all"/);
  assert.match(source,/data-filter="followup"/);
  assert.match(source,/data-event="/);
  assert.match(source,/aria-expanded="/);
  assert.match(source,/aria-pressed="/);
});
test('timeline body has responsive controls and no authored text smaller than 13px',()=>{
  assert.match(css,/@media\(max-width:760px\)/);
  assert.match(css,/\.timeline-event-toggle/);
  assert.match(css,/\.timeline-role button\[aria-pressed=true\]/);
  assert.match(css,/\.timeline-event-details\[hidden\]\{display:none\}/);
  const fontValues=[...css.matchAll(/(?:font-size|font)\s*:\s*([^;}]+)/g)].map(m=>m[1]);
  for(const value of fontValues)for(const m of value.matchAll(/(\d+(?:\.\d+)?)px/g))
    assert.ok(Number(m[1])>=13,value);
});
