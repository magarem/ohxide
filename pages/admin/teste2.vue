<template>
   <h1>teste</h1>
   {{ tela }}
  </template>
<script setup>
definePageMeta({
    layout: 'defaultadmin'
})
import {db} from "@/data/db_cmds"
let data = ref([])
let tela = ref([])
let columns_
let values_
let data2 = []
let insertSQL = []
// data.value = await db.get(`select * from clients`)
data.value = await db.get(`select * from clients`)

data.value.map((x, index)=>{
      columns_ = "(" + Object.keys(x).join(',') + ")"
      values_ = "(" + Object.values(x).map(y=>{
         if (y=='null') {
            return y
         }else{
            if (y=='2224') {
               return "'top'"
            }else{
               return "'" + y + "'"
            }
            
         }
      }).join(',') + ")"

      insertSQL[index] = `
         INSERT INTO clients
         ${columns_}
         VALUES
         ${values_};
      `
   }
)

console.log(insertSQL);


//    insertSQL.push(`
//       INSERT INTO clients 
//          ${
//             Object.keys(x).map(y=>"'" + y + "'")
//          }
//    `)
// })

// data.value.map(x=>{
//    data2.push(`(${Object.entries(x).map(y=>{
//       columns.push(y[0])
//       if (y[1]=='null'){
//          return y[1]
//       }else{
//          if (y[1]=='r0wwr'){
//             return "'111111'"
//          }else{
//             return "'"+y[1]+"'"
//          }
//       }
      
//    })})`)
// })

// tela.value = data2
// console.log(columns.join(','));


let sql = `
   
   BEGIN TRANSACTION;

   DELETE FROM clients;
  
   ${insertSQL.join('')}

   COMMIT;
  `

console.log(sql);

let ret = await db.exec(sql)

console.log('ret:', ret);

</script>