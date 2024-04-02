<script setup>
useHead({
  title: `Role & Permission`,
});
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import { CustomerService } from '@/service/CustomerService';
import { Form,Field,ErrorMessage } from 'vee-validate';

const useCommon = useCommonStore();
useCommon.setBreadcrumbs([
    { label: 'Role & Permissions' }
]); 

import * as Yup from 'yup';
onMounted(() => {
  CustomerService.getRoles().then((data) => (roles.value = data));
}); 
const toast = useToast();
const dt = ref();
const roles = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const user = Yup.object().shape({
    name: Yup.string().required('Name is required').default(null),
    email: Yup.string().required('Email is required').email('Email is invalid').default(null),
    phone: Yup.mixed('phone must be a number').required('Phone is required').default(null),
    role: Yup.mixed().required('Role is required').default(null),
}); 
const selectedProducts = ref();
const filters = ref({
  'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});
const submitted = ref(false);
 
const openNew = () => {
  product.value = {};
  submitted.value = false;
  productDialog.value = true;
};
const hideDialog = () => {
  productDialog.value = false;
  submitted.value = false;
};
const saveProduct = () => {
 
};
const editProduct = (prod) => {
  product.value = {...prod};
  productDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
  product.value = prod;
  deleteProductDialog.value = true;
};
const deleteProduct = () => {
  roles.value = roles.value.filter(val => val.id !== product.value.id);
  deleteProductDialog.value = false;
  product.value = {};
  toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
};
const findIndexById = (id) => {
  let index = -1;
  for (let i = 0; i < roles.value.length; i++) {
      if (roles.value[i].id === id) {
          index = i;
          break;
      }
  }

  return index;
}; 
const overlayPanelRef = ref();
const itemPermission = ref([]);
const showOverlayPanel = (roleId,event) => {
  itemPermission.value = [];
  let per = roles.value.find((role) => role.id === roleId).permissions;
  itemPermission.value = per;
  // itemPermission.value = item.splice(5,item.length);
  // set value after 5 item
  if(itemPermission.value) {
    overlayPanelRef.value.toggle(event)
  }
};

 
const createId = () => {
  let id = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for ( var i = 0; i < 5; i++ ) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}
const exportCSV = () => {
  dt.value.exportCSV();
};
const confirmDeleteSelected = () => {
  deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
  roles.value = roles.value.filter(val => !selectedProducts.value.includes(val));
  deleteProductsDialog.value = false;
  selectedProducts.value = null;
  toast.add({severity:'success', summary: 'Successful', detail: 'roles Deleted', life: 3000});
};

 

</script>

<template>
  <div>
      <div class="card">
          <Toolbar class="mb-4">
              <template #end> 
                <nuxt-link :to="{name:'users-role-permissions-create'}">
                  <Button label="New" icon="pi pi-plus" size="small" severity="success" class="mr-2" />
                </nuxt-link> 
              </template>

           
          </Toolbar>

          <DataTable ref="dt" size="small" :value="roles" v-model:selection="selectedProducts" dataKey="id" 
              :paginator="true" :rows="10" :filters="filters"
              paginatorTemplate=" PrevPageLink PageLinks NextPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users">
              <template #header>
                  <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                      <h4 class="m-0">Manage Role & Permissions</h4>
          <span class="p-input-icon-left">
                          <i class="pi pi-search" />
                          <InputText v-model="filters['global'].value" placeholder="Search..." />
                      </span>
        </div>
              </template>

              <Column selectionMode="multiple" style="width: 3rem" :exportable="true"></Column>
              <Column field="name" header="Name" sortable style="min-width:16rem"></Column>
              <Column field="createdBy" header="Created By" sortable style="min-width:12rem"></Column> 
              <Column field="permissions" header="Permissions" sortable style="max-width:16rem">
                  <template #body="slotProps">
                    <Chip v-for="(permission,index) in slotProps.data.permissions.slice(0,5)" :key="index" class="m-2">
                      <span class=" font-medium"> {{ permission.name }}  </span>
                  </Chip>
                      <Button ref="myButton" v-if="slotProps.data.permissions.length>5" @click="showOverlayPanel(slotProps.data.id,$event)" text severity="secondary" class="p-2" size="small" type="button" label="More"  />
                      <!-- <Button v-if="slotProps.data.permissions.length>5" severity="secondary" class="p-2" size="small" type="button" :label="slotProps.data.permissions.length-5+'+'" @click="toggle" /> -->
                    <!-- <OverlayPanel  >
                      <Chip v-for="(permission,ind) in slotProps.data.permissions" :key="ind" class="m-2">
                        <span class=" font-medium"> {{ permission.name }}  </span>
                    </Chip>
                  </OverlayPanel> -->

                  </template>
              </Column>
              <Column header="Action" :exportable="false" style="min-width:8rem">
                  <template #body="slotProps">
                      <Button icon="pi pi-pencil" size="small" rounded class="mr-2"  />
                      <Button icon="pi pi-trash" rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                  </template>
              </Column>
          </DataTable>
      </div>
      <OverlayPanel ref="overlayPanelRef" :pt="{
        root: { class: 'panelWidth' }
    }">
    <template v-for="(permission,ind) in itemPermission" :key="ind">

      <Chip v-if="ind>=5" class="m-2">
        <span class=" font-medium"> {{ permission.name }}  </span>
      </Chip>
    </template>
      </OverlayPanel>
      <!-- user create Modal  -->
      <Dialog v-model:visible="productDialog" :style="{width: '550px'}" header="User Create" :modal="true" class="p-fluid">
        <Form @submit="saveProduct" :validation-schema="user" v-slot="{errors,isSubmitting,handleReset}" >
        <div class="field">
            <label for="name">Name</label>
            <Field  v-model="user.name" name="name"  v-slot="{ field }" >
                <InputText id="name" v-bind="field" required="true" :class="{'p-invalid': errors && errors.name}" />
            </Field>
            <ErrorMessage name="name" class="p-error" />
        </div>  
        <div class="field">
            <label for="role">Role</label>
            <Field v-model="user.role" name="role"  v-slot="{ field}" >
                <!-- v-model="user.role.value" -->
                <Dropdown :modelValue="user.role?.value" :options="roles" v-bind="field" required="true" :class="{'p-invalid': errors && errors.role}" optionValue="id" optionLabel="label" placeholder="Select a Role" />
            </Field>
            <ErrorMessage name="role" class="p-error" />
        </div>  
 
          <div class="p-dialog-footer mt-5 pr-0 pb-0">
                <Button label="Reset" icon="pi pi-history" text @click="handleReset"/>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
                <Button label="Save" :disabled="isSubmitting" icon="pi pi-check" text type="submit" />
        </div> 
    </Form>
    
      </Dialog>

      <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
          <div class="confirmation-content">
              <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
              <span v-if="product">Are you sure you want to delete <b>{{product.name}}</b>?</span>
          </div>
          <template #footer>
              <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false"/>
              <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
          </template>
      </Dialog>

      <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
          <div class="confirmation-content">
              <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
              <span v-if="product">Are you sure you want to delete the selected roles?</span>
          </div>
          <template #footer>
              <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false"/>
              <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
          </template>
      </Dialog>
</div>
</template>
<style>
 .panelWidth {
    width: 500px;
}
</style>