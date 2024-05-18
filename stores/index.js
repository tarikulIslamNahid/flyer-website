import { useToast } from 'primevue/usetoast';
export const useMainStore = defineStore('main', () => {
    const permissions = ref([])
    const packages = ref([])
    const toast = useToast();

        // set permissions
        const setPermissions = (newPermissions) => {
            permissions.value = newPermissions
        }

        // set packages
        const setPackages = (newPackages) => {
            packages.value = newPackages
        }

        // get permissions
        async function getPermissions(){
            const permissions = await useApiFetch("admin/permissions");
            console.log(permissions,'pers')

            // check error and data 
            if(permissions.data){
                setPermissions(permissions.data.value)
                return permissions.data.value
            }
            return permissions
        }

        async function getPackages(){
            const packages = await useApiFetch("global/website/plans");
            console.log(packages.data.value.data,'pers')

            // check error and data 
            if(packages.data){
                setPackages(packages.data.value.data)
                return packages.data.value.data
            }
            return packages
        }


    return {
     permissions,getPermissions,setPermissions,getPackages,packages,
    }
  })

