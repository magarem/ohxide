import 'dotenv/config';
import fs from "fs";
import { MailerSend, EmailParams, Sender, Recipient, Attachment } from "mailersend";

export default defineEventHandler(async (event) => {
    const req = await readBody(event)

    const mailerSend = new MailerSend({
    apiKey: "mlsn.813418e9d77877ab64f06d6b1893af5758740d58099fafd6f837ed9dee78ce43",
    });

    const sentFrom = new Sender("contato@magaweb.com.br", "Ohxide");

    const recipients = [
    new Recipient(req.to, req.destinatario)
    ];

    const attachments = [
        new Attachment(
          fs.readFileSync(req.attach, { encoding: 'base64' }),
          req.attach.split(/[\s\/]+/).at(-1),
          'attachment'
        )
      ]
      
      const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setAttachments(attachments)
        .setSubject(req.subject)
        .setHtml(req.html)
        // .setText("This is the text content");

    await mailerSend.email.send(emailParams);
})