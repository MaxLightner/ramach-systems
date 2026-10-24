import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const main=await readFile(new URL('../src/main.ts',import.meta.url),'utf8');
const world=await readFile(new URL('../src/scene/world.ts',import.meta.url),'utf8');
const css=await readFile(new URL('../src/styles.css',import.meta.url),'utf8');
const readme=await readFile(new URL('../README.md',import.meta.url),'utf8');

test('the opening logo is two outlined SVG text paths that draw progressively',()=>{
  assert.match(main,/class="opening-wordmark-svg"/);
  assert.match(main,/class="wordmark-line wordmark-primary"[^>]*pathLength="1000">RAMACH/);
  assert.match(main,/class="wordmark-line wordmark-secondary"[^>]*pathLength="1000">SYSTEMS/);
  assert.doesNotMatch(main,/class="signature-ramach"/);
  assert.match(css,/\.wordmark-line\{[\s\S]*?fill:none;[\s\S]*?stroke-dasharray:1000;[\s\S]*?stroke-dashoffset:1000/);
  assert.match(css,/@keyframes drawWordmark/);
});
test('camera travel is smooth, stable and synchronized to the eight copy chapters',()=>{
  assert.match(main,/Math\.exp\(-delta\*12\)/);
  assert.match(main,/Math\.floor\(clamp\(displayed\)\*chapters\.length\)/);
  assert.match(world,/const chapterPhase=progress\*chapterCount-\.5/);
  assert.match(world,/new THREE\.CatmullRomCurve3\(focusPoints/);
  assert.match(world,/camera\.position\.set\(framedFocus\.x,framedFocus\.y\+distance\*\.42,framedFocus\.z\+distance\)/);
  assert.doesNotMatch(world,/const views=\[/);
  assert.doesNotMatch(world,/core\.rotation\.y=seconds/);
  assert.doesNotMatch(world,/wire\.rotation\.y=seconds/);
});
test('the narrative remains problem-first and distinguishes current products from future work',()=>{
  assert.equal((main.match(/"k":\s*"/g)||[]).length,8);
  for(const word of ['کارگاه','مالک','Blender','کابینت','پرداخت','آینده'])assert.ok(main.includes(word),word);
  assert.match(main,/problem-context/);
  assert.match(main,/solution-context/);
  assert.match(main,/حوزه‌های توسعه آینده‌اند؛ نه امکانات آماده امروز/);
});
test('chapter headings include a restrained custom line icon',()=>{
  assert.match(main,/const chapterIcons = \[/);
  assert.match(main,/class="chapter-symbol"/);
  assert.match(css,/\.chapter-symbol svg\{display:block;width:23px;height:23px/);
  assert.match(css,/\.chapter-eyebrow\{[\s\S]*?display:flex;[\s\S]*?align-items:center/);
});
test('the hub is a small chip and seven story nodes connect by thin light traces',()=>{
  const v=world.match(/const nodePositions=\[([\s\S]*?)\] as const;/);
  assert.ok(v);
  const points=[...v[1].matchAll(/\[(-?\d+),(-?\d+)\]/g)].map(m=>[+m[1],+m[2]]);
  assert.equal(points.length,7);
  for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++)
    assert.ok(Math.hypot(points[i][0]-points[j][0],points[i][1]-points[j][1])>20);
  assert.match(world,/const chipBody=material/);
  assert.match(world,/new THREE\.BoxGeometry\(1\.72,\.54,1\.72\)/);
  assert.match(world,/for\(const offset of \[-\.48,0,\.48\]\)/);
  assert.match(world,/new THREE\.CatmullRomCurve3\(focusPoints/);
  assert.match(world,/const start=new THREE\.Vector3\(direction\.x\*\.83\+lateral\.x,3\.34/);
  assert.match(world,/new THREE\.TubeGeometry\(route,110,\.034,5,false\)/);
  assert.match(world,/reverse=lane===1/);
  assert.match(world,/q\.reverse\?1-travel:travel/);
  assert.doesNotMatch(world,/new THREE\.OctahedronGeometry\(1\.75/);
});
test('the scene keeps its WebGL workload restrained',()=>{
  assert.match(world,/renderer\.shadowMap\.enabled = false/);
  assert.match(world,/mesh\.castShadow=false;mesh\.receiveShadow=false/);
  assert.match(world,/Math\.min\(devicePixelRatio,w<740\?1:1\.25\)/);
});
test('the ecosystem strip names owned products rather than implying external client logos',()=>{
  assert.match(main,/class="ecosystem-strip"/);
  for(const brand of ['ARCHIYAR','CHIDO','KITCHYAR','KAMCHEH','MIZATO'])assert.ok(main.includes(brand),brand);
  assert.match(main,/محصولات اکوسیستم/);
  assert.match(css,/@keyframes ecosystemDrift/);
});
test('the callback form validates the phone and never claims a submission without an endpoint',()=>{
  assert.match(main,/id="callback-form"/);
  assert.match(main,/name="phone" type="tel"/);
  assert.match(main,/VITE_CONTACT_ENDPOINT/);
  assert.match(main,/شماره شما ارسال یا ذخیره نشد/);
  assert.match(main,/response\.ok/);
  assert.match(css,/\.callback-form input:focus/);
});
test('the CTA is compact and points to the contact form',()=>{
  assert.match(main,/class="ending-cta" href="#callback-form"/);
  assert.match(css,/\.ending-cta\{[\s\S]*?min-width:0/);
  assert.match(css,/\.ending-cta-icon\{[\s\S]*?width:29px;height:29px/);
  assert.match(css,/\.ending-cta:focus-visible/);
});
test('all authored CSS font sizes are at least 13px, including declarations without trailing semicolons',()=>{
  const declarations=[...css.matchAll(/(?:font-size|font)\s*:\s*([^;}]+)/g)].map(m=>m[1]);
  const below=[];
  for(const value of declarations){
    for(const m of value.matchAll(/(\d+(?:\.\d+)?)px/g))if(+m[1]<13)below.push(value);
  }
  assert.ok(declarations.length>100,'Expected comprehensive CSS font audit');
  assert.deepEqual(below,[]);
  assert.match(css,/--minimum-text-size:13px/);
  assert.match(readme,/13 CSS px/);
});
