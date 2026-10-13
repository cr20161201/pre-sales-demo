(() => {
'use strict';
const config = window.DEMO_CONFIG, $ = s => document.querySelector(s);
let adviceFields={category:{expanded:true},tag:{expanded:false},categories:{}};
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const schemeCount=p=>new Set((p.modificationGroups||[]).map(n=>n.groupId||n.id)).size;
const colorQuantity=c=>Math.max(1,Math.floor(Number(c?.quantity)||1));
const colorQuantityTotal=p=>{const groups=new Map();for(const n of (p.modificationGroups||[])){const id=n.groupId||n.id;if(!groups.has(id))groups.set(id,n);}const total=[...groups.values()].flatMap(n=>normalizeColorways(n)).reduce((sum,c)=>sum+colorQuantity(c),0);return total;};
const isModification=n=>Boolean(n.category||n.text||n.tags?.length||n.photos?.length);
const fresh = () => config.products.map(p => ({...p, quantity:1, price:'', minimum:'', currency:'CNY', requirements:[], remark:'', modificationGroups:[]}));
let linkedOrder=null;
const demoDraft=()=>window.createSelectionDemo();
let products = fresh(), editing = null, lastFocus = null, toastTimer, styleDetailFocus = null, styleDetailProduct=null, styleBackground=[];
let adviceView = null, groupEditorId = null, noteDraft = null, noteBaseline = '', adviceFilter = '全部', pendingAdviceAction = null, pickerTags = [], popupFocus = null, uploading = false, quoteScroll = 0, schemeDrafts = {}, colorwayDetailsReturn = false, colorDetailsScroll = 0, colorGroupScroll = 0;
let colorwayDraft=null, colorPositionIndex=null, schemeSnapshot=null;
let colorBaseline='',quoteBaseline='';
const schemeKeys=['colorways','colors','styleDescription','needleType','season','size','schemeRemark'];
const schemeData=n=>Object.fromEntries(schemeKeys.map(k=>[k,structuredClone(n?.[k]??(k==='colorways'||k==='colors'?[]:''))]));
const lettersAt=index=>{let out='';for(let n=index+1;n>0;n=Math.floor((n-1)/26))out=String.fromCharCode(65+(n-1)%26)+out;return out;};
const nextPosition=colors=>{const used=new Set(colors.map(c=>c.position));let i=0;while(used.has(lettersAt(i)))i++;return lettersAt(i);};
function firstScheme(){let n=editing.modificationGroups.find(n=>(n.groupId||n.id)===groupEditorId);if(!n){n={id:crypto.randomUUID(),groupId:groupEditorId,category:'',tags:[],text:'',photos:[],...schemeData(null)};editing.modificationGroups.push(n);}return n;}
function markSaved(full=false){
 const before=colorQuantityTotal(schemeSnapshot||editing),after=colorQuantityTotal(editing);
 if(before!==after){editing.quantity=after;const baseline=JSON.parse(quoteBaseline||'{}');baseline.quantity=after;quoteBaseline=JSON.stringify(baseline);}
 if(full||!schemeSnapshot)schemeSnapshot=structuredClone(editing);
 else {schemeSnapshot.modificationGroups=structuredClone(editing.modificationGroups);schemeSnapshot.quantity=editing.quantity;}
 products=products.map(p=>p.id===editing.id?{...p,modificationGroups:structuredClone(schemeSnapshot.modificationGroups),schemePhotos:structuredClone(schemeSnapshot.schemePhotos||{}),quantity:editing.quantity}:p);
 render();
}
function removeModification(id){
 const item=editing.modificationGroups.find(n=>n.id===id);if(!item)return;
 const group=item.groupId||item.id,first=editing.modificationGroups.find(n=>(n.groupId||n.id)===group),data=schemeData(first);
 editing.modificationGroups=editing.modificationGroups.filter(n=>n.id!==id);
 let next=editing.modificationGroups.find(n=>(n.groupId||n.id)===group);
 if(next)Object.assign(next,data);
 else if(data.colorways.length||data.styleDescription||data.needleType||data.season||data.size||data.schemeRemark||editing.schemePhotos?.[group]?.length)editing.modificationGroups.push({id:crypto.randomUUID(),groupId:group,category:'',tags:[],text:'',photos:[],...data});
 markSaved();
}
function commitSchemePart(key,value){firstScheme()[key]=structuredClone(value);if(schemeDrafts[groupEditorId])schemeDrafts[groupEditorId][key]=structuredClone(value);markSaved();}
function groupDirty(){captureNote();const saved=schemeSnapshot?.modificationGroups.find(n=>(n.groupId||n.id)===groupEditorId);return JSON.stringify(schemeData(noteDraft))!==JSON.stringify(schemeData(saved))||JSON.stringify(editing.schemePhotos?.[groupEditorId]||[])!==JSON.stringify(schemeSnapshot?.schemePhotos?.[groupEditorId]||[]);}
function confirmDiscard(changed){return !changed||confirm('有未保存的修改，退出后将丢弃。确定退出？');}
const quoteState=()=>JSON.stringify({remark:editing?.remark||'',requirements:editing?.requirements||[],quantity:editing?.quantity});
const expandedModifications=new Set();
const trash = '<svg viewBox="0 0 24 24"><path d="M3 5h18M9 2h6M5 5v17h14V5M9 9v9M15 9v9"/></svg>';
function notify(message) { $('#toast').textContent = message; $('#toast').hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').hidden = true, 2400); }
function render() {
  $('#count').textContent = `(${products.length}款/${products.reduce((n,p)=>n+p.quantity,0)}件)`;
  $('#products').innerHTML = products.length ? products.map(p => `<article class="product"><button class="product-image-button" data-action="style-preview" data-index="${products.indexOf(p)}" aria-label="查看${escape(p.name||p.id)}款式信息"><img class="product-image" src="${p.image}" alt="${escape(p.name||p.id)}"></button><div class="product-info"><h3 class="product-title" style="margin:0;font-weight:400">${escape(p.name||p.id)}</h3><p class="product-meta">款号: ${p.id}<br>品类: ${escape(p.category||'衬衫')}</p><button class="edit-product" data-action="edit" data-id="${p.id}" aria-label="编辑 ${p.id} 选款信息"><span class="tag">${schemeCount(p)?'修改方案 '+schemeCount(p)+'个':'编辑选款信息'}</span><span class="tag">${p.quantity}件</span><i class="chevron"></i></button></div><button class="delete" data-action="delete" data-id="${p.id}" aria-label="删除 ${p.id}">${trash}</button></article>`).join('') : '<div class="empty">暂无选品，点击“继续添加”选择款式</div>';
}
function footer(text,action){return `<div class="sheet-footer"><button class="primary" data-action="${action}">${text}</button><div class="home-indicator"></div></div>`;}
function show(content, simple=false, label='编辑选品') {
  lastFocus = document.activeElement; $('#sheet').className = 'sheet'+(simple?' simple-sheet':''); $('#sheet').setAttribute('aria-label',label); $('#sheet').innerHTML=content; $('#overlay').hidden=false; $('.main').inert=true; $('.footer').inert=true; $('#sheet').focus();
}
function close(force=false){ if(editing&&!force){if($('#remark'))captureQuote();if(!confirmDiscard(quoteState()!==quoteBaseline))return;} $('#overlay').hidden=true; $('.main').inert=false; $('.footer').inert=false; editing=null; if(lastFocus?.isConnected)lastFocus.focus(); }
function simple(title,body,button,action){show(`<div class="sheet-content"><div class="simple-heading"><h2>${title}</h2><button class="close" aria-label="关闭" data-action="close">×</button></div>${body}</div>${button?footer(button,action):'<div class="sheet-footer"><div class="home-indicator"></div></div>'}`,true,title);}
function edit(id, resume=false) {
 if(!resume){editing=structuredClone(products.find(p=>p.id===id));schemeDrafts={};schemeSnapshot=null;}
 editing.modificationGroups ||= [];
 editing.photos ||= [];
 editing.schemePhotos ||= {};
 editing.requirements ||= [];
 const p=editing;
 if(!resume)quoteBaseline=quoteState();
 show(`<div class="sheet-content"><div class="sheet-product"><button class="sheet-style-image" data-action="style-detail" aria-label="查看${escape(p.name||p.id)}款式信息"><img src="${p.image}" alt="${escape(p.name||p.id)}"></button><h2>${p.id}</h2><button class="close" data-action="close" aria-label="关闭">×</button></div>${groupOverview(p)}<label class="field quote-field remark"><span>备注</span><input id="remark" placeholder="请输入备注" value="${escape(p.remark)}"></label><section class="requirements"><h2>额外需求</h2><div class="requirement-grid">${config.requirements.map(r=>`<button data-action="requirement" data-value="${escape(r)}" class="${p.requirements.includes(r)?'selected':''}" aria-pressed="${p.requirements.includes(r)}">${escape(r)}</button>`).join('')}</div></section><div class="quantity"><h2>数量</h2><div class="stepper"><button aria-label="减少数量" data-action="minus" ${p.quantity===0?'disabled':''}>−</button><input id="quantity" aria-label="样衣数量" type="number" min="0" step="1" value="${p.quantity}"><button aria-label="增加数量" data-action="plus">+</button><span>件</span></div></div></div>${footer('确定','confirm-edit')}`);
 renderProductPhotos();
}
function groupOverview(product,readOnly=false){
 const groups=[...new Set(product.modificationGroups.map(n=>n.groupId||n.id))].map(id=>({id,items:product.modificationGroups.filter(n=>(n.groupId||n.id)===id)}));
 return `<section class="group-overview"><div class="group-overview-head"><h2>修改方案</h2></div>${groups.map((g,i)=>{
 const items=g.items.filter(isModification);
 const description=g.items.find(n=>n.styleDescription?.trim())?.styleDescription.trim()||'';
 const labels=[...new Set(items.map(n=>[n.category,...(n.tags||[])].filter(Boolean).join('·')).filter(Boolean))];
 const colorways=normalizeColorways(g.items[0]);
 const colors=colorways.length;
 const colorTotal=colorways.reduce((sum,c)=>sum+colorQuantity(c),0);
 const photos=(product.schemePhotos?.[g.id]?.length||0)+items.reduce((count,n)=>count+(n.photos?.length||0),0);
 const counts=[items.length?items.length+'条修改项':'',colors?colors+'套颜色'+(colorTotal?' · '+colorTotal+'件':''):'',photos?photos+'张图片':''].filter(Boolean).join(' · ');
 const action=`data-action="group-open" data-group="${escape(g.id)}"`;
 return `<${readOnly?'div':'button'} class="scheme-summary-card scheme-entry" ${readOnly?'':action} ${readOnly?'':`aria-label="编辑方案${i+1}"`}><span class="scheme-entry-content"><span class="scheme-summary-title">方案${i+1}</span>${description?`<span class="scheme-summary-description">${escape(description)}</span>`:''}${g.items[0]?.needleType||g.items[0]?.season||g.items[0]?.size?`<span class="scheme-summary-labels">${[g.items[0]?.needleType&&'针型 '+g.items[0].needleType,g.items[0]?.season&&'季节 '+g.items[0].season,g.items[0]?.size&&'尺码 '+g.items[0].size].filter(Boolean).map(escape).join(' · ')}</span>`:''}${labels.length?`<span class="scheme-summary-labels">修改内容：${labels.map(escape).join('、')}</span>`:''}${counts?`<span class="scheme-summary-counts">${counts}</span>`:''}</span>${readOnly?'':'<i class="chevron"></i>'}</${readOnly?'div':'button'}>`;
 }).join('')}${readOnly?'':'<button class="add-group" data-action="advice-add-group">＋ 新增方案</button>'}</section>`;
}

function schemePhotoTarget(){
 editing.schemePhotos ||= {};
 return {photos:editing.schemePhotos[groupEditorId] ||= []};
}
function renderProductPhotos(){
 if(!$('#product-photos'))return;
 const target=schemePhotoTarget();
 $('#product-photo-count').textContent=target.photos.length+'/6';
 $('#product-photos').innerHTML=target.photos.map((src,i)=>`<div class="advice-photo"><button data-action="product-photo-preview" data-index="${i}" aria-label="预览第${i+1}张图片"><img src="${escape(src)}" alt="方案图片"></button><button class="remove-photo" data-action="product-photo-remove" data-index="${i}" aria-label="删除第${i+1}张图片">×</button></div>`).join('')+(target.photos.length<6?`<button class="add-photo" data-action="photo-menu" aria-label="新增照片" ${uploading?'disabled':''}>＋</button>`:'');
}
function orderSuggestions(){
 const rows=products.filter(p=>schemeCount(p));
 if(!rows.length)return '';
 return `<div class="order-advice"><h2>共 ${rows.reduce((n,p)=>n+schemeCount(p),0)} 个方案</h2>${rows.map(p=>`<section><p class="advice-sku">${escape(p.name||p.id)} · ${escape(p.id)}</p>${groupOverview(p,true)}</section>`).join('')}</div>`;
}
function captureQuote(){
 editing.remark=$('#remark').value;
 quoteScroll=$('.sheet-content').scrollTop;
}
function openAdvice(){
 captureQuote();adviceFilter='全部';$('#overlay').hidden=true;openGroupList();
}
function modificationCard(n,index){
 const label=[n.category,...(n.tags||[])].filter(Boolean).join(' · ')||'修改内容';
 return `<button class="modification-row" data-action="group-open-item" data-id="${escape(n.id)}" aria-label="编辑修改项${index+1}：${escape(label)}"><span class="modification-copy"><span class="modification-row-title">${escape(label)}</span>${n.text?`<span class="modification-row-text">${escape(n.text)}</span>`:''}</span>${n.photos?.length?`<span class="modification-thumbnail"><img src="${escape(n.photos[0])}" alt="修改项附图">${n.photos.length>1?`<small>${n.photos.length}张</small>`:''}</span>`:''}<i class="chevron"></i></button>`;
}
function modificationList(items,id){
 items=items.filter(isModification);
 const expanded=expandedModifications.has(id);
 return `<div id="modification-list">${items.length?(expanded?items:items.slice(0,2)).map(modificationCard).join(''):'<p class="empty-hint">未填写</p>'}${items.length>2?`<button class="modification-toggle" data-action="modification-toggle" aria-expanded="${expanded}">${expanded?'收起':`展开全部（${items.length}条）`}</button>`:''}</div>`;
}
function openGroupEditor(groupId){
 if(!adviceView)schemeSnapshot=structuredClone(editing);
 const groups=[...new Map(editing.modificationGroups.map(n=>[n.groupId||n.id,[]])).keys()];
 const id=groupId||crypto.randomUUID(); groupEditorId=id; const items=editing.modificationGroups.filter(n=>(n.groupId||n.id)===id); const first=items[0]||{id:crypto.randomUUID(),groupId:id,colors:[],styleDescription:'',needleType:'',season:'',size:''}; const savedFirst=structuredClone(first); Object.assign(savedFirst,schemeDrafts[id]||{}); savedFirst.colorways=normalizeColorways(savedFirst); noteDraft=structuredClone(savedFirst); adviceView='group';
 showAdvice(`方案${groups.indexOf(id)+1||groups.length+1}`,`<div class="group-editor"><header class="group-editor-head"><h2 class="scheme-section-title">修改内容</h2><button class="section-add" data-action="advice-add-item" data-group="${escape(id)}">新增修改</button></header>${modificationList(items,id)}${groupFields(noteDraft)}<section class="product-photo-section"><h2>方案图片 <small id="product-photo-count"></small></h2><div id="product-photos" class="advice-photos"></div><input id="product-camera" class="visually-hidden" type="file" accept="image/*" capture="environment"><input id="product-upload" class="visually-hidden" type="file" accept="image/*" multiple><p id="product-photo-status" class="photo-helper" role="status"></p></section></div>`,'完成','group-save');
 if(schemeSnapshot?.modificationGroups.some(n=>(n.groupId||n.id)===id))addDeleteFooter('方案','scheme-delete-confirm',id);
 renderProductPhotos();
 colorwayDetailsReturn=false;
}
function openGroupList(){
 const groups=[...new Map(editing.modificationGroups.map(n=>[n.groupId||n.id,[]])).keys()].map(id=>({id,items:editing.modificationGroups.filter(n=>(n.groupId||n.id)===id)}));
 showAdvice('修改内容',`<div class="group-list-page"><div class="group-list-intro section-heading"><h2>修改方案</h2><button class="section-add" data-action="advice-add-group">新增方案</button></div>${groups.map((g,i)=>`<article class="outer-group-card"><header><strong>方案${i+1}</strong><span>${g.items.length}条修改项</span><button class="section-add" data-action="advice-add-item" data-group="${escape(g.id)}">新增修改</button><button data-action="group-delete" data-group="${escape(g.id)}">删除方案</button></header><div>${g.items.slice(0,2).map((n,j)=>`<button class="outer-group-item" data-action="group-open" data-id="${escape(n.id)}"><span>修改项${j+1} · ${escape(n.category||'未选类别')}</span><small>${escape(n.text||'未填写修改内容')}</small><i class="chevron"></i></button>`).join('')}${g.items.length>2?`<small class="group-more">还有 ${g.items.length-2} 条修改项</small>`:''}</div></article>`).join('')||'<div class="group-empty">暂无修改方案</div>'}</div>`,'完成','advice-finish');
}
function addDeleteFooter(label,action,id){
 const host=$('#advice-page > .sheet-footer');
 const primary=host.querySelector('.primary');
 const actions=document.createElement('div');actions.className='editor-footer-actions';
 actions.innerHTML=`<button class="editor-delete-icon" data-action="entry-delete-open" data-label="${escape(label)}" data-confirm="${escape(action)}" data-id="${escape(id)}" aria-label="删除${label}" title="删除${label}">${trash}</button>`;
 actions.append(primary);host.prepend(actions);
 host.classList.add('unified-editor-footer');
}
function showAdvice(title,body,button,action){
 $('#advice-page').hidden=false;$('#advice-page').innerHTML=`<div class="advice-content">${body}</div>${footer('完成',action)}`;
 $('.navbar h1').textContent=title;$('.back').setAttribute('aria-label','返回上一级');
 $('.main').inert=true;$('.footer').inert=true;$('#advice-page').focus();
}
function returnToQuote(){
 adviceView=null;noteDraft=null;$('#advice-page').hidden=true;$('.navbar h1').textContent='代客选品';$('.back').setAttribute('aria-label','返回');
 edit(null,true);$('.sheet-content').scrollTop=quoteScroll;
}
 function quoteNotes(notes){return notes.length?`<div class="quote-notes">${notes.map((n,i)=>`<div class="quote-note"><p class="quote-note-label">方案${i+1} · ${escape(n.category)}${n.tags.length?' · '+n.tags.map(escape).join('、'):''}</p><p class="quote-note-text">${escape(n.text)}</p>${n.colors?.length?`<small>色位：${n.colors.map(c=>escape(`${c.position||''}${c.material?' · '+c.material:''}${c.code?' · '+c.code:''}`)).join('、')}</small>`:''}${n.photos.length?`<small>修改项附图 ${n.photos.length}张</small>`:''}</div>`).join('')}</div>`:'';}
function adviceSummary(){
 const notes=editing.modificationGroups, groups=[...new Map(notes.map(n=>[n.groupId||n.id,[]])).keys()].map(id=>({id,items:notes.filter(n=>(n.groupId||n.id)===id)}));
 const filtered=groups.filter(g=>adviceFilter==='全部'||g.items.some(n=>n.category===adviceFilter));
 if(!groups.length)return '<section class="saved-advice"><div class="saved-advice-heading">已录入 0 个方案</div><p class="saved-advice-empty">未填写</p><button class="add-group" data-action="advice-add-group">＋ 新增方案</button></section>';
 return `<section class="saved-advice"><div class="saved-advice-heading">已录入 ${groups.length} 个方案<select aria-label="筛选已录入方案" id="advice-summary-filter">${['全部',...Object.keys(config.adviceCategories)].map(c=>`<option ${c===adviceFilter?'selected':''}>${c}</option>`).join('')}</select></div><div class="saved-advice-rows">${filtered.map((g,index)=>`<article class="saved-group-card"><div class="group-card-heading"><b>方案${groups.indexOf(g)+1}</b><span>${g.items.length} 条修改项</span></div>${g.items.map((n,j)=>`<button class="saved-advice-row ${n.id===noteDraft.id?'active':''}" data-action="advice-edit" data-id="${escape(n.id)}"><span class="saved-record"><span class="saved-record-label"><b>修改项 ${j+1}</b><span class="saved-category">${escape(n.category||'未选类别')}</span><span class="saved-tags"> · ${n.tags.length?n.tags.map(escape).join('、'):'未选标签'}</span></span><span class="saved-text">${escape(n.text||'未填写修改内容')}</span></span>${n.photos.length?`<small>${n.photos.length}图</small>`:''}<i class="chevron"></i></button>`).join('')}<p class="group-item-count">方案资料：${g.items[0].fabricSeries||g.items[0].colors?.length?'已填写':'待填写'}</p><button class="group-add-item" data-action="advice-add-item" data-group="${escape(g.id)}">＋ 新增修改</button></article>`).join('')}</div><button class="add-group" data-action="advice-add-group">＋ 新增方案</button></section>`;
}
function requestAdviceAction(action){
 if(uploading){notify('照片处理中，请稍候');return;}
 captureNote();if(JSON.stringify(noteDraft)!==noteBaseline){pendingAdviceAction=action;showDiscardDialog(action===returnToQuote);}else action();
}
function mountPopup(content,kind){
 clearTimeout(toastTimer);$('#toast').hidden=true;
 popupFocus=document.activeElement;
 const popup=document.createElement('div');popup.id='advice-popup';popup.className=`advice-popup ${kind}`;popup.innerHTML=content;
 $('#advice-page > .advice-content')?.setAttribute('inert','');$('#advice-page > .sheet-footer')?.setAttribute('inert','');
 $('#advice-page > #advice-popup')?.setAttribute('inert','');$('#advice-page').append(popup);
 popup.addEventListener('click',e=>{if(e.target===popup)dismissPopup();});
 popup.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const items=[...popup.querySelectorAll('button:not(:disabled),input,textarea')];if(e.shiftKey&&document.activeElement===items[0]){e.preventDefault();items.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===items.at(-1)){e.preventDefault();items[0].focus();}});
 popup.querySelector('button,input').focus();
}
function dismissPopup(){
 if(voiceSession){voiceSession.cancelled=true;voiceSession.recognition?.abort();voiceSession=null;}
 const popups=[...document.querySelectorAll('#advice-page > #advice-popup')];popups.at(-1)?.remove();
 const remaining=[...document.querySelectorAll('#advice-page > #advice-popup')];
 if(remaining.length) remaining.at(-1).removeAttribute('inert');
 else {$('#advice-page > .advice-content')?.removeAttribute('inert');$('#advice-page > .sheet-footer')?.removeAttribute('inert');}
 pendingAdviceAction=null;
 if(popupFocus?.isConnected)popupFocus.focus();popupFocus=null;
}
function showDiscardDialog(returning){
 mountPopup(`<section class="discard-dialog" role="alertdialog" aria-modal="true" aria-labelledby="discard-title" aria-describedby="discard-description"><button class="discard-close" data-action="popup-close" aria-label="关闭提醒">×</button><h2 id="discard-title">修改尚未保存</h2><p id="discard-description">${returning?'返回':'切换'}后，本次未保存的内容将丢失。<br>已添加到列表的建议不受影响。</p><div><button data-action="advice-keep">继续编辑</button><button data-action="advice-discard">${returning?'放弃并返回':'放弃并切换'}</button></div></section>`,'centered');
}
let voiceSession=null;
function openVoice(){
 captureNote();const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
 mountPopup(`<section class="voice-panel" role="dialog" aria-modal="true" aria-labelledby="voice-title"><header><h2 id="voice-title">${escape(adviceTitle())}</h2><button data-action="popup-close" aria-label="关闭语音输入">×</button></header><textarea id="voice-text" maxlength="100" aria-label="语音识别文字" placeholder="识别的文字将显示在这里，可直接修改">${escape(noteDraft.text)}</textarea><p id="voice-status" role="status">按住说话，松手停止，上滑取消</p><footer><button data-action="voice-clear">清空</button><button id="voice-hold" aria-label="按住说话"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="9" y="2" width="6" height="13" rx="3"/><path d="M6 10v2a6 6 0 0 0 12 0v-2M12 18v4M8 22h8"/></svg><small>按住说话</small></button><button data-action="voice-confirm">确认</button></footer></section>`,'bottom');
 const session=voiceSession={active:false,cancelled:false,recognition:null},hold=$('#voice-hold');let startY=0,base='',cancel=false;
 const busy=value=>{session.active=value;$('#voice-text').readOnly=value;$('[data-action="voice-confirm"]').disabled=value;$('[data-action="voice-clear"]').disabled=value;hold.classList.toggle('recording',value);};
 function start(){if(session.active||voiceSession!==session)return;cancel=false;base=$('#voice-text').value;if(!Recognition){busy(true);$('#voice-status').textContent='正在听… 松手停止，上滑取消';session.demo=true;return;}const rec=new Recognition();session.recognition=rec;rec.lang='zh-CN';rec.continuous=true;rec.interimResults=true;busy(true);$('#voice-status').textContent='正在听… 松手停止，上滑取消';
 rec.onresult=e=>{if(session.cancelled||cancel||voiceSession!==session)return;let transcript='';for(let i=0;i<e.results.length;i++)transcript+=e.results[i][0].transcript;$('#voice-text').value=(base+(base&&transcript?'\n':'')+transcript).slice(0,100);};
 rec.onerror=e=>{if(voiceSession!==session||session.cancelled)return;session.error=true;$('#voice-status').textContent=e.error==='not-allowed'?'麦克风权限未开启，请允许后重试':e.error==='no-speech'?'未识别到语音，请重试':'语音识别不可用，请重试或直接输入';};
 rec.onend=()=>{if(voiceSession!==session||session.cancelled)return;busy(false);if(!session.error)$('#voice-status').textContent=cancel?'已取消本次录入':'可继续说话，或确认填入';session.error=false;};
 try{rec.start();}catch{busy(false);$('#voice-status').textContent='无法启动语音识别，请重试或直接输入';}}
 function stop(abort=false){if(!session.active)return;cancel=cancel||abort;if(session.demo){if(!cancel){$('#voice-text').value=(base+(base?'\n':'')+'请调整'+(noteDraft.tags[0]||noteDraft.category||'这处细节')+'，完成后重新确认。').slice(0,100);}else $('#voice-text').value=base;busy(false);$('#voice-status').textContent=cancel?'已取消本次录入':'演示识别文字，可修改后确认';return;}if(cancel){$('#voice-text').value=base;session.recognition.abort();}else session.recognition.stop();}
 hold.onpointerdown=e=>{e.preventDefault();startY=e.clientY;hold.setPointerCapture(e.pointerId);start();};
 hold.onpointermove=e=>{if(session.active){cancel=startY-e.clientY>60;$('#voice-status').textContent=cancel?'松手取消本次录入':'正在听… 松手停止，上滑取消';}};
 hold.onpointerup=()=>stop();hold.onpointercancel=()=>stop(true);
 hold.onkeydown=e=>{if((e.key===' '||e.key==='Enter')&&!e.repeat){e.preventDefault();start();}};hold.onkeyup=e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();stop();}};
}
function openTagPicker(){
 if(uploading)return;captureNote();pickerTags=noteDraft.tags.slice(0,1);
 mountPopup(`<section class="tag-picker-panel single-tag-picker" role="dialog" aria-modal="true" aria-labelledby="tag-picker-title"><header><h2 id="tag-picker-title">选择修改标签</h2></header><p class="tag-picker-hint">${escape(noteDraft.category)} · 单选</p><input id="tag-search" type="search" placeholder="搜索标签" aria-label="搜索标签"><div id="tag-options" class="tag-options"></div><button class="picker-cancel" data-action="popup-close">取消</button></section>`,'bottom');
 renderTagOptions();
}
function renderTagOptions(){
 const focusedTag=document.activeElement?.dataset?.action==='tags-pick'?document.activeElement.dataset.value:null;
 const query=$('#tag-search').value.trim().toLowerCase(),tags=(config.adviceCategories[noteDraft.category]||[]).filter(t=>t.toLowerCase().includes(query));
 $('#tag-options').innerHTML=tags.map(t=>`<button class="tag-option ${pickerTags.includes(t)?'selected':''}" data-action="tags-pick" data-value="${escape(t)}" aria-pressed="${pickerTags.includes(t)}"><span>${escape(t)}</span><i class="tag-check ">${pickerTags.includes(t)?'✓':''}</i></button>`).join('')||'<p class="tag-no-results">未找到匹配标签</p>';
 if(focusedTag)Array.from(document.querySelectorAll('[data-action="tags-pick"]')).find(b=>b.dataset.value===focusedTag)?.focus();
}
function commitTags(){
 noteDraft.tags=[...pickerTags];const scroll=$('.advice-content').scrollTop;dismissPopup();renderNote();$('.advice-content').scrollTop=scroll;$('[data-action="tags-open"]').focus();
}
function openNote(id,groupId){
 if(uploading){notify('照片处理中，请稍候');return;}
 if(adviceView==='group'){captureNote();schemeDrafts[groupEditorId]=schemeData(noteDraft);}
 if(!adviceView)captureQuote();
 const existing=id&&editing.modificationGroups.find(n=>n.id===id);
 groupId=existing?.groupId||groupId||groupEditorId||crypto.randomUUID();
 groupEditorId=groupId;
 noteDraft=existing?structuredClone(existing):{id:crypto.randomUUID(),groupId:groupId||crypto.randomUUID(),category:'工艺',tags:[],text:'',photos:[],colors:[],fabricSeries:'',styleDescription:'',needleType:'',season:'',size:''};
 noteDraft.category ||= '工艺';
 noteBaseline=JSON.stringify(noteDraft);pendingAdviceAction=null;adviceView='form';renderNote();
}
function captureNote(){if($('#advice-text'))noteDraft.text=$('#advice-text').value;for(const [key,id] of Object.entries({styleDescription:'style-description',needleType:'needle-type',season:'season',size:'size-code',schemeRemark:'scheme-remark'})){const input=$('#'+id);if(input)noteDraft[key]=input.value;}if($('#color-table-body'))noteDraft.colors=[...$('#color-table-body').querySelectorAll('tr')].map(row=>({position:row.querySelector('.color-position').value,material:row.querySelector('.color-material').value.trim(),code:row.querySelector('.color-code').value.trim()})).filter(color=>color.position||color.material||color.code);}
function normalizeColorways(n){
 const rows=colors=>(Array.isArray(colors)?colors:[]).map((c,i)=>typeof c==='string'?{position:String.fromCharCode(65+i),material:'',code:c}:{position:String(c.position||''),material:String(c.material||''),code:String(c.code||'')});
 if(Array.isArray(n.colorways))return n.colorways.map(c=>({id:String(c.id||crypto.randomUUID()),quantity:colorQuantity(c),colors:rows(c.colors)}));
 return n.colors?.length?[{id:'legacy-color',quantity:1,colors:rows(n.colors)}]:[];
}
function rememberScheme(){
 captureNote();
 schemeDrafts[groupEditorId]=schemeData(noteDraft);
}
function colorTable(colors,editable=false){
 const letters=Array.from({length:Math.max(26,(colorwayDraft?.colors.length||0)+1)},(_,i)=>lettersAt(i));
 return `<table class="color-table"><thead><tr><th>色位</th><th>原料</th><th>颜色编码</th>${editable?'<th></th>':''}</tr></thead><tbody ${editable?'id="colorway-rows"':''}>${colors.map((c,i)=>`<tr>${editable?`<td><button class="color-position" value="${escape(c.position||'A')}" data-action="color-position-open" data-index="${i}" aria-label="第${i+1}行色位 ${escape(c.position||'A')}" aria-haspopup="dialog"><span>${escape(c.position||'A')}</span><i class="chevron"></i></button></td><td><input class="color-material" maxlength="100" required aria-label="第${i+1}行原料" value="${escape(c.material)}" placeholder="请输入原料"></td><td><input class="color-code" maxlength="100" required aria-label="第${i+1}行颜色编码" value="${escape(c.code)}" placeholder="请输入颜色编码"></td><td><button class="remove-color" ${colors.length===1?'disabled':''} data-action="colorway-row-delete" data-index="${i}" aria-label="删除第${i+1}行色位">×</button></td>`:`<td>${escape(c.position||'—')}</td><td>${escape(c.material||'—')}</td><td>${escape(c.code||'—')}</td>`}</tr>`).join('')}</tbody></table>`;
}
function colorwayDetails(){const ways=normalizeColorways(noteDraft);return `<div class="color-details-page"><p class="color-details-hint">当前方案共 ${ways.length} 个颜色，点击颜色可进入调整。</p>${ways.map((c,i)=>`<article class="color-details-card"><button class="color-details-hit" data-action="colorway-edit" data-id="${escape(c.id)}" aria-label="调整颜色${i+1}"></button><header><strong>颜色${i+1}</strong><span>${c.colors.length}个色位 · ${colorQuantity(c)}件</span><i class="chevron"></i></header>${colorTable(c.colors)}</article>`).join('')||'<p class="color-empty">未填写颜色</p>'}</div>`;}
function openColorwayDetails(){
 if(adviceView==='group'){colorGroupScroll=$('.advice-content').scrollTop;colorDetailsScroll=0;rememberScheme();}
 Object.assign(noteDraft,structuredClone(schemeDrafts[groupEditorId]||{}));
 colorwayDetailsReturn=false;adviceView='colors';showAdvice('颜色明细',colorwayDetails(),'返回','colorway-details-close');
 $('#advice-page .primary').textContent='返回';$('.advice-content').scrollTop=colorDetailsScroll;
}
function closeColorwayDetails(){openGroupEditor(groupEditorId);$('.advice-content').scrollTop=colorGroupScroll;}
function returnFromColorway(){colorwayDraft=null;if(colorwayDetailsReturn)openColorwayDetails();else openGroupEditor(groupEditorId);}

function groupFields(n){const ways=normalizeColorways(n);return `<section class="advice-form-section group-fields"><header class="section-heading"><h2 class="scheme-section-title">颜色</h2><button class="section-add" data-action="colorway-add">新增颜色</button></header>${ways.map((c,i)=>`<article class="colorway-card colorway-entry"><button class="colorway-entry-hit" data-action="colorway-edit" data-id="${escape(c.id)}" aria-label="编辑颜色${i+1}"></button><header><h3>颜色${i+1}</h3><span class="color-position-count">${c.colors.length}个色位</span><span class="colorway-quantity">· ${colorQuantity(c)}件</span><i class="chevron"></i></header></article>`).join('')}${ways.length?`<button class="color-details-link" data-action="colorway-details">查看明细 <span>›</span></button>`:'<p class="color-empty">未填写</p>'}</section><section class="advice-form-section group-fields scheme-info"><h2 class="scheme-section-title">资料</h2><label>款式说明<input id="style-description" maxlength="100" value="${escape(n.styleDescription||'')}" placeholder="请输入款式说明"></label><label>针种<input id="needle-type" maxlength="100" value="${escape(n.needleType||'')}" placeholder="请输入针种"></label><label>季节<input id="season" maxlength="100" value="${escape(n.season||'')}" placeholder="请输入季节"></label><label>尺码<input id="size-code" maxlength="100" value="${escape(n.size||'')}" placeholder="例如 M 或 48码"></label><label>方案备注<textarea id="scheme-remark" maxlength="100" placeholder="请输入方案备注">${escape(n.schemeRemark||'')}</textarea></label></section>`;}
function openColorway(id){
 if(uploading){notify('照片处理中，请稍候');return;}
 rememberScheme();
 const existing=noteDraft.colorways.find(c=>c.id===id);
 colorwayDraft=existing?structuredClone(existing):{id:crypto.randomUUID(),quantity:1,colors:[]};
 colorwayDraft.quantity=colorQuantity(colorwayDraft);
 if(!colorwayDraft.colors.length){const used=new Set(colorwayDraft.colors.map(c=>c.position).filter(Boolean));const next=nextPosition(colorwayDraft.colors);colorwayDraft.colors.push({position:next,material:'',code:''});}
 colorBaseline=JSON.stringify(colorwayDraft);adviceView='colorway';renderColorway();
}
function renderColorway(){
 const index=noteDraft.colorways.findIndex(c=>c.id===colorwayDraft.id);
 showAdvice(`颜色${index<0?noteDraft.colorways.length+1:index+1}`,`<section class="colorway-editor"><div class="color-quantity-control"><span>数量</span><div class="stepper"><button data-action="color-minus" aria-label="减少颜色数量" ${colorwayDraft.quantity<=1?'disabled':''}>−</button><output>${colorwayDraft.quantity}</output><button data-action="color-plus" aria-label="增加颜色数量">+</button><span>件</span></div></div>${colorTable(colorwayDraft.colors,true)}<button class="add-color-row" data-action="colorway-row-add">＋ 新增色位</button><p id="colorway-error" class="error" role="alert"></p></section>`,'完成','colorway-save');

 if(index>=0)addDeleteFooter('颜色','colorway-delete-confirm',colorwayDraft.id);
}
function captureColorway(){
 colorwayDraft.quantity=Math.max(1,Math.floor(Number(document.querySelector('.color-quantity-control output')?.value||colorwayDraft.quantity||1)));
 colorwayDraft.colors=[...document.querySelectorAll('#colorway-rows tr')].map(row=>({position:row.querySelector('.color-position').value,material:row.querySelector('.color-material').value,code:row.querySelector('.color-code').value}));
}
function openColorPosition(index){
 captureColorway();colorPositionIndex=index;
 const current=colorwayDraft.colors[index].position;
 const letters=Array.from({length:Math.max(26,(colorwayDraft?.colors.length||0)+1)},(_,i)=>lettersAt(i));
 mountPopup(`<section class="color-position-panel" role="dialog" aria-modal="true" aria-labelledby="color-position-title"><h2 id="color-position-title">选择色位</h2><div class="color-position-grid">${letters.map(letter=>`<button data-action="color-position-pick" data-value="${letter}" class="${letter===current?'selected':''}" aria-pressed="${letter===current}">${letter}</button>`).join('')}</div><button class="color-position-cancel" data-action="popup-close">取消</button></section>`,'bottom');
 $('#advice-popup [aria-pressed="true"]')?.focus();
}
function saveColorway(){
 captureColorway();
 document.querySelectorAll('#colorway-rows [aria-invalid]').forEach(el=>el.removeAttribute('aria-invalid'));
 for(const [i,color] of colorwayDraft.colors.entries()){
  for(const [key,label,selector] of [['position','色位','.color-position'],['material','原料','.color-material'],['code','颜色编码','.color-code']]){
   color[key]=String(color[key]||'').trim();
   if(!color[key]){
    const message=key==='position'?`请选择第${i+1}行色位`:`请填写色位 ${color.position} 的${label}`;
    $('#colorway-error').textContent=message;
    const field=document.querySelectorAll('#colorway-rows tr')[i].querySelector(selector);
    field.setAttribute('aria-invalid','true');field.focus();field.scrollIntoView({block:'center',behavior:'smooth'});notify(message);return;
   }
  }
 }

 const colors=schemeDrafts[groupEditorId].colorways;
 const index=colors.findIndex(c=>c.id===colorwayDraft.id);
 if(index<0)colors.push(structuredClone(colorwayDraft));else colors[index]=structuredClone(colorwayDraft);
 commitSchemePart('colorways',colors);
 returnFromColorway();
}

function adviceTitle(){return noteDraft.category?(noteDraft.category+(noteDraft.tags[0]?'－'+noteDraft.tags[0]:'')+'的修改内容'):'修改内容';}
function categoryPicker(){
 captureNote();
 mountPopup(`<section class="tag-picker-panel single-tag-picker" role="dialog" aria-modal="true" aria-label="选择修改类别"><header><h2>选择修改类别</h2></header><div class="tag-options">${Object.keys(config.adviceCategories).map(c=>`<button class="tag-option" data-action="category-pick" data-value="${escape(c)}">${escape(c)}${noteDraft.category===c?' ✓':''}</button>`).join('')||'<p>暂无可用类别</p>'}</div><button class="picker-cancel" data-action="popup-close">取消</button></section>`,'bottom');
}
function renderNote(){
 const n=noteDraft,isEdit=editing.modificationGroups.some(item=>item.id===n.id);
 showAdvice('修改项',`<div class="group-entry-heading"><h2>${isEdit?'编辑':'新增'}修改项</h2></div><section class="advice-form-section"><h2>修改类别</h2><div class="advice-category-options">${Object.keys(config.adviceCategories).map(c=>`<button class="${n.category===c?'selected':''}" data-action="advice-category" data-value="${escape(c)}" aria-pressed="${n.category===c}">${escape(c)}</button>`).join('')}</div></section>${n.category?`<button class="tag-picker-entry" data-action="tags-open"><span>修改标签</span><span class="tag-picker-value">${n.tags.length?n.tags.map(escape).join('、'):'请选择'}${n.tags.length>1?` · 已选${n.tags.length}项`:''}</span><i class="chevron"></i></button>`:''}<section class="advice-form-section"><h2><label for="advice-text">${escape(adviceTitle())}</label><button class="voice-entry" data-action="voice-open" aria-label="语音输入"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="9" y="2" width="6" height="13" rx="3"/><path d="M6 10v2a6 6 0 0 0 12 0v-2M12 18v4M8 22h8"/></svg> 语音输入</button></h2><textarea id="advice-text" maxlength="100" placeholder="请输入${escape(adviceTitle())}">${escape(n.text)}</textarea><p class="advice-text-count"><span id="advice-text-count">${n.text.length}</span>/100</p></section><section class="advice-form-section"><h2>修改项附图 <small id="photo-count"></small></h2><div id="advice-photos" class="advice-photos"></div><div class="photo-upload-actions"><label>拍照<input id="advice-camera" class="visually-hidden" type="file" accept="image/*" capture="environment"></label><label>从相册选择<input id="advice-upload" class="visually-hidden" type="file" accept="image/*" multiple></label></div><p class="photo-helper" id="photo-status">可选，最多 6 张，用图片标明需要调整的位置</p></section><p id="advice-error" class="error" role="alert"></p>`, '保存并返回','advice-save');
 /* item editor intentionally keeps only item fields */
 const categoryBlock=$('.advice-category-options').parentElement;
 if(!adviceFields.category.expanded)categoryBlock.innerHTML=`<button class="tag-picker-entry" data-action="category-open"><span>修改类别</span><span class="tag-picker-value">${escape(n.category||'请选择')}</span><i class="chevron"></i></button>`;
 if(n.category&&(adviceFields.categories[n.category]?.expanded??(n.category==='工艺'))){
 $('[data-action="tags-open"]').outerHTML=`<section class="advice-form-section"><h2>修改标签</h2><div class="advice-tag-options">${(config.adviceCategories[n.category]||[]).map(t=>`<button class="${n.tags.includes(t)?'selected':''}" data-action="tag-inline" data-value="${escape(t)}" aria-pressed="${n.tags.includes(t)}">${escape(t)}</button>`).join('')||'<p>暂无可选标签</p>'}</div></section>`;
 }
 const content=$('#advice-popup .advice-content')||$('#advice-page .advice-content');
 content.classList.add('entry-first');
 $('.photo-upload-actions').hidden=true;
 $('#photo-status').textContent='';
 const noteFooter=$('#advice-popup .sheet-footer')||$('#advice-page .sheet-footer');
 noteFooter.querySelector('.primary').textContent='完成';
 noteFooter.querySelector('.primary').dataset.action='advice-finish';
 const nextButton=document.createElement('button');nextButton.className='secondary advice-next';nextButton.dataset.action='advice-save-next';nextButton.textContent='完成并新增';noteFooter.querySelector('.primary').textContent='完成';noteFooter.querySelector('.primary').after(nextButton);noteFooter.classList.add('advice-note-footer');
 if(isEdit)addDeleteFooter('修改项','advice-delete-confirm',n.id);
 const finishButton=noteFooter.querySelector('[data-action="advice-finish"]'),addButton=noteFooter.querySelector('[data-action="advice-save-next"]');
 finishButton?.classList.remove('primary');finishButton?.classList.add('secondary');addButton?.classList.remove('secondary');addButton?.classList.add('primary');
 renderPhotos();
}
function renderPhotos(){
 $('#photo-count').textContent=`${noteDraft.photos.length}/6`;
 $('#advice-photos').innerHTML=noteDraft.photos.map((src,i)=>`<div class="advice-photo"><button data-action="advice-preview" data-index="${i}" aria-label="预览第${i+1}张照片"><img src="${src}" alt="说明照片 ${i+1}"></button><button class="remove-photo" data-action="advice-photo-remove" data-index="${i}" aria-label="删除第${i+1}张照片">×</button></div>`).join('')+(noteDraft.photos.length<6?`<button class="add-photo" data-action="photo-menu" aria-label="新增照片" title="新增照片" ${uploading?'disabled':''}>＋</button>`:'');
 if($('[data-action="advice-save-next"]'))$('[data-action="advice-save-next"]').disabled=uploading;
 for(const button of document.querySelectorAll('#advice-page .sheet-footer button'))button.disabled=uploading;
 for(const input of [$('#advice-camera'),$('#advice-upload')])input.disabled=uploading||noteDraft.photos.length>=6;
}
function adviceBack(){
 if($('#style-detail')&&!$('#photo-preview')){closeStyleDetail();return;}
 const topPopup=[...document.querySelectorAll('#advice-page > #advice-popup')].at(-1);
 if(topPopup){dismissPopup();return;}
 if($('#photo-menu')){closePhotoMenu();return;}
 if($('#photo-preview')){$('#photo-preview').remove();return;}
 if(adviceView==='form'||adviceView==='colorway'){cancelNote();return;}
 if(adviceView==='colors'){closeColorwayDetails();return;}
 if(uploading){notify('照片处理中，请稍候');return;}
 if(adviceView==='group'&&!confirmDiscard(groupDirty()))return;
 if(schemeSnapshot)editing=structuredClone(schemeSnapshot);
 schemeDrafts={};
 returnToQuote();
}
function cancelNote(){
 if(uploading){notify('照片处理中，请稍候');return;}
 let changed=false;
 if(adviceView==='colorway'){captureColorway();changed=JSON.stringify(colorwayDraft)!==colorBaseline;}
 else {captureNote();changed=JSON.stringify(noteDraft)!==noteBaseline;}
 if(!confirmDiscard(changed))return;
 if(adviceView==='colorway')returnFromColorway();else openGroupEditor(groupEditorId);
}
function saveNote(continueAdding=false){
 if(uploading){notify('照片处理中，请稍候');return;}
 captureNote();
 const index=editing.modificationGroups.findIndex(n=>n.id===noteDraft.id);
 noteDraft.text=noteDraft.text.trim();
 if(!noteDraft.category||!noteDraft.text){$('#advice-error').textContent='请填写修改类别和修改文字';$('#advice-text').focus();return;}
 if(noteDraft.text.length>100){$('#advice-error').textContent='修改文字最多 100 字';return;}
 if(index===-1)editing.modificationGroups.push(structuredClone(noteDraft));else editing.modificationGroups[index]=structuredClone(noteDraft);
 markSaved();
 adviceFilter='全部';
 if(continueAdding){openNote(null,noteDraft.groupId);}else{openGroupEditor(noteDraft.groupId);}
}
function closePhotoMenu(){
 $('#photo-menu')?.remove();
 const host=adviceView?$('#advice-page'):$('#sheet');
 host.querySelector(adviceView?'.advice-content':'.sheet-content').inert=false;
 host.querySelector('.sheet-footer').inert=false;
 $('[data-action="photo-menu"]')?.focus();
}
function showPhotoMenu(){
 if(uploading||(adviceView==='group'?schemePhotoTarget():adviceView?noteDraft:editing).photos.length>=6)return;
 const menu=document.createElement('div');menu.id='photo-menu';menu.className='photo-menu';
 menu.innerHTML='<section class="photo-menu-panel" role="dialog" aria-modal="true" aria-label="新增照片"><button data-action="photo-camera">拍照</button><button data-action="photo-album">从相册选择</button><button class="photo-menu-cancel" data-action="photo-menu-close">取消</button></section>';
 const host=adviceView?$('#advice-page'):$('#sheet');host.append(menu);
 host.querySelector(adviceView?'.advice-content':'.sheet-content').inert=true;host.querySelector('.sheet-footer').inert=true;
 menu.addEventListener('click',e=>{if(e.target===menu)closePhotoMenu();});
 menu.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const buttons=[...menu.querySelectorAll('button')];if(e.shiftKey&&document.activeElement===buttons[0]){e.preventDefault();buttons.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===buttons.at(-1)){e.preventDefault();buttons[0].focus();}});
 menu.querySelector('button').focus();
}
function openStyleDetail(product=null){
 const p=product||editing;if(!p||$('#style-detail'))return;styleDetailProduct=p;styleDetailFocus=document.activeElement;
 if(adviceView)captureNote();
 styleBackground=[...$('#app').children].map(element=>({element,inert:element.inert}));styleBackground.forEach(({element})=>element.inert=true);
 const page=document.createElement('section');page.id='style-detail';page.className='style-detail';page.setAttribute('role','dialog');page.setAttribute('aria-modal','true');page.setAttribute('aria-label','款式详情');
 page.innerHTML=`<header class="style-detail-header"><button data-action="style-detail-close" aria-label="返回上一级">‹</button><h2>Style3D</h2><span class="detail-capsule">•••　│　◉</span></header><div class="style-detail-content"><button class="style-detail-hero" data-action="style-detail-image" aria-label="放大款式图片"><img src="${escape(p.image)}" alt="${escape(p.name)}"><span>▧ 图片</span></button><div class="style-detail-thumbnails"><button data-action="style-detail-image" aria-label="查看款式图片"><img src="${escape(p.image)}" alt="${escape(p.name)}"></button></div><h1>${escape(p.name)}</h1><dl>${[['名称',p.name],['内部编号',p.id],['品类',p.category],['成分',p.composition]].map(([label,value])=>`<div><dt>${label}：</dt><dd>${escape(value||'—')}</dd></div>`).join('')}</dl></div><footer class="style-detail-footer"><button data-action="style-share"><span>♧</span>分享</button><button data-action="style-detail-bag"><span>♙<b>${products.length}</b></span>选品袋</button><button class="selected-style" disabled>已选品</button></footer>`;
 $('#app').append(page);page.querySelector('button').focus();
 page.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const buttons=[...page.querySelectorAll('button:not(:disabled)')];if(e.shiftKey&&document.activeElement===buttons[0]){e.preventDefault();buttons.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===buttons.at(-1)){e.preventDefault();buttons[0].focus();}});
}
function closeStyleDetail(){ $('#style-detail')?.remove();styleBackground.forEach(({element,inert})=>element.inert=inert);styleBackground=[];styleDetailProduct=null;styleDetailFocus?.focus({preventScroll:true});styleDetailFocus=null; }
function previewPhoto(id,index){
 const src=id==='attachment'?schemePhotoTarget().photos[index]:id==='product'?(styleDetailProduct||editing)?.image:(adviceView==='form'?noteDraft:editing.modificationGroups.find(n=>n.id===id))?.photos[index];if(!src)return;
 const preview=document.createElement('div');preview.id='photo-preview';preview.className='photo-preview';preview.setAttribute('role','dialog');preview.setAttribute('aria-label','说明照片预览');preview.innerHTML=`<button class="photo-preview-close" data-action="advice-preview-close" aria-label="关闭照片预览">×</button><img src="${src}" alt="说明照片放大预览">`;($('#style-detail')||(adviceView?$('#advice-page'):$('#sheet'))).append(preview);preview.querySelector('button').focus();
}
async function compressPhoto(file){
 if(!file.type.startsWith('image/'))throw new Error('请选择图片文件');
 if(file.size>50*1024*1024)throw new Error('单张图片不能超过 50MB');
 const url=URL.createObjectURL(file);
 try{const img=new Image();img.src=url;await img.decode();const scale=Math.min(1,1000/Math.max(img.naturalWidth,img.naturalHeight));const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(img.naturalWidth*scale));canvas.height=Math.max(1,Math.round(img.naturalHeight*scale));const context=canvas.getContext('2d');context.fillStyle='#fff';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(img,0,0,canvas.width,canvas.height);return canvas.toDataURL('image/jpeg',.75);}catch(error){if(error.message==='请选择图片文件')throw error;throw new Error('无法读取该图片，请选择 JPG、PNG 或 WebP 图片');}finally{URL.revokeObjectURL(url);}
}
document.addEventListener('input',e=>{if(e.target.id==='tag-search'){renderTagOptions();return;}if(e.target.id==='advice-text'){$('#advice-text-count').textContent=e.target.value.length;}});
document.addEventListener('change',async e=>{
 if(e.target.id==='advice-summary-filter'){captureNote();adviceFilter=e.target.value;renderNote();return;}
 if(['product-camera','product-upload'].includes(e.target.id)&&editing){
 const owner=editing,target=schemePhotoTarget(),files=Array.from(e.target.files||[]);if(!files.length||uploading)return;
 uploading=true;renderProductPhotos();$('#product-photo-status').textContent='正在处理照片…';
 const available=6-target.photos.length;let error='';
 for(const file of files.slice(0,available)){try{target.photos.push(await compressPhoto(file));}catch(err){error=err.message;}}
 uploading=false;e.target.value='';
 if(editing===owner&&$('#product-photos')){renderProductPhotos();$('#product-photo-status').textContent=error||(files.length>available?'最多保留 6 张图片':'');}
 return;
 }
 if(!['advice-camera','advice-upload'].includes(e.target.id)||!noteDraft)return;
 const files=Array.from(e.target.files||[]),targetDraft=noteDraft;if(!files.length)return;
 uploading=true;renderPhotos();$('#photo-status').textContent='正在处理照片…';
 let error='';const available=6-targetDraft.photos.length;
 for(const file of files.slice(0,available)){try{targetDraft.photos.push(await compressPhoto(file));}catch(e){error=e.message;}}
 uploading=false;e.target.value='';renderPhotos();
 $('#photo-status').textContent=error||(files.length>available?'最多保留 6 张照片':'照片已添加，保存建议后可继续添加其他意见');
});

function renderLinkedOrder(){const value=$('#linked-order-value');if(!value)return;value.textContent=linkedOrder?`${linkedOrder.id} · ${linkedOrder.customer?.company||linkedOrder.customer?.name||''}`:'请选择 ›';$('#unlink-order').hidden=!linkedOrder;}
function orderChoices(){const rows=[{id:'DX20260928-001',customer:{name:'陈晓',company:'云织服饰'},created:'2026-09-28 10:30:00'},{id:'DX20260923-002',customer:{name:'林悦',company:'青禾设计工作室'},created:'2026-09-23 14:00:00'},{id:'DX20260917-003',customer:{name:'陈晓',company:'云织服饰'},created:'2026-09-17 09:20:00'}];return rows;}
function openOrderPicker(){simple('关联订单',`<div class="order-search"><input id="order-query" type="search" placeholder="搜索订单号、客户" aria-label="搜索订单号、客户"><div class="order-date-range"><label>开始日期<input id="order-from" type="date"></label><label>结束日期<input id="order-to" type="date"></label></div><p class="order-demo-label">示例订单</p></div><div id="order-options"></div>`);renderOrderOptions();$('#order-query').addEventListener('input',renderOrderOptions);$('#order-from').addEventListener('change',renderOrderOptions);$('#order-to').addEventListener('change',renderOrderOptions);}
function renderOrderOptions(){const query=$('#order-query').value.trim().toLowerCase(),from=$('#order-from').value,to=$('#order-to').value;if(from&&to&&from>to){$('#order-options').innerHTML='<p class="helper">结束日期不能早于开始日期</p>';return;}const rows=orderChoices().filter(o=>{const date=String(o.created||'').slice(0,10);return `${o.id} ${o.customer?.name||''} ${o.customer?.company||''}`.toLowerCase().includes(query)&&(!from||date>=from)&&(!to||date<=to);});$('#order-options').innerHTML=rows.map(o=>`<button class="option-row order-option" data-action="select-linked-order" data-order-id="${escape(o.id)}"><div><strong>${escape(o.id)}</strong><p>${escape(o.customer?.company||'')} · ${escape(o.customer?.name||'')}</p><p>${escape(o.created||'')}</p></div><span>${linkedOrder?.id===o.id?'✓':'›'}</span></button>`).join('')||'<p class="helper">暂无匹配订单</p>';}
function customer(){return {name:$('#name').value.trim(),company:$('#company').value.trim(),phone:$('#phone').value.trim()};}
function fillCustomer(c){for(const key of ['name','company','phone'])$('#'+key).value=c[key]||'';}
function save(){notify('演示：已暂存');}
function add(){simple('继续添加',config.products.map(p=>`<button class="option-row" data-action="pick-product" data-id="${p.id}"><img src="${p.image}" alt="${escape(p.name||p.id)}"><div><strong>${escape(p.name||p.id)}</strong><p>${p.id} · ${escape(p.category)}</p></div><span class="choice">${products.some(x=>x.id===p.id)?'已添加':'＋'}</span></button>`).join(''),'完成','close');}
function recognition(type){
 if(type==='card')simple('名片识别','<p class="helper">演示模式：选择名片图片后，使用示例客户信息填入表单。</p><label class="file-label">选择名片图片<input id="card-file" type="file" accept="image/*"></label><p id="card-error" class="error"></p>','识别并填入','recognize-card');
 else simple('文本识别','<p class="helper">粘贴客户信息，按姓名、企业/品牌、电话提取。</p><textarea id="recognition-text" class="text-input" placeholder="姓名：陈晓&#10;企业：云织服饰&#10;电话：13800138000"></textarea><button class="blue" style="font-size:13px;margin-top:12px" data-action="example">填入演示文本</button><p id="text-error" class="error"></p>','识别并填入','recognize-text');
}
document.addEventListener('click', e=>{
 const button=e.target.closest('[data-action]');if(!button)return;const action=button.dataset.action,id=button.dataset.id;
 switch(action){
 case 'entry-delete-open':if(!uploading)mountPopup(`<section class="discard-dialog" role="alertdialog" aria-modal="true" aria-labelledby="delete-title"><h2 id="delete-title">删除${escape(button.dataset.label)}？</h2><p>确认删除这${button.dataset.label==='修改项'?'条':'个'}${escape(button.dataset.label)}？</p><div><button data-action="popup-close">取消</button><button class="danger" data-action="${escape(button.dataset.confirm)}" data-id="${escape(id)}">删除</button></div></section>`,'centered');break;
 case 'entry-delete-cancel':dismissPopup();break;
 case 'scheme-delete-confirm':if(!uploading){dismissPopup();editing.modificationGroups=editing.modificationGroups.filter(n=>(n.groupId||n.id)!==id);delete editing.schemePhotos?.[id];delete schemeDrafts[id];expandedModifications.delete(id);markSaved(true);returnToQuote();}break;
 case 'advice-open':openAdvice();break;
 case 'group-open':{if(!adviceView)captureQuote();const item=editing.modificationGroups.find(n=>n.id===button.dataset.id);openGroupEditor(button.dataset.group||(item?.groupId||item?.id));break;}
 case 'modification-toggle':{
 if(expandedModifications.has(groupEditorId))expandedModifications.delete(groupEditorId);else expandedModifications.add(groupEditorId);
 const items=editing.modificationGroups.filter(n=>(n.groupId||n.id)===groupEditorId);
 $('#modification-list').outerHTML=modificationList(items,groupEditorId);break;
 }
 case 'group-open-item':openNote(id);break;
 case 'item-delete':if(!confirm('确定删除这条修改项？'))break;rememberScheme();removeModification(id);openGroupEditor(groupEditorId);break;
 case 'group-save':{
   if(uploading){notify('照片处理中，请稍候');break;}
   captureNote();
   let first=editing.modificationGroups.find(n=>(n.groupId||n.id)===groupEditorId);
   const groupData={colorways:normalizeColorways(noteDraft),colors:[],styleDescription:noteDraft?.styleDescription||'',needleType:noteDraft?.needleType||'',season:noteDraft?.season||'',size:noteDraft?.size||'',schemeRemark:noteDraft?.schemeRemark||''};
   if(first) Object.assign(first,groupData);
   else if(noteDraft && (schemePhotoTarget().photos.length||groupData.colorways.length||groupData.styleDescription||groupData.needleType||groupData.season||groupData.size||groupData.schemeRemark)) {
     editing.modificationGroups.push({id:crypto.randomUUID(),groupId:groupEditorId,category:'',tags:[],text:'',photos:[],...groupData});
   }
   if(!editing.modificationGroups.filter(n=>(n.groupId||n.id)===groupEditorId).some(isModification)&&!groupData.colorways.length&&!['styleDescription','needleType','season','size','schemeRemark'].some(k=>groupData[k].trim())&&!schemePhotoTarget().photos.length)editing.modificationGroups=editing.modificationGroups.filter(n=>(n.groupId||n.id)!==groupEditorId);
   delete schemeDrafts[groupEditorId];
   markSaved(true);
   returnToQuote();
   break;
 }
 case 'group-delete':{const group=button.dataset.group;if(!confirm('确定删除这个修改内容方案吗？'))break;if(!adviceView)captureQuote();editing.modificationGroups=editing.modificationGroups.filter(n=>(n.groupId||n.id)!==group);delete editing.schemePhotos?.[group];delete schemeDrafts[group];markSaved(true);returnToQuote();notify('已删除修改内容方案');break;}

 case 'advice-add':requestAdviceAction(()=>openNote());break;
 case 'advice-add-group':if(!adviceView)captureQuote();openGroupEditor();break;
 case 'advice-add-item':openNote(null,button.dataset.group);break;
 case 'advice-cancel-edit':cancelNote();break;
 case 'advice-edit':if(id!==noteDraft.id)requestAdviceAction(()=>openNote(id));break;

 case 'category-open':categoryPicker();break;
 case 'category-pick':dismissPopup();captureNote();noteDraft.category=button.dataset.value;noteDraft.tags=[];renderNote();break;
 case 'tag-inline':captureNote();noteDraft.tags=[button.dataset.value];renderNote();break;
 case 'colorway-add':colorwayDetailsReturn=false;openColorway();break;
 case 'colorway-details':openColorwayDetails();break;
 case 'colorway-details-close':closeColorwayDetails();break;
 case 'colorway-edit':colorwayDetailsReturn=adviceView==='colors';if(colorwayDetailsReturn)colorDetailsScroll=$('.advice-content').scrollTop;openColorway(id);break;
 case 'colorway-delete-confirm':dismissPopup();schemeDrafts[groupEditorId].colorways=schemeDrafts[groupEditorId].colorways.filter(c=>c.id!==id);commitSchemePart('colorways',schemeDrafts[groupEditorId].colorways);returnFromColorway();break;
 case 'color-position-open':openColorPosition(Number(button.dataset.index));break;
 case 'color-position-pick':{
 const index=colorPositionIndex;
 colorwayDraft.colors[index].position=button.dataset.value;
 dismissPopup();
 const field=$(`[data-action="color-position-open"][data-index="${index}"]`);
 field.value=button.dataset.value;field.querySelector('span').textContent=button.dataset.value;field.setAttribute('aria-label',`第${index+1}行色位 ${button.dataset.value}`);field.focus();break;
 }
 case 'color-minus':captureColorway();colorwayDraft.quantity=Math.max(1,colorwayDraft.quantity-1);renderColorway();break;
 case 'color-plus':captureColorway();colorwayDraft.quantity+=1;renderColorway();break;
 case 'colorway-row-add':{
 captureColorway();const used=new Set(colorwayDraft.colors.map(c=>c.position).filter(Boolean));const next=nextPosition(colorwayDraft.colors);
 colorwayDraft.colors.push({position:next,material:colorwayDraft.colors.at(-1)?.material||'',code:''});renderColorway();
 const row=$('#colorway-rows').lastElementChild;const input=row.querySelector(colorwayDraft.colors.at(-1).material.trim()?'.color-code':'.color-material');input.focus();input.scrollIntoView({block:'center',behavior:'smooth'});break;
 }
 case 'colorway-row-delete':if(!confirm('确定删除这个色位？'))break;captureColorway();if(colorwayDraft.colors.length<=1){notify('至少保留一个色位');break;}colorwayDraft.colors.splice(Number(button.dataset.index),1);renderColorway();break;
 case 'colorway-save':saveColorway();break;
 case 'colorway-cancel':cancelNote();break;
 case 'advice-category':captureNote();noteDraft.category=button.dataset.value;noteDraft.tags=[];renderNote();break;
 case 'voice-open':openVoice();break;
 case 'voice-clear':if(voiceSession&&!voiceSession.active)$('#voice-text').value='';break;
 case 'voice-confirm':if(voiceSession&&!voiceSession.active){noteDraft.text=$('#voice-text').value.slice(0,100);dismissPopup();renderNote();}break;
 case 'tags-open':openTagPicker();break;
 case 'tags-pick':{const tag=button.dataset.value;pickerTags=[tag];commitTags();break;}
 case 'tags-confirm':commitTags();break;
 case 'tags-clear':pickerTags=[];renderTagOptions();break;
 case 'popup-close':dismissPopup();break;
 case 'advice-note-close':cancelNote();break;
 case 'style-detail':openStyleDetail();break;
 case 'style-detail-close':closeStyleDetail();break;
 case 'style-detail-bag':closeStyleDetail();break;
 case 'style-detail-image':previewPhoto('product',0);$('#photo-preview').style.zIndex='60';break;
 case 'style-share':notify('演示页面，分享功能待接入');break;
 case 'style-preview':openStyleDetail(products[Number(button.dataset.index)]);break;
 case 'product-photo-preview':previewPhoto('attachment',Number(button.dataset.index));break;
 case 'product-photo-remove':if(!confirm('确定删除这张图片？'))break;schemePhotoTarget().photos.splice(Number(button.dataset.index),1);renderProductPhotos();break;
 case 'photo-menu':showPhotoMenu();break;
 case 'photo-menu-close':closePhotoMenu();break;
 case 'photo-camera':closePhotoMenu();$(adviceView==='form'?'#advice-camera':'#product-camera').click();break;
 case 'photo-album':closePhotoMenu();$(adviceView==='form'?'#advice-upload':'#product-upload').click();break;
 case 'advice-finish':if(adviceView==='form')saveNote();else returnToQuote();break;
 case 'advice-save':saveNote();break;
 case 'advice-save-next':saveNote(true);break;
 case 'advice-discard':{const next=pendingAdviceAction;dismissPopup();if(next)next();break;}
 case 'advice-keep':dismissPopup();break;
 case 'advice-delete':if(!uploading)$('#note-delete-warning').hidden=false;break;
 case 'advice-delete-cancel':button.closest('.delete-warning').hidden=true;break;
 case 'advice-delete-confirm':if(!uploading){dismissPopup();removeModification(id);openGroupEditor(groupEditorId);notify('已删除修改项');}break;
 case 'advice-photo-remove':if(!confirm('确定删除这张图片？'))break;noteDraft.photos.splice(Number(button.dataset.index),1);renderPhotos();break;
 case 'advice-preview':previewPhoto(button.dataset.id,Number(button.dataset.index));break;
 case 'advice-preview-close':$('#photo-preview').remove();break;
 case 'edit':edit(id);break;
 case 'close':close();break;
 case 'delete':products=products.filter(p=>p.id!==id);render();notify('已移除该选品');break;
 case 'clear':if(!products.length){notify('清单已为空');break;}simple('清空选品清单','<p class="helper">将移除当前全部选品，客户信息会保留。</p>','确认清空','confirm-clear');break;
 case 'confirm-clear':products=[];render();close();break;
 case 'add':add();break;
 case 'pick-product':if(products.some(p=>p.id===id)){notify('该款式已在清单中');break;}products.push({...config.products.find(p=>p.id===id),quantity:1,price:'',minimum:'',currency:'CNY',requirements:[],remark:'',modificationGroups:[]});render();add();notify('已添加到选品清单');break;

 case 'requirement':{const r=button.dataset.value;editing.requirements=editing.requirements.includes(r)?editing.requirements.filter(x=>x!==r):[...editing.requirements,r];button.classList.toggle('selected',editing.requirements.includes(r));button.setAttribute('aria-pressed',editing.requirements.includes(r));break;}
 case 'plus':case 'minus':editing.quantity=Math.max(0,editing.quantity+(action==='plus'?1:-1));$('#quantity').value=editing.quantity;$('[data-action="minus"]').disabled=editing.quantity===0;$('[data-action="plus"]').disabled=false;break;
 case 'confirm-edit':if(uploading){notify('照片处理中，请稍候');break;}{editing.remark=$('#remark').value.trim();products=products.map(p=>p.id===editing.id?editing:p);render();close(true);break;}
 case 'link-order':openOrderPicker();break;
 case 'unlink-order':linkedOrder=null;renderLinkedOrder();break;
 case 'select-linked-order':{const selected=orderChoices().find(o=>o.id===button.dataset.orderId);if(selected){linkedOrder={id:selected.id,customer:selected.customer,created:selected.created};renderLinkedOrder();close();}break;}
 case 'customer':simple('选择客户','<p class="helper">演示客户</p>'+config.customers.map((c,i)=>`<button class="option-row" data-action="pick-customer" data-index="${i}"><div><strong>${c.name} · ${c.company}</strong><p>${c.phone}</p></div><i class="chevron" style="margin-left:auto"></i></button>`).join(''));break;
 case 'pick-customer':fillCustomer(config.customers[Number(button.dataset.index)]);close();notify('已填入客户信息');break;
 case 'card':case 'text':recognition(action);break;
 case 'example':$('#recognition-text').value='姓名：陈晓\n企业：云织服饰\n电话：13800138000';break;
 case 'recognize-card':{const file=$('#card-file').files[0];if(!file||!file.type.startsWith('image/')){$('#card-error').textContent='请先选择一张名片图片';break;}fillCustomer(config.customers[0]);close();notify('已填入示例识别结果，请核对客户信息');break;}
 case 'recognize-text':{const text=$('#recognition-text').value;const phone=text.match(/(?:\+86[- ]?)?1[3-9]\d{9}/)?.[0]||'';const name=text.match(/(?:姓名|联系人)\s*[:：]\s*([^\n，,]+)/)?.[1]?.trim()||'';const company=text.match(/(?:企业\/品牌|企业|品牌|公司)\s*[:：]\s*([^\n，,]+)/)?.[1]?.trim()||'';if(!name||!company||!phone){$('#text-error').textContent='请按示例填写姓名、企业和有效手机号码';break;}fillCustomer({name,company,phone});close();notify('已提取客户信息，请核对');break;}
 case 'save':save();break;
 case 'order':{if(!products.length){notify('请先添加选品');break;}const c=customer();const missing=['name','company','phone'].find(k=>!c[k]);if(missing){notify('请完善客户必填信息');$('#'+missing).focus();break;}if(!/^[+\d][\d\s()-]{5,19}$/.test(c.phone)){notify('请填写有效联系电话');$('#phone').focus();break;}simple('确认下单',`<div class="success"><h2>${escape(c.name)} · ${escape(c.company)}</h2><p>共 ${products.length} 款 / ${products.reduce((n,p)=>n+p.quantity,0)} 件<br>联系电话：${escape(c.phone)}</p></div>${orderSuggestions()}<p class="helper">演示订单，仅在当前浏览器展示，不会提交真实订单。</p>`,'确认提交','submit-order');break;}
 case 'submit-order':close();notify('演示：提交成功');break;
 case 'back':case 'home':if(adviceView){adviceBack();break;}if(!$('#overlay').hidden){close();break;}simple('代客选品','<p class="helper">为客户选择款式，填写洽谈信息与客户资料。</p>','继续选品','close');break;
 case 'more':if(adviceView){notify('完成修改内容后可使用更多操作');break;}simple('更多操作','<button class="menu-option" data-action="save">暂存</button><button class="menu-option" data-action="reset">恢复初始演示</button><p class="helper" style="margin-top:20px">演示操作</p>');break;
 case 'reset':simple('恢复初始演示','<p class="helper">恢复两个方案及示例客户信息。</p>','确认恢复','confirm-reset');break;
 case 'confirm-reset':{const initial=demoDraft();linkedOrder=null;renderLinkedOrder();products=initial.products;fillCustomer(initial.customer);schemeDrafts={};expandedModifications.clear();render();close();notify('已恢复初始演示');break;}
 }
});
document.addEventListener('change',e=>{if(e.target.id==='quantity'&&editing){const n=Number(e.target.value);if(Number.isInteger(n)&&n>=0)editing.quantity=n;else {notify('请输入有效整数件数');e.target.value=editing.quantity;}}});
let swipeStart=null;
document.addEventListener('touchstart',e=>{if(adviceView&&!e.target.closest('input,textarea,button'))swipeStart={x:e.touches[0].clientX,y:e.touches[0].clientY};else swipeStart=null;},{passive:true});
document.addEventListener('touchend',e=>{if(!swipeStart)return;const t=e.changedTouches[0],dx=t.clientX-swipeStart.x,dy=t.clientY-swipeStart.y;swipeStart=null;if(Math.abs(dx)>110&&Math.abs(dy)<45&&adviceView)adviceBack();},{passive:true});
$('#overlay').addEventListener('click',e=>{if(e.target===$('#overlay'))close();});
document.addEventListener('keydown',e=>{if($('#style-detail')){if(e.key==='Escape'){e.preventDefault();if($('#photo-preview')){$('#photo-preview').remove();$('#style-detail .style-detail-hero').focus();}else closeStyleDetail();}return;}if(adviceView){if(e.key==='Escape')adviceBack();return;}if($('#overlay').hidden)return;if(e.key==='Escape'){if($('#photo-preview')){$('#photo-preview').remove();return;}if($('#photo-menu')){closePhotoMenu();return;}close();}if(e.key==='Tab'){const controls=[...$('#sheet').querySelectorAll('button:not(:disabled),input,textarea,select,textarea')];if(!controls.length)return;const first=controls[0],last=controls.at(-1);if(e.shiftKey&&(document.activeElement===first||document.activeElement===$('#sheet'))){e.preventDefault();last.focus();}else if(!e.shiftKey&&(document.activeElement===last||document.activeElement===$('#sheet'))){e.preventDefault();first.focus();}}});
$('#customer-form').addEventListener('submit',e=>e.preventDefault());
const initial=demoDraft();products=initial.products;fillCustomer(initial.customer);
renderLinkedOrder();render();


})();
