import { mergeAll, mergePdfs } from "https://deno.land/x/pdfrex@v0.0.2/mod.ts";
import { PDFDocument, rgb, degrees } from 'https://cdn.skypack.dev/pdf-lib@^1.11.1?dts';
import { DB } from "https://deno.land/x/sqlite@v3.7.0/mod.ts";




//create full hex
const fullHex = (hex) => {
  let r = hex.slice(1,2);
  let g = hex.slice(2,3);
  let b = hex.slice(3,4);

  r = parseInt(r+r, 16);
  g = parseInt(g+g, 16);
  b = parseInt(b+b, 16);
  
  // return {r, g, b} 
  return { r, g, b };
}

//convert hex to rgb
const hex2rgb = (hex) => {
    if(hex.length === 4){
      return fullHex(hex);
    }
  
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    // return {r, g, b} 
    return { r, g, b };
}

const db = new DB("database.db");
let data = null

data = await db.query("select * from config where id like 'config_report'")
const config_report = JSON.parse(data[0][1])

// data = await db.query("select * from config where id like 'config_email'")
// const config_email = JSON.parse(data[0][1])
// console.log('config_report:', config_report);
const client = {
  id: Deno.args[0],
  year: Deno.args[1],
  month: Deno.args[2],
  empresa: Deno.args[3],
  files: Deno.args[4].split(',')
}



// const basePath = "public/upload/reports/"
const basePath0 = "public/upload/reports/"
const basePath = "public/upload/reports/"
const netPath = "http://localhost:3000/upload/reports/"



// await mergePdfs(client.files,{
//   output: basePath + "newmerged.pdf"
// });

// await Deno.copyFile(basePath0 + "merged.pdf", basePath + "newmerged.pdf");
console.log("merged ok!");
// Fetch an existing PDF file
const url = netPath + 'newmerged.pdf';
// const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
console.log("url", url);
try {
  const response = await fetch(url)
  console.log("response", response);
  const existingPdfBytes = await response.arrayBuffer();//This returns an arrayBuffer.
  console.log('existingPdfBytes', existingPdfBytes);




// Load an existing PDFDocument
const pdfDoc = await PDFDocument.load(existingPdfBytes);

// console.log('pdfDoc.getPageCount()', pdfDoc.getPageCount());

// Draw some text on the first page of the PDFDocument
// 
let page = null
for (let t=4; t<pdfDoc.getPageCount()-1; t++){
  page = pdfDoc.getPage(t);

  // page.drawText(client.empresa, {
  //   x: 40,
  //   y: page.getHeight() / 2 + 250,
  //   size: 50,
  //   color: rgb(0.95, 0.1, 0.1),
  //   rotate: degrees(-45),
  //   opacity: 0.5,
  // });
  function hexToRgb(hex) {
    hex   = hex.replace('#', '');
    var r = parseInt(hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
    var g = parseInt(hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
    var b = parseInt(hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);
    return rgb(+r/255, +g/255, +b/255);
 }

  const hexColor = hex2rgb(config_report.color)
  page.drawText(client.empresa, {
    x: +config_report.x,
    y: page.getHeight() / 2 + (+config_report.y),
    size: +config_report.size,
    color: hexToRgb(config_report.color),
    rotate: degrees(+config_report.rotate),
    opacity: +config_report.opacity,
  });
}

// Save the PDFDocument and write it to a file
const pdfBytes = await pdfDoc.save();
// await Deno.remove("public/upload/reports/"+Deno.args[0]+'_report.pdf');
// await Deno.writeFile(client.id + '_report.pdf', pdfBytes);

await Deno.writeFile(`${basePath}${client.id}_report_${client.year}_${client.month}.pdf`, pdfBytes);
// Deno.writeFileSync(`${basePath}${client.id}_report_${client.year}_${client.month}.pdf`, pdfBytes);
// await Deno.copyFile(client.id + '_report.pdf', `${basePath}${client.id}_report_${client.year}_${client.month}.pdf`);
} catch (error) {
  console.log(error);
}
// Done! 💥
console.log(`${client.id}_report_${client.year}_${client.month}.pdf`);
Deno.exit()


// console.log(Deno.args);
