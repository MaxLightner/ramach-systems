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
  assert.match(finish,/--rm-surface:/);
  assert.match(finish,/--rm-sand:/);
  assert.match(finish,/--rm-green:/);
  assert.match(finish,/--rm-focus:/);
});
test('redesign adds an editorial directory, specimen diagrams, and a technical timeline hierarchy without changing app logic',()=>{
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
  assert.match(finish,/@media\(max-width:740px\)/);
  assert.match(finish,/@media\(max-width:420px\)/);
  assert.match(finish,/\.timeline-role button,[\s\S]*?min-height:44px/);
  assert.match(finish,/\.catalog-switcher a \{[\s\S]*?min-height:44px/);
});
test('finish layer does not lower the established readability floors',()=>{
  const declarations=[...finish.matchAll(/(?:font-size|font)\s*:\s*([^;}]+)/g)].map(m=>m[1]);
  for(const value of declarations)for(const m of value.matchAll(/(\d+(?:\.\d+)?)px/g))
    assert.ok(Number(m[1])>=13,value);
  assert.doesNotMatch(finish,/font-size:\s*(?:[0-9](?:\.\d+)?|1[012](?:\.\d+)?)px/);
});

test('redesign preserves one functioning CTA and exactly six real product destinations',()=>{
  const ending=home.slice(home.indexOf('<section class="ending"'),home.indexOf('<footer class="site-footer"'));
  assert.equal((ending.match(/id="open-callback"/g)||[]).length,1);
  assert.equal((ending.match(/class="ending-product-link(?: ending-product-link-service)?"/g)||[]).length,6);
  for(const key of ['archiyar','chido','kitchyar','kamcheh','mizato','websites'])
    assert.ok(ending.includes('href="./catalog.html?product='+key+'"'));
  assert.match(ending,/class="ending-statement"/);
  assert.match(ending,/class="ending-directory-head"/);
  assert.match(finish,/\.ending-product-links\s*\{[\s\S]*?repeat\(3,minmax\(0,1fr\)\)/);
  assert.match(finish,/\.ending-product-title small/);
});
test('catalog shows each product in a scoped technical specimen and meaningful accent system',()=>{
  assert.match(catalog,/document\.documentElement\.dataset\.product=selected/);
  assert.match(catalog,/class="catalog-diagram"/);
  assert.match(catalog,/class="catalog-diagram-halo"/);
  assert.match(catalog,/class="catalog-visual-foot"/);
  assert.match(finish,/html\[data-product="archiyar"\]/);
  assert.match(finish,/html\[data-product="websites"\]/);
  assert.match(finish,/\.web-case-card:first-child/);
  assert.match(finish,/\.web-diff-grid/);
});
test('design redesign does not displace the cinematic contract or product navigation',()=>{
  assert.match(home,/const cameraTravelMs=2500/);
  assert.match(home,/const minimumReadMs=780/);
  assert.match(home,/path\.animate\(/);
  assert.match(home,/goToStop\(currentStop\+direction\)/);
  assert.match(finish,/The first act belongs to the user's SVG stroke draw/);
  assert.match(finish,/background:radial-gradient/);
  assert.match(finish,/\.timeline-event-toggle\[aria-expanded=true\]/);
});
test('public pages support keyboard skip-navigation and visible accessible focus',()=>{
  assert.match(catalog,/href="#catalog-main"/);
  assert.match(catalog,/id="catalog-main"/);
  assert.match(timeline,/class="timeline-skip" href="#timeline-main"/);
  assert.match(timeline,/id="timeline-main"/);
  assert.match(finish,/:focus-visible/);
  assert.match(finish,/\.catalog-skip:focus-visible,\.timeline-skip:focus-visible/);
});
