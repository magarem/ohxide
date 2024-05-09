<template>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <div class="m-0" v-if="user" style="display: grid; place-items: center;">
    <div v-if="accessOk">
      <Card class="mt-5" style="width: 100%;" >
        <template #header>
            <div class="text-center">
               <img src="/img/logo.jpeg" style="width: 200px; padding-top: 10px;"> 
            </div>
            
        </template>
      
        <template #content><h3>Redefinição de senha</h3>
         
          <!-- <div class="flex flex-column gap-2 mb-5">
              <label for="username">Nome de usuário</label>
              {{ user.username }}
          </div> -->

          <div class="flex flex-column gap-2 mb-5">
              <label for="email">Email</label>
              {{ user.email }}
          </div>

          <div class="flex flex-column gap-2 mb-5">
              <label for="password">Nova senha</label>
              <InputText id="password" v-model="novasenha" aria-describedby="password-help" />
              <small id="password-help">Sua senha de acesso ao sistema</small>
          </div>

          <div class="flex flex-column gap-2 mb-5">
            <Button label="Salvar" @click="confirm1"/>
          </div>
       
        </template>
      </Card>
    </div>
    <div v-else _class="m-5">
      <h2>Acesso suspenso<br/> Entre em contato com o administrador</h2>
    </div>
  </div>
</template>
<script setup>
 definePageMeta({
        layout: ''
    })
import "primeflex/primeflex.css";
import { useAuthStore } from '~/store/auth';
import moment from 'moment'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
const confirm = useConfirm();
const toast = useToast();

const confirm1 = () => {
    confirm.require({
        message: 'Confirma alteração de dados?',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Cancela',
        acceptLabel: 'Sim',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmado', detail: 'Dados de usuário registrados com sucesso', life: 3000 });
            updateUserData()
          }
        //   ,
        // reject: () => {
        //     toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        // }
    });
};
const route = useRoute()
const client = route.query.client
const { logUserOut } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
const dataUser = useCookie('dataUser')
let flag_mostra_link = ref(false)
let user = ref({
  username: '',
  email: '',
  password: ''
})
let novasenha = ref('')
const vai = ref(null)
const accessOk = ref(true)
let data2 = []
const tableFilter = ref({
year: null,
month: null
})

console.log("authenticated.value:", authenticated.value);
// if (!authenticated.value) {
//   navigateTo('/login');
// }

// onBeforeMount(()=>{
//   if (!dataUser.value || dataUser.value.type != 'clients'){
//     logUserOut()
//     router.push('/login');
//   }

//   if (authenticated.value) {
//     console.log('data limite:', dataUser.value.data_limite);
//     const dia = dataUser.value.data_limite.split('/')[0]
//     const mes = dataUser.value.data_limite.split('/')[1]
//     const ano = dataUser.value.data_limite.split('/')[2]


//     if (dataUser.value.status == 'ativo'){

//       var date_limit = moment(`${ano}-${mes}-${dia}`)
//       var now = moment();

//       if (now > date_limit) {
//         accessOk.value = false
//       } else {
//         accessOk.value = true
//       }
      
//     }
//   }
//   if (!authenticated.value) {
//     router.push('/login');
//   }
// })
const updateUserData = async () => {
  // alert(JSON.stringify(user.value, null, 2))
    console.log("update");
  const data2 = await $fetch('/api/dbservices', {
    method: 'PATCH',
    body: JSON.stringify({table: 'clients', data: {password: novasenha.value}, where: "id like '" + user.value.id + "'" })
  })

  logUserOut()
  navigateTo('/login');
}


const sql = `
  select 
    *
  from 
    clients 
  where 
    email like '${client}'
` 

console.log('sql:', sql);

let data = await $fetch('/api/dbservices?sql=' + sql.replace(/\s+/g,' ').trim());



user.value = data[0]
console.log('data:', data);


</script>
<style scoped>
td {
  height: 35px;
}
.field_name {
  text-align: right;
  font-weight: bold;
}

.field_value {
  width: 200px;
  margin-left: 10px;
  text-align: left;
}
</style>