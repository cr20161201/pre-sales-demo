// Fixed illustrative records; independent of runtime edits in the mobile demo.
(()=>{
'use strict';
const palette=['19-5513 TCX','11-0601 TCX','13-0905 TCX','19-4024 TCX','18-0403 TCX'];
const materials=['棉','棉麻','羊毛','涤纶'];
function createRecords(events){return events.flatMap((e,i)=>{
 const count=1+i%3;
 return Array.from({length:count},(_,j)=>{
  const quantity=Math.floor(e.pieces/count)+(j<e.pieces%count?1:0);
  return Array.from({length:1+(i+j)%3},(_,k)=>({...e,wayId:`${i}-${j}`,quantity,position:String.fromCharCode(65+k),material:materials[(i+j+k)%materials.length],code:palette[(Math.floor(i/3)+j+k)%palette.length]}));
 }).flat();});}
function quantity(rows){return [...new Map(rows.map(r=>[r.wayId,r.quantity])).values()].reduce((a,b)=>a+b,0);}
function aggregate(rows,keys){const map=new Map();for(const row of rows){const key=JSON.stringify(keys.map(k=>row[k]));if(!map.has(key))map.set(key,{...Object.fromEntries(keys.map(k=>[k,row[k]])),rows:[]});map.get(key).rows.push(row);}return [...map.values()].map(g=>({...g,value:quantity(g.rows),uses:new Set(g.rows.map(r=>r.wayId)).size,styles:new Set(g.rows.map(r=>r.pid)).size,customers:new Set(g.rows.map(r=>r.customer)).size})).sort((a,b)=>b.value-a.value);}
window.ColorAnalysis={createRecords,quantity,aggregate};
})();
