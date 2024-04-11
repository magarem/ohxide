<script setup>
// # for local storage
// import { getData, setData } from 'nuxt-storage/local-storage';
import { useAuthStore } from '~/store/auth';
import "primeflex/primeflex.css";
const router = useRouter();
const dataUser = useCookie('dataUser')
console.log('dataUser:', !dataUser.value);
const { logUserOut } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive

const logOut = async () => {
  logUserOut();
  await navigateTo('/admin/login')
};

if (authenticated.value && dataUser.value?.type != "users") {
  logUserOut();
  await navigateTo('/admin/login')
}
if (!authenticated.value) {
	console.log('!!!!!!!!!');
	await navigateTo('/admin/login')
}

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        link: '/admin/'
    },
    {
        label: 'Usuários',
        icon: 'pi pi-users',
        link: '/admin/users'
    },
    {
        label: 'Clientes',
        icon: 'pi pi-id-card',
        link: '/admin/clients'
    },{
        label: 'Planos',
        icon: 'pi pi-id-card',
        link: '/admin/client_planos'
    },{
        label: 'Rótulos',
        icon: 'pi pi-id-card',
        link: '/admin/products'
    },
    {
        label: 'Relatórios',
        icon: 'pi pi-file-pdf',
        link: '/admin/reports'
    },
    // },
    {
        label: 'Sistema',
        icon: 'pi pi-sliders-h',
        items: [
            {
                label: 'Configurações',
                icon: 'pi pi-bolt',
                link: '/admin/config'
            },
            {
                label: 'Enviar emails',
                icon: 'pi pi-server',
                link: '/admin/sendemail'
                // shortcut: '⌘+B'
            }
            // ,
            // {
            //     label: 'UI Kit',
            //     icon: 'pi pi-pencil',
            //     shortcut: '⌘+U'
            // },
            // {
            //     separator: true
            // },
            // {
            //     label: 'Templates',
            //     icon: 'pi pi-palette',
            //     items: [
            //         {
            //             label: 'Apollo',
            //             icon: 'pi pi-palette',
            //             badge: 2
            //         },
            //         {
            //             label: 'Ultima',
            //             icon: 'pi pi-palette',
            //             badge: 3
            //         }
            //     ]
            // }
        ]
    }
    // {
    //     label: 'Contact',
    //     icon: 'pi pi-envelope',
    //     badge: 3
    // }
]);

</script>
<template>
  <Menubar :model="items">
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
  <!-- <Toolbar style="_border-radius: 3rem; margin-bottom: 2px;  padding: 1rem 1rem 1rem 1.5rem">
    <template #start>
        <div class="flex align-items-center gap-2">
          <img src="/img/logo.jpeg" style="width: 70px; border-radius: .3rem;"/>
           
            <NuxtLink to="/admin/">
              <Button text plain _class="block mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4" to="/admin/">Início</Button>
            </NuxtLink>
            <NuxtLink to="/admin/users">
              <Button text plain v-if="dataUser?.status&&dataUser?.status=='root'" _class="block mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4" to="/admin/users">Usuários</Button>
            </NuxtLink>
            <NuxtLink to="/admin/clients">
              <Button  text plain  _class="block mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4" to="/admin/clients">Clientes</Button>
            </NuxtLink>
            <NuxtLink to="/admin/products">
              <Button  text plain _class="block mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4" to="/admin/products">Produtos</Button>
            </NuxtLink>
            <NuxtLink to="/admin/reports">
              <Button  text plain _class="block mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4" to="/admin/reports">Relatórios</Button>
            </NuxtLink>
        </div>
    </template>

    <template #end>
        <div class="flex align-items-center gap-2">
          <span style="font-size: 18px;" class="mr-3">{{dataUser?.username}}</span>
      <Button label="Sair" @click="logOut" severity="contrast"  _class="p-0"/>
        </div>
    </template>
</Toolbar> -->
  <nav v-if="false" class="flex items-center justify-between flex-wrap p-1" style="background-color: #73a1a5;">
    <div class="flex items-center flex-shrink-0 text-white mr-2">
      <!-- <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg> -->
    <img src="/img/logo.jpeg" style="width: 70px;"/>
    <!-- <span class="font-semibold text-xl tracking-tight">Tailwind CSS</span> -->
    </div>
    <div class="block lg:hidden">
      <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
      </button>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow mt-0">
      <span class="text-[22px]" style="color: #514342; font-size: 22px;">WReport</span> admin<br/>
      <div class="mt-1 ml-1">
        <NuxtLink class="block mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4" to="/admin/">Início</NuxtLink>
        <NuxtLink v-if="dataUser?.status&&dataUser?.status=='root'" class="block mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4" to="/admin/users">Usuários</NuxtLink>
        <NuxtLink class="block mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4" to="/admin/clients">Clientes</NuxtLink>
        <NuxtLink class="block mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4" to="/admin/products">Produtos</NuxtLink>
        <NuxtLink class="block mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4" to="/admin/reports">Relatórios</NuxtLink>
        <NuxtLink class="block mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4" to="/admin/client_planos">Planos</NuxtLink>
      
      </div>
      
      </div>
      <!-- <div class="mr-5">
        <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Sair</a>
      </div> -->
    </div>
  </nav>
  <div v-if="false" class="p-2" style="background-color: #9f763a;">
          Usuário: {{dataUser?.username}} - {{ dataUser?.name }} 
      <span v-if="dataUser?.products">| Produtos: {{ dataUser?.products }}</span> 
      | <Button label="Sair" @click="logOut" severity="contrast" text class="p-0"/>
  </div>
<div class="p-4">
  <slot />
</div>

</template>

<style scoped>
.menulink {
	color: whitesmoke;
}
</style>