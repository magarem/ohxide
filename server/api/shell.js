import shell from "shelljs"

export default defineEventHandler((event) => {
 
    const req = getQuery(event)
    const client = JSON.parse(req.client)
    console.log('req.client:', client);
    console.log('req.year:', req.year);
    console.log('req.month:', req.month);
    console.log('req.files:', req.files);

    async function merge_pdfs(pdfFiles, outputFile) {
        await shell.exec("pwd")
        console.log(`deno run -A /home/maga/dev/ohxide/deno3.ts ${client.id} ${req.year} ${req.month} '${client.empresa}' ${pdfFiles}`)
        const { stdout, stderr } = await shell.exec(`deno run -A /home/maga/dev/ohxide/deno.ts ${client.id} ${req.year} ${req.month} '${client.empresa}' ${pdfFiles}`)
        console.log('stdout:', stdout)
        console.log('stderr:', stderr)
        return stdout
    }
         
    // const pdfFiles = req.files//['public/upload/reports/CRLV_QQQ2H08.pdf', 'public/upload/reports/Alice.pdf']
    const outputFile = 'new_merged.pdf'
    // console.log("----", req.files.split(',').map(x=>'/home/maga/dev/ohxide/.output/public/upload/'+x).join(','));
    return merge_pdfs(req.files.split(',').map(x=>'/home/maga/dev/ohxide/upload/'+x).join(','), outputFile)
     
})