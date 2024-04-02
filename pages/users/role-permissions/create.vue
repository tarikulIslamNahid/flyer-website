<script setup>
definePageMeta({
    middleware: 'auth',
    // permission:'dashboard'
});
useHead({
  title: `Create Role & Permission`,
});
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { required, helpers, integer, requiredIf } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
const toast = useToast();
const router = useRouter()
const useCommon = useCommonStore();
const loading = ref(false);
const isSubmitting = ref(false);
const permissionGroups = ref([]);

const roleSetup = reactive({
    name: null,
    permissions: [],
});
const roleSetupRules = computed(() => {
  return {
    name: {
      required: helpers.withMessage(
        "The Role Name Field Is Require",
        required
      ),
      $autoDirty: true,
    },
    permissions: {
      required: helpers.withMessage(
        "The Permissions Field Is Require",
        required
      ),
      $each:helpers.forEach(
        helpers.withMessage(
          "The Permissions Field Is Require",
          required
        )),
      
      $autoDirty: true,
    },
  
  };
});
const v$ = useVuelidate(roleSetupRules, roleSetup);

async function getPermissions(){
    loading.value = true;
    const permissions = await useApiFetch("admin/permissions");
    // check error and data 
    if(permissions.data){
        permissionGroups.value=permissions.data.value
    }
    loading.value = false;
        }

onMounted(async() => {
    getPermissions()
});
 
 

useCommon.setBreadcrumbs([
    { label: 'Role & Permissions', route: '/users/role-permissions' },
    { label: 'Create Role & Permission' }
]); 
 
const permissionsGroups = ref([]);
const permissions = ref([]);
const onRowSelect = (e) => {
    console.log(e,'onRowSelect',roleSetup.permissions);
    let gpPermissions = e.data.permissions;
    gpPermissions.forEach((gpPermission) => {
        let isExist = roleSetup.permissions.find((permission) => permission == gpPermission.id);
        if (!isExist) {
            roleSetup.permissions.push(gpPermission.id);
        }
    });
};
const onRowUnselect = (e) => {
    let gpPermissions = e.data.permissions;
    gpPermissions.forEach((gpPermission) => {
        console.log(roleSetup.permissions, 'permissions.value')
        let isExist = roleSetup.permissions.find((permission) => permission == gpPermission.id);
        if (isExist) {
            roleSetup.permissions = roleSetup.permissions.filter((permission) => permission != gpPermission.id);
        }
    });
};
 
const onRowUnselectAll = (e) => {
    roleSetup.permissions = [];  
};
const onRowSelectAll = (e) => {
    let allPermissionGroups = e.data;
    allPermissionGroups.forEach((gp) => {
        let gpPermissions = gp.permissions;
        gpPermissions.forEach((gpPermission) => {
            let isExist = roleSetup.permissions.find((permission) => permission == gpPermission.id);
            if (!isExist) {
                roleSetup.permissions.push(gpPermission.id);
            }
        });
    });
};

const saveRole = async () => { 
    v$.value.$validate();
    isSubmitting.value = true;
    const roleInsert = await useApiFetch("admin/roles", {
        method: "POST",
        body: JSON.stringify(roleSetup),
    });
    isSubmitting.value = false;
    if(roleInsert.data){
    toast.add({severity:'success', summary: 'Successful', detail: 'Role Created Successfully', life: 3000});
        router.push('/users/role-permissions');
    }
    else{
        toast.add({severity:'error', summary: 'Error', detail: 'Something went wrong', life: 3000});
        console.log(roleInsert.error)
    } 
};
</script>

<template>
    <div class="grid">
    <Card class="col-10 col-offset-1" >
        <template #title>Create Role & Permission</template>
        <template #content>
        <div class="p-fluid">

             <form @submit.prevent="saveRole" >

                <div class="field col-12">
                    <label for="name">Role Name</label>

                        <InputText  id="name" v-model="roleSetup.name" required="true" :class="{'p-invalid': v$.name?.$error}" />
                    <span v-if="v$?.name?.$error" role="alert" class="p-error">{{ v$.name?.$errors[0].$message}}</span>
        
                </div> 
                <div class="field col-12">
                    <label for="permissions">Select Permissions</label>
                    <DataTable  v-model:selection="permissionsGroups" :loading="loading" @rowSelect="onRowSelect" @rowUnselect="onRowUnselect" @rowSelectAll="onRowSelectAll" @rowUnselectAll="onRowUnselectAll" showGridlines  :value="permissionGroups"  tableStyle="min-width: 50rem">
                        <Column  selectionMode="multiple" headerStyle="width: 3rem"></Column>
                        <Column field="module_name" header="Permission Group">
                            
                        </Column> 
                        <Column id="permissions" field="permissions" header="Permissions">
                            <template #body="{ data }">
                                <div v-for="(permission,index) in data.permissions" :key="index" class="flex align-items-center mb-3">
                                    <Checkbox v-model="roleSetup.permissions" :id="permission.id" name="permissions[]" :value="permission.id" ::class="{'p-invalid': v$.permissions?.$error}" />
                                    <label :for="permission.id" class="ml-2"> {{permission.display_name}} </label>
                                </div> 
                            </template>
                        </Column> 
                        
                    </DataTable>
                    <span v-if="v$.permissions.$error" role="alert" class="p-error">{{ v$.permissions?.$errors[0].$message}}</span>

        
                </div> 
   
                    <div class="flex gap-2 justify-content-end mt-5"> 
                        <Button type="submit" class="px-6" :disabled="v$.$errors.length!=0" :loading="isSubmitting"  label="Save" />
                    </div> 
                </form>
            </div>
        </template>
    </Card> 
</div>

</template>
<style>
 .panelWidth {
    width: 500px;
}
</style>