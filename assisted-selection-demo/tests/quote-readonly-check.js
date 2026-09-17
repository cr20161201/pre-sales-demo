(()=>{
 const checks=[],assert=(n,v)=>{if(!v)throw Error(n);checks.push(n);},click=a=>document.querySelector(`[data-action="${a}"]`).click();
 click('edit');const original=document.querySelectorAll('.quote-note').length;click('advice-open');
 document.querySelector('[data-action="advice-category"][data-value="尺寸"]').click();document.querySelector('#advice-text').value='袖长缩短 2cm，袖口保持原工艺。';click('advice-save-next');
 document.querySelector('[data-action="advice-category"][data-value="工艺"]').click();document.querySelector('#advice-text').value='领口增加一道加固工艺。';click('advice-save-next');click('advice-finish');
 assert('quote list',document.querySelectorAll('.quote-note').length===original+2);assert('readonly',!document.querySelector('.quote-notes button,.quote-notes input,.quote-notes img'));
 assert('labels',document.querySelector('.quote-notes').textContent.includes('尺寸')&&document.querySelector('.quote-notes').textContent.includes('工艺'));
 click('advice-open');const rows=document.querySelectorAll('[data-action="advice-edit"]');rows[rows.length-1].click();assert('delete inside',!!document.querySelector('[data-action="advice-delete"]'));click('advice-delete');click('advice-delete-confirm');click('advice-finish');assert('delete reflected',document.querySelectorAll('.quote-note').length===original+1);
 click('close');return {passed:checks.length};
})()
