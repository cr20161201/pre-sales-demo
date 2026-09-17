(() => {
'use strict';
const config = window.DEMO_CONFIG, $ = s => document.querySelector(s);
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fresh = () => config.products.map(p => ({...p, quantity:1, price:'', minimum:'', currency:'CNY', requirements:[], remark:'', suggestions:[]}));
let products = fresh(), editing = null, lastFocus = null, toastTimer;
let adviceView = null, noteDraft = null, noteBaseline = '', adviceFilter = '全部', pendingAdviceAction = null, pickerTags = [], popupFocus = null, uploading = false, quoteScroll = 0;
const trash = '<svg viewBox="0 0 24 24"><path d="M3 5h18M9 2h6M5 5v17h14V5M9 9v9M15 9v9"/></svg>';
function notify(message) { $('#toast').textContent = message; $('#toast').hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').hidden = true, 2400); }
function render() {
  $('#count').textContent = `(${products.length}款/${products.reduce((n,p)=>n+p.quantity,0)}件)`;
  $('#products').innerHTML = products.length ? products.map(p => `<article class="product"><img class="product-image" src="${p.image}" alt="${escape(p.name||p.id)}"><div class="product-info"><h3 class="product-title" style="margin:0;font-weight:400">${escape(p.name||p.id)}</h3><p class="product-meta">款号: ${p.id}<br>品类: ${escape(p.category||'衬衫')}</p><button class="edit-product" data-action="edit" data-id="${p.id}" aria-label="设置 ${p.id} 报价和具体需求"><span class="tag">${p.price ? `${p.currency==='CNY'?'¥':'$'}${escape(p.price)}${p.requirements.length ? ' · '+p.requirements.length+'项需求':''}` : '设置报价、具体需求'}</span><span class="tag">${p.quantity}件</span><i class="chevron"></i></button></div><button class="delete" data-action="delete" data-id="${p.id}" aria-label="删除 ${p.id}">${trash}</button></article>`).join('') : '<div class="empty">暂无选品，点击“继续添加”选择款式</div>';
}
function footer(text,action){return `<div class="sheet-footer"><button class="primary" data-action="${action}">${text}</button><div class="home-indicator"></div></div>`;}
function show(content, simple=false, label='编辑选品') {
  lastFocus = document.activeElement; $('#sheet').className = 'sheet'+(simple?' simple-sheet':''); $('#sheet').setAttribute('aria-label',label); $('#sheet').innerHTML=content; $('#overlay').hidden=false; $('.main').inert=true; $('.footer').inert=true; $('#sheet').focus();
}
function close(){ $('#overlay').hidden=true; $('.main').inert=false; $('.footer').inert=false; editing=null; if(lastFocus?.isConnected)lastFocus.focus(); }
function simple(title,body,button,action){show(`<div class="sheet-content"><div class="simple-heading"><h2>${title}</h2><button class="close" aria-label="关闭" data-action="close">×</button></div>${body}</div>${button?footer(button,action):'<div class="sheet-footer"><div class="home-indicator"></div></div>'}`,true,title);}
function edit(id, resume=false) {
 if(!resume) editing=structuredClone(products.find(p=>p.id===id));
 editing.suggestions ||= [];
 const p=editing;
 show(`<div class="sheet-content"><div class="sheet-product"><img src="${p.image}" alt="${escape(p.name||p.id)}"><h2>${p.id}</h2><button class="close" data-action="close" aria-label="关闭">×</button></div><section class="negotiation"><h2>洽谈信息</h2><label class="field quote-field"><span>报价</span><input id="price" inputmode="decimal" type="number" min="0" step="0.01" placeholder="请输入报价" value="${escape(p.price)}"><select id="currency" class="currency" aria-label="币种"><option value="CNY" ${p.currency==='CNY'?'selected':''}>人民币(￥)</option><option value="USD" ${p.currency==='USD'?'selected':''}>美元($)</option></select></label><label class="field quote-field"><span>起订量</span><input id="minimum" type="number" min="1" step="1" inputmode="numeric" placeholder="请输入起订量" value="${escape(p.minimum)}"><span style="width:auto">pcs</span></label></section><section class="requirements"><h2>具体需求</h2><div class="requirement-grid">${config.requirements.map(r=>`<button data-action="requirement" data-value="${r}" class="${p.requirements.includes(r)?'selected':''}" aria-pressed="${p.requirements.includes(r)}">${r}</button>`).join('')}</div></section><button class="advice-entry" data-action="advice-open"><span>修改建议</span><span class="advice-entry-count">${p.suggestions.length ? p.suggestions.length+'条' : '未填写'}<i class="chevron"></i></span></button>${quoteNotes(p.suggestions)}<label class="field quote-field remark"><span>备注</span><input id="remark" placeholder="请输入备注" value="${escape(p.remark)}"></label><div class="quantity"><h2>数量</h2><div class="stepper"><button aria-label="减少数量" data-action="minus" ${p.quantity===1?'disabled':''}>−</button><output id="quantity">${p.quantity}</output><button aria-label="增加数量" data-action="plus">+</button><span>件</span></div></div></div>${footer('确定','confirm-edit')}`);
}
function normalizeSuggestions(value) {
 if(!Array.isArray(value))return [];
 return value.filter(n=>n && typeof n.text==='string' && config.adviceCategories[n.category]).map(n=>({id:String(n.id||crypto.randomUUID()),category:n.category,tags:Array.isArray(n.tags)?n.tags.filter(t=>config.adviceCategories[n.category].includes(t)):[],text:n.text,photos:Array.isArray(n.photos)?n.photos.filter(p=>typeof p==='string'&&/^data:image\/(jpeg|png|webp);base64,/.test(p)).slice(0,6):[]}));
}
function orderSuggestions(){
 const rows=products.filter(p=>p.suggestions?.length);
 if(!rows.length)return '';
 return `<div class="order-advice"><h2>修改建议 · ${rows.reduce((n,p)=>n+p.suggestions.length,0)}条</h2>${rows.map(p=>`<section><p class="advice-sku">${escape(p.id)}</p>${p.suggestions.map(n=>`<p class="order-note"><span>${escape(n.category)}${n.tags.length?' · '+n.tags.map(escape).join('、'):''}</span>${escape(n.text)}${n.photos.length?`<small>附 ${n.photos.length} 张说明照片</small>`:''}</p>`).join('')}</section>`).join('')}</div>`;
}
function captureQuote(){
 Object.assign(editing,{price:$('#price').value,minimum:$('#minimum').value,currency:$('#currency').value,remark:$('#remark').value});
 quoteScroll=$('.sheet-content').scrollTop;
}
function openAdvice(){
 captureQuote();adviceFilter='全部';$('#overlay').hidden=true;openNote();
}
function showAdvice(title,body,button,action){
 $('#advice-page').hidden=false;$('#advice-page').innerHTML=`<div class="advice-content">${body}</div>${footer(button,action)}`;
 $('.navbar h1').textContent=title;$('.back').setAttribute('aria-label','返回上一级');
 $('.main').inert=true;$('.footer').inert=true;$('#advice-page').focus();
}
function returnToQuote(){
 adviceView=null;noteDraft=null;$('#advice-page').hidden=true;$('.navbar h1').textContent='代客选品';$('.back').setAttribute('aria-label','返回');
 edit(null,true);$('.sheet-content').scrollTop=quoteScroll;
}
function quoteNotes(notes){return notes.length?`<div class="quote-notes">${notes.map(n=>`<div class="quote-note"><p class="quote-note-label">${escape(n.category)}${n.tags.length?' · '+n.tags.map(escape).join('、'):''}</p><p class="quote-note-text">${escape(n.text)}</p>${n.photos.length?`<small>附图 ${n.photos.length}张</small>`:''}</div>`).join('')}</div>`:'';}
function adviceSummary(){
 const notes=editing.suggestions,filtered=notes.filter(n=>adviceFilter==='全部'||n.category===adviceFilter);
 if(!notes.length)return '<section class="saved-advice"><div class="saved-advice-heading">已录入 0 条</div><p class="saved-advice-empty">暂无修改建议</p></section>';
 return `<section class="saved-advice"><div class="saved-advice-heading">已记录 ${notes.length} 条<select aria-label="筛选已记录建议" id="advice-summary-filter">${['全部',...Object.keys(config.adviceCategories)].map(c=>`<option ${c===adviceFilter?'selected':''}>${c}</option>`).join('')}</select></div><div class="saved-advice-rows">${filtered.map(n=>`<button class="saved-advice-row ${n.id===noteDraft.id?'active':''}" data-action="advice-edit" data-id="${escape(n.id)}"><span class="saved-record"><span class="saved-record-label"><span class="saved-category">${escape(n.category)}</span><span class="saved-tags"> · ${n.tags.length?n.tags.map(escape).join('、'):'未选标签'}</span></span><span class="saved-text">${escape(n.text)}</span></span>${n.photos.length?`<small>${n.photos.length}图</small>`:''}<i class="chevron"></i></button>`).join('')||'<p class="saved-advice-empty">该类别暂无建议</p>'}</div></section>`;
}
function requestAdviceAction(action){
 if(uploading){notify('照片处理中，请稍候');return;}
 captureNote();if(JSON.stringify(noteDraft)!==noteBaseline){pendingAdviceAction=action;showDiscardDialog(action===returnToQuote);}else action();
}
function mountPopup(content,kind){
 clearTimeout(toastTimer);$('#toast').hidden=true;
 popupFocus=document.activeElement;
 const popup=document.createElement('div');popup.id='advice-popup';popup.className=`advice-popup ${kind}`;popup.innerHTML=content;
 $('#advice-page').append(popup);$('.advice-content').inert=true;$('#advice-page .sheet-footer').inert=true;
 popup.addEventListener('click',e=>{if(e.target===popup)dismissPopup();});
 popup.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const items=[...popup.querySelectorAll('button:not(:disabled),input')];if(e.shiftKey&&document.activeElement===items[0]){e.preventDefault();items.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===items.at(-1)){e.preventDefault();items[0].focus();}});
 popup.querySelector('button,input').focus();
}
function dismissPopup(){
 $('#advice-popup')?.remove();$('.advice-content').inert=false;$('#advice-page .sheet-footer').inert=false;pendingAdviceAction=null;
 if(popupFocus?.isConnected)popupFocus.focus();popupFocus=null;
}
function showDiscardDialog(returning){
 mountPopup(`<section class="discard-dialog" role="alertdialog" aria-modal="true" aria-labelledby="discard-title" aria-describedby="discard-description"><button class="discard-close" data-action="popup-close" aria-label="关闭提醒">×</button><h2 id="discard-title">修改尚未保存</h2><p id="discard-description">${returning?'返回':'切换'}后，本次未保存的内容将丢失。<br>已添加到列表的建议不受影响。</p><div><button data-action="advice-keep">继续编辑</button><button data-action="advice-discard">${returning?'放弃并返回':'放弃并切换'}</button></div></section>`,'centered');
}
function openTagPicker(){
 if(uploading)return;captureNote();pickerTags=[...noteDraft.tags];
 mountPopup(`<section class="tag-picker-panel" role="dialog" aria-modal="true" aria-labelledby="tag-picker-title"><header><h2 id="tag-picker-title">选择修改标签</h2><button data-action="popup-close">取消</button></header><p class="tag-picker-hint">${escape(noteDraft.category)} · 可多选</p><input id="tag-search" type="search" placeholder="搜索标签" aria-label="搜索标签"><div id="tag-options" class="tag-options"></div><footer><button data-action="tags-clear">清空已选</button><button data-action="tags-confirm" class="primary">确定</button></footer></section>`,'bottom');
 renderTagOptions();
}
function renderTagOptions(){
 const focusedTag=document.activeElement?.dataset?.action==='tags-pick'?document.activeElement.dataset.value:null;
 const query=$('#tag-search').value.trim().toLowerCase(),tags=config.adviceCategories[noteDraft.category].filter(t=>t.toLowerCase().includes(query));
 $('#tag-options').innerHTML=tags.map(t=>`<button class="tag-option ${pickerTags.includes(t)?'selected':''}" data-action="tags-pick" data-value="${escape(t)}" aria-pressed="${pickerTags.includes(t)}"><span>${escape(t)}</span><i class="tag-check ">${pickerTags.includes(t)?'✓':''}</i></button>`).join('')||'<p class="tag-no-results">未找到匹配标签</p>';
 $('[data-action="tags-confirm"]').textContent=`确定（${pickerTags.length}）`;
 if(focusedTag)Array.from(document.querySelectorAll('[data-action="tags-pick"]')).find(b=>b.dataset.value===focusedTag)?.focus();
}
function commitTags(){
 noteDraft.tags=[...pickerTags];const scroll=$('.advice-content').scrollTop;dismissPopup();renderNote();$('.advice-content').scrollTop=scroll;$('[data-action="tags-open"]').focus();
}
function openNote(id){
 noteDraft=id?structuredClone(editing.suggestions.find(n=>n.id===id)):{id:crypto.randomUUID(),category:'',tags:[],text:'',photos:[]};
 noteBaseline=JSON.stringify(noteDraft);pendingAdviceAction=null;adviceView='form';renderNote();
}
function captureNote(){if($('#advice-text'))noteDraft.text=$('#advice-text').value;}
function renderNote(){
 const n=noteDraft,isEdit=editing.suggestions.some(item=>item.id===n.id);
 showAdvice('修改建议',`<div class="advice-style-bar"><button class="style-image-button" data-action="style-preview" aria-label="放大当前款式图片"><img src="${escape(editing.image)}" alt="当前款式图片"></button><div class="style-identification"><h2>${escape(editing.name||editing.id)}</h2><p>${editing.name?escape(editing.id):'成分：'+escape(editing.composition)}</p></div></div>${adviceSummary()}${isEdit?'<div class="note-mode-heading"><h2>编辑建议</h2><div><button data-action="advice-cancel-edit">取消编辑</button><button class="danger" data-action="advice-delete">删除</button></div></div>':''}<div class="delete-warning" id="note-delete-warning" hidden><span>删除这条修改建议？</span><button data-action="advice-delete-cancel">取消</button><button class="danger" data-action="advice-delete-confirm" data-id="${escape(n.id)}">删除</button></div><section class="advice-form-section"><h2>修改类别 <b>*</b></h2><div class="advice-category-options">${Object.keys(config.adviceCategories).map(c=>`<button class="${n.category===c?'selected':''}" data-action="advice-category" data-value="${c}" aria-pressed="${n.category===c}">${c}</button>`).join('')}</div></section>${n.category?`<button class="tag-picker-entry" data-action="tags-open"><span>修改标签</span><span class="tag-picker-value">${n.tags.length?n.tags.map(escape).join('、'):'请选择'}${n.tags.length>1?` · 已选${n.tags.length}项`:''}</span><i class="chevron"></i></button>`:''}<section class="advice-form-section"><h2><label for="advice-text">文字建议 <b>*</b></label></h2><textarea id="advice-text" maxlength="1000" placeholder="请描述需要调整的位置及具体要求，例如：袖长缩短 2cm，袖口保持原工艺。">${escape(n.text)}</textarea><p class="advice-text-count"><span id="advice-text-count">${n.text.length}</span>/1000</p></section><section class="advice-form-section"><h2>拍照说明 <small id="photo-count"></small></h2><div id="advice-photos" class="advice-photos"></div><div class="photo-upload-actions"><label>拍照<input id="advice-camera" class="visually-hidden" type="file" accept="image/*" capture="environment"></label><label>从相册选择<input id="advice-upload" class="visually-hidden" type="file" accept="image/*" multiple></label></div><p class="photo-helper" id="photo-status">可选，最多 6 张，用照片标明需要调整的位置</p></section><p id="advice-error" class="error" role="alert"></p>`, '保存并返回','advice-save');
 const content=$('#advice-page .advice-content');
 content.classList.add('entry-first');
 $('.saved-advice-heading').firstChild.textContent=`已录入 ${editing.suggestions.length} 条`;
 content.append($('.saved-advice'));
 $('.saved-advice').insertAdjacentHTML('beforebegin',`<button class="add-to-list" data-action="advice-save-next">${isEdit?'保存修改':'＋ 添加到列表'}</button>`);
 $('.photo-upload-actions').hidden=true;
 $('#photo-status').textContent='';
 $('#advice-page .sheet-footer .primary').textContent='完成';
 $('#advice-page .sheet-footer .primary').dataset.action='advice-finish';
 renderPhotos();
}
function renderPhotos(){
 $('#photo-count').textContent=`${noteDraft.photos.length}/6`;
 $('#advice-photos').innerHTML=noteDraft.photos.map((src,i)=>`<div class="advice-photo"><button data-action="advice-preview" data-index="${i}" aria-label="预览第${i+1}张照片"><img src="${src}" alt="说明照片 ${i+1}"></button><button class="remove-photo" data-action="advice-photo-remove" data-index="${i}" aria-label="删除第${i+1}张照片">×</button></div>`).join('')+(noteDraft.photos.length<6?`<button class="add-photo" data-action="photo-menu" aria-label="新增照片" title="新增照片" ${uploading?'disabled':''}>＋</button>`:'');
 $('[data-action="advice-save-next"]').disabled=uploading;
 for(const button of document.querySelectorAll('#advice-page .sheet-footer button'))button.disabled=uploading;
 for(const input of [$('#advice-camera'),$('#advice-upload')])input.disabled=uploading||noteDraft.photos.length>=6;
}
function adviceBack(){
 if($('#advice-popup')){dismissPopup();return;}
 if($('#photo-menu')){closePhotoMenu();return;}
 if($('#photo-preview')){$('#photo-preview').remove();return;}
 requestAdviceAction(returnToQuote);
}
function saveNote(continueAdding=false){
 if(uploading){notify('照片处理中，请稍候');return;}
 captureNote();
 const index=editing.suggestions.findIndex(n=>n.id===noteDraft.id);
 if(!continueAdding && index===-1 && editing.suggestions.length && JSON.stringify(noteDraft)===noteBaseline){returnToQuote();return;}
 if(!noteDraft.category||!noteDraft.text.trim()){$('#advice-error').textContent=!noteDraft.category?'请选择修改类别':'请输入文字修改建议';if(noteDraft.category)$('#advice-text').focus();return;}
 noteDraft.text=noteDraft.text.trim();
 if(index===-1)editing.suggestions.push(structuredClone(noteDraft));else editing.suggestions[index]=structuredClone(noteDraft);
 adviceFilter='全部';
 if(continueAdding){const category=noteDraft.category;openNote();noteDraft.category=category;noteBaseline=JSON.stringify(noteDraft);renderNote();notify('已添加，可继续填写下一条');}else{returnToQuote();}
}
function closePhotoMenu(){
 $('#photo-menu')?.remove();
 $('#advice-page .advice-content').inert=false;
 $('#advice-page .sheet-footer').inert=false;
 $('[data-action="photo-menu"]')?.focus();
}
function showPhotoMenu(){
 if(uploading||noteDraft.photos.length>=6)return;
 const menu=document.createElement('div');menu.id='photo-menu';menu.className='photo-menu';
 menu.innerHTML='<section class="photo-menu-panel" role="dialog" aria-modal="true" aria-label="新增照片"><button data-action="photo-camera">拍照</button><button data-action="photo-album">从相册选择</button><button class="photo-menu-cancel" data-action="photo-menu-close">取消</button></section>';
 $('#advice-page').append(menu);
 $('#advice-page .advice-content').inert=true;$('#advice-page .sheet-footer').inert=true;
 menu.addEventListener('click',e=>{if(e.target===menu)closePhotoMenu();});
 menu.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const buttons=[...menu.querySelectorAll('button')];if(e.shiftKey&&document.activeElement===buttons[0]){e.preventDefault();buttons.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===buttons.at(-1)){e.preventDefault();buttons[0].focus();}});
 menu.querySelector('button').focus();
}
function previewPhoto(id,index){
 const src=id==='product'?editing.image:(adviceView==='form'?noteDraft:editing.suggestions.find(n=>n.id===id))?.photos[index];if(!src)return;
 const preview=document.createElement('div');preview.id='photo-preview';preview.className='photo-preview';preview.setAttribute('role','dialog');preview.setAttribute('aria-label','说明照片预览');preview.innerHTML=`<button class="photo-preview-close" data-action="advice-preview-close" aria-label="关闭照片预览">×</button><img src="${src}" alt="说明照片放大预览">`;$('#advice-page').append(preview);preview.querySelector('button').focus();
}
async function compressPhoto(file){
 if(!file.type.startsWith('image/'))throw new Error('请选择图片文件');
 if(file.size>20*1024*1024)throw new Error('单张图片请小于 20MB');
 const url=URL.createObjectURL(file);
 try{const img=new Image();img.src=url;await img.decode();const scale=Math.min(1,1000/Math.max(img.naturalWidth,img.naturalHeight));const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(img.naturalWidth*scale));canvas.height=Math.max(1,Math.round(img.naturalHeight*scale));const context=canvas.getContext('2d');context.fillStyle='#fff';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(img,0,0,canvas.width,canvas.height);return canvas.toDataURL('image/jpeg',.75);}catch(error){if(error.message==='请选择图片文件')throw error;throw new Error('无法读取该图片，请选择 JPG、PNG 或 WebP 图片');}finally{URL.revokeObjectURL(url);}
}
document.addEventListener('input',e=>{if(e.target.id==='tag-search'){renderTagOptions();return;}if(e.target.id==='advice-text'){$('#advice-text-count').textContent=e.target.value.length;}});
document.addEventListener('change',async e=>{
 if(e.target.id==='advice-summary-filter'){captureNote();adviceFilter=e.target.value;renderNote();return;}
 if(!['advice-camera','advice-upload'].includes(e.target.id)||!noteDraft)return;
 const files=Array.from(e.target.files||[]),targetDraft=noteDraft;if(!files.length)return;
 uploading=true;renderPhotos();$('#photo-status').textContent='正在处理照片…';
 let error='';const available=6-targetDraft.photos.length;
 for(const file of files.slice(0,available)){try{targetDraft.photos.push(await compressPhoto(file));}catch(e){error=e.message;}}
 uploading=false;e.target.value='';renderPhotos();
 $('#photo-status').textContent=error||(files.length>available?'最多保留 6 张照片':'照片已添加，保存建议后可继续添加其他意见');
});

function customer(){return {name:$('#name').value.trim(),company:$('#company').value.trim(),phone:$('#phone').value.trim()};}
function fillCustomer(c){for(const key of ['name','company','phone'])$('#'+key).value=c[key]||'';}
function save(){try{localStorage.setItem(config.storageKey,JSON.stringify({products,customer:customer()}));notify('已暂存到本机');}catch{notify('浏览器无法保存，请勿关闭当前页面');}}
function add(){simple('继续添加',config.products.map(p=>`<button class="option-row" data-action="pick-product" data-id="${p.id}"><img src="${p.image}" alt="${escape(p.name||p.id)}"><div><strong>${escape(p.name||p.id)}</strong><p>${p.id} · ${escape(p.category)}</p></div><span class="choice">${products.some(x=>x.id===p.id)?'已添加':'＋'}</span></button>`).join(''),'完成','close');}
function recognition(type){
 if(type==='card')simple('名片识别','<p class="helper">演示模式：选择名片图片后，使用示例客户信息填入表单。</p><label class="file-label">选择名片图片<input id="card-file" type="file" accept="image/*"></label><p id="card-error" class="error"></p>','识别并填入','recognize-card');
 else simple('文本识别','<p class="helper">粘贴客户信息，按姓名、企业/品牌、电话提取。</p><textarea id="recognition-text" class="text-input" placeholder="姓名：陈晓&#10;企业：云织服饰&#10;电话：13800138000"></textarea><button class="blue" style="font-size:13px;margin-top:12px" data-action="example">填入演示文本</button><p id="text-error" class="error"></p>','识别并填入','recognize-text');
}
document.addEventListener('click', e=>{
 const button=e.target.closest('[data-action]');if(!button)return;const action=button.dataset.action,id=button.dataset.id;
 switch(action){
 case 'advice-open':openAdvice();break;

 case 'advice-add':requestAdviceAction(()=>openNote());break;
 case 'advice-cancel-edit':if(!uploading){openNote();notify('已取消编辑，原建议未更改');}break;
 case 'advice-edit':if(id!==noteDraft.id)requestAdviceAction(()=>openNote(id));break;

 case 'advice-category':captureNote();noteDraft.category=button.dataset.value;noteDraft.tags=[];renderNote();break;
 case 'tags-open':openTagPicker();break;
 case 'tags-pick':{const tag=button.dataset.value;pickerTags=pickerTags.includes(tag)?pickerTags.filter(t=>t!==tag):[...pickerTags,tag];renderTagOptions();break;}
 case 'tags-confirm':commitTags();break;
 case 'tags-clear':pickerTags=[];renderTagOptions();break;
 case 'popup-close':dismissPopup();break;
 case 'style-preview':previewPhoto('product',0);break;
 case 'photo-menu':showPhotoMenu();break;
 case 'photo-menu-close':closePhotoMenu();break;
 case 'photo-camera':closePhotoMenu();$('#advice-camera').click();break;
 case 'photo-album':closePhotoMenu();$('#advice-upload').click();break;
 case 'advice-finish':requestAdviceAction(returnToQuote);break;
 case 'advice-save':saveNote();break;
 case 'advice-save-next':saveNote(true);break;
 case 'advice-discard':{const next=pendingAdviceAction;dismissPopup();if(next)next();break;}
 case 'advice-keep':dismissPopup();break;
 case 'advice-delete':if(!uploading)$('#note-delete-warning').hidden=false;break;
 case 'advice-delete-cancel':button.closest('.delete-warning').hidden=true;break;
 case 'advice-delete-confirm':if(!uploading){editing.suggestions=editing.suggestions.filter(n=>n.id!==id);openNote();notify('已删除修改建议');}break;
 case 'advice-photo-remove':noteDraft.photos.splice(Number(button.dataset.index),1);renderPhotos();break;
 case 'advice-preview':previewPhoto(button.dataset.id,Number(button.dataset.index));break;
 case 'advice-preview-close':$('#photo-preview').remove();break;
 case 'edit':edit(id);break;
 case 'close':close();break;
 case 'delete':products=products.filter(p=>p.id!==id);render();notify('已移除该选品');break;
 case 'clear':if(!products.length){notify('清单已为空');break;}simple('清空选品清单','<p class="helper">将移除当前全部选品，客户信息会保留。</p>','确认清空','confirm-clear');break;
 case 'confirm-clear':products=[];render();close();break;
 case 'add':add();break;
 case 'pick-product':if(products.some(p=>p.id===id)){notify('该款式已在清单中');break;}products.push({...config.products.find(p=>p.id===id),quantity:1,price:'',minimum:'',currency:'CNY',requirements:[],remark:'',suggestions:[]});render();add();notify('已添加到选品清单');break;
 case 'requirement':{const r=button.dataset.value;editing.requirements=editing.requirements.includes(r)?editing.requirements.filter(x=>x!==r):[...editing.requirements,r];button.classList.toggle('selected',editing.requirements.includes(r));button.setAttribute('aria-pressed',editing.requirements.includes(r));break;}
 case 'plus':case 'minus':editing.quantity=Math.max(1,Math.min(999,editing.quantity+(action==='plus'?1:-1)));$('#quantity').value=editing.quantity;$('[data-action="minus"]').disabled=editing.quantity===1;$('[data-action="plus"]').disabled=editing.quantity===999;break;
 case 'confirm-edit':{const price=$('#price'),minimum=$('#minimum');if((price.value!==''&&(!price.checkValidity()||Number(price.value)<0))||(minimum.value!==''&&(!minimum.checkValidity()||Number(minimum.value)<1))){notify('请填写有效报价和正整数起订量');break;}Object.assign(editing,{price:price.value,minimum:minimum.value,currency:$('#currency').value,remark:$('#remark').value.trim()});products=products.map(p=>p.id===editing.id?editing:p);render();close();break;}
 case 'customer':simple('选择客户','<p class="helper">演示客户</p>'+config.customers.map((c,i)=>`<button class="option-row" data-action="pick-customer" data-index="${i}"><div><strong>${c.name} · ${c.company}</strong><p>${c.phone}</p></div><i class="chevron" style="margin-left:auto"></i></button>`).join(''));break;
 case 'pick-customer':fillCustomer(config.customers[Number(button.dataset.index)]);close();notify('已填入客户信息');break;
 case 'card':case 'text':recognition(action);break;
 case 'example':$('#recognition-text').value='姓名：陈晓\n企业：云织服饰\n电话：13800138000';break;
 case 'recognize-card':{const file=$('#card-file').files[0];if(!file||!file.type.startsWith('image/')){$('#card-error').textContent='请先选择一张名片图片';break;}fillCustomer(config.customers[0]);close();notify('已填入示例识别结果，请核对客户信息');break;}
 case 'recognize-text':{const text=$('#recognition-text').value;const phone=text.match(/(?:\+86[- ]?)?1[3-9]\d{9}/)?.[0]||'';const name=text.match(/(?:姓名|联系人)\s*[:：]\s*([^\n，,]+)/)?.[1]?.trim()||'';const company=text.match(/(?:企业\/品牌|企业|品牌|公司)\s*[:：]\s*([^\n，,]+)/)?.[1]?.trim()||'';if(!name||!company||!phone){$('#text-error').textContent='请按示例填写姓名、企业和有效手机号码';break;}fillCustomer({name,company,phone});close();notify('已提取客户信息，请核对');break;}
 case 'save':save();break;
 case 'order':{if(!products.length){notify('请先添加选品');break;}const c=customer();const missing=['name','company','phone'].find(k=>!c[k]);if(missing){notify('请完善客户必填信息');$('#'+missing).focus();break;}if(!/^[+\d][\d\s()-]{5,19}$/.test(c.phone)){notify('请填写有效联系电话');$('#phone').focus();break;}simple('确认下单',`<div class="success"><h2>${escape(c.name)} · ${escape(c.company)}</h2><p>共 ${products.length} 款 / ${products.reduce((n,p)=>n+p.quantity,0)} 件<br>联系电话：${escape(c.phone)}</p></div>${orderSuggestions()}<p class="helper">演示订单，仅在当前浏览器展示，不会提交真实订单。</p>`,'确认提交','submit-order');break;}
 case 'submit-order':{const number='DX'+new Date().toISOString().slice(0,10).replaceAll('-','')+'-'+Date.now().toString().slice(-5);simple('下单结果',`<div class="success"><div class="success-mark">✓</div><h2>演示订单已创建</h2><p>订单编号：${number}<br>${products.length} 款 / ${products.reduce((n,p)=>n+p.quantity,0)} 件<br>未提交到真实业务系统</p></div>`,'返回选品清单','close');break;}
 case 'back':case 'home':if(adviceView){adviceBack();break;}if(!$('#overlay').hidden){close();break;}simple('代客选品','<p class="helper">为客户选择款式，填写洽谈信息与客户资料。</p>','继续选品','close');break;
 case 'more':if(adviceView){notify('完成修改建议后可使用更多操作');break;}simple('更多操作','<button class="menu-option" data-action="save">暂存当前选品</button><button class="menu-option" data-action="reset">恢复初始演示</button><p class="helper" style="margin-top:20px">手机端 HTML 演示 · 数据仅保存在本机</p>');break;
 case 'reset':simple('恢复初始演示','<p class="helper">清除本机暂存和客户信息，恢复截图中的两款选品。</p>','确认恢复','confirm-reset');break;
 case 'confirm-reset':products=fresh();fillCustomer({});try{localStorage.removeItem(config.storageKey);}catch{}render();close();notify('已恢复初始演示');break;
 }
});
$('#overlay').addEventListener('click',e=>{if(e.target===$('#overlay'))close();});
document.addEventListener('keydown',e=>{if(adviceView){if(e.key==='Escape')adviceBack();return;}if($('#overlay').hidden)return;if(e.key==='Escape')close();if(e.key==='Tab'){const controls=[...$('#sheet').querySelectorAll('button:not(:disabled),input,select,textarea')];if(!controls.length)return;const first=controls[0],last=controls.at(-1);if(e.shiftKey&&(document.activeElement===first||document.activeElement===$('#sheet'))){e.preventDefault();last.focus();}else if(!e.shiftKey&&(document.activeElement===last||document.activeElement===$('#sheet'))){e.preventDefault();first.focus();}}});
$('#customer-form').addEventListener('submit',e=>e.preventDefault());
try{const draft=JSON.parse(localStorage.getItem(config.storageKey)||'null');if(draft&&Array.isArray(draft.products)){products=draft.products.map(p=>({...p,id:config.legacyStyleIds?.[p.id]||p.id})).filter(p=>config.products.some(x=>x.id===p.id)).map(p=>({...fresh().find(x=>x.id===p.id),...p,name:config.products.find(x=>x.id===p.id).name,category:config.products.find(x=>x.id===p.id).category,image:config.products.find(x=>x.id===p.id).image,quantity:Math.max(1,Math.min(999,Math.floor(Number(p.quantity)||1))),requirements:Array.isArray(p.requirements)?p.requirements.filter(r=>config.requirements.includes(r)):[],suggestions:normalizeSuggestions(p.suggestions)}));fillCustomer(draft.customer||{});}}catch{}
render();
})();
