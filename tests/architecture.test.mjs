import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
const source = await readFile(new URL('../src/config/ecosystem.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
const {ecosystem,products} = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
test('five distinct scene environments have valid, separated coordinates and narrative',()=>{
 assert.equal(ecosystem.length,5);assert.equal(new Set(ecosystem.map(z=>z.id)).size,5);
 for(const z of ecosystem){assert.equal(z.position.length,3);assert.ok(z.position.every(Number.isFinite));assert.ok(z.description.length>60);assert.ok(z.label.length>2);}
 for(let i=0;i<ecosystem.length;i++)for(let j=i+1;j<ecosystem.length;j++)assert.ok(Math.hypot(ecosystem[i].position[0]-ecosystem[j].position[0],ecosystem[i].position[2]-ecosystem[j].position[2])>10);
});
test('future products do not expose invented production endpoints',()=>{assert.deepEqual(products.map(p=>p.name),['Archiyar','Kitchyar','Chido']);assert.ok(products.every(p=>!p.url));});
