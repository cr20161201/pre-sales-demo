(()=>{
 const checks=[],assert=(n,v)=>{if(!v)throw Error(n);checks.push(n);},click=s=>document.querySelector(s).click(),count=()=>parseInt(document.querySelector('.kpi-value').textContent.replaceAll(',',''));
 const choose=(kind,value,on=true)=>{const e=[...document.querySelectorAll(`#${kind}-options input`)].find(e=>e.value===value);e.checked=on;e.dispatchEvent(new Event('change',{bubbles:true}));};
 click('#navigation [data-view="products"]');click('#reset');
 assert('four KPIs',document.querySelectorAll('.unified-kpis>.kpi').length===4);assert('four charts',document.querySelectorAll('.chart-body').length===4);
 const selected=count();click('[data-note-category="尺寸"]');assert('drilldown',document.querySelector('#note-category-summary').textContent==='尺寸');assert('tag chart',document.querySelector('.grid-main h2').textContent.includes('标签'));
 const sizeCount=count();choose('note-tag','袖长');const sleeveCount=count();choose('note-tag','衣长');assert('tag union',count()>=sleeveCount&&count()<=sizeCount);
 click('#navigation [data-view="products"]');assert('notes do not filter selection',count()===selected);assert('note filters hidden',document.querySelector('#note-filters').hidden);
 click('#navigation [data-view="notes"]');assert('tags retained',document.querySelectorAll('#note-tag-options input:checked').length===2);
 choose('note-category','工艺');assert('multi category chart',document.querySelector('.grid-main h2').textContent==='修改类别分布');
 choose('note-category','尺寸',false);assert('invalid tags removed',document.querySelectorAll('#note-tag-options input:checked').length===0);
 click('#reset');choose('customer','云织服饰');choose('category','衬衫');choose('style','ST-20260914-002');click('[data-note-grouping="customer"]');
 const rows=[...document.querySelectorAll('.table-panel tbody tr:not([data-empty])')];assert('customer scope',rows.length===1&&rows[0].cells[0].textContent==='云织服饰');
 assert('summary matches KPI',Number(rows[0].cells[1].textContent)===count());click('#navigation [data-view="products"]');assert('shared filters',document.querySelector('#customer-summary').textContent==='云织服饰');
 click('#reset');for(const view of ['products','notes']){click(`#navigation [data-view="${view}"]`);click('#reset');for(const key of ['pid','category','customer']){click(`[data-${view==='notes'?'note-grouping':'grouping'}="${key}"]`);assert(view+key+' fit',[...document.querySelectorAll('.chart-body,.report-table-body,.kpi')].every(e=>e.scrollHeight<=e.clientHeight+1));}}
 click('#navigation [data-view="products"]');click('[data-grouping="pid"]');click('[aria-label="下一页"]');assert('pagination',document.querySelector('[aria-label="上一页"]').disabled===false);click('#reset');
 return {passed:checks.length};
})()
