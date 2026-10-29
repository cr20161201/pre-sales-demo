// Fixed illustrative records; independent of runtime edits in the mobile demo.
(()=>{
'use strict';
const palette=['19-5513 TCX','11-0601 TCX','13-0905 TCX','19-4024 TCX','18-0403 TCX','19-0303 TCX','14-1118 TCX','16-1546 TCX','18-1664 TCX','15-4020 TCX'];
const materials=['棉','棉麻','羊毛','涤纶','亚麻','真丝','粘胶','锦纶','羊绒','莱赛尔'];
function createRecords(events){return events.flatMap((e,i)=>Array.from({length:e.schemeCount||1},(_,j)=>{
 const schemeIndex=j+1;
 return Array.from({length:1+(i+j)%2},(_,w)=>Array.from({length:1+(i+j+w)%3},(_,k)=>({...e,schemeIndex,wayId:`${e.orderId||i}-${j}-${w}`,quantity:1+(i+j+w)%5,position:String.fromCharCode(65+k),material:materials[(i+j+w+(i%7===0?0:k))%materials.length],code:palette[(Math.floor(i/3)+j+w+(i%7===0?0:k))%palette.length]}))).flat();
}).flat());}
function quantity(rows){return [...new Map(rows.map(r=>[r.wayId,r.quantity])).values()].reduce((a,b)=>a+b,0);}
function aggregate(rows,keys){const map=new Map();for(const row of rows){const key=JSON.stringify(keys.map(k=>row[k]));if(!map.has(key))map.set(key,{...Object.fromEntries(keys.map(k=>[k,row[k]])),rows:[]});map.get(key).rows.push(row);}return [...map.values()].map(g=>({...g,value:quantity(g.rows),uses:new Set(g.rows.map(r=>r.wayId)).size,styles:new Set(g.rows.map(r=>r.pid)).size,customers:new Set(g.rows.map(r=>r.customer)).size})).sort((a,b)=>b.value-a.value);}
window.ColorAnalysis={createRecords,quantity,aggregate};
})();
