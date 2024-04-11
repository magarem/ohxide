<template>
    <Magacrud @insertdata="insertdata" @updatedata="updatedata" @updateorder="updateorder" @deletedata="deletedata" :schema="clients" :data="data"  />
</template>
<script setup>
definePageMeta({
    layout: 'defaultadmin'
})
import moment from 'moment'
import {clients} from "@/data/schemas.js"
import {db} from "@/data/db_cmds"
let data = ref([])
let data2 = []
let insertSQL = []
data.value = await db.get(`select * from clients`)

const initValues = async () => {
    data.value.map((x, index)=>{
        Object.entries(clients.schema).forEach(item=>{
                if (item[1].type.toLowerCase()=="multiselect"){
                    data.value[index][item[0]] = (data.value[index][item[0]]||"").split(',')
                    console.log('lll>>', data.value[index][item[0]]);
                    // }else{
                    //     data.value[index][item[0]] = []
                    // }
                }
        })
    })
}

onMounted(()=>{
    initValues()
})

// console.log('xxxdataxx>', data.value);

// console.log('db---------->', data)
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

const limitDataCalc = async (date, plano) => {
    console.log('qnt_months sql:', `select desc from client_planos where id = ${plano}`);
    const sqlret = await db.get(`select desc from client_planos where id = ${plano}`)
    const qnt_months = sqlret[0].desc
   
    console.log('qnt_months:', qnt_months);
    // return 22
    let myDate = date.split("/");

    // 31 de janeiro de 2016
    let d = moment([myDate[2], myDate[1]-1, myDate[0]]);
    // somar 1 mês = 29 de fevereiro de 2016
    d.add(qnt_months, 'month');
   
    console.log('mais um mês:', d);


    const ret = moment(d).utc().format("DD/MM/YYYY")

    console.log('mais um mês ret:', ret);
    // var newDate = new Date(myDate[2], myDate[1]-1, myDate[0]);
    // let dias = (30*(+qnt_months))
    // console.log('dias:', dias);
    // console.log('newDate:', newDate);

    // const ret = moment(addDays(newDate, dias)).utc().format("DD/MM/YYYY")
    // newDate.setDate(newDate.getDate() + dias)

    console.log('ret:', ret);
    return ret;
}

const insertdata = async (data_) => {
   
    
    data2 = {...data_}
    //array to cvs to save in sqlite3
    Object.entries(clients.schema).forEach(item=>{
        if (item[1].type.toLowerCase()=="multiselect"){
            data2[item[0]] = data2[item[0]].join(',')
            console.log('lll>>', data2[item[0]]);
        }
    })

//     // // limt date cal
//     // console.log("-------**-----2")
    data2.data_limite = await limitDataCalc(data2.data_adesao, data2.plano)
    
    console.log("data2.data_limite:", data2.data_limite);


    console.log('data2:', data2)

    data.value = data2
    const ret = await db.insert({
        table: "clients",
        data: data2
    })
//     // console.log('ret insert:', ret);
}

const updatedata = async (data_) => {
    data2 = {...data_}
     //array to cvs to save in sqlite3
     Object.entries(clients.schema).forEach(item=>{
        if (item[1].type.toLowerCase()=="multiselect"){
            data2[item[0]] = data2[item[0]].join(',')
            console.log('lll>>', data2[item[0]]);
        }
    })
    data2.data_limite = await limitDataCalc(data2.data_adesao, data2.plano)

    console.log('data2.data_limite', data2.data_limite);
    const ret = await db.update({
        table: "clients",
        data: data2,
        where: "id LIKE '" + data2.id + "'"
    })
    console.log('ret update:', ret);
    // save("demo/data/clients.json", clients)
    // initValues()
}

const updateorder = async (data) => {
    console.log('data:', data);
    data.map((x, index)=>{
        let columns_ = "(" + Object.keys(x).join(',') + ")"
        let values_ = "(" + Object.values(x).map(y=>{
            if (y=='null') {
                return y
            }else{
                return "'" + y + "'"
            }
        }).join(',') + ")"

        insertSQL[index] = `
            INSERT INTO clients
            ${columns_}
            VALUES
            ${values_};
        `})

        let sql = `
            BEGIN TRANSACTION;
            DELETE FROM clients;
            ${insertSQL.join('')}
            COMMIT;
            `

        console.log('sql:', sql);
        let ret = await db.exec(sql)
}

const deletedata = async (data) => {

    if (Array.isArray(data)) {
        const ret = await db.delete({
            table: "clients",
            where: "id in (" + data.map(x=>`'${x.id}'`).join(',') + ")"
        })
        console.log('ret update:', ret);
    } else {
        const ret = await db.delete({
            table: "clients",
            where: "id like '" + data.id + "'"
        })
        console.log('ret update:', ret);
    }
    
    
    // save("demo/data/clients.json", clients)
}

</script>