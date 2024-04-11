import { DB } from "https://deno.land/x/sqlite@v3.7.0/mod.ts";

  // Open a database to be held in memory
  const db = new DB("database.db"); // or new DB()
  // Use new DB("file.db"); for a file-based database
//   db.execute(`
//   CREATE TABLE IF NOT EXISTS people (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT
//   )`);

  const ret = await db.query("select * from users")

  console.log('ret:', ret);
  
  // Insert data within a transaction
//   db.transaction(() => {
//     for (const name of ["Peter Parker", "Clark Kent", "Bruce Wayne"]) {
//       db.query("INSERT INTO people (name) VALUES (?)", [name]);
//     }
//   });

  // Todo: Other CRUD operations here...

  // Close database to clean up resources
  db.close()