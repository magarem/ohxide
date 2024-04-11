<script setup>
import { useAuthStore } from '~/store/auth';
import {db} from "@/data/db_cmds"
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

</script>
<template>


<Menubar style="background-color: #73a1a5;">
  <template #start>
    <img src="/img/logo.jpeg" class="mr-5" style="width: 100px; border-radius: .3rem;"/>
  </template>
  <!-- <template #item="{ item, props, hasSubmenu, root }">
      <a v-ripple class="flex align-items-center" v-bind="props.action">
        <NuxtLink :to="item.link">
          <span :class="item.icon" class="menulink"/>
          <span class="ml-2 menulink" >{{ item.label }}</span>
        </NuxtLink>
          <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
          <span v-if="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut }}</span>
          <i v-if="hasSubmenu" :class="['pi pi-angle-down', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
      </a>
  </template> -->
  <template #end>
      <div class="flex align-items-center gap-2">
        <span style="font-size: 18px;" class="mr-3">{{dataUser?.username}}</span>
        <Button label="Sair" @click="logOut" severity="contrast"  class="mr-5"/>
      </div>
  </template>
</Menubar>


<!-- <nav v-if="dataUser" class="flex items-center justify-between flex-wrap p-1" style="background-color: #73a1a5;">
  <div class="flex items-center flex-shrink-0 text-white mr-2">
    <img src="/img/logo.jpeg" style="width: 70px;"/>
  </div>
  <div class="block lg:hidden">
    <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
      <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>
  <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-sm lg:flex-grow mt-0">
      <span class="text-[22px]" style="color: #514342; font-size: 22px;">WReport</span><br/>
      <div class="mt-1 ml-1">
      </div>
    </div>
  </div>
</nav> -->
<div v-if="dataUser" class="mt-1 p-2" style="background-color: #9f763a; border-radius: 8px;">
    <span class="title">Usuário:</span> {{dataUser?.username}} /
    <span class="title">Plano:</span> {{ userPlanoName }} /
    <span class="title">Adesão:</span> {{dataUser?.data_adesao}} / 
    <span class="title">Encerramento:</span> {{dataUser?.data_limite}}
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
</style>