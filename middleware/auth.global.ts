import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware((to) => {
  const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
  const token = useCookie('token'); // get token from cookies

  if (token.value) {
    // check if value exists
    authenticated.value = true; // update the state to authenticated
  }

  // if token exists and url is /login redirect to homepage
  if (token.value && to?.name === 'login') {
    return navigateTo('/');
  }
  
  if (!to?.name) {
    // alert()
      return navigateTo('/');
    }

  console.log('to?.name', to?.name);
  
  // if token doesn't exist redirect to log in
  if (
    !token.value && 
    to?.name !== 'login' && 
    to?.name !== 'admin' && 
    to?.name !== 'admin-login' &&
    to?.name !== 'download' &&
    to?.name !== 'file' &&
    to?.name !== 'redefinirsenha'
    ) {
    abortNavigation();
    return navigateTo('/login?to='+to?.fullPath);
  }
});