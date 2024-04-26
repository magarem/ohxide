// import {db} from "@/data/db_cmds"
import Database from 'better-sqlite3';
function generateToken(n) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var token = '';
    for(var i = 0; i < n; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}

export default defineEventHandler(async (event) => {
    // const query = getQuery(event)
    const body = await readBody(event)
    const type = body.type
    const email = body.email
    const password = body.password
    const sql = `select * from ${type} where email like '${email}' and password like '${password}' `
    // const data = await $fetch('/api/dbservices?type=encoded&sql=' + encodeURI(`select * from ${type} where email like '${email}' and password like '${password}' `));
   
    console.log('sql', sql);

    const db = new Database('database.db');
    const data = db.prepare(sql).all()
    // const ret_ = selectData.run() 
    // console.log('selectData:', selectData);
    db.close();
    // return selectData
   
   
    console.log('db---------->', data)
    if (data.length>0){
        const userObj = {
            ...data[0],
            type: type,
            token: generateToken(360)
        }

        console.log('userObj:', userObj);
        return userObj;
    }else{
        return null;
    }
})