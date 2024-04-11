<template>
    <Magacrud @insertdata="insertdata" @updatedata="updatedata" @deletedata="deletedata" :schema="products" :data="data"  />
</template>
<script setup>
definePageMeta({
    layout: 'defaultadmin'
})

import {products} from "@/data/schemas.js"
import {db} from "@/data/db_cmds"
const table = ref("products")
const data = await db.get(`select * from ${table.value}`)
// console.log('db---------->', data)

const save = async (filename, body) => {
    try {
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({filename: filename, txt: JSON.stringify(body, null, 2)})
        }
        
            const response = await fetch('/api/save', config)
         
    } 
    catch (error) {
        console.log("save api error");
    }
}

const insertdata = async (data) => {
    console.log('data:', data);
    // delete data.id
    const ret = await db.insert({
        table: table.value,
        data: data
    })
    console.log('ret insert:', ret);
}

const updatedata = async (data) => {
    const ret = await db.update({
        table: table.value,
        data: data,
        where: "id LIKE '" + data.id + "'"
    })
    console.log('ret update:', ret);
    // save("demo/data/users.json", users)
}

const deletedata = async (data) => {

    if (Array.isArray(data)) {
        const ret = await db.delete({
            table: table.value,
            where: "id in (" + data.map(x=>`'${x.id}'`).join(',') + ")"
        })
        console.log('ret update:', ret);
    } else {
        const ret = await db.delete({
            table: table.value,
            where: "id like '" + data.id + "'"
        })
        console.log('ret update:', ret);
    }
}

</script>