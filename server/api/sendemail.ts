import nodemailer from 'nodemailer';
import Database from 'better-sqlite3';
import shell from "shelljs"

export default defineEventHandler(async (event) => {
  const db = new Database('database.db');
  let ret = []
  let link = ""
  // db.pragma('journal_mode = WAL');
  let req = await readBody(event)

  const url = getRequestURL(event)
  
  console.log('url::>', url.origin);
  
  const clientsIds = req.clients.map(x=>`'${x}'`).join(',')
  console.log('clientsIds:', clientsIds);
  
  const getData = (sql) => {
      const selectData = db.prepare(sql).all()
      // const ret_ = selectData.run() 
      console.log('selectData:', selectData);
      
      return selectData
  }

    // var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     // auth: {
    //     //     user: 'magawebtec@gmail.com',
    //     //     pass: 'gkvv trye yzrp bxmp'
    //     // },
    //       auth: {
    //         user: 'contato@magaweb.com.br',
    //         pass: 'mariaclara108'
    //     }
    // });


    const download = async (year, month, client) => {
      const sql = `
      select 
          COUNT(reports.id), 
          reports.year, 
          reports.month, 
          GROUP_CONCAT(reports.name) as nome, 
          GROUP_CONCAT(reports.file) as files, 
          GROUP_CONCAT(products.name) as tags 
      from 
          reports, 
          products, 
          clients 
      where 
          reports.tag = products.id AND 
          instr(clients.tags, reports.tag) > 0 AND
          clients.id like '${client.id}'
      GROUP BY 
          reports.year, 
          reports.month 
      order by 
          year DESC, 
          month DESC 
    ` 
      let data_ = await $fetch('/api/dbservices?sql=' + sql.replace(/\s+/g,' ').trim());
      data_ = data_.filter(x => x.year == year && x.month == month)
      // await $fetch(`/api/shell?year=${year}&month=${month}&client=${JSON.stringify(client)}&files=${data_[0].files}`)
      console.log("whay stop?");
      let data2_ = await $fetch(`http://216.238.98.143:3005/test?year=${year}&month=${month}&client=${JSON.stringify(client)}&files=${data_[0].files.split(',').map(x=>'/home/maga/dev/ohxide/upload/'+x).join(',')}`);
      console.log('data2_', data2_);
   
    }


    const clients = getData(`select * from clients where status like 'ativo' and id in (${clientsIds})`)
    console.log(clients);

    clients.forEach(async x=>{
      await download(req.year, req.month, clients.filter(xx=>xx.id==x.id)[0])
    })

    clients.forEach(async x=>{
      const option = { month: 'long'}
      const locale = 'pt-br'
      const monthName = new Date().toLocaleDateString( locale, option)
      const meses = new Array("Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro")
      let message = req.message
      message = message.replaceAll("[nome]", x.name)
      message = message.replaceAll("[empresa]", x.empresa)
      message = message.replaceAll("[email]", x.email)
      message = message.replaceAll("[ano]", req.year)
      message = message.replaceAll("[mes]", meses[req.month-1])
      message = message.replaceAll("[mês]", meses[req.month-1])
      ret.push(`Email enviado para: ${x.email}`)

      if (req.linktext){
        // link = `<br/><a href="${url.origin}/download?year=${req.year}&month=${req.month}&client=${x.id}">${req.linktext}</a>`
        link = `<br/><a href="${url.origin}/file'/${x.id}_report_${req.year}_${req.month}.pdf">${req.linktext}</a>`
      }
      
      // download(req.year, req.month, clients.filter(xx=>xx.id==x.id)[0])
    
      // var mailOptions = {
      //   from: 'contato@magaweb.com.br',
      //   to: x.email,
      //   subject: req.subject,
      //   html: `
      //     <img src="https://bucket.mailersendapp.com/neqvygmrw5l0p7w2/jy7zpl9359ol5vx6/images/9ba4cd5b-1751-4410-adea-640b39425b51.jpeg" style="width: 70px;"/><br/>
      //     ${message.replaceAll("\n", "<br/>")}
      //     ${link}
      //   `,
      //   attachments: [{
      //     filename: `${x.id}_report_${req.year}_${req.month}.pdf`,
      //     path: `upload/${x.id}_report_${req.year}_${req.month}.pdf`,
      //     contentType: 'application/pdf'
      //   }]
      //   ,
      //   function(err, info) {
      //     if (err) {
      //       console.error(err);
      //     } else {
      //       console.log(info);
      //     }
      //   }
      // };
      
      const dataEmailSend = await $fetch('/api/mailersend', {
        method: 'POST',
        body: JSON.stringify({
          to: x.email,
          destinatario: x.email,
          attach: `/home/maga/dev/ohxide/reports/${x.id}_report_${req.year}_${req.month}.pdf`,
          subject: req.subject,
          // body: req.subject,
          html: `
            <img src="https://bucket.mailersendapp.com/neqvygmrw5l0p7w2/jy7zpl9359ol5vx6/images/9ba4cd5b-1751-4410-adea-640b39425b51.jpeg" style="width: 70px;"/><br/>
            ${message.replaceAll("\n", "<br/>")}
            ${link}
          `
        })
      })
      console.log('dataEmailSend:', dataEmailSend);
      
      

      // console.log('mailOptions', mailOptions);
      
      // transporter.sendMail(mailOptions, function(error, info){
      //   if (error) {
      //     console.log(error);
      //   } else {
      //     console.log('Email sent: ' + info.response);
      //     return 'Email eviado: ' + info.response
      //   }
      // });


    })

    return "ok"

})