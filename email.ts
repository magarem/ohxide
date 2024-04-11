import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
const client = new SmtpClient();

const { SEND_EMAIL, PWD, RECV_EMAIL } = Deno.env.toObject();

const connectConfig: any = {
  hostname: "smtp.gmail.com",
  port: 465,
  username: "magawebtec@gmail.com",
  password: "gkvv trye yzrp bxmp",
};
await client.connectTLS(connectConfig);

await client.send({
  from: "magawebtec@gmail.com",
  to: "magawebtec@gmail.com",
  subject: "Welcome!",
  content: "Hi from Vuelancer!",
});

await client.close();