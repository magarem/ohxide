// /server/routes/file/[name].get.js
import fs from "fs";
import path from 'path'
export default defineEventHandler(async (event) => {
  const base = "reports";
  const filePath = path.join(base, event.context.params.name);
  console.log("filePath", filePath);

  return sendStream(event, fs.createReadStream(filePath));
});