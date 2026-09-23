(()=>{
 const checks=[],assert=(n,v)=>{if(!v)throw Error(n);checks.push(n);},click=s=>document.querySelector(s).dispatchEvent(new MouseEvent('click',{bubbles:true}));
 const choose=(kind,value)=>{const e=[...document.querySelectorAll(`#${kind}-options input`)].find(e=>e.value===value);e.checked=true;e.dispatchEvent(new Event('change',{bubbles:true}));};
 click('#navigation [data-view="products"]');click('#reset');choose('customer','云织服饰');click('[data-note-category="尺寸"]');
 assert('scope visible',document.querySelector('.scope-summary').textContent.includes('云织服饰'));assert('object filters hidden',document.querySelector('#customer-filter').hidden&&document.querySelector('#category-filter').hidden&&document.querySelector('#style-filter').hidden);
 assert('same filter row',document.querySelector('.filters').contains(document.querySelector('#note-filters')));assert('scope count',parseInt(document.querySelector('.kpi-value').textContent)===5);
 click('#clear-note-scope');assert('scope cleared',!document.querySelector('.scope-summary'));assert('all size notes',parseInt(document.querySelector('.kpi-value').textContent)===16);
 click('#reset');const before=document.querySelector('.table-panel tbody').textContent;for(const key of ['customer','category','pid']){click(`[data-note-grouping="${key}"]`);assert(key+' table unchanged',document.querySelector('.table-panel tbody').textContent===before);}
 assert('opinion title',document.querySelector('.table-panel h2').textContent==='修改内容汇总');assert('no draft text',!document.body.innerText.includes('暂存'));
 const all=[...document.querySelectorAll('.table-panel tbody tr')];assert('counts',all.reduce((n,r)=>n+Number(r.cells[2].textContent),0)===36);
 click('[aria-label="下一页"]');assert('pagination',!document.querySelector('[aria-label="上一页"]').disabled);choose('note-category','尺寸');choose('note-tag','袖长');assert('filtered table',document.querySelectorAll('.table-panel tbody tr').length===1&&document.querySelector('.table-panel tbody tr').cells[1].textContent==='袖长');assert('page reset',document.querySelector('[aria-label="上一页"]').disabled);
 assert('fit',[...document.querySelectorAll('.chart-body,.report-table-body')].every(e=>e.scrollHeight<=e.clientHeight+1));
 click('[data-view="sources"]');assert('source no drafts',!document.body.innerText.includes('暂存'));click('#navigation [data-view="notes"]');click('#reset');return {passed:checks.length};
})()
