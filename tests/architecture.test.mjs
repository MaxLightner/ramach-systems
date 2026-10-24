import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const main=await readFile(new URL('../src/main.ts',import.meta.url),'utf8');
const world=await readFile(new URL('../src/scene/world.ts',import.meta.url),'utf8');
const css=await readFile(new URL('../src/styles.css',import.meta.url),'utf8');

test('scroll drives a damped reversible camera rather than wheel delta',()=>{
  assert.match(main,/target-displayed/);
  assert.match(main,/Math\.exp\(-delta\*5\.4\)/);
  assert.match(world,/function update\(progress:number,seconds:number\)/);
  assert.doesNotMatch(main,/addEventListener\(['"]wheel['"]/);
});
test('the intro is an SVG line draw and scene is scroll-lazy',()=>{
  assert.match(main,/mark-line line-a/);
  assert.match(css,/stroke-dashoffset/);
  assert.match(main,/IntersectionObserver/);
  assert.match(main,/import\('\.\/scene\/world'\)/);
});
test('the persistent scene contains five distinct environments',()=>{
  for(const v of ['ARCHITECT','BUILD','OWNER','DATA','FINANCE'])assert.ok(world.includes(v),v);
  assert.match(main,/class="world"/);
  assert.match(main,/class="chapter/);
  assert.match(main,/class="ending"/);
});
test('all authored CSS explicit pixel sizes meet 9px minimum',()=>{
  const sizes=[...css.matchAll(/font-size:\s*([0-9.]+)px/g)].map(m=>Number(m[1]));
  assert.ok(sizes.length>0);
  assert.ok(sizes.every(n=>n>=9),JSON.stringify(sizes));
});
