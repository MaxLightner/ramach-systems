import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const main=await readFile(new URL('../src/main.ts',import.meta.url),'utf8');
const world=await readFile(new URL('../src/scene/world.ts',import.meta.url),'utf8');
const css=await readFile(new URL('../src/styles.css',import.meta.url),'utf8');
const readme=await readFile(new URL('../README.md',import.meta.url),'utf8');

test('the opening is deliberately blank before a two-line outline logo begins drawing',()=>{
  assert.match(main,/const wordmarkGlyphPaths = \{/);
  assert.match(main,/wordmarkTopRow\.map/);
  assert.match(main,/wordmarkBottomRow\.map/);
  assert.match(main,/pathLength="1000"/);
  assert.doesNotMatch(main,/<text class="wordmark-line/);
  assert.match(main,/window\.setTimeout\(\(\)=>document\.body\.classList\.add\('logo-drawing'\),680\)/);
  assert.match(css,/\.opening\{[\s\S]*?background:#03090d/);
  assert.match(css,/\.opening-grid,\.opening::before,\.opening::after\{display:none\}/);
  assert.match(css,/\.opening-wordmark\{[\s\S]*?opacity:0;visibility:hidden/);
  assert.match(css,/body\.logo-drawing \.opening-wordmark-svg \.wordmark-glyph path\{[\s\S]*?animation:drawGlyphFinal/);
  assert.match(css,/@keyframes drawGlyphFinal/);
});
test('the camera makes real 3D approaches, then returns to the central chip for the brand reveal',()=>{
  assert.match(main,/const storyEnd=0\.82/);
  assert.match(main,/let settledIndex=-1/);
  assert.match(main,/if\(local>=\.77\)settledIndex=idx/);
  assert.match(main,/else if\(local<\.16&&idx>0\)settledIndex=idx-1/);
  assert.match(main,/closingBrand\.classList\.toggle\('is-visible',displayed>=\.965\)/);
  assert.match(world,/const storyEnd=0\.82/);
  assert.match(world,/const closingMark:CameraMark/);
  assert.match(world,/const returnProgress=smooth\(0,1,clamp\(\(progress-storyEnd\)\/\(1-storyEnd\)\)\)/);
  assert.match(world,/camera\.position\.copy\(cameraCurve\.getPoint\(returnProgress\)\)/);
  assert.match(world,/camera\.lookAt\(focusCurve\.getPoint\(returnProgress\)\)/);
});
test('each chapter is revealed after arrival and lingers into the next camera move',()=>{
  assert.match(main,/if\(local>=\.77\)settledIndex=idx/);
  assert.match(main,/else if\(local<\.16&&idx>0\)settledIndex=idx-1/);
  assert.match(css,/\.chapter\{[\s\S]*?transition:opacity \.58s/);
  assert.match(css,/\.chapter\.is-active\{[\s\S]*?opacity:1;visibility:visible/);
});
test('the story retains eight problem-first chapters and labels future work honestly',()=>{
  assert.equal((main.match(/"k":\s*"/g)||[]).length,8);
  for(const word of ['کارگاه','مالک','Blender','کابینت','پرداخت','آینده'])assert.ok(main.includes(word),word);
  assert.match(main,/problem-context/);
  assert.match(main,/solution-context/);
  assert.match(main,/حوزه‌های توسعه آینده‌اند؛ نه امکانات آماده امروز/);
});
test('chapter headings include restrained custom line icons',()=>{
  assert.match(main,/const chapterIcons = \[/);
  assert.match(main,/class="chapter-symbol"/);
  assert.match(css,/\.chapter-symbol svg\{display:block;width:23px;height:23px/);
});
test('node models visually match construction, collaboration, spatial layout, data, finance and architecture',()=>{
  assert.match(world,/Construction mismatch: the built doorway/);
  assert.match(world,/Three actual work participants connected to one shared model/);
  assert.match(world,/inhabitable room, furniture and a translucent AR placement preview/);
  assert.match(world,/desktop design viewport, web card and phone/);
  assert.match(world,/project ledger, cost columns and a settled stack of payments/);
  assert.match(world,/browser-like architectural portfolio showing a recognizable facade/);
  assert.match(world,/neural lattice/);
});
test('the hub is a small microchip and seven story nodes connect through thin light paths',()=>{
  const v=world.match(/const nodePositions=\[([\s\S]*?)\] as const;/);
  assert.ok(v);
  const points=[...v[1].matchAll(/\[(-?\d+),(-?\d+)\]/g)].map(m=>[+m[1],+m[2]]);
  assert.equal(points.length,7);
  for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++)
    assert.ok(Math.hypot(points[i][0]-points[j][0],points[i][1]-points[j][1])>20);
  assert.match(world,/const chipBody=material/);
  assert.match(world,/new THREE\.BoxGeometry\(1\.72,\.54,1\.72\)/);
  assert.match(world,/new THREE\.TubeGeometry\(route,110,\.034,5,false\)/);
  assert.match(world,/reverse=lane===1/);
  assert.match(world,/q\.reverse\?1-pulseTravel:pulseTravel/);
});
test('the final page has a ticker at the top, one central CTA and a narrow utility footer',()=>{
  const ending=main.slice(main.indexOf('<section class="ending"'),main.indexOf('</main>'));
  assert.ok(ending.indexOf('class="ecosystem-strip"')<ending.indexOf('class="ending-center"'));
  assert.ok(ending.indexOf('class="ending-center"')<ending.indexOf('class="site-footer"'));
  assert.match(ending,/class="ending-cta" id="open-callback" type="button"/);
  assert.doesNotMatch(ending,/class="ending-inner"/);
  assert.doesNotMatch(ending,/class="ending-layout"/);
  for(const label of ['محصولات','مقالات','ثبت‌نام','درباره راماچ','تماس','شبکه‌ها'])assert.ok(ending.includes(label),label);
  assert.match(main,/endingObserver\.observe\(endingSection\)/);
  assert.match(css,/@keyframes ramachTicker/);
  assert.match(css,/\.ending-center\{[\s\S]*?place-items:center/);
});
test('the callback form is hidden until the single CTA opens its dialog and never claims false success',()=>{
  assert.match(main,/id="callback-overlay" hidden/);
  assert.match(main,/openCallback\.addEventListener\('click',showCallback\)/);
  assert.match(main,/closeCallback\.addEventListener\('click',hideCallback\)/);
  assert.match(main,/VITE_CONTACT_ENDPOINT/);
  assert.match(main,/شماره شما ارسال یا ذخیره نشد/);
  assert.match(main,/response\.ok/);
  assert.match(css,/\.callback-overlay\[hidden\]\{display:none!important\}/);
});
test('all authored CSS font declarations remain at least 13px',()=>{
  const declarations=[...css.matchAll(/(?:font-size|font)\s*:\s*([^;}]+)/g)].map(m=>m[1]);
  const below=[];
  for(const value of declarations)for(const m of value.matchAll(/(\d+(?:\.\d+)?)px/g))if(+m[1]<13)below.push(value);
  assert.ok(declarations.length>100,'Expected a comprehensive CSS font audit');
  assert.deepEqual(below,[]);
  assert.match(css,/--minimum-text-size:13px/);
  assert.match(readme,/13 CSS px/);
});
test('the 3D scene keeps its rendering workload restrained and respects reduced motion',()=>{
  assert.match(world,/renderer\.shadowMap\.enabled = false/);
  assert.match(world,/mesh\.castShadow=false;mesh\.receiveShadow=false/);
  assert.match(world,/Math\.min\(devicePixelRatio,w<740\?1:1\.25\)/);
  assert.match(css,/prefers-reduced-motion:reduce/);
});
