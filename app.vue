<template>
    <div>
      <NuxtLayout>
         <NuxtPage />
      </NuxtLayout>
    </div>
</template>
<script setup>

import {users} from "@/data/users.js"
import {userroles} from "@/data/userroles.js"
import {clients} from "@/data/clients.js"
import {reports} from "@/data/reports.js"
import {products} from "@/data/products.js"
import {db} from "@/data/db_cmds"
// import {users, userroles, clients, products, reports, config, client_status, client_planos} from "@/data/schemas.js"
// console.log('client_status:', client_status);
// console.log('userroles:', userroles);
// console.log('clients:', clients);

db.init('users', users)
db.init('userroles', userroles)
db.init('clients', clients)
db.init('products', products)
db.init('reports', reports)
// db.init('config', config)
// db.init('client_status', client_status)
// db.init('client_planos', client_planos)
// const ret = sqlExec(users)
// console.log('ret:', ret);

</script>