export const useCommonStore = defineStore('common', () => {
    const breadcrumbs = ref([])
    
    // set setBreadcrumbs
    const setBreadcrumbs = (newBreadcrumbs) => {
        breadcrumbs.value = newBreadcrumbs
    }
    return {
        breadcrumbs,setBreadcrumbs
    }
  })

