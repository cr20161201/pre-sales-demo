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
function selectionRows(orders,products){return [['订单','关联订单','客户','款式','品类','下单日期'],...orders.map(o=>[o.orderId,o.parentId,o.customer,products.find(p=>p.id===o.pid)?.name||o.pid,o.category,o.date])];}
function modificationRows(notes,products){
 const groups=new Map();for(const n of notes){const key=JSON.stringify([n.orderId,n.pid]);if(!groups.has(key))groups.set(key,{order:n,notes:[]});groups.get(key).notes.push(n);}
 const max=Math.max(0,...notes.map(n=>n.schemeIndex));
 const names=['一','二','三','四','五','六','七','八','九','十'];
 return [['订单','客户','款式',...Array.from({length:max},(_,i)=>'方案'+(names[i]||String(i+1)))],...[...groups.values()].map(({order:o,notes:list})=>[o.orderId,o.customer,products.find(p=>p.id===o.pid)?.name||o.pid,...Array.from({length:max},(_,i)=>modificationText(list.filter(n=>n.schemeIndex===i+1)))])];
}
function colorRows(rows){return [['订单','方案','原料','颜色'],...rows.map(r=>[r.orderId,'方案'+(['一','二','三','四'][r.schemeIndex-1]||r.schemeIndex),r.material,r.code])];}
window.SamplingData={classify,createOrders,createNotes,modificationText,selectionRows,modificationRows,colorRows};
})();
