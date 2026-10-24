import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const main=await readFile(new URL('../src/main.ts',import.meta.url),'utf8');
const world=await readFile(new URL('../src/scene/world.ts',import.meta.url),'utf8');
const css=await readFile(new URL('../src/styles.css',import.meta.url),'utf8');

test('the opening brand is a readable two-line RAMACH / SYSTEMS wordmark',()=>{
  assert.match(main,/class="signature-ramach"/);
  assert.match(main,/class="opening-systems"[^>]*>SYSTEMS/);
  assert.doesNotMatch(main,/class="signature-logo"/);
  assert.match(css,/\.opening-wordmark\{[\s\S]*?flex-direction:column/);
  assert.match(css,/\.signature-ramach span\{[\s\S]*?animation:brandLetter/);
  assert.match(css,/@keyframes systemsReveal/);
});
test('camera responds immediately from the first scroll increment',()=>{
  assert.match(main,/Math\.exp\(-delta\*12\)/);
  assert.match(main,/rootMargin:'300px 0px'/);
  assert.match(world,/progress\*\(views\.length-1\)/);
  assert.doesNotMatch(world,/progress\*views\.length-\.5/);
});
test('the story stays problem-first and marks future work honestly',()=>{
  assert.equal((main.match(/"k":\s*"/g)||[]).length,8);
  for(const word of ['کارگاه','مالک','Blender','کابینت','پرداخت','آینده'])assert.ok(main.includes(word),word);
  assert.match(main,/problem-context/);
  assert.match(main,/solution-context/);
});
test('chapter copy enters in a sequenced animation after the scene becomes visible',()=>{
  assert.match(main,/journey\.classList\.toggle\('is-in-view',enabled\)/);
  assert.match(css,/\.journey\.is-in-view \.chapter\.is-active h1\{animation:chapterRise/);
  assert.match(css,/\.journey\.is-in-view \.chapter\.is-active \.chapter-body\{animation:chapterRise/);
  assert.match(css,/@keyframes chapterRise/);
});
test('the 3D scene avoids expensive shadow and transmission passes',()=>{
  assert.match(world,/renderer\.shadowMap\.enabled = false/);
  assert.match(world,/mesh\.castShadow=false;mesh\.receiveShadow=false/);
  assert.match(world,/new THREE\.MeshStandardMaterial\(\{color:0x82a4a6/);
  assert.match(world,/Math\.min\(devicePixelRatio,w<740\?1:1\.25\)/);
});
test('the CTA has a purpose-built visual treatment and accessible focus',()=>{
  assert.match(main,/class="ending-cta-icon"/);
  assert.match(css,/\.ending-cta-icon\{/);
  assert.match(css,/\.ending-cta:focus-visible/);
  assert.match(css,/\.ending:before\{/);
});
test('no authored CSS font-size or font shorthand goes below 13px',()=>{
  const declarations=[...css.matchAll(/font-size\s*:\s*([^;{}]+);/g)].map(m=>({kind:'font-size',value:m[1]}));
  declarations.push(...[...css.matchAll(/font\s*:\s*([^;{}]+);/g)].map(m=>({kind:'font',value:m[1]})));
  const bad=[];
  for(const d of declarations)for(const m of d.value.matchAll(/(\d+(?:\.\d+)?)px/g))if(+m[1]<13)bad.push(d.kind+':'+d.value);
  assert.ok(declarations.length>60,'Expected a comprehensive CSS font audit');
  assert.deepEqual(bad,[]);
  assert.match(css,/--minimum-text-size:13px/);
});
test('six separated symbolic nodes remain connected by bidirectional routed light',()=>{
  const v=world.match(/const nodePositions=\[([\s\S]*?)\] as const;/);
  assert.ok(v);
  const points=[...v[1].matchAll(/\[(-?\d+),(-?\d+)\]/g)].map(m=>[+m[1],+m[2]]);
  assert.equal(points.length,6);
  for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++)
    assert.ok(Math.hypot(points[i][0]-points[j][0],points[i][1]-points[j][1])>26);
  assert.match(world,/function beveled\(/);
  assert.match(world,/reverse=lane===1/);
  assert.match(world,/q\.reverse\?1-travel:travel/);
});
