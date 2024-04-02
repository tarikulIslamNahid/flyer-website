export default defineNuxtRouteMiddleware((to, from) => {
    const auth = useAuthStore();
console.log('auth')
    if (!auth.token && to.path !== '/login') {
        return navigateTo('/login');
    } 
    // check page permissions 
    if(to.meta.permission){
        if(!auth.permissions.includes((per)=>{
            return per.name === to.meta.permission
        })){
            return navigateTo('/');
        }
    }
    

})