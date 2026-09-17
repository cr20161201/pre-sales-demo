(()=>{'use strict';
const $=s=>document.querySelector(s),esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),num=n=>Number(n).toLocaleString('zh-CN'),pct=(a,b)=>b?(a/b*100).toFixed(1)+'%':'—';
const views={products:['选款分析',''],notes:['修改分析',''],sources:['数据来源','']};
const products=[...window.DEMO_CONFIG.products,
 {id:'ST-DEMO-004',name:'西装外套',category:'外套',image:'assets/styles/jacket-navy.svg'},
 {id:'ST-DEMO-005',name:'休闲外套',category:'外套',image:'assets/styles/jacket-beige.svg'},
 {id:'ST-DEMO-006',name:'收腰连衣裙',category:'连衣裙',image:'assets/styles/dress-blue.svg'},
 {id:'ST-DEMO-007',name:'短袖连衣裙',category:'连衣裙',image:'assets/styles/dress-black.svg'}];
const customers=[{name:'云织服饰',type:'品牌客户'},{name:'青禾设计工作室',type:'设计工作室'},{name:'锦序服饰',type:'品牌客户'},{name:'禾川贸易',type:'贸易客户'},{name:'原色设计工作室',type:'设计工作室'},{name:'远帆服装贸易',type:'贸易客户'}];
const end=new Date('2026-09-15T12:00:00Z'),date=d=>new Date(end.getTime()-d*86400000).toISOString().slice(0,10),events=[];
for(let day=0;day<180;day++)products.forEach((p,i)=>{const customer=customers[(day+i*2+Math.floor(day/5))%6],shown=24+(day*7+i*11)%39,selected=Math.round(shown*(.21+i*.026+((day+i)%5)*.022)),orders=Math.floor(selected*(.20+((day+i)%4)*.07));events.push({day,date:date(day),pid:p.id,customer:customer.name,type:customer.type,category:p.category,shown,selected,orders,pieces:orders*(8+(i+day)%17)});});
const categories=['工艺','尺寸','面料','其他'],tags={工艺:['缝制','领口','袖口','辅料'],尺寸:['袖长','衣长','胸围','肩宽'],面料:['手感','克重','颜色','成分'],其他:['版型','细节']},texts={工艺:['调整缝制细节，保持表面平整。','领口增加一道加固工艺。','袖口保持原工艺，优化收边。','辅料颜色与主面料保持一致。'],尺寸:['袖长缩短 2cm，袖口保持原工艺。','衣长增加 1cm，保持原版型。','胸围增加 2cm，提升活动空间。','肩宽收窄 1cm。'],面料:['衣身面料手感更柔软，重新出样。','整件衣服减轻克重，保留现有版型。','衣身绿色降低饱和度，纽扣同步配色。','调整衬衫面料成分，保持现有款式。'],其他:['整体版型适当放松。','补充细节参考图。']};
const presetNotes=events.filter(e=>(e.day+products.findIndex(p=>p.id===e.pid))%5===0).map((e,i)=>{const cat=categories[i%7<3?1:i%7<5?0:i%7===5?2:3],t=i%tags[cat].length;return {...e,categoryName:cat,tags:[tags[cat][t]],text:texts[cat][t],photos:[],source:'预置演示'};});
let view='products',trendMetric='selected',grouping='pid',selectedNoteCategories=[],selectedNoteTags=[],selectedProducts=[],selectedCategories=[],selectedCustomers=[],noteScope=null,tablePage=1;
const sum=(rows,k)=>rows.reduce((n,r)=>n+r[k],0),period=()=>Number($('#period').value);
function matching(e){return (!selectedCategories.length||selectedCategories.includes(e.category))&&(!selectedProducts.length||selectedProducts.includes(e.pid))&&(!selectedCustomers.length||selectedCustomers.includes(e.customer));}
const data=()=>events.filter(e=>e.day<period()&&matching(e)),notes=()=>presetNotes.filter(e=>e.day<period()&&(view==='notes'?(!noteScope||((!noteScope.customers.length||noteScope.customers.includes(e.customer))&&(!noteScope.categories.length||noteScope.categories.includes(e.category))&&(!noteScope.products.length||noteScope.products.includes(e.pid)))):matching(e)));
function grouped(rows,key){return [...new Set(rows.map(r=>r[key]))].map(name=>{const list=rows.filter(r=>r[key]===name);return {name,shown:sum(list,'shown'),selected:sum(list,'selected'),orders:sum(list,'orders'),pieces:sum(list,'pieces'),count:list.length};}).sort((a,b)=>b.orders-a.orders);}
function delta(now,prev){if(!prev)return '—';const change=(now-prev)/prev*100;return `${change>=0?'↑':'↓'} ${Math.abs(change).toFixed(1)}%`;}
function kpi(label,value,unit,foot,icon='↗'){return `<article class="kpi"><span class="kpi-label">${label}</span><span class="kpi-decoration">${icon}</span><div class="kpi-value">${value}<small>${unit}</small></div>${foot?`<p class="kpi-foot">${foot}</p>`:''}</article>`;}
function stats(){const rows=data();return `<div class="kpi-grid unified-kpis">${kpi('选中次数',num(sum(rows,'selected')),'次','')}${kpi('选中率',pct(sum(rows,'selected'),sum(rows,'shown')),'','','◎')}${kpi('下单量',num(sum(rows,'orders')),'单','','▤')}</div>`;}
function panel(title,sub,body,extra='',cls=''){return `<section class="panel ${cls}"><div class="panel-head"><div><h2>${title}</h2>${sub?`<p class="panel-sub">${sub}</p>`:''}</div>${extra}</div>${body}</section>`;}
function chart(rows,metric='selected'){const bins=6,step=Math.ceil(period()/bins),points=[];for(let i=0;i<bins;i++){const low=Math.floor(i*period()/bins),high=Math.floor((i+1)*period()/bins),list=rows.filter(r=>r.day>=low&&r.day<high);points.unshift({value:metric==='rate'?(sum(list,'shown')?sum(list,'selected')/sum(list,'shown')*100:0):sum(list,metric),label:date(high-1).slice(5).replace('-','.'),end:date(low).slice(5).replace('-','.')});}const max=metric==='rate'?100:Math.ceil(Math.max(...points.map(p=>p.value),1)/100)*100,coords=points.map((p,i)=>[48+i*105,169-p.value/max*138]);const path=coords.map((p,i)=>(i?'L':'M')+p.join(',')).join(' ');return `<svg class="line-chart" viewBox="0 0 620 205" role="img" aria-label="${metric==='rate'?'选中率':metric==='orders'?'下单量':'选中次数'}趋势"><defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#4e87f3" stop-opacity=".16"/><stop offset="1" stop-color="#4e87f3" stop-opacity="0"/></linearGradient></defs>${[0,1,2,3].map(i=>`<line class="chart-grid" x1="45" x2="598" y1="${31+i*46}" y2="${31+i*46}"/><text class="chart-axis" x="2" y="${35+i*46}">${Math.round(max*(3-i)/3)}${metric==='rate'?'%':''}</text>`).join('')}<path class="chart-area" d="${path} L573,169 L48,169 Z"/><path class="chart-line" d="${path}"/>${points.map((p,i)=>`<circle class="chart-dot" cx="${coords[i][0]}" cy="${coords[i][1]}" r="3.5"><title>${p.label}—${p.end}：${metric==='rate'?p.value.toFixed(1)+'%':num(p.value)}</title></circle><text class="chart-axis" x="${coords[i][0]}" y="195" text-anchor="middle">${p.label}</text>`).join('')}</svg>`;}
function trend(title='选品趋势',metric=trendMetric){return panel(title,'',`<div class="chart-legend"><span><i></i>${metric==='rate'?'区间选中率':metric==='orders'?'下单量':'选中次数'}</span></div>${chart(data(),metric)}`,`<div class="tab-switch"><button data-metric="selected" class="${metric==='selected'?'active':''}">选中</button><button data-metric="orders" class="${metric==='orders'?'active':''}">下单</button><button data-metric="rate" class="${metric==='rate'?'active':''}">选中率</button></div>`);}
function bars(items,total,unit='次'){return items.map((r,i)=>`<div class="bar-row"><div class="bar-top"><span>${esc(r.name)}</span><strong>${num(r.value)} <span style="color:#a2adbe;font-size:10px">${unit}</span></strong></div><div class="bar-track"><div class="bar-fill" style="width:${total?r.value/total*100:0}%;background:${['#4983ef','#80a7ef','#a7c2f2','#bccff0'][i%4]}"></div></div>${r.sub?`<p class="bar-foot">${r.sub}</p>`:''}</div>`).join('')||'<div class="empty">暂无数据</div>';}
function swatch(p){return `<img class="swatch" src="${p.image}" alt="${esc(p.name)}">`;}
function noteDistribution(rows=notes()){const list=categories.map(name=>({name,value:rows.filter(r=>r.categoryName===name).length})).filter(r=>r.value).sort((a,b)=>b.value-a.value);return {rows,list};}
function donut(list){const total=list.reduce((n,r)=>n+r.value,0),colors=['#4c83ea','#79a5e9','#8ec8c5','#c8d9ed'];let start=0;const gradient=list.map((r,i)=>{const old=start;start+=r.value/Math.max(total,1)*100;return `${colors[i%4]} ${old}% ${start}%`;}).join(',');return `<div class="donut-layout"><div class="donut" style="background:${total?`conic-gradient(${gradient})`:'#edf1f7'}"><span class="donut-center">${num(total)}<small>条记录</small></span></div><div class="donut-legend">${list.map((r,i)=>`<div class="legend-row"><i style="background:${colors[i%4]}"></i>${esc(r.name)}<strong>${pct(r.value,total)}</strong></div>`).join('')}</div></div>`;}
function dimensionPage(){
 const related=notes(),relatedFor=r=>related.filter(n=>n[grouping]===r.name);
 const key=grouping,label={customer:'客户',pid:'款式',category:'品类'}[key],rows=grouped(data(),key),metric=trendMetric==='rate'?'选中率':trendMetric==='orders'?'下单量':'选中次数';
 const named=r=>key==='pid'?products.find(p=>p.id===r.name).name:r.name;
 const ranked=[...rows].sort((a,b)=>trendMetric==='rate'?(b.selected/b.shown-a.selected/a.shown):b[trendMetric]-a[trendMetric]);
 const values=ranked.map(r=>({name:named(r),value:trendMetric==='rate'?Number((r.selected/r.shown*100).toFixed(1)):r[trendMetric]}));
 const controls=`<div class="tab-switch">${[['customer','按客户'],['category','按品类'],['pid','按款式']].map(([id,name])=>`<button data-grouping="${id}" class="${key===id?'active':''}">${name}</button>`).join('')}</div>`;
 return stats().replace(/<\/div>$/,`${kpi('修改意见数量',num(related.length),'条','')}</div>`).replace('unified-kpis','unified-kpis selection-kpis')+`<div class="aggregation-heading"><span>${esc(selectedCustomers.length?selectedCustomers.join('、'):'全部客户')}</span>${controls}</div><div class="grid-main">${trend('周期趋势')}${panel(`${label}${metric}排行`,'',bars(values,Math.max(...values.map(r=>r.value),1),trendMetric==='rate'?'%':trendMetric==='orders'?'单':'次'))}</div>`+selectionNotes(related)+panel(`${label}汇总`,'',`<div class="table-wrap"><table><thead><tr><th>${label}</th><th>选中次数</th><th>选中率</th><th>下单量</th><th>修改意见数量</th><th>主要修改点</th></tr></thead><tbody>${ranked.map(r=>`<tr><td>${key==='pid'?`<div class="product-cell">${swatch(products.find(p=>p.id===r.name))}<div><strong>${esc(named(r))}</strong><small>${r.name}</small></div></div>`:esc(r.name)}</td><td>${num(r.selected)}</td><td>${pct(r.selected,r.shown)}</td><td>${num(r.orders)}</td><td>${relatedFor(r).length}</td><td>${commonNotes(relatedFor(r),'tags')}</td></tr>`).join('')||'<tr data-empty="true"><td colspan="6">暂无数据</td></tr>'}</tbody><tfoot><tr><td>合计</td><td>${num(sum(data(),'selected'))}</td><td>${pct(sum(data(),'selected'),sum(data(),'shown'))}</td><td>${num(sum(data(),'orders'))}</td><td>${related.length}</td><td>—</td></tr></tfoot></table></div>`,'','table-panel');
}
function noteGroups(rows){
 const groups=new Map();for(const n of rows){const p=products.find(p=>p.id===n.pid),key=grouping==='customer'?n.customer:grouping==='pid'?n.pid:(p?.category||'未分类');if(!groups.has(key))groups.set(key,{key,name:grouping==='pid'?(p?.name||n.pid):key,rows:[]});groups.get(key).rows.push(n);}
 return [...groups.values()].sort((a,b)=>b.rows.length-a.rows.length);
}
function commonNotes(rows,key){const counts={};rows.forEach(n=>(key==='tags'?n.tags:[n.categoryName]).forEach(t=>counts[t]=(counts[t]||0)+1));return Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([name,count])=>`${esc(name)}（${count}）`).join('、')||'—';}
function noteSummary(rows){
 const groups=new Map();for(const n of rows){for(const tag of new Set(n.tags.length?n.tags:['未选标签'])){const key=JSON.stringify([n.categoryName,tag]);if(!groups.has(key))groups.set(key,{category:n.categoryName,tag,rows:[]});groups.get(key).rows.push(n);}}
 const list=[...groups.values()].sort((a,b)=>b.rows.length-a.rows.length);
 return `<div class="table-wrap"><table><thead><tr><th>修改类别</th><th>修改标签</th><th>意见数量</th><th>占比</th><th>涉及客户数</th><th>涉及款式数</th></tr></thead><tbody>${list.map(g=>`<tr><td>${esc(g.category)}</td><td>${esc(g.tag)}</td><td>${g.rows.length}</td><td>${pct(g.rows.length,rows.length)}</td><td>${new Set(g.rows.map(n=>n.customer)).size}</td><td>${new Set(g.rows.map(n=>n.pid)).size}</td></tr>`).join('')||'<tr data-empty="true"><td colspan="6">暂无修改意见</td></tr>'}</tbody></table></div>`;
}
function tagDistribution(rows){const counts={};rows.forEach(n=>[...new Set(n.tags)].forEach(t=>counts[t]=(counts[t]||0)+1));return Object.entries(counts).map(([name,value])=>({name,value})).sort((a,b)=>b.value-a.value);}
function selectionDonut(list){
 const total=list.reduce((n,r)=>n+r.value,0),colors=['#4c83ea','#79a5e9','#8ec8c5','#c8d9ed'];let offset=0;
 const arcs=list.map((r,i)=>{const share=r.value/total*100,arc=`<circle class="category-sector" cx="100" cy="100" r="76" pathLength="100" fill="none" stroke="${colors[i%4]}" stroke-width="30" stroke-dasharray="${share} ${100-share}" stroke-dashoffset="${-offset}" transform="rotate(-90 100 100)" data-note-category="${esc(r.name)}" role="button" tabindex="0" aria-label="${esc(r.name)} ${r.value}条 ${pct(r.value,total)}"><title>${esc(r.name)}：${r.value}条，${pct(r.value,total)}</title></circle>`;offset+=share;return arc;}).join('');
 return `<div class="selection-donut-layout"><div class="selection-donut"><svg viewBox="0 0 200 200" aria-label="修改类别分布"><circle cx="100" cy="100" r="76" fill="none" stroke="#edf1f7" stroke-width="30"/>${arcs}</svg><span class="selection-donut-total">${num(total)}<small>条</small></span></div><div class="selection-donut-legend">${list.map((r,i)=>`<button data-note-category="${esc(r.name)}"><i style="background:${colors[i%4]}"></i><span>${esc(r.name)}</span><span>${r.value}条</span><strong>${pct(r.value,total)}</strong></button>`).join('')||'<span class="empty">暂无修改意见</span>'}</div></div>`;
}
function selectionNotes(rows){const dist=noteDistribution(rows),ranked=tagDistribution(rows).slice(0,5);return `<div class="grid-main">${panel('修改类别分布','',selectionDonut(dist.list))}${panel('修改标签排行','',bars(ranked,Math.max(...ranked.map(r=>r.value),1),'条'))}</div>`;}
function noteMatch(n){return (!selectedNoteCategories.length||selectedNoteCategories.includes(n.categoryName))&&(!selectedNoteTags.length||n.tags.some(t=>selectedNoteTags.includes(t)));}
function notesPage(){
 const rows=notes().filter(noteMatch),dist=noteDistribution(rows),label={customer:'客户',pid:'款式',category:'品类'}[grouping],groups=noteGroups(rows);
 const controls=`<div class="tab-switch">${[['customer','按客户'],['category','按品类'],['pid','按款式']].map(([id,name])=>`<button data-note-grouping="${id}" class="${grouping===id?'active':''}">${name}</button>`).join('')}</div>`;
 const tagMode=selectedNoteCategories.length===1,tagRows=tagDistribution(rows).slice(0,5);
 return `<div class="kpi-grid unified-kpis">${kpi('修改意见数量',num(rows.length),'条','')}${kpi('涉及客户数',new Set(rows.map(n=>n.customer)).size,'个','')}${kpi('涉及款式数',new Set(rows.map(n=>n.pid)).size,'款','')}</div><div class="aggregation-heading"><span>修改意见</span>${controls}</div><div class="grid-main">${panel(tagMode?selectedNoteCategories[0]+' · 标签分布':'修改类别分布','',tagMode?bars(tagRows,Math.max(...tagRows.map(r=>r.value),1),'条'):donut(dist.list))}${panel(`${label}修改意见排行`,'',bars(groups.map(g=>({name:g.name,value:g.rows.length})),Math.max(...groups.map(g=>g.rows.length),1),'条'))}</div>`+panel('修改意见汇总','',noteSummary(rows),'','table-panel');
}
function syncNoteFilters(){
 syncMulti('note-category',categories,selectedNoteCategories,'类别');
 const available=[...new Set((selectedNoteCategories.length?selectedNoteCategories:categories).flatMap(c=>tags[c]))];
 selectedNoteTags=selectedNoteTags.filter(t=>available.includes(t));
 syncMulti('note-tag',available,selectedNoteTags,'标签');
}
function sourcesPage(){return panel('数据来源','',`<div class="source-row"><div><h3>选款与下单</h3><p>${events.length} 条每日汇总 · 6 款 · 6 个客户</p></div><span class="badge">演示数据</span></div><div class="source-row"><div><h3>已提交修改意见</h3><p>${presetNotes.length} 条意见，关联客户、款式与日期</p></div><span class="badge">演示数据</span></div>`)+panel('统计口径','',`<div class="local-note">选中率暂按选中次数 ÷ 展示次数，下单量暂用订单数，实际口径待确认。修改意见按条计数，多标签不重复计入总量；标签占比可重叠。当前使用预置的已提交演示记录，未接入真实业务系统。</div>`);}
function scopeSummary(){if(!noteScope)return '';const names=[...noteScope.customers,...noteScope.categories,...noteScope.products.map(id=>products.find(p=>p.id===id)?.name||id)];return names.length?`<div class="scope-summary"><span>当前范围：${names.map(esc).join('、')}</span><button id="clear-note-scope" class="text-button">清除</button></div>`:'';}
function paginate(panel){
 const rows=[...panel.querySelectorAll('tbody tr:not([data-empty])')],size=4,total=rows.length,pages=Math.max(1,Math.ceil(total/size));
 tablePage=Math.min(Math.max(1,tablePage),pages);
 rows.forEach((row,i)=>row.hidden=i<(tablePage-1)*size||i>=tablePage*size);
 const nav=document.createElement('nav');nav.className='table-pagination';nav.setAttribute('aria-label','表格分页');
 nav.innerHTML=`<span>共 ${total} 条</span><span>每页 ${size} 条</span><button data-table-page="${tablePage-1}" ${tablePage===1?'disabled':''} aria-label="上一页">‹</button><span>${tablePage} / ${pages}</span><button data-table-page="${tablePage+1}" ${tablePage===pages?'disabled':''} aria-label="下一页">›</button>`;
 panel.append(nav);
}
function render(){const savedScroll=window.scrollY;$('#note-filters').hidden=view!=='notes';for(const id of ['category-filter','customer-filter','style-filter'])$('#'+id).hidden=view==='notes';const [title,description]=views[view];$('#page-description').textContent=description;$('#navigation').innerHTML=Object.entries(views).filter(([id])=>id!=='sources').map(([id,v])=>`<button data-view="${id}" class="${view===id?'active':''}" aria-current="${view===id?'page':'false'}">${v[0]}</button>`).join('');$('.filters').hidden=view==='sources';document.querySelector('.page-actions [data-view="sources"]').classList.toggle('active',view==='sources');$('#content').innerHTML=({products:dimensionPage,notes:notesPage,sources:sourcesPage})[view]();if(view==='notes')$('#content').insertAdjacentHTML('afterbegin',scopeSummary());$('#content').classList.toggle('stable-report',view!=='sources');if(view!=='sources'){for(const p of document.querySelectorAll('#content > .grid-main > .panel')){const body=document.createElement('div');body.className='chart-body';while(p.children.length>1)body.append(p.children[1]);p.append(body);}const table=$('#content > .table-panel');if(table){const body=document.createElement('div');body.className='report-table-body';while(table.children.length>1)body.append(table.children[1]);table.append(body);paginate(table);}}window.scrollTo(0,savedScroll);}
function syncProductPicker(){
 const list=products.filter(p=>!selectedCategories.length||selectedCategories.includes(p.category));
 selectedProducts=selectedProducts.filter(id=>list.some(p=>p.id===id));
 $('#style-options').innerHTML=list.map(p=>`<label><input type="checkbox" value="${p.id}" ${selectedProducts.includes(p.id)?'checked':''}><span>${esc(p.name)}<small>${p.id}</small></span></label>`).join('');
 $('#style-summary').textContent=selectedProducts.length===1?products.find(p=>p.id===selectedProducts[0]).name:selectedProducts.length?`已选 ${selectedProducts.length} 款`:'全部款式';
}
function syncMulti(kind,list,selected,label){
 $('#'+kind+'-options').innerHTML=list.map(name=>`<label><input type="checkbox" value="${esc(name)}" ${selected.includes(name)?'checked':''}><span>${esc(name)}</span></label>`).join('');
 $('#'+kind+'-summary').textContent=selected.length===1?selected[0]:selected.length?`已选 ${selected.length} 项`:`全部${label}`;
}
function syncCategories(){syncMulti('category',[...new Set(products.map(p=>p.category))],selectedCategories,'品类');}
function syncCustomers(){const list=customers.map(c=>c.name);selectedCustomers=selectedCustomers.filter(name=>list.includes(name));syncMulti('customer',list,selectedCustomers,'客户');}
for(const kind of ['note-category','note-tag']){
 $('#'+kind+'-options').addEventListener('change',()=>{const values=[...document.querySelectorAll('#'+kind+'-options input:checked')].map(e=>e.value);if(kind==='note-category')selectedNoteCategories=values;else selectedNoteTags=values;syncNoteFilters();tablePage=1;render();});
}
for(const kind of ['category','customer']){
 $('#'+kind+'-options').addEventListener('change',()=>{const selected=[...$('#'+kind+'-options').querySelectorAll('input:checked')].map(e=>e.value);if(kind==='category'){selectedCategories=selected;syncCategories();syncProductPicker();}else{selectedCustomers=selected;syncCustomers();}tablePage=1;render();});
}
document.addEventListener('click',e=>{const b=e.target.closest('button,[data-note-category]');if(!b)return;
 if(b.dataset.tablePage){tablePage=Number(b.dataset.tablePage);render();return;}
 if(b.dataset.noteCategory){selectedNoteCategories=[b.dataset.noteCategory];selectedNoteTags=[];syncNoteFilters();noteScope={customers:[...selectedCustomers],categories:[...selectedCategories],products:[...selectedProducts]};view='notes';tablePage=1;render();}
 if(b.dataset.view){tablePage=1;if(b.dataset.view==='notes'&&view!=='notes')noteScope=null;view=b.dataset.view;render();}
 if(b.id==='clear-note-scope'){noteScope=null;tablePage=1;render();}
 if(b.dataset.noteGrouping){tablePage=1;grouping=b.dataset.noteGrouping;render();}
 if(b.dataset.grouping){tablePage=1;grouping=b.dataset.grouping;render();}
 if(b.dataset.metric){tablePage=1;trendMetric=b.dataset.metric;render();}
 if(b.id==='clear-styles'){selectedProducts=[];tablePage=1;syncProductPicker();render();}
 if(b.dataset.clearFilter==='note-category'||b.dataset.clearFilter==='note-tag'){if(b.dataset.clearFilter==='note-category')selectedNoteCategories=[];selectedNoteTags=[];syncNoteFilters();tablePage=1;render();return;}
 if(b.dataset.clearFilter){if(b.dataset.clearFilter==='category'){selectedCategories=[];syncCategories();syncProductPicker();}else{selectedCustomers=[];syncCustomers();}tablePage=1;render();}
 if(b.dataset.closeFilter)$('#'+b.dataset.closeFilter+'-picker').open=false;
 if(b.id==='close-styles')$('#style-picker').open=false;
});
$('#style-options').addEventListener('change',()=>{selectedProducts=[...$('#style-options').querySelectorAll('input:checked')].map(e=>e.value);tablePage=1;syncProductPicker();render();});
document.addEventListener('click',e=>{for(const id of ['style','category','customer','note-category','note-tag'])if(!$('#'+id+'-picker').contains(e.target))$('#'+id+'-picker').open=false;});
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('.category-sector')){e.preventDefault();e.target.dispatchEvent(new MouseEvent('click',{bubbles:true}));}if(e.key==='Escape')for(const id of ['style','category','customer','note-category','note-tag'])$('#'+id+'-picker').open=false;});
$('#period').addEventListener('change',()=>{tablePage=1;render();});
$('#reset').onclick=()=>{tablePage=1;$('#period').value='30';selectedCategories=[];selectedCustomers=[];selectedProducts=[];if(view==='notes'){noteScope=null;selectedNoteCategories=[];selectedNoteTags=[];syncNoteFilters();}syncCategories();syncCustomers();syncProductPicker();render();};
let toastTimer;$('#refresh').onclick=()=>{render();$('#analytics-toast').textContent='已刷新';$('#analytics-toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#analytics-toast').hidden=true,2300);};
syncNoteFilters();syncCategories();syncCustomers();syncProductPicker();render();
})();
