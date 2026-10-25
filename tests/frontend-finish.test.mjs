import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const finish=await readFile(new URL('../src/ui/finish.css',import.meta.url),'utf8');
const home=await readFile(new URL('../src/main.ts',import.meta.url),'utf8');
const catalog=await readFile(new URL('../src/catalog/main.ts',import.meta.url),'utf8');
const timeline=await readFile(new URL('../src/timeline/main.ts',import.meta.url),'utf8');

test('the three public page entries share one deliberately bounded presentation layer',()=>{
  assert.match(home,/import '\.\/ui\/finish\.css'/);
  assert.match(catalog,/import '\.\.\/ui\/finish\.css'/);
  assert.match(timeline,/import '\.\.\/ui\/finish\.css'/);
  assert.match(finish,/--rm-panel:/);
  assert.match(finish,/--rm-brass:/);
  assert.match(finish,/--rm-jade:/);
  assert.match(finish,/--rm-focus:/);
});
test('polish improves CTAs, project portfolio cards and timeline hierarchy without changing app logic',()=>{
  for(const selector of ['.ending-product-link','.site-footer','.catalog-feature','.web-case-card','.web-diff-item','.web-timeline-feature','.timeline-role','.timeline-event-panel','.timeline-stages'])
    assert.ok(finish.includes(selector),'Expected '+selector);
  assert.match(finish,/\.web-case-card:hover/);
  assert.match(finish,/\.timeline-event-toggle\[aria-expanded=true\]/);
  assert.match(finish,/\.site-nav a::after/);
  assert.doesNotMatch(finish,/(?:cameraTravelMs|minimumReadMs|window\.scrollTo|new THREE|requestAnimationFrame)/);
});
test('keyboard focus and touch-friendly reduced motion have explicit support',()=>{
  assert.match(finish,/:focus-visible/);
  assert.match(finish,/@media\(hover:none\)/);
  assert.match(finish,/@media\(prefers-reduced-motion:reduce\)/);
  assert.match(finish,/@media\(max-width:760px\)/);
  assert.match(finish,/@media\(max-width:600px\)/);
  assert.match(finish,/\.timeline-role button,[\s\S]*?min-height:42px/);
  assert.match(finish,/\.catalog-switcher a \{[\s\S]*?min-height:44px/);
});
test('finish layer does not lower the established readability floors',()=>{
  const declarations=[...finish.matchAll(/(?:font-size|font)\s*:\s*([^;}]+)/g)].map(m=>m[1]);
  for(const value of declarations)for(const m of value.matchAll(/(\d+(?:\.\d+)?)px/g))
    assert.ok(Number(m[1])>=13,value);
  assert.doesNotMatch(finish,/font-size:\s*(?:[0-9](?:\.\d+)?|1[012](?:\.\d+)?)px/);
});
