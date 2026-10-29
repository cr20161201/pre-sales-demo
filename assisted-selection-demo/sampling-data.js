// Illustrative sampling orders, with complete ancestry independent of report filters.
(()=>{'use strict';
function classify(order,byId){
 if(!order.parentId)return 'first';
 const parent=byId.get(order.parentId);
 if(!parent)throw Error('关联订单不存在：'+order.parentId);
 return parent.parentId?'third':'second';
}
function createOrders(products,customers){
 const end=new Date('2026-09-15T12:00:00Z'),orders=[],chains=new Map();
 for(let day=179;day>=0;day--)products.forEach((p,i)=>{
  const customer=customers[(day+i*2+Math.floor(day/5))%customers.length],key=JSON.stringify([p.id,customer.name]),chain=chains.get(key)||[];
  const order={orderId:`SY-2026-${String(orders.length+1).padStart(5,'0')}`,parentId:chain.length&&chain.length%4?chain.at(-1):'',day,date:new Date(end.getTime()-day*86400000).toISOString().slice(0,10),pid:p.id,customer:customer.name,type:customer.type,category:p.category,pieces:2+(day+i)%9,schemeCount:1+(day+i)%4};
  chain.push(order.orderId);chains.set(key,chain);orders.push(order);
 });
 const byId=new Map(orders.map(o=>[o.orderId,o]));
 return orders.map(o=>{const kind=classify(o,byId);return {...o,first:Number(kind==='first'),second:Number(kind==='second'),third:Number(kind==='third')};});
}
function createNotes(orders,categories,tags,texts){return orders.flatMap((o,i)=>Array.from({length:o.schemeCount},(_,j)=>{
 if((i+j)%3===0)return [];
 return Array.from({length:1+(i+j)%2},(_,k)=>{const categoryName=categories[(i+j+k)%categories.length],t=(Math.floor((i+j+k)/categories.length)+j)%tags[categoryName].length;return {...o,noteId:`${o.orderId}-${j+1}-${k}`,schemeIndex:j+1,categoryName,tags:(i+j+k)%5===0?[]:[tags[categoryName][t]],text:texts[categoryName][t],photos:[],source:'预置演示'};});
}).flat());}
function modificationText(notes){
 const categories=[...new Set(['工艺','面料','其他',...notes.map(n=>n.categoryName)])];
 return categories.map(category=>{const rows=notes.filter(n=>n.categoryName===category&&n.text.trim());return rows.length?`${category}说明：\n`+rows.map((n,i)=>`${i+1}、${n.tags.length?n.tags.join('、')+'：':''}${n.text}`).join('\n'):'';}).filter(Boolean).join('\n\n');
}
const productInfo=(row,products)=>products.find(p=>p.id===row.pid)||{};
const picture=p=>p.image?{image:p.image}:'';
function selectionRows(orders,products,notes=[],colors=[]){return [['序号','产品图','名称','品类','修改方案','客户','订单','关联订单','下单日期'],...orders.map((o,i)=>{
 const p=productInfo(o,products),list=notes.filter(n=>n.orderId===o.orderId&&n.pid===o.pid),ways=colors.filter(c=>c.orderId===o.orderId&&c.pid===o.pid);
 const schemes=Array.from({length:o.schemeCount||1},(_,j)=>{
  const modifications=modificationText(list.filter(n=>n.schemeIndex===j+1));
  const records=ways.filter(c=>c.schemeIndex===j+1),byWay=new Map();
  for(const c of records){if(!byWay.has(c.wayId))byWay.set(c.wayId,[]);byWay.get(c.wayId).push(c);}
  const colorText=[...byWay.values()].map((rows,k)=>`颜色${k+1}（${rows[0].quantity}件）：`+rows.map(c=>`${c.position} ${c.material} / ${c.code}`).join('；')).join('\n');
  return `方案${j+1}\n${modifications||'修改内容：未填写'}${colorText?'\n'+colorText:''}`;
 }).join('\n\n');
 return [i+1,picture(p),p.name||o.pid,o.category,schemes,o.customer,o.orderId,o.parentId,o.date];
})];}
function modificationRows(notes,products){return [['序号','修改类别','修改标签','修改内容','产品图','名称','品类','客户','订单','关联订单','下单日期'],...notes.map((n,i)=>{const p=productInfo(n,products);return [i+1,n.categoryName,[...new Set(n.tags)].join('、'),n.text,picture(p),p.name||n.pid,n.category,n.customer,n.orderId,n.parentId,n.date];})];}
function colorRows(rows,products=[]){return [['序号','原料','颜色编码','色位','产品图','名称','品类','客户','订单','关联订单','下单日期'],...rows.map((r,i)=>{const p=productInfo(r,products);return [i+1,r.material,r.code,r.position,picture(p),p.name||r.pid,r.category,r.customer,r.orderId,r.parentId,r.date];})];}
window.SamplingData={classify,createOrders,createNotes,modificationText,selectionRows,modificationRows,colorRows};
})();
