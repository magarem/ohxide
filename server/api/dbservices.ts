import Database from 'better-sqlite3';

// console.log('data:', data);

export default defineEventHandler( async (event) => {
    
    // db.pragma('journal_mode = WAL');

  let req = null
  let ret = null
  
  const createTable = (str) => {

        console.log('str//////////:', str);

    // const query = `
    //     CREATE TABLE IF NOT EXISTS users (
    //         id INTEGER PRIMARY KEY,
    //         name STRING NOT NULL,
    //         username STRING NOT NULL UNIQUE,
    //         password STRING,
    //         status
    //     )
    // `
    const ret = db.exec(str)

    return ret
}

   const createTableBKP = () => {
        const query = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                name STRING NOT NULL,
                username STRING NOT NULL UNIQUE,
                password STRING,
                status
            )
        `
        const ret = db.exec(query)

        return ret
   }

//    const insertData = (table: any, data: any) => {
//         const insert = db.prepare(`INSERT INTO ${table} (name, username) VALUES (@name, @username)`);
//         insert.run(data);
//    }

   const insertData = (table, newBrandData) => {
    const db = new Database('database.db');
    // As an object with named parameters.
    const keyValues = [];
    const keyValues2 = [];
    const params = [];

    Object.keys(newBrandData).forEach(e => {
        keyValues.push(`${e}`);
        keyValues2.push(`?`);
        params.push(newBrandData[e]);
    });

    console.log('keyValues:', keyValues);
    console.log('params:', params);
    
    // console.log(`UPDATE ${table} SET ${keyValues} WHERE ${where_}`);
    console.log(`INSERT INTO ${table} (${keyValues}) VALUES (${keyValues2})`);
    
    const stmt = db.prepare(`INSERT INTO ${table} (${keyValues}) VALUES (${keyValues2})`); 
   
   
    const insertions = stmt.run(params);

    // params.push(brand.id);
    db.close();
    return insertions
}

   const updateData = (table, newBrandData, where_) => {
        const db = new Database('database.db');
        // As an object with named parameters.
        const keyValues = [];
        const params = [];

        Object.keys(newBrandData).forEach(e => {
            keyValues.push(`${e} = ?`);
            params.push(newBrandData[e]);
        });

        console.log('keyValues:', keyValues);
        console.log('params:', params);
        
        console.log(`UPDATE ${table} SET ${keyValues} WHERE ${where_}`);
        
        const stmt = db.prepare(`UPDATE ${table} SET ${keyValues} WHERE ${where_}`); 
       
       
        const updates = stmt.run(params);

        // params.push(brand.id);
        db.close();
        return updates
   }

   const deleteData = (table, where_) => {
        const db = new Database('database.db')
        const stmt = db.prepare(`DELETE FROM ${table} WHERE ${where_}`); 
        const delete_ = stmt.run();
        db.close();
        return delete_
    }

    const execSql = (sql) => {
        const db = new Database('database.db');
        const ret = db.exec(sql); 
        console.log('execSql:', ret);
        db.close();
        return ret
    }
    
    const getData = (sql) => {
        const db = new Database('database.db');
        const selectData = db.prepare(sql).all()
        // const ret_ = selectData.run() 
        // console.log('selectData:', selectData);
        db.close();
        return selectData
    }

   const backupDo = () => {
        db.backup(`backup-${Date.now()}.db`)
        .then(() => {
            console.log('backup complete!');
        })
        .catch((err) => {
            console.log('backup failed:', err);
        });
   }

    if (event.node.req.method === 'PUT') {
        req = await readBody(event)
        // console.log("SCHEMA------**---------");
        console.log(req.txt);
    
       
        const ret = execSql(req.txt)
        return "retorno:" + req
    } 

    if (event.node.req.method === 'GET') {
        
        req = getQuery(event)
        console.log('req.sql:', req.sql.trim());
        const ret = getData(req.sql.trim())
        return ret
    } 
    
    if (event.node.req.method === 'POST') {
        req = await readBody(event)
        const ret = insertData(req.table, req.data)
        console.log('ret:', ret);
        
        return "retorno:" + ret
    }
    
    if (event.node.req.method === 'PATCH') {
        req = await readBody(event)
        const ret = updateData(req.table, req.data, req.where)
        return "retorno:" + req
    } 
    
    if (event.node.req.method === 'DELETE') {
        req = await readBody(event)
        const ret = deleteData(req.table, req.where)
        return "retorno:" + req
    }
    
    
    // else {
    //     req = await readBody(event)
    //     const ret = insertData(req.table, req.data)
    //     return "retorno:" + req
    // }
   
  
})
