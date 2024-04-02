// import {useApiFetch} from "~/composables/useApiFetch";
export const useAuthStore = defineStore('auth', () => {
    const user =ref(null)
    const token = ref(null)
    const permissions = ref([])
    const isLoggedIn = computed(() => !!token.value )

    // set token and user
    const setToken = (newToken) => {
        token.value = newToken
    }
    const setUser = (newUser) => {
        user.value = newUser
    }
    const setPermissions = (newPermissions) => {
        permissions.value = newPermissions
    }

    // login
    async function login(data){
        const login = await useApiFetch("admin/login",{
            method: 'POST',
            body: data
        });
        return login;
    } 

    return {
        user, token, isLoggedIn,permissions, login, setToken, setUser,setPermissions
    }

  }, 
  {
    persist: {
      enabled: true,
      storage: persistedState.sessionStorage,
    },
  }
  )