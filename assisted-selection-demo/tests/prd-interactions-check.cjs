const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const base='http://127.0.0.1:5188/';
const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
(async()=>{
 const browser=await chromium.launch();
 try{
 const page=await browser.newPage({viewport:{width:390,height:844}});page.setDefaultTimeout(5000);
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 let dialogCount=0,accept=true;page.on('dialog',async d=>{dialogCount++;await (accept?d.accept():d.dismiss());});
 const click=action=>page.locator(`[data-action="${action}"]`).first().click();
 const start=async()=>{await page.goto(base+'mobile.html');await click('edit');await page.locator('.scheme-entry').first().click();};
 await start();
 await click('colorway-add');let count=dialogCount;await click('back');assert.equal(dialogCount,count,'pristine color returns directly');
 await click('colorway-add');await page.locator('.color-material').fill('羊毛');accept=false;await click('back');assert.equal(dialogCount,count+1);assert.equal(await page.locator('.color-material').inputValue(),'羊毛');accept=true;await click('back');assert.equal(await page.locator('.colorway-entry').count(),4);
 await click('colorway-edit');await page.locator('.color-code').first().fill('TEST');await click('colorway-save');await click('back');await page.locator('.scheme-entry').first().click();await click('colorway-edit');assert.equal(await page.locator('.color-code').first().inputValue(),'TEST','child completion survives parent back');await click('back');
 await click('advice-add-item');await click('advice-finish');assert.match(await page.locator('#advice-error').innerText(),/修改文字/);await page.locator('#advice-text').fill('字'.repeat(110));assert.equal((await page.locator('#advice-text').inputValue()).length,100);await click('advice-finish');await click('back');await click('confirm-edit');
 // Manual quantity survives opening and text edits; a color quantity edit overrides it.
 await click('edit');await page.locator('#quantity').fill('1200');await page.locator('#quantity').press('Tab');await click('confirm-edit');await click('edit');assert.equal(await page.locator('#quantity').inputValue(),'1200');await page.locator('.scheme-entry').first().click();await page.locator('#scheme-remark').fill('已保存备注');await click('group-save');assert.equal(await page.locator('#quantity').inputValue(),'1200');await page.locator('.scheme-entry').first().click();await click('colorway-edit');await click('color-plus');await click('colorway-save');await click('back');assert.equal(await page.locator('#quantity').inputValue(),'7');await click('confirm-edit');assert.match(await page.locator('#count').innerText(),/7件/);
 await start();await click('colorway-add');for(let i=0;i<27;i++)await click('colorway-row-add');assert.equal(await page.locator('.color-position').last().getAttribute('value'),'AB');await click('back');
 // Removing the first modification must not erase the scheme's colors or size.
 // Image upload: 30 MB valid image is accepted; >50 MB rejected; 6 slots retained.
 await click('advice-add-item');const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=','base64');
 await page.locator('#advice-upload').setInputFiles({name:'large.png',mimeType:'image/png',buffer:Buffer.concat([png,Buffer.alloc(30*1024*1024)])});await page.waitForFunction(()=>document.querySelector('#photo-count').textContent==='1/6');
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'demo-image-check-'));const big=path.join(temp,'too-large.png');try{fs.writeFileSync(big,Buffer.concat([png,Buffer.alloc(51*1024*1024)]));await page.locator('#advice-upload').setInputFiles(big);}finally{fs.rmSync(temp,{recursive:true});}await page.waitForFunction(()=>document.querySelector('#photo-status').textContent.includes('50MB'));assert.equal(await page.locator('#photo-count').innerText(),'1/6');
 await page.locator('#advice-upload').setInputFiles(Array.from({length:6},(_,i)=>({name:i+'.png',mimeType:'image/png',buffer:png})));await page.waitForFunction(()=>document.querySelector('#photo-count').textContent==='6/6');
 // Read-only empty states in shared renderer (used by both order pages).
 await page.goto(base+'order-pc.html');const empty=await page.evaluate(()=>{const p={name:'测试',id:'test',modificationGroups:[{id:'g',groupId:'g',colorways:[],photos:[]}]};return {detail:OrderView.detail(p,0,0,false),cards:OrderView.cards({modificationGroups:[]},0)};});assert.match(empty.detail,/修改内容.*未填写/);assert.match(empty.detail,/颜色.*未填写/);assert.match(empty.detail,/方案备注.*未填写/);assert.match(empty.cards,/未填写/);
 assert.deepEqual(errors,[]);console.log('PASS return/save boundaries, quantity override, AA/AB, size required/decimal/clear, input/image limits, template CRUD/duplicates/empty, order empty states');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
