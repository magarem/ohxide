<template>
  <div class="text-center" style="margin-top: 80px;">
    <img src="/img/logo.jpeg" style="width: 200px;"/>
    <h3>Download relatório {{ month }}/{{ year }}</h3>
    <!-- {{ authenticated }} -->
    <ProgressSpinner v-if="!data"/>
    <router-link v-if="data" :to="'/upload/reports/' + data" target="_blank" rel="noopener">
      <Button style="margin-top: 20px;" label="Baixar relatório" icon="pi pi-cloud-download"/>
    </router-link>
    <!-- <p v-else>Aguarde<i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i></p> -->
  </div>
</template>
<script setup>
definePageMeta({
    layout: ''
})
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';
import "/node_modules/primeflex/primeflex.css"

import {db} from "@/data/db_cmds"
const table = ref("products")

const router = useRouter();
const { logUserOut, authenticateUser } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive

const dataUser = useCookie('dataUser')

let data = ref()
const route = useRoute()
const year = route.query.year
const month = route.query.month
const client = route.query.client
const userData = await db.get(`select * from clients where id like '${client}'`)

// if (route.query.client != dataUser.value?.id){
//   logUserOut()
// }

const login = async () => {
  console.log({
    type: 'clients',
    username: userData[0].username,
    password: userData[0].password.toString(),
});

  const r = await authenticateUser({
    type: 'clients',
    username: userData[0].username,
    password: userData[0].password.toString(),
  });

  console.log('r:', r);
  console.log('authenticated:', authenticated.value);
  if (authenticated.value) {
    console.log("Usuario identificado!!");
     download()

    // router.push('/admin');
  }else{
    console.log("erro login!!");
    // msg.value = "Erro: Usuário e/ou senha inválidos"
  }
};




const download = async () => {
  const sql = `
  select 
      COUNT(reports.id), 
      reports.year, 
      reports.month, 
      GROUP_CONCAT(reports.name) as nome, 
      GROUP_CONCAT(reports.file) as files, 
      GROUP_CONCAT(products.name) as tags 
  from 
      reports, 
      products, 
      clients 
  where 
      reports.tag = products.id AND 
      instr(clients.tags, reports.tag) > 0 AND
      clients.id like '${userData[0].id}'
  GROUP BY 
      reports.year, 
      reports.month 
  order by 
      year DESC, 
      month DESC 
` 
  let data_ = await $fetch('/api/dbservices?sql=' + sql.replace(/\s+/g,' ').trim());
  data_ = data_.filter(x => x.year == year && x.month == month)
  data.value = await $fetch(`/api/shell?year=${year}&month=${month}&client=${JSON.stringify(userData[0])}&files=${data_[0].files}`)
}
 
login()

</script>