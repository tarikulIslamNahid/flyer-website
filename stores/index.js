import { useToast } from 'primevue/usetoast';
export const useMainStore = defineStore('main', () => {
    const permissions = ref([])
    const toast = useToast();

        // set permissions
        const setPermissions = (newPermissions) => {
            permissions.value = newPermissions
        }

        // get permissions
        async function getPermissions(){
            const permissions = await useApiFetch("admin/permissions");
            console.log(permissions,'pers')

            // check error and data 
            if(permissions.data){
                setPermissions(permissions.data.value)
                return permissions.data.value
                console.log(permissions,'oer')
            }
            return permissions
        }


    return {
     permissions,getPermissions,setPermissions
    }
  })

