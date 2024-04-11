import Database from 'better-sqlite3';

export default defineEventHandler( async (event) => {
    const db = new Database('database.db');
    // db.pragma('journal_mode = WAL');

    let req = null
    let ret = null
  
    const getData = (sql) => {
        const selectData = db.prepare(sql).all()
        return selectData
    }

    // req = await readBody(event)
    const sql = "select name, data_limite, date(substr(data_limite, 7, 4) || '-' || substr(data_limite, 4, 2) || '-' || substr(data_limite, 1, 2)) as vencimento from clients WHERE vencimento BETWEEN DATE('now') AND DATE('now', '+30 days') ORDER BY vencimento"

    // console.log('req.sql:', req.sql.trim());
    ret = getData(sql)
    return ret
  
})
