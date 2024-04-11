import { defineStore } from 'pinia';

interface UserPayloadInterface {
  type: string;
  username: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userStatus: null,
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ type, username, password }: UserPayloadInterface) {
      // useFetch from nuxt 3
      // const { data, pending }: any = await useFetch('https://dummyjson.com/auth/login', {
      const { data, pending }: any = await useFetch('/api/login_do', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          type,
          username,
          password,
        },
      });
      
      
      console.log("111111", data.value);
      this.loading = pending;

      if (data.value) {
        console.log("Entrou!");
        const token = useCookie('token'); // useCookie new hook in nuxt 3
        token.value = data?.value?.token; // set token to cookie
        this.authenticated = true; // set authenticated state value to true
        
        const dataUser = useCookie('dataUser')
        dataUser.value = data?.value
       
      }
    },
    logUserOut() {
      const token = useCookie('token'); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
      const dataUser = useCookie('dataUser')
      dataUser.value = null
    },
  },
});