(()=>{
 const checks=[],assert=(name,ok)=>{if(!ok)throw Error(name);checks.push(name);},click=s=>document.querySelector(s).click();
 const choose=(kind,value)=>{const e=[...document.querySelectorAll(`#${kind}-options input`)].find(e=>e.value===value);e.checked=true;e.dispatchEvent(new Event('change',{bubbles:true}));};
 click('#reset');click('#navigation [data-view="products"]');
 assert('two menus',document.querySelectorAll('#navigation button').length===2);
 choose('customer','云织服饰');choose('category','衬衫');choose('style','ST-20260914-002');
 document.querySelector('#period').value='90';document.querySelector('#period').dispatchEvent(new Event('change'));
 click('[data-grouping="customer"]');
 const selection=()=>['customer','category','style'].map(k=>[...document.querySelectorAll(`#${k}-options input:checked`)].map(e=>e.value)).concat(document.querySelector('#period').value);
 const before=JSON.stringify(selection()),value=document.querySelector('.kpi-value').textContent;
 click('#navigation [data-view="notes"]');
 assert('filters retained',JSON.stringify(selection())===before);
 assert('group retained',document.querySelector('[data-note-grouping="customer"]').classList.contains('active'));
 const rows=[...document.querySelectorAll('.table-panel tbody tr:not([data-empty])')];
 assert('customer scoped',rows.length===1&&rows[0].cells[0].textContent==='云织服饰');
 assert('note sum matches',rows.reduce((s,r)=>s+Number(r.cells[1].textContent),0)===parseInt(document.querySelector('.kpi-value').textContent));
 click('#navigation [data-view="products"]');assert('return keeps metrics',document.querySelector('.kpi-value').textContent===value);
 click('#reset');choose('customer','云织服饰');choose('customer','禾川贸易');
 assert('multiple customers',document.querySelectorAll('.table-panel tbody tr:not([data-empty])').length===2);
 click('#reset');let baseline;
 for(const view of ['products','notes']){click(`#navigation [data-view="${view}"]`);for(const key of ['customer','category','pid']){
 click(`[data-${view==='notes'?'note-grouping':'grouping'}="${key}"]`);
 const geometry=JSON.stringify([...document.querySelectorAll('#content>.kpi-grid,#content>.aggregation-heading,#content>.grid-main,#content>.table-panel')].map(e=>[e.offsetTop,e.offsetHeight]));baseline??=geometry;
 assert(view+key+' geometry',geometry===baseline);
 assert(view+key+' fit',[...document.querySelectorAll('.chart-body,.report-table-body')].every(e=>e.scrollHeight<=e.clientHeight+1));
 const table=document.querySelector('.table-panel'),rows=[...table.querySelectorAll('tbody tr:not([data-empty])')];assert(view+key+' rows',rows.length>0&&rows.length<=(key==='category'?3:6));
 if(view==='notes')assert(key+' total',rows.reduce((s,r)=>s+Number(r.cells[1].textContent),0)===parseInt(document.querySelector('.kpi-value').textContent));
 }}
 click('#navigation [data-view="products"]');click('[data-grouping="pid"]');return {passed:checks.length};
})()
