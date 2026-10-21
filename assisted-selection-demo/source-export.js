// Minimal offline XLSX writer. Stored ZIP + inline strings preserve text and line breaks.
(()=>{'use strict';
const encoder=new TextEncoder(),xml=v=>String(v??'').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g,'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
function column(n){let s='';for(n++;n;n=Math.floor((n-1)/26))s=String.fromCharCode(65+(n-1)%26)+s;return s;}
const crcTable=Array.from({length:256},(_,n)=>{for(let k=0;k<8;k++)n=n&1?0xedb88320^(n>>>1):n>>>1;return n>>>0;});
function crc32(bytes){let crc=0xffffffff;for(const b of bytes)crc=crcTable[(crc^b)&255]^(crc>>>8);return (crc^0xffffffff)>>>0;}
function header(size,fields){const bytes=new Uint8Array(size),v=new DataView(bytes.buffer);for(const [offset,value,length] of fields)length===2?v.setUint16(offset,value,true):v.setUint32(offset,value,true);return bytes;}
function zip(files){const parts=[],directory=[];let offset=0,centralSize=0;for(const [path,content] of Object.entries(files)){
 const name=encoder.encode(path),bytes=encoder.encode(content),crc=crc32(bytes);
 const local=header(30,[[0,0x04034b50,4],[4,20,2],[14,crc,4],[18,bytes.length,4],[22,bytes.length,4],[26,name.length,2]]);
 parts.push(local,name,bytes);
 const central=header(46,[[0,0x02014b50,4],[4,20,2],[6,20,2],[16,crc,4],[20,bytes.length,4],[24,bytes.length,4],[28,name.length,2],[42,offset,4]]);
 directory.push(central,name);centralSize+=central.length+name.length;offset+=local.length+name.length+bytes.length;
 }return new Blob([...parts,...directory,header(22,[[0,0x06054b50,4],[8,directory.length/2,2],[10,directory.length/2,2],[12,centralSize,4],[16,offset,4]])],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});}
function workbook(rows,title){
 const ns='http://schemas.openxmlformats.org/spreadsheetml/2006/main',rels='http://schemas.openxmlformats.org/package/2006/relationships';
 const cells=rows.map((row,i)=>`<row r="${i+1}">${row.map((value,j)=>`<c r="${column(j)}${i+1}" s="${i?1:2}" t="inlineStr"><is><t xml:space="preserve">${xml(value)}</t></is></c>`).join('')}</row>`).join('');
 return zip({
 '[Content_Types].xml':`<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>`,
 '_rels/.rels':`<Relationships xmlns="${rels}"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
 'xl/workbook.xml':`<workbook xmlns="${ns}" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="${xml(title)}" sheetId="1" r:id="rId1"/></sheets></workbook>`,
 'xl/_rels/workbook.xml.rels':`<Relationships xmlns="${rels}"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`,
 'xl/styles.xml':`<styleSheet xmlns="${ns}"><fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf/></cellStyleXfs><cellXfs count="3"><xf fontId="0"/><xf fontId="0" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf><xf fontId="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`,
 'xl/worksheets/sheet1.xml':`<worksheet xmlns="${ns}"><dimension ref="A1:${column(rows[0].length-1)}${rows.length}"/><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews><sheetFormatPr defaultRowHeight="18"/><cols>${rows[0].map((name,i)=>`<col min="${i+1}" max="${i+1}" width="${name.startsWith('方案')&&title==='修改分析'?60:24}" customWidth="1"/>`).join('')}</cols><sheetData>${cells}</sheetData><autoFilter ref="A1:${column(rows[0].length-1)}${rows.length}"/></worksheet>`
 });
}
function download(rows,title){if(rows.length<2)return false;const url=URL.createObjectURL(workbook(rows,title)),a=document.createElement('a');a.href=url;a.download=`${title}-源数据-演示.xlsx`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);return true;}
window.SourceExport={workbook,download};
})();
