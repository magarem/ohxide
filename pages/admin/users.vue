<template>
    <Magacrud @insertdata="insertdata" @updatedata="updatedata" @deletedata="deletedata" :schema="users" :data="data"  />
</template>
<script setup>
definePageMeta({
    layout: 'defaultadmin'
})

// import clients from "public/demo/data/clients.json"
// import users from "public/demo/data/users.json"
import {users} from "@/data/schemas.js"
import {db} from "@/data/db_cmds"
const data = await db.get(`select * from users`)
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
        table: "users",
        data: data
    })
    console.log('ret insert:', ret);
}

const updatedata = async (data) => {
    const ret = await db.update({
        table: "users",
        data: data,
        where: "id LIKE '" + data.id + "'"
    })
    console.log('ret update:', ret);
    // save("demo/data/users.json", users)
}

const deletedata = async (data) => {

    if (Array.isArray(data)) {
        const ret = await db.delete({
            table: "users",
            where: "id in (" + data.map(x=>`'${x.id}'`).join(',') + ")"
        })
        console.log('ret update:', ret);
    } else {
        const ret = await db.delete({
            table: "users",
            where: "id like '" + data.id + "'"
        })
        console.log('ret update:', ret);
    }
    
    
    // save("demo/data/users.json", users)
}

</script>