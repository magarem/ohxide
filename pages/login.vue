<template>
    <div class="body">
        <div id="container1">
            <div class="flex">
                <img src="/img/logo.jpeg" style="width: 150px; margin-right: 30px;"/>
            <h1 style="margin-top: 39px; margin-left: 15px;">Ohxide report system</h1>
            </div>
            <div id="login-container">
            <form>
                <input
                    v-model="user.type"
                    type="hidden"
                    class="input"
                    placeholder="tipo"
                    name="uname"
                    autocomplete="off"
                />
                <input
                    v-model="user.email"
                    type="text"
                    class="input"
                    placeholder="email"
                    name="uname"
                    autocomplete="off"
                    required
                />
                <input
                    v-model="user.password"
                    type="password"
                    class="input"
                    placeholder="Senha"
                    name="psw"
                    autocomplete="off"
                    required
                />  
                <button @click.prevent="login">Entrar</button>
                <div class='msg mt-3'>{{  msg }}</div>
            </form>
        </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
 definePageMeta({
        layout: ''
    })
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

const { authenticateUser } = useAuthStore(); // use auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
let msg = ref('')
const user = ref({
  type: 'clients',
  email: '',
  password: '',
});
const router = useRouter();
const route = useRoute();

let toSerialized = ref()
if (process.client){
     toSerialized.value = location.href.split('?to=')[1]
    console.log('route.query.to:', toSerialized.value);
}



const login = async () => {
  await authenticateUser(user.value);
  // redirect to homepage if user is authenticated
  console.log('authenticated:', authenticated.value);
  
  if (authenticated.value) {
    // setData('dataUser', )
    // alert('ok!')
    if (toSerialized.value?.includes("admin")){
        router.push('/');
    }else{
        router.push(toSerialized.value||'/');
    }
    
  }else{
    msg.value = "Erro: Usuário e/ou senha inválidos"
  }

};
</script>
<style scoped>
.msg {
    font-size: 17px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: rgb(234, 255, 0);
}
    .body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: #1a1a1a; /* Fundo dark */
        color: #fff; /* Cor do texto */
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh; /* 100% da altura da viewport */
    }
input {
    color: aliceblue;
    background-color: #636060;
}

::placeholder {
  color: rgb(211, 212, 212);
  opacity: 1; /* Firefox */
}

    #logo {
        text-align: center;
        max-width: 400px;
        width: 80%;
        margin-left: -30px;
        /* padding: 20px; */
    } 
    
   
    
    #container1 {
        text-align: center;
        max-width: 400px;
        width: 100%;
        padding: 20px;
        
    } 
    
    #container1 img {
        max-width: 100%;
        height: auto;
        margin-bottom: 20px;
    }

    #login-container {
        text-align: center;
        max-width: 400px;
        width: 100%;
        padding: 20px;
        background-color: #333; /* Cor de fundo do formulário */
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }

   
    #login-container img {
        max-width: 100%;
        height: auto;
        margin-bottom: 20px;
    }

    #login-container input {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        box-sizing: border-box;
        border: 1px solid #555; /* Cor da borda do campo de entrada */
        border-radius: 4px;
    }

    #login-container button {
        width: 100%;
        padding: 10px;
        background-color: #4caf50; /* Cor de fundo do botão */
        color: #fff; /* Cor do texto do botão */
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    #login-container button:hover {
        background-color: #45a049; /* Cor de fundo do botão ao passar o mouse */
    }
</style>