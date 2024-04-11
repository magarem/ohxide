<template>
    
    <div class="p-5">
        <!-- <h1>Sis Report</h1>
        Usuário nível: {{ dataUser }}
        <Button label="Sair" @click="logOut"/> -->
        <div class="flex" >
            <div  v-if="dataUser.status=='root'" class="p-1" style="width: 520px; max-height: 500px; margin-right: 20px; overflow: auto; ">
                <Magacrud source="demo/data/users.json" />
            </div>
            <div  class="p-1" style="width: 520px; max-height: 500px; margin-right: 20px; overflow: auto; ">
                <Magacrud source="demo/data/clients.json" />
            </div>
            <div class="p-1" style="width: 500px; height: 500px; overflow: auto;">
                <Magacrud source="demo/data/reports.json" />
            </div>
        </div>

    </div>
    
</template>
<script setup>
// # for local storage
import { getData, setData } from 'nuxt-storage/local-storage';
import { useAuthStore } from '~/store/auth';

const router = useRouter();
const dataUser = useCookie('dataUser')
const { logUserOut } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive


const logOut = () => {
  logUserOut();
  router.push('/admin/login');
};

if (!authenticated.value) {
  router.push('/login');
}
</script>