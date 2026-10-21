(()=>{'use strict';
const $=s=>document.querySelector(s),esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),num=n=>Number(n).toLocaleString('zh-CN'),pct=(a,b)=>b?(a/b*100).toFixed(1)+'%':'—';
const views={products:['选款分析',''],notes:['修改分析',''],colors:['颜色分析',''],sources:['数据来源','']};
const products=[...window.DEMO_CONFIG.products,
 {id:'ST-DEMO-004',name:'西装外套',category:'外套',image:'assets/styles/jacket-navy.svg'},
 {id:'ST-DEMO-005',name:'休闲外套',category:'外套',image:'assets/styles/jacket-beige.svg'},
 {id:'ST-DEMO-006',name:'收腰连衣裙',category:'连衣裙',image:'assets/styles/dress-blue.svg'},
 {id:'ST-DEMO-007',name:'短袖连衣裙',category:'连衣裙',image:'assets/styles/dress-black.svg'}];
const customers=[{name:'云织服饰',type:'品牌客户'},{name:'青禾设计工作室',type:'设计工作室'},{name:'锦序服饰',type:'品牌客户'},{name:'禾川贸易',type:'贸易客户'},{name:'原色设计工作室',type:'设计工作室'},{name:'远帆服装贸易',type:'贸易客户'}];
const end=new Date('2026-09-15T12:00:00Z'),date=d=>new Date(end.getTime()-d*86400000).toISOString().slice(0,10);
const events=SamplingData.createOrders(products,customers);
const categories=['工艺','尺寸','面料','其他'],tags={工艺:['缝制','领口','袖口','辅料'],尺寸:['袖长','衣长','胸围','肩宽'],面料:['手感','克重','颜色','成分'],其他:['版型','细节']},texts={工艺:['调整缝制细节，保持表面平整。','领口增加一道加固工艺。','袖口保持原工艺，优化收边。','辅料颜色与主面料保持一致。'],尺寸:['袖长缩短 2cm，袖口保持原工艺。','衣长增加 1cm，保持原版型。','胸围增加 2cm，提升活动空间。','肩宽收窄 1cm。'],面料:['衣身面料手感更柔软，重新出样。','整件衣服减轻克重，保留现有版型。','衣身绿色降低饱和度，纽扣同步配色。','调整衬衫面料成分，保持现有款式。'],其他:['整体版型适当放松。','补充细节参考图。']};
const presetNotes=SamplingData.createNotes(events,categories,tags,texts);
const colorRecords=ColorAnalysis.createRecords(events);
let colorTableMode='pair',colorGroupings={material:'all',code:'all',pair:'all',table:'all'};
let view=['notes','colors'].includes(location.hash.slice(1))?location.hash.slice(1):'products',rankMetric='first',grouping='pid',rankGrouping='pid',selectionNoteGrouping='pid',noteGrouping='customer',selectedNoteCategories=[],selectedNoteTags=[],selectedProducts=[],selectedCategories=[],selectedCustomers=[],noteScope=null,colorScope=null,analysisOrigin=null,tablePage=1;
const sum=(rows,k)=>rows.reduce((n,r)=>n+r[k],0),period=()=>Number($('#period').value);
function matching(e){return (!selectedCategories.length||selectedCategories.includes(e.category))&&(!selectedProducts.length||selectedProducts.includes(e.pid))&&(!selectedCustomers.length||selectedCustomers.includes(e.customer));}
const data=()=>events.filter(e=>e.day<period()&&matching(e)),notes=()=>presetNotes.filter(e=>e.day<period()&&matching(e));
function grouped(rows,key){return [...new Set(rows.map(r=>r[key]))].map(name=>{const list=rows.filter(r=>r[key]===name);return {name,first:sum(list,'first'),second:sum(list,'second'),third:sum(list,'third'),pieces:sum(list,'pieces'),count:list.length};}).sort((a,b)=>b.first-a.first);}
function delta(now,prev){if(!prev)return '—';const change=(now-prev)/prev*100;return `${change>=0?'↑':'↓'} ${Math.abs(change).toFixed(1)}%`;}
function kpi(label,value,unit,foot,icon='↗'){return `<article class="kpi"><span class="kpi-label">${label}</span><span class="kpi-decoration">${icon}</span><div class="kpi-value">${value}<small>${unit}</small></div>${foot?`<p class="kpi-foot">${foot}</p>`:''}</article>`;}
const selectionMetrics=[['first','首次打样'],['second','二次打样'],['third','三次及以上打样']];
const metricLabel=key=>selectionMetrics.find(([id])=>id===key)[1];
const metricUnit=key=>'次';
function stats(){const rows=data();return `<div class="kpi-grid unified-kpis selection-three-kpis">${selectionMetrics.map(([key,label])=>kpi(label,num(sum(rows,key)),metricUnit(key),'')).join('')}</div>`;}
function panel(title,sub,body,extra='',cls=''){return `<section class="panel ${cls}"><div class="panel-head"><div><h2>${title}</h2>${sub?`<p class="panel-sub">${sub}</p>`:''}</div>${extra}</div>${body}</section>`;}
const trendColors={first:'#527fea',second:'#d68b2d',third:'#279b8f'};
const hiddenTrendMetrics=new Set();
function chart(rows){
 const points=[];
 for(let i=0;i<6;i++){const low=Math.floor(i*period()/6),high=Math.floor((i+1)*period()/6),list=rows.filter(r=>r.day>=low&&r.day<high);points.unshift({values:Object.fromEntries(selectionMetrics.map(([key])=>[key,sum(list,key)])),label:date(high-1).slice(5).replace('-','.'),end:date(low).slice(5).replace('-','.')});}
 // Keep a shared, stable scale when a series is hidden.
 const peak=Math.max(...points.flatMap(p=>Object.values(p.values)),1),step=10**Math.floor(Math.log10(peak)),max=Math.ceil(peak/step)*step;
 const lines=selectionMetrics.filter(([key])=>!hiddenTrendMetrics.has(key)).map(([key,label])=>{
  const coords=points.map((p,i)=>[48+i*105,169-p.values[key]/max*138]);
  return `<g data-trend-series="${key}" aria-label="${label}"><path fill="none" stroke="${trendColors[key]}" stroke-width="2" d="${coords.map((p,i)=>(i?'L':'M')+p.join(',')).join(' ')}"/>${coords.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3.5" fill="white" stroke="${trendColors[key]}" stroke-width="1.5"/>`).join('')}</g>`;
 }).join('');
 return `<div class="multi-trend"><svg class="line-chart" viewBox="0 0 620 205" role="group" aria-label="首次打样、二次打样、三次及以上打样周期趋势">${[0,1,2,3].map(i=>`<line class="chart-grid" x1="45" x2="598" y1="${31+i*46}" y2="${31+i*46}"/><text class="chart-axis" x="2" y="${35+i*46}">${Math.round(max*(3-i)/3)}</text>`).join('')}${lines}${points.map((p,i)=>`<text class="chart-axis" x="${48+i*105}" y="195" text-anchor="middle">${p.label}</text>`).join('')}${points.map((p,i)=>`<g class="trend-point" tabindex="0" aria-label="${p.label}—${p.end}，${selectionMetrics.map(([key,label])=>label+' '+num(p.values[key])+metricUnit(key)).join('，')}"><rect x="${i===0?40:48+i*105-52}" y="20" width="${i===0||i===5?65:105}" height="154" fill="transparent"/><g class="trend-tooltip" pointer-events="none"><rect x="${Math.min(48+i*105,380)}" y="27" width="220" height="100" rx="5" fill="#fff" stroke="#dce3ed"/><text x="${Math.min(48+i*105,380)+12}" y="48" fill="#333">${p.label}—${p.end}</text>${selectionMetrics.map(([key,label],j)=>`<text x="${Math.min(48+i*105,380)+12}" y="${70+j*21}" fill="${trendColors[key]}">${label}：${num(p.values[key])} ${metricUnit(key)}</text>`).join('')}</g></g>`).join('')}</svg></div>`;
}
function trend(title='周期趋势'){return panel(title,'',chart(data()),`<div class="trend-legend" aria-label="趋势图例">${selectionMetrics.map(([key,label])=>`<button data-trend-toggle="${key}" aria-pressed="${!hiddenTrendMetrics.has(key)}" class="${hiddenTrendMetrics.has(key)?'is-hidden':''}"><i style="background:${trendColors[key]}"></i>${label}</button>`).join('')}</div>`);}
function bars(items,total,unit='次'){return items.map((r,i)=>`<div class="bar-row"><div class="bar-top"><span>${esc(r.name)}</span><strong>${num(r.value)} <span style="color:#a2adbe;font-size:10px">${unit}</span></strong></div><div class="bar-track"><div class="bar-fill" style="width:${total?r.value/total*100:0}%;background:${['#4983ef','#80a7ef','#a7c2f2','#bccff0'][i%4]}"></div></div>${r.sub?`<p class="bar-foot">${r.sub}</p>`:''}</div>`).join('')||'<div class="empty">暂无数据</div>';}
function swatch(p){return `<img class="swatch" src="${p.image}" alt="${esc(p.name)}">`;}
function noteDistribution(rows=notes()){const list=categories.map(name=>({name,value:rows.filter(r=>r.categoryName===name).length})).filter(r=>r.value).sort((a,b)=>b.value-a.value);return {rows,list};}
function donut(list){const total=list.reduce((n,r)=>n+r.value,0),colors=['#4c83ea','#79a5e9','#8ec8c5','#c8d9ed'];let start=0;const gradient=list.map((r,i)=>{const old=start;start+=r.value/Math.max(total,1)*100;return `${colors[i%4]} ${old}% ${start}%`;}).join(',');return `<div class="donut-layout"><div class="donut" style="background:${total?`conic-gradient(${gradient})`:'#edf1f7'}"><span class="donut-center">${num(total)}<small>条记录</small></span></div><div class="donut-legend">${list.map((r,i)=>`<div class="legend-row"><i style="background:${colors[i%4]}"></i>${esc(r.name)}<strong>${pct(r.value,total)}</strong></div>`).join('')}</div></div>`;}
function dimensionControls(attr,current,labels=[['customer','按客户'],['category','按品类'],['pid','按款式']]){return `<div class="tab-switch" aria-label="统计维度">${labels.map(([id,name])=>`<button data-${attr}="${id}" class="${current===id?'active':''}" aria-pressed="${current===id}">${name}</button>`).join('')}</div>`;}
function groupedLabel(key){return {customer:'客户',category:'品类',pid:'款式'}[key]||'维度';}
function namedGroup(key,name){return key==='pid'?(products.find(p=>p.id===name)?.name||name):name;}
function rankingPanel(title,rows,key,metric='first',unit='次',attr='rank-grouping',current=rankGrouping){const values=grouped(rows,key).sort((a,b)=>b[metric]-a[metric]).map(r=>({name:namedGroup(key,r.name),value:r[metric]}));return panel(title,'',bars(values,Math.max(...values.map(r=>r.value),1),unit),`<div class="ranking-controls">${dimensionControls('rank-metric',rankMetric,selectionMetrics)}${dimensionControls(attr,current)}</div>`);}
function dimensionPage(){
 const related=notes(),relatedFor=r=>related.filter(n=>n[grouping]===r.name);
 const availableColors=colorRecords.filter(r=>r.day<period()&&matching(r));
 const colorSummary=rows=>`${new Set(rows.map(r=>r.material)).size}种原料 · ${new Set(rows.map(r=>r.code)).size}种颜色 · ${new Set(rows.map(r=>JSON.stringify([r.material,r.code]))).size}种纱线`;
 const colorLink=r=>{const rows=availableColors.filter(c=>c[grouping]===r.name),summary=colorSummary(rows);return rows.length?`<button class="text-button analysis-drill material-color-summary" data-analysis-target="colors" data-dimension="${grouping}" data-value="${esc(r.name)}" aria-label="查看${esc(namedGroup(grouping,r.name))}颜色分析：${summary}">${summary}</button>`:summary;};
 const drill=(target,r,count)=>count?`<button class="text-button analysis-drill" data-analysis-target="${target}" data-dimension="${grouping}" data-value="${esc(r.name)}" aria-label="查看${esc(namedGroup(grouping,r.name))}${target==='colors'?'颜色':'修改'}分析">${num(count)}</button>`:'0';
 const key=grouping,label=groupedLabel(key),named=r=>namedGroup(key,r.name);
 const tableRows=grouped(data(),grouping),tableExtra=`<div class="source-table-controls">${dimensionControls('grouping',grouping)}${exportButton(data().length)}</div>`;
 return stats()+`<div class="aggregation-heading"><span>${esc(selectedCustomers.length?selectedCustomers.join('、'):'全部客户')}</span></div><div class="grid-main">${trend('周期趋势')}${rankingPanel(`${groupedLabel(rankGrouping)}${metricLabel(rankMetric)}排行`,data(),rankGrouping,rankMetric,metricUnit(rankMetric),'rank-grouping',rankGrouping)}</div>`+panel(`${label}汇总`,'',`<div class="table-wrap"><table><thead><tr><th>${label}</th><th>首次打样</th><th>二次打样</th><th>三次及以上打样</th><th>修改内容数量</th><th>原料与颜色</th><th>主要修改点</th></tr></thead><tbody>${tableRows.sort((a,b)=>b.first-a.first).map(r=>`<tr><td>${key==='pid'?`<div class="product-cell">${swatch(products.find(p=>p.id===r.name))}<div><strong>${esc(named(r))}</strong><small>${r.name}</small></div></div>`:esc(r.name)}</td><td>${num(r.first)}</td><td>${num(r.second)}</td><td>${num(r.third)}</td><td>${drill('notes',r,relatedFor(r).length)}</td><td>${colorLink(r)}</td><td>${commonNotes(relatedFor(r),'tags')}</td></tr>`).join('')||`<tr data-empty="true"><td colspan="7">暂无数据</td></tr>`}</tbody><tfoot><tr><td>合计</td><td>${num(sum(data(),'first'))}</td><td>${num(sum(data(),'second'))}</td><td>${num(sum(data(),'third'))}</td><td>${related.length}</td><td>${colorSummary(availableColors)}</td><td>—</td></tr></tfoot></table></div>`,tableExtra,'table-panel');
}
function noteGroups(rows,dimension=noteGrouping){
 const groups=new Map();for(const n of rows){const p=products.find(p=>p.id===n.pid),key=dimension==='customer'?n.customer:dimension==='pid'?n.pid:(p?.category||'未分类');if(!groups.has(key))groups.set(key,{key,name:dimension==='pid'?(p?.name||n.pid):key,rows:[]});groups.get(key).rows.push(n);}
 return [...groups.values()].sort((a,b)=>b.rows.length-a.rows.length);
}
function commonNotes(rows,key){const counts={};rows.forEach(n=>(key==='tags'?n.tags:[n.categoryName]).forEach(t=>counts[t]=(counts[t]||0)+1));return Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([name,count])=>`${esc(name)}（${count}）`).join('、')||'—';}
function noteSummary(rows){
 const groups=new Map();for(const n of rows){for(const tag of new Set(n.tags.length?n.tags:['未填写标签'])){const key=JSON.stringify([n.categoryName,tag]);if(!groups.has(key))groups.set(key,{category:n.categoryName,tag,rows:[]});groups.get(key).rows.push(n);}}
 const list=[...groups.values()].sort((a,b)=>b.rows.length-a.rows.length);
 return `<div class="table-wrap"><table><thead><tr><th>修改类别</th><th>修改标签</th><th>修改内容数量</th><th>占比</th><th>涉及客户数</th><th>涉及款式数</th></tr></thead><tbody>${list.map(g=>`<tr><td>${esc(g.category)}</td><td>${esc(g.tag)}</td><td>${g.rows.length}</td><td>${pct(g.rows.length,rows.length)}</td><td>${new Set(g.rows.map(n=>n.customer)).size}</td><td>${new Set(g.rows.map(n=>n.pid)).size}</td></tr>`).join('')||'<tr data-empty="true"><td colspan="6">暂无修改内容</td></tr>'}</tbody></table></div>`;
}
function tagDistribution(rows){const counts={};rows.forEach(n=>[...new Set(n.tags)].forEach(t=>counts[t]=(counts[t]||0)+1));return Object.entries(counts).map(([name,value])=>({name,value})).sort((a,b)=>b.value-a.value);}
function selectionDonut(list){
 const total=list.reduce((n,r)=>n+r.value,0),colors=['#4c83ea','#79a5e9','#8ec8c5','#c8d9ed'];let offset=0;
 const arcs=list.map((r,i)=>{const share=r.value/total*100,arc=`<circle class="category-sector" cx="100" cy="100" r="76" pathLength="100" fill="none" stroke="${colors[i%4]}" stroke-width="30" stroke-dasharray="${share} ${100-share}" stroke-dashoffset="${-offset}" transform="rotate(-90 100 100)" data-note-category="${esc(r.name)}" role="button" tabindex="0" aria-label="${esc(r.name)} ${r.value}条 ${pct(r.value,total)}"><title>${esc(r.name)}：${r.value}条，${pct(r.value,total)}</title></circle>`;offset+=share;return arc;}).join('');
 return `<div class="selection-donut-layout"><div class="selection-donut"><svg viewBox="0 0 200 200" aria-label="修改类别分布"><circle cx="100" cy="100" r="76" fill="none" stroke="#edf1f7" stroke-width="30"/>${arcs}</svg><span class="selection-donut-total">${num(total)}<small>条</small></span></div><div class="selection-donut-legend">${list.map((r,i)=>`<button data-note-category="${esc(r.name)}"><i style="background:${colors[i%4]}"></i><span>${esc(r.name)}</span><span>${r.value}条</span><strong>${pct(r.value,total)}</strong></button>`).join('')||'<span class="empty">暂无修改内容</span>'}</div></div>`;
}
function selectionNotes(rows){const dist=noteDistribution(rows),groups=noteGroups(rows,selectionNoteGrouping).map(g=>({name:g.name,value:g.rows.length})).slice(0,5);return `<div class="grid-main">${panel('修改类别分布','',selectionDonut(dist.list))}${panel(`${groupedLabel(selectionNoteGrouping)}修改内容排行`,'',bars(groups,Math.max(...groups.map(r=>r.value),1),'条'),dimensionControls('selection-note-grouping',selectionNoteGrouping))}</div>`;}
function noteMatch(n){return (!selectedNoteCategories.length||selectedNoteCategories.includes(n.categoryName))&&(!selectedNoteTags.length||n.tags.some(t=>selectedNoteTags.includes(t)));}
function notesPage(){
 const rows=notes().filter(noteMatch),dist=noteDistribution(rows),label=groupedLabel(noteGrouping),groups=noteGroups(rows,noteGrouping);
 const controls=dimensionControls('note-grouping',noteGrouping);
 const tagMode=selectedNoteCategories.length===1,tagRows=tagDistribution(rows).slice(0,5);
 return `<div class="kpi-grid unified-kpis">${kpi('修改内容数量',num(rows.length),'条','')}${kpi('涉及客户数',new Set(rows.map(n=>n.customer)).size,'个','')}${kpi('涉及款式数',new Set(rows.map(n=>n.pid)).size,'款','')}</div><div class="aggregation-heading"><span>修改内容</span></div><div class="grid-main">${panel(tagMode?selectedNoteCategories[0]+' · 标签分布':'修改类别分布','',tagMode?bars(tagRows,Math.max(...tagRows.map(r=>r.value),1),'条'):donut(dist.list))}${panel(`${label}修改内容排行`,'',bars(groups.map(g=>({name:g.name,value:g.rows.length})),Math.max(...groups.map(g=>g.rows.length),1),'条'),controls)}</div>`+panel('修改内容汇总','',noteSummary(rows),exportButton(rows.length),'table-panel');
}
function syncNoteFilters(){
 syncMulti('note-category',categories,selectedNoteCategories,'类别');
 const available=[...new Set((selectedNoteCategories.length?selectedNoteCategories:categories).flatMap(c=>tags[c]))];
 selectedNoteTags=selectedNoteTags.filter(t=>available.includes(t));
 syncMulti('note-tag',available,selectedNoteTags,'标签');
}
function colorPage(){
 const rows=colorRecords.filter(r=>r.day<period()&&matching(r));
 const groups=keys=>ColorAnalysis.aggregate(rows,keys);
 const dimensions=[['customer','按客户'],['category','按品类'],['pid','按款式']];
 const display=(key,value)=>key==='pid'?(products.find(p=>p.id===value)?.name||value):value;
 const colorDimensions=[['all','全部'],...dimensions];
 const ranking=(title,keys,stateKey)=>{const grouping=colorGroupings[stateKey],list=groups(grouping==='all'?keys:[grouping,...keys]).slice(0,10).map(g=>({name:keys.map(k=>display(k,g[k])).join(' · ')+(grouping==='all'?'':' · '+display(grouping,g[grouping])),value:g.value}));return panel(title,'',bars(list,Math.max(...list.map(g=>g.value),1),'件'),dimensionControls(`color-group-${stateKey}`,grouping,colorDimensions));};
 const keys=colorTableMode==='pair'?['material','code']:colorTableMode==='material'?['material']:['code'];
 const tableGrouping=colorGroupings.table,tableGroups=groups(tableGrouping==='all'?keys:[tableGrouping,...keys]),tableLabel=groupedLabel(tableGrouping);
 const table=`<div class="table-wrap"><table class="color-summary"><thead><tr>${tableGrouping==='all'?'':`<th>${tableLabel}</th>`}${keys.map(k=>`<th>${k==='material'?'原料':'颜色编码'}</th>`).join('')}<th>使用件数</th><th>使用次数</th><th>涉及客户数</th><th>涉及品类数</th><th>涉及款式数</th></tr></thead><tbody>${tableGroups.map(g=>`<tr>${tableGrouping==='all'?'':`<td>${esc(display(tableGrouping,g[tableGrouping]))}</td>`}${keys.map(k=>`<td>${esc(g[k])}</td>`).join('')}<td>${num(g.value)}</td><td>${num(g.uses)}</td><td>${g.customers}</td><td>${new Set(g.rows.map(r=>r.category)).size}</td><td>${g.styles}</td></tr>`).join('')||`<tr data-empty="true"><td colspan="${keys.length+5+(tableGrouping==='all'?0:1)}">暂无颜色数据</td></tr>`}</tbody></table></div>`;
 const tableControls=`<div class="color-table-controls"><div class="color-control-group"><span class="color-control-label">聚合维度</span>${dimensionControls('color-group-table',tableGrouping,colorDimensions)}</div><div class="color-control-group"><span class="color-control-label">统计对象</span>${dimensionControls('color-mode',colorTableMode,[['material','原料'],['code','颜色'],['pair','纱线']])}</div>${exportButton(rows.length)}</div>`;
 return `<div class="kpi-grid unified-kpis color-kpis">${kpi('使用原料数',groups(['material']).length,'种','')}${kpi('使用颜色数',groups(['code']).length,'种','')}${kpi('使用纱线数',groups(['material','code']).length,'种','')}</div><p class="color-analysis-note">演示数据 · 按颜色对应件数统计；同一配色内重复的原料或颜色只计一次，原料与颜色排行之间不可相加。</p><div class="aggregation-heading"><span>颜色使用分析</span></div><div class="grid-main color-rankings">${ranking('原料使用排行',['material'],'material')}${ranking('颜色使用排行',['code'],'code')}${ranking('纱线使用排行',['material','code'],'pair')}</div>`+panel('颜色明细','',table,tableControls,'table-panel');
}
function sourcesPage(){return panel('数据来源','',`<div class="source-row"><div><h3>打样订单与关联订单</h3><p>${events.length} 条订单款式记录 · ${products.length} 款 · ${customers.length} 个客户</p></div><span class="badge">演示数据</span></div><div class="source-row"><div><h3>已提交方案修改与颜色</h3><p>${presetNotes.length} 条修改内容，${colorRecords.length} 条色位记录；均关联订单及方案</p></div><span class="badge">演示数据</span></div>`)+panel('统计口径','',`<div class="local-note">每条订单款式记录按关联订单层级归入一类：无关联订单为首次打样；有关联订单且上级无关联订单为二次打样；存在祖父订单为三次及以上打样。层级判断使用完整关联链，不受周期和顶部筛选截断。不再统计下单数；订单、关联订单和下单日期仍为源数据字段。修改内容按条计数，多标签不重复计入总量；标签占比可重叠。纱线为原料与颜色编码的配对，不另设纱线信息；使用件数按配色记录件数加权，同一配色内重复原料、颜色或纱线在各自维度去重，使用次数按配色记录数统计。三个分析页底部均可导出当前筛选范围内全部源数据，不受分页或聚合维度影响。当前使用预置已提交演示记录，未接入真实业务系统。</div>`);}
function exportButton(count){return `<button class="source-export" data-export-source ${count?'':'disabled'}>导出源数据</button>`;}
function exportSource(){const rows=view==='products'?SamplingData.selectionRows(data(),products):view==='notes'?SamplingData.modificationRows(notes().filter(noteMatch),products):SamplingData.colorRows(colorRecords.filter(r=>r.day<period()&&matching(r)));if(SourceExport.download(rows,views[view][0])){$('#analytics-toast').textContent='已导出当前筛选下的全部源数据';$('#analytics-toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#analytics-toast').hidden=true,2300);}}
function scopeMatches(row,scope){return !scope||((!scope.customers.length||scope.customers.includes(row.customer))&&(!scope.categories.length||scope.categories.includes(row.category))&&(!scope.products.length||scope.products.includes(row.pid)));}
function scopeSummary(){
 const scope={customers:selectedCustomers,categories:selectedCategories,products:selectedProducts};const hasScope=scope.customers.length||scope.categories.length||scope.products.length;if(!hasScope&&!analysisOrigin)return '';
 const names=scope?[...scope.customers,...scope.categories,...scope.products.map(id=>products.find(p=>p.id===id)?.name||id)]:[];
 return `<div class="scope-summary"><span>当前范围：${names.length?names.map(esc).join('、'):'全部'} · ${esc($('#period').selectedOptions[0].textContent)}</span>${hasScope?'<button id="clear-analysis-scope" class="text-button">清除范围</button>':''}${analysisOrigin?'<button id="return-selection" class="text-button">返回选款分析</button>':''}</div>`;
}
function openAnalysis(target,dimension,value){
 analysisOrigin={page:tablePage,scroll:window.scrollY,period:$('#period').value,categories:[...selectedCategories],products:[...selectedProducts],customers:[...selectedCustomers]};
 const scope={customers:[...selectedCustomers],categories:[...selectedCategories],products:[...selectedProducts]};
 scope[{pid:'products',category:'categories',customer:'customers'}[dimension]]=[value];
 selectedCustomers=scope.customers;selectedCategories=scope.categories;selectedProducts=scope.products;
 syncCategories();syncCustomers();syncProductPicker();
 if(target==='notes'){selectedNoteCategories=[];selectedNoteTags=[];syncNoteFilters();}
 view=target;tablePage=1;history.replaceState(null,'','#'+view);render();window.scrollTo(0,0);
}
function returnSelection(){
 const origin=analysisOrigin;if(!origin)return;
 selectedCategories=origin.categories;selectedProducts=origin.products;selectedCustomers=origin.customers;$('#period').value=origin.period;
 noteScope=null;colorScope=null;analysisOrigin=null;view='products';tablePage=origin.page;
 syncCategories();syncCustomers();syncProductPicker();history.replaceState(null,'','#products');render();window.scrollTo(0,origin.scroll);
}
function paginate(panel){
 const rows=[...panel.querySelectorAll('tbody tr:not([data-empty])')],size=4,total=rows.length,pages=Math.max(1,Math.ceil(total/size));
 tablePage=Math.min(Math.max(1,tablePage),pages);
 rows.forEach((row,i)=>row.hidden=i<(tablePage-1)*size||i>=tablePage*size);
 const nav=document.createElement('nav');nav.className='table-pagination';nav.setAttribute('aria-label','表格分页');
 nav.innerHTML=`<span>共 ${total} 条</span><span>每页 ${size} 条</span><button data-table-page="${tablePage-1}" ${tablePage===1?'disabled':''} aria-label="上一页">‹</button><span>${tablePage} / ${pages}</span><button data-table-page="${tablePage+1}" ${tablePage===pages?'disabled':''} aria-label="下一页">›</button>`;
 panel.append(nav);
}
function render(){const savedScroll=window.scrollY;$('#note-filters').hidden=view!=='notes';for(const id of ['category-filter','customer-filter','style-filter'])$('#'+id).hidden=false;const [title,description]=views[view];$('#page-description').textContent=description;$('#navigation').innerHTML=Object.entries(views).filter(([id])=>id!=='sources').map(([id,v])=>`<button data-view="${id}" class="${view===id?'active':''}" aria-current="${view===id?'page':'false'}">${v[0]}</button>`).join('');$('.filters').hidden=view==='sources';document.querySelector('.page-actions [data-view="sources"]').classList.toggle('active',view==='sources');$('#content').innerHTML=({products:dimensionPage,notes:notesPage,colors:colorPage,sources:sourcesPage})[view]();if(view==='notes'||view==='colors')$('#content').insertAdjacentHTML('afterbegin',scopeSummary());$('#content').classList.toggle('stable-report',view!=='sources');if(view!=='sources'){for(const p of document.querySelectorAll('#content > .grid-main > .panel')){const body=document.createElement('div');body.className='chart-body';while(p.children.length>1)body.append(p.children[1]);p.append(body);}const table=$('#content > .table-panel');if(table){const body=document.createElement('div');body.className='report-table-body';while(table.children.length>1)body.append(table.children[1]);table.append(body);paginate(table);}}window.scrollTo(0,savedScroll);}
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
 if(b.hasAttribute('data-export-source')){exportSource();return;}
 if(b.dataset.analysisTarget){openAnalysis(b.dataset.analysisTarget,b.dataset.dimension,b.dataset.value);return;}
 if(b.id==='return-selection'){returnSelection();return;}
 if(b.id==='clear-analysis-scope'){selectedCategories=[];selectedProducts=[];selectedCustomers=[];syncCategories();syncCustomers();syncProductPicker();tablePage=1;render();return;}
 if(b.dataset.colorGroupMaterial){colorGroupings.material=b.dataset.colorGroupMaterial;render();return;}
 if(b.dataset.colorGroupCode){colorGroupings.code=b.dataset.colorGroupCode;render();return;}
 if(b.dataset.colorGroupPair){colorGroupings.pair=b.dataset.colorGroupPair;render();return;}
 if(b.dataset.colorGroupTable){colorGroupings.table=b.dataset.colorGroupTable;tablePage=1;render();return;}
 if(b.dataset.colorMode){colorTableMode=b.dataset.colorMode;tablePage=1;render();return;}
 if(b.dataset.tablePage){tablePage=Number(b.dataset.tablePage);render();return;}
 if(b.dataset.noteCategory){selectedNoteCategories=[b.dataset.noteCategory];selectedNoteTags=[];syncNoteFilters();noteScope={customers:[...selectedCustomers],categories:[...selectedCategories],products:[...selectedProducts]};view='notes';tablePage=1;render();}
 if(b.dataset.view){analysisOrigin=null;colorScope=null;tablePage=1;if(b.dataset.view==='notes'&&view!=='notes')noteScope=null;view=b.dataset.view;history.replaceState(null,'','#'+view);render();}
 if(b.id==='clear-note-scope'){noteScope=null;tablePage=1;render();}
 if(b.dataset.noteGrouping){noteGrouping=b.dataset.noteGrouping;render();}
 if(b.dataset.grouping){tablePage=1;grouping=b.dataset.grouping;render();}
 if(b.dataset.rankMetric){rankMetric=b.dataset.rankMetric;render();}
 if(b.dataset.rankGrouping){rankGrouping=b.dataset.rankGrouping;render();}
 if(b.dataset.selectionNoteGrouping){selectionNoteGrouping=b.dataset.selectionNoteGrouping;render();}
 if(b.dataset.trendToggle){const key=b.dataset.trendToggle;if(hiddenTrendMetrics.has(key))hiddenTrendMetrics.delete(key);else hiddenTrendMetrics.add(key);render();document.querySelector(`[data-trend-toggle="${key}"]`).focus({preventScroll:true});}
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
$('#reset').onclick=()=>{colorScope=null;tablePage=1;$('#period').value='30';selectedCategories=[];selectedCustomers=[];selectedProducts=[];if(view==='notes'){noteScope=null;selectedNoteCategories=[];selectedNoteTags=[];syncNoteFilters();}syncCategories();syncCustomers();syncProductPicker();render();};
let toastTimer;$('#refresh').onclick=()=>{render();$('#analytics-toast').textContent='已刷新';$('#analytics-toast').hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#analytics-toast').hidden=true,2300);};
syncNoteFilters();syncCategories();syncCustomers();syncProductPicker();render();
})();
