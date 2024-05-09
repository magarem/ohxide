<script setup>
import { useAuthStore } from '~/store/auth';
import {db} from "@/data/db_cmds"
import "primeflex/primeflex.css";
const router = useRouter();
const dataUser = useCookie('dataUser')
console.log('dataUser:', !dataUser.value);
const { logUserOut } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
const sqlret = await db.get(`select * from client_planos where id = ${dataUser.value.plano}`)

const userPlanoName = sqlret[0].name
const logOut = () => {
  logUserOut();
  router.push('/login');
};

if (!authenticated.value || !dataUser.value) {
	console.log('!!!!!!!!!');
	router.push('login');
}

const menu = ref();
const items_0 = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    link: '/'
  },{
        label: 'Configurações',
        icon: 'pi pi-file',
        command: () => {
            router.push('/usersettings');
        }
        
    }
]);
const items = ref([
    {
        label: 'Configurações',
        icon: 'pi pi-file',
        command: () => {
            router.push('/usersettings');
        }
        
    },
    {
        separator: true
    },
    {
        label: 'Sair',
        icon: 'pi pi-file-edit',
        command: () => {
          logOut()
        }
    }
]);

const toggle = (event) => {
    menu.value.toggle(event);
};


</script>
<template>


<Menubar :model="items_0">
    <template #start>
      <img src="/img/logo.jpeg" class="mr-5" style="width: 100px; border-radius: .3rem;"/>
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
        <a v-ripple class="flex align-items-center" v-bind="props.action">
          <a :href="item.link">
            <span :class="item.icon" class="menulink"/>
            <span class="ml-2 menulink" >{{ item.label }}</span>
          </a>
            <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
            <span v-if="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut }}</span>
            <i v-if="hasSubmenu" :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
        </a>
    </template>
    <template #end>
        <div class="flex align-items-center gap-2">
          <span style="font-size: 18px;" class="mr-3">{{dataUser?.username}}</span>
          <Button label="Sair" @click="logOut" severity="contrast"  class="mr-5"/>
        </div>
    </template>
  </Menubar>
<div v-if="dataUser" class="mt-1 p-2" style="background-color: #9f763a; border-radius: 8px;">
    <span class="title">Email:</span> {{dataUser?.email}} /
    <span class="title">Plano:</span> {{ userPlanoName }} /
    <span class="title">Adesão:</span> {{dataUser?.data_adesao.split('/')[1]}}/{{dataUser?.data_adesao.split('/')[2]}}
    <!-- <span class="title">Encerramento:</span> {{dataUser?.data_limite}} -->
		<span v-if="dataUser?.products">| Produtos: {{ dataUser?.products.map(x=>x.name).join(',') }}</span> 
  <!-- | <Button label="Sair" @click="logOut" severity="contrast" text class="p-0"/> -->
</div>
<slot />
  </template>

<style scoped>
a {
	color:rgb(10, 10, 62);
}

.title {
  font-weight: bold;
}
.menulink {
	color: whitesmoke;
}
</style>