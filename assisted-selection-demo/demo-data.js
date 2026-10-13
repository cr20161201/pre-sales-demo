// Shared illustrative data for entry and both order views.
(()=>{
window.createSelectionDemo=()=>{
 const color=(id,quantity,material,codes)=>({id,quantity,colors:codes.map((code,i)=>({position:String.fromCharCode(65+i),material,code}))});
 const item=(id,groupId,category,tags,text)=>({id,groupId,category,tags,text,photos:['assets/plaid-fabric.svg'],colorways:[]});
 return {customer:{name:'陈晓',company:'云织服饰',phone:'13800138000'},products:[{...DEMO_CONFIG.products[0],quantity:6,price:'',minimum:'',currency:'CNY',requirements:['报价单'],remark:'请确认修改后提供样衣。',schemePhotos:{'demo-scheme-1':['assets/styles/shirt-green.svg','assets/plaid-fabric.svg'],'demo-scheme-2':['assets/styles/shirt-white.svg']},modificationGroups:[
 {...item('demo-item-1','demo-scheme-1','工艺',['领口'],'领口增加一道加固工艺，走线与大身同色。'),colorways:[color('demo-color-1',2,'棉',['19-5513 TCX','11-0601 TCX']),color('demo-color-2',1,'棉麻',['13-0905 TCX']),color('demo-color-3',1,'棉',['19-4024 TCX','11-0601 TCX']),color('demo-color-4',1,'棉',['18-0403 TCX'])],styleDescription:'日常通勤款，保留原版型，优化领口与袖口细节。',needleType:'12针',season:'春秋',size:'M',schemeRemark:'四套配色分别打样，先确认领口工艺。'},
 item('demo-item-2','demo-scheme-1','其他',['袖长'],'袖长缩短 2cm，袖口保持原工艺。'),
 item('demo-item-3','demo-scheme-1','工艺',[],'下摆增加一道压线，保持平整。'),
 item('demo-item-4','demo-scheme-1','其他',[],'洗标固定在左侧内缝，避免外露。'),
 {...item('demo-item-5','demo-scheme-2','其他',['袖长'],'袖长缩短 1cm，其余保持原样。'),colorways:[color('demo-color-5',1,'棉',['11-0601 TCX'])],styleDescription:'基础款，单色打样确认袖长。',needleType:'12针',season:'春秋',size:'M',schemeRemark:''}
 ]}]};
};
})();
