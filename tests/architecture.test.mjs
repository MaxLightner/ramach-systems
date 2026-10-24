import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const main=await readFile(new URL('../src/main.ts',import.meta.url),'utf8');
const world=await readFile(new URL('../src/scene/world.ts',import.meta.url),'utf8');
const css=await readFile(new URL('../src/styles.css',import.meta.url),'utf8');
const readme=await readFile(new URL('../README.md',import.meta.url),'utf8');

test('the two-line logo is built from real SVG outline paths and draws one glyph at a time',()=>{
  assert.match(main,/const wordmarkGlyphPaths = \{/);
  assert.match(main,/wordmarkTopRow\.map/);
  assert.match(main,/wordmarkBottomRow\.map/);
  assert.match(main,/pathLength="1000"/);
  assert.doesNotMatch(main,/<text class="wordmark-line/);
  assert.match(main,/--line-delay:1\.58s/);
  assert.match(css,/\.wordmark-glyph path\{[\s\S]*?fill:none;[\s\S]*?stroke-dasharray:1000;stroke-dashoffset:1000/);
  assert.match(css,/@keyframes drawGlyph/);
  assert.match(css,/prefers-reduced-motion:reduce[\s\S]*?\.wordmark-glyph path\{animation:none;stroke-dashoffset:0\}/);
});
test('camera approaches a 3D chapter mark, settles, then allows its copy to appear',()=>{
  assert.match(main,/const settledIndex=local>=\.84\?idx:-1/);
  assert.match(main,/world=createWorld\(worldEl,chapters\.map\(c=>c\.align\)\)/);
  assert.match(world,/const chapterTargets=\[/);
  assert.match(world,/position\.distanceTo\(to\.position\)/);
  assert.match(world,/new THREE\.QuadraticBezierCurve3\(from,control,to\)/);
  assert.match(world,/const travel=smooth\(0,1,clamp\(local\/\.78\)\)/);
  assert.match(world,/camera\.position\.copy\(cameraCurve\.getPoint\(travel\)\)/);
  assert.match(world,/camera\.lookAt\(focusCurve\.getPoint\(travel\)\)/);
  assert.doesNotMatch(world,/const focusPath=new THREE\.CatmullRomCurve3\(focusPoints/);
  assert.doesNotMatch(world,/camera\.position\.set\(framedFocus/);
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
test('the 3D scene keeps its rendering workload restrained',()=>{
  assert.match(world,/renderer\.shadowMap\.enabled = false/);
  assert.match(world,/mesh\.castShadow=false;mesh\.receiveShadow=false/);
  assert.match(world,/Math\.min\(devicePixelRatio,w<740\?1:1\.25\)/);
});
test('the product strip identifies RAMACH products instead of implying external client logos',()=>{
  assert.match(main,/class="ecosystem-strip"/);
  for(const brand of ['ARCHIYAR','CHIDO','KITCHYAR','KAMCHEH','MIZATO'])assert.ok(main.includes(brand),brand);
  assert.match(main,/محصولات اکوسیستم/);
  assert.match(css,/@keyframes ecosystemDrift/);
});
test('the callback form never claims success without a configured endpoint',()=>{
  assert.match(main,/id="callback-form"/);
  assert.match(main,/name="phone" type="tel"/);
  assert.match(main,/VITE_CONTACT_ENDPOINT/);
  assert.match(main,/شماره شما ارسال یا ذخیره نشد/);
  assert.match(main,/response\.ok/);
});
test('the CTA is a compact editorial link, not an oversized pill',()=>{
  assert.match(main,/class="ending-cta" href="#callback-form"/);
  assert.match(main,/class="ending-cta-icon" aria-hidden="true"><svg/);
  assert.match(css,/\.ending-cta\{[\s\S]*?min-width:0;padding:0;border:0;border-radius:0;background:transparent/);
  assert.match(css,/\.ending-cta-icon\{[\s\S]*?width:38px;height:38px/);
  assert.match(css,/\.ending-cta:hover \.ending-cta-icon/);
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
