import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const main=await readFile(new URL('../src/main.ts',import.meta.url),'utf8');
const world=await readFile(new URL('../src/scene/world.ts',import.meta.url),'utf8');
const css=await readFile(new URL('../src/styles.css',import.meta.url),'utf8');

test('camera follows smooth, bidirectional scroll progress rather than wheel events',()=>{
  assert.match(main,/target-displayed/);
  assert.match(main,/Math\.exp\(-delta\*3\.1\)/);
  assert.match(world,/function update\(progress:number,seconds:number\)/);
  assert.doesNotMatch(main,/addEventListener\(['"]wheel['"]/);
});
test('opening is only the animated RAMACH wordmark with no 3D or extra controls',()=>{
  const opening=main.match(/<section class="opening"[\s\S]*?<\/section>/)?.[0];
  assert.ok(opening);
  assert.match(opening,/signature-logo/);
  assert.match(opening,/signature-strokes/);
  assert.doesNotMatch(opening,/<nav|<a\s|opening-scroll|opening-index|opening-counter|<canvas/);
  assert.match(css,/signatureDraw/);
  assert.match(css,/visibility:hidden;pointer-events:none/);
  assert.match(main,/has-entered/);
});
test('five architectural zones are widely separated',()=>{
  const raw=world.match(/const nodePositions = \[([\s\S]*?)\] as const;/)?.[1];
  assert.ok(raw);
  const coordinates=[...raw.matchAll(/\[(-?\d+),(-?\d+)\]/g)].map(m=>[Number(m[1]),Number(m[2])]);
  assert.equal(coordinates.length,5);
  for(let i=0;i<coordinates.length;i++){
    for(let j=i+1;j<coordinates.length;j++){
      assert.ok(Math.hypot(coordinates[i][0]-coordinates[j][0],coordinates[i][1]-coordinates[j][1])>27);
    }
  }
});
test('camera framing opposes each chapter copy side',()=>{
  const poses=[...world.matchAll(/\{pos:\[[^\]]+\],look:\[[^\]]+\],side:([-\d.]+)\}/g)].map(m=>Number(m[1]));
  assert.deepEqual(poses,[13,-8,8,-8,8,-8,13]);
  assert.match(world,/camera\.lookAt\(center\.addScaledVector\(screenRight,framing\)\)/);
  assert.match(main,/data-align=/);
});
test('lighting carries animated signals both away from and toward the central hub',()=>{
  assert.match(world,/reverse=j>=2/);
  assert.match(world,/q\.reverse\?1-travel:travel/);
  assert.match(world,/q\.halo\.position\.copy/);
});
test('no explicit authored CSS type is smaller than 10 CSS pixels',()=>{
  const values=[...css.matchAll(/(?:font-size\s*:\s*|font\s*:[^;]*?)(\d+(?:\.\d+)?)px/g)].map(m=>Number(m[1]));
  assert.ok(values.length>12);
  assert.ok(values.every(n=>n>=10),'Fonts smaller than 10px: '+values.filter(n=>n<10).join(', '));
});
