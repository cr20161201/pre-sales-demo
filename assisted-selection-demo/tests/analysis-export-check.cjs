// NODE_PATH=<playwright installation>/node_modules node tests/sampling-analytics-check.cjs
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const executablePath=process.env.CHROME_PATH||'/Users/cr_weng/Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const base=process.env.DEMO_URL||'http://127.0.0.1:5188/',dir=fs.mkdtempSync(path.join(os.tmpdir(),'sampling-exports-'));
function unzip(buffer){const files={};let offset=0;while(buffer.readUInt32LE(offset)===0x04034b50){assert.equal(buffer.readUInt16LE(offset+8),0);const size=buffer.readUInt32LE(offset+18),nameLen=buffer.readUInt16LE(offset+26),extra=buffer.readUInt16LE(offset+28),name=buffer.subarray(offset+30,offset+30+nameLen).toString();const start=offset+30+nameLen+extra;files[name]=buffer.subarray(start,start+size).toString();offset=start+size;}assert.ok(files['xl/workbook.xml']);assert.ok(files['[Content_Types].xml']);return files;}
(async()=>{const b=await chromium.launch({executablePath});try{
 const p=await b.newPage({viewport:{width:1440,height:1100},acceptDownloads:true});p.setDefaultTimeout(5000);const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(base+'analytics.html');
 const click=s=>p.locator(s).first().click();
 const choose=async(kind,value)=>p.evaluate(({kind,value})=>{const e=[...document.querySelectorAll(`#${kind}-options input`)].find(e=>e.value===value);if(!e)throw Error('missing filter '+value);e.checked=true;e.dispatchEvent(new Event('change',{bubbles:true}));},{kind,value});
 const download=async (name,selector='[data-export-source]')=>{const waiting=p.waitForEvent('download');await click(selector);const d=await waiting;assert.match(d.suggestedFilename(),/\.xlsx$/);const file=path.join(dir,name+'.xlsx');await d.saveAs(file);const files=unzip(fs.readFileSync(file));assert.ok(!files['xl/worksheets/sheet1.xml'].includes('<f>'),'text never formulas');return p.evaluate(xml=>{const d=new DOMParser().parseFromString(xml,'application/xml');if(d.querySelector('parsererror'))throw Error('invalid sheet xml');return [...d.querySelectorAll('sheetData row')].map(r=>[...r.querySelectorAll('c')].map(c=>c.querySelector('t')?.textContent||''));},files['xl/worksheets/sheet1.xml']);};
 // Analysis exports match all table rows, including rows hidden by pagination.
 const checkAnalysis=async()=>{
  const expected=await p.locator('.table-panel table tr:not([data-empty])').evaluateAll(rows=>rows.map(row=>[...row.cells].map(cell=>{const product=cell.querySelector('.product-cell');return product?[...product.querySelectorAll('strong,small')].map(e=>e.textContent.trim()).join('\n'):cell.textContent.trim();})));
  assert.deepEqual(await download('analysis','[data-export-analysis]'),expected);
 };
 await checkAnalysis();
 for(const target of ['notes','colors']){
  await click(`#navigation [data-view="${target}"]`);await checkAnalysis();
  await click('[data-table-page="2"]');await checkAnalysis();
 }
 await click('[data-color-group-table="customer"]');await click('[data-color-mode="material"]');await checkAnalysis();
 await click('#navigation [data-view="products"]');

 await choose('customer','云织服饰');await checkAnalysis();
 assert.ok((await download('source')).length>2);
 assert.deepEqual(errors,[]);
 console.log('PASS analysis export: three views, all pages, dimensions, filters, source export');
 }finally{await b.close();}})().catch(e=>{console.error(e);process.exit(1);});
