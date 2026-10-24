import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const main=await readFile(new URL('../src/main.ts',import.meta.url),'utf8');
const world=await readFile(new URL('../src/scene/world.ts',import.meta.url),'utf8');
const css=await readFile(new URL('../src/styles.css',import.meta.url),'utf8');

test('a reversible, damped scroll timeline owns camera travel',()=>{
  assert.match(main,/target-displayed/);
  assert.match(main,/Math\.exp\(-dt\*3\.1\)/);
  assert.match(world,/function update\(progress:number,seconds:number\)/);
  assert.doesNotMatch(main,/addEventListener\(['"]wheel['"]/);
});
test('narrative names actual problems and distinguishes future work',()=>{
  assert.equal((main.match(/"k":\s*"/g)||[]).length,8);
  for(const word of ['کارگاه','مالک','Blender','کابینت','پرداخت','وب‌سایت','آینده'])assert.ok(main.includes(word),word);
  assert.match(main,/problem-context/);
  assert.match(main,/solution-context/);
});
test('intro is dark with only single-line drawn brand and no visible menu',()=>{
  assert.match(main,/signature-strokes/);
  assert.match(main,/signature-logo/);
  assert.match(css,/opening-wordmark\{display:flex/);
  assert.match(css,/opening\{background:radial-gradient/);
  assert.match(css,/site-header\{transform:translateY\(-110%\);opacity:0;visibility:hidden;pointer-events:none/);
  assert.match(main,/scrollY>=opening\.offsetHeight-2/);
});
test('six geographically separated symbolic nodes',()=>{
  const v=world.match(/const nodePositions=\[([\s\S]*?)\] as const;/);
  assert.ok(v,'node coordinates');
  const points=[...v[1].matchAll(/\[(-?\d+),(-?\d+)\]/g)].map(m=>[+m[1],+m[2]]);
  assert.equal(points.length,6);
  for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++)
    assert.ok(Math.hypot(points[i][0]-points[j][0],points[i][1]-points[j][1])>26);
});
test('board-style chamfered routes with visible moving bidirectional illumination',()=>{
  assert.match(world,/new THREE\.LineCurve3\(/);
  assert.match(world,/function beveled\(/);
  assert.match(world,/reverse=lane===1/);
  assert.match(world,/q\.reverse\?1-travel:travel/);
  assert.match(world,/q\.halo\.position\.copy/);
  assert.doesNotMatch(world,/CatmullRomCurve3/);
});
test('flat chapter typography never specifies less than 9 CSS pixels',()=>{
  const sizes=[...css.matchAll(/(?:font-size\s*:\s*|font\s*:[^;]*?)(\d+(?:\.\d+)?)px/g)].map(m=>+m[1]);
  assert.ok(sizes.length>=40);
  assert.ok(sizes.every(n=>n>=9),'Illegal text sizes: '+sizes.filter(n=>n<9).join(','));
  assert.match(css,/--minimum-text-size:9px/);
});
test('camera views alternate the subject opposite alternating chapter text',()=>{
  const sides=[...world.matchAll(/\{pos:\[[^\]]+\],look:\[[^\]]+\],side:([-\d.]+)\}/g)].map(m=>Number(m[1]));
  assert.deepEqual(sides,[13,-8,8,-8,8,-8,8,-8]);
  assert.match(world,/camera\.lookAt\(center\.addScaledVector\(screenRight,framing\)\)/);
  assert.match(main,/data-align=/);
});
