import {db} from "@/data/db_cmds"

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
    const username = body.username
    const password = body.password
    console.log(`select * from ${type} where username like '${username}' and password like '${password}' `);
    const data = await db.get(`select * from ${type} where username like '${username}' and password like '${password}' `)
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