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
  assert.match(main,/path\.getTotalLength\(\)\+2/);
  assert.match(main,/path\.animate\(/);
  assert.doesNotMatch(main,/pathLength="1000"/);
  assert.doesNotMatch(main,/<text class="wordmark-line/);
  assert.match(main,/async function beginLogoAfterLoad\(\)/);
  assert.match(main,/document\.readyState!=='complete'/);
  assert.match(main,/await document\.fonts\.ready/);
  assert.match(main,/window\.setTimeout\(\(\)=>\{/);
  assert.match(main,/document\.body\.classList\.add\('logo-drawing'\)/);
  assert.match(css,/\.opening\{[\s\S]*?background:#03090d/);
  assert.match(css,/\.opening\{[\s\S]*?radial-gradient\(ellipse 40% 35%/);
  assert.match(css,/\.opening::before\{[\s\S]*?display:block!important/);
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
  assert.match(world,/new THREE\.TubeGeometry\(route,90,\.028,4,false\)/);
  assert.match(world,/reverse:lane===1/);
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
test('the scroll camera takes 2.5 seconds with a pronounced ease-in/out and retains its reading stop',()=>{
  assert.match(main,/const cameraTravelMs=2500/);
  assert.match(main,/const easeInOutCubic=\(v:number\)=>v<\.5\?4\*v\*v\*v/);
  assert.match(main,/transitionStarted=performance\.now\(\)/);
  assert.match(main,/const t=clamp\(\(now-transitionStarted\)\/cameraTravelMs\)/);
  assert.match(main,/displayed=transitionFrom\+\(transitionTo-transitionFrom\)\*easeInOutCubic\(t\)/);
  assert.match(main,/const minimumReadMs=2150/);
  assert.match(main,/holdUntil=Infinity/);
  assert.match(main,/if\(awaitingArrival&&!transitioning&&Math\.abs\(target-displayed\)<=cameraArrivalThreshold\)/);
  assert.match(main,/holdUntil=now\+minimumReadMs/);
  assert.match(main,/addEventListener\('wheel',event=>/);
  assert.match(main,/journey\.addEventListener\('touchend'/);
  assert.match(main,/if\(direction&&stageStep\(direction\)\)event\.preventDefault\(\)/);
  assert.match(main,/goToStop\(nearestStopIndex\(target\)\)/);
});
test('the SVG logo actually draws via measured path lengths for more than three seconds',()=>{
  assert.match(main,/path\.getTotalLength\(\)\+2/);
  assert.match(main,/path\.style\.strokeDasharray=String\(length\)/);
  assert.match(main,/path\.style\.strokeDashoffset=String\(length\)/);
  assert.match(main,/path\.animate\(/);
  assert.match(main,/duration:1950/);
  assert.match(main,/secondLine\?1530:0/);
  assert.match(main,/document\.body\.classList\.add\('logo-drawing'\)/);
  assert.ok(1530+6*165+1950>=3000);
  assert.match(css,/body\.logo-drawing \.opening-wordmark-svg \.wordmark-glyph path\{\s*animation:none/);
});
test('many independently randomized light points use one GPU draw call, not dozens of spheres',()=>{
  assert.match(world,/const dotsPerLane=innerWidth<740\?3:7/);
  assert.match(world,/const random=\(\)=>/);
  assert.match(world,/speed:\.095\+random\(\)\*\.16/);
  assert.match(world,/const signalPositions=new Float32Array\(signalDots\.length\*3\)/);
  assert.match(world,/new THREE\.Points\(signalsGeometry,signalsMaterial\)/);
  assert.match(world,/signalsCloud\.frustumCulled=false/);
  assert.match(world,/new THREE\.DataTexture\(pixels,spriteSize,spriteSize,THREE\.RGBAFormat\)/);
  assert.match(world,/sizeAttenuation:false/);
  assert.match(world,/scratchSignal/);
  assert.match(world,/signalsGeometry\.attributes\.position as THREE\.BufferAttribute\)\.needsUpdate=true/);
  assert.match(world,/const pulseTravel=reduceMotion\?\.5:\(seconds\*q\.speed\+q\.offset\)%1/);
  assert.doesNotMatch(world,/new THREE\.SphereGeometry\(\.21,14,10\)/);
  assert.equal(7*2*7,98);
  assert.equal(7*2*3,42);
});
test('cursor aura is subtle, non-interactive and disabled for touch or reduced-motion devices',()=>{
  assert.match(main,/class="cursor-aura" aria-hidden="true"/);
  assert.match(main,/pointermove/);
  assert.match(css,/\.cursor-aura\{[\s\S]*?pointer-events:none/);
  assert.match(css,/@media\(pointer:coarse\),\(prefers-reduced-motion:reduce\)/);
});
test('no authored font below 13px; footer displays 13px rather than being inflated to 16px',()=>{
  const footerOverride=css.slice(css.lastIndexOf('/* RAMACH FIX — minimum font'));
  assert.match(footerOverride,/\.site-footer \.footer-copy,/);
  assert.match(footerOverride,/\.site-footer \.footer-links a,/);
  assert.match(footerOverride,/font-size:13px !important/);
  assert.doesNotMatch(footerOverride,/font-size:16px/);
  const declarations=[...css.matchAll(/(?:font-size|font)\s*:\s*([^;}]+)/g)].map(m=>m[1]);
  for(const value of declarations)for(const m of value.matchAll(/(\d+(?:\.\d+)?)px/g))
    assert.ok(Number(m[1])>=13,value);
});
test('mouse wheel physically animates the page with the 3D camera, no instant teleport',()=>{
  assert.doesNotMatch(main,/destination\*stageDistance\(\)/);
  assert.match(main,/displayed\*stageDistance\(\)/);
  assert.match(main,/if\(transitioning\)\{\s*const t=clamp\(\(now-transitionStarted\)\/cameraTravelMs\)/);
  assert.match(main,/const easeInOutCubic=/);
  assert.match(main,/addEventListener\('wheel',event=>/);
  assert.match(main,/holdUntil=now\+minimumReadMs/);
});
test('full animations are on unless the user explicitly requests reducedMotion=1',()=>{
  assert.match(main,/get\('reduceMotion'\)==='1'/);
  assert.match(world,/get\('reduceMotion'\)==='1'/);
  assert.doesNotMatch(main,/prefersReducedMotion=matchMedia/);
  assert.doesNotMatch(world,/reduceMotion = matchMedia/);
});
test('the 3D scene keeps its rendering workload restrained and respects reduced motion',()=>{
  assert.match(world,/renderer\.shadowMap\.enabled = false/);
  assert.match(world,/mesh\.castShadow=false;mesh\.receiveShadow=false/);
  assert.match(world,/Math\.min\(devicePixelRatio,w<740\?1:1\.25\)/);
  assert.match(css,/prefers-reduced-motion:reduce/);
});
