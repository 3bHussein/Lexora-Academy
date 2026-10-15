const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
class Element {
 constructor(tag,text=''){this.tag=tag;this.textContent=text;this.children=[];this.value='';}
 append(...nodes){this.children.push(...nodes);}
 replaceChildren(...nodes){this.children=nodes;}
 insertBefore(n){this.children.push(n);}
 setAttribute(){}
 click(){this.onclick?.();}
}
function setup(raw='{}'){
 const nodes=Object.fromEntries(['#lesson','#nav','aside','#homeTab','#lessonsTab'].map(k=>[k,new Element('div')]));
 const saved=new Map([['lexoraExpansionV1',raw],['lexoraA1done','[2]']]);
 vm.runInNewContext(fs.readFileSync('scripts/academy-expansion.js','utf8'),{document:{querySelector:k=>nodes[k],createElement:t=>new Element(t)},localStorage:{getItem:k=>saved.get(k),setItem:(k,v)=>saved.set(k,v)},Blob,URL,setTimeout});
 const all=(n)=>[n,...n.children.flatMap(all)];
 const click=(text)=>{const b=all(nodes['#lesson']).find(n=>n.tag==='button'&&n.textContent===text);assert.ok(b,text);b.click();};
 nodes.aside.children[0].click();
 return {nodes,saved,click,all};
}
test('German answers persist only after a correct answer and preserve Russian progress',()=>{
 const x=setup('invalid json');x.click('Explore German');x.click('Open lesson');x.click('Hallo');assert.equal(x.saved.get('lexoraExpansionV1'),'invalid json');x.click('Guten Morgen');assert.equal(JSON.parse(x.saved.get('lexoraExpansionV1'))['German:0'],true);assert.equal(x.saved.get('lexoraA1done'),'[2]');x.click('← Learning hub');assert.ok(x.all(x.nodes['#lesson']).some(n=>n.textContent.includes('1 completed')));
});
test('PTE reading and writing keep independent completion and drafts',()=>{
 const x=setup();x.click('Open PTE studio');x.click('Start practice');x.click('The university is evaluating a bicycle-sharing trial.');assert.equal(JSON.parse(x.saved.get('lexoraExpansionV1'))['PTE:0'],true);x.click('Back to PTE studio');const cards=x.nodes['#lesson'].children.filter(n=>n.tag==='section');cards[1].children.find(n=>n.tag==='button').click();x.click('Save practice');assert.equal(JSON.parse(x.saved.get('lexoraExpansionV1'))['PTE:1'],undefined);x.all(x.nodes['#lesson']).find(n=>n.tag==='textarea').value='Trees need maintenance planning.';x.click('Save practice');assert.equal(JSON.parse(x.saved.get('lexoraExpansionV1'))['draft:1'],'Trees need maintenance planning.');
});
