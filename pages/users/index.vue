<script setup>
definePageMeta({
    middleware: 'auth',
    permission:'user-list'
});
useHead({
  title: `Users`,
});
const useCommon = useCommonStore();
useCommon.setBreadcrumbs([
    { label: 'Users' }
]); 
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import { CustomerService } from '@/service/CustomerService';
import { Form,Field,ErrorMessage } from 'vee-validate';
import * as Yup from 'yup';
onMounted(() => {
  CustomerService.getCustomersXLarge().then((data) => (products.value = data));
}); 
const toast = useToast();
const dt = ref();
const products = ref();
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
const statuses = ref([
  {label: 'INSTOCK', value: 'instock'},
  {label: 'LOWSTOCK', value: 'lowstock'},
  {label: 'OUTOFSTOCK', value: 'outofstock'}
]);
const roles = ref([
  {label: 'Manager', id: 1},
  {label: 'Superadmin', id: 2},
  {label: 'Bloger', id: 3}
]);

const formatCurrency = (value) => {
  if(value)
      return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
  return;
};
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
  submitted.value = true;

  if (product.value.name.trim()) {
      if (product.value.id) {
          product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
          products.value[findIndexById(product.value.id)] = product.value;
          toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
      }
      else {
          product.value.id = createId();
          product.value.code = createId();
          product.value.image = 'product-placeholder.svg';
          product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
          products.value.push(product.value);
          toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
      }

      productDialog.value = false;
      product.value = {};
  }
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
  products.value = products.value.filter(val => val.id !== product.value.id);
  deleteProductDialog.value = false;
  product.value = {};
  toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
};
const findIndexById = (id) => {
  let index = -1;
  for (let i = 0; i < products.value.length; i++) {
      if (products.value[i].id === id) {
          index = i;
          break;
      }
  }

  return index;
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
  products.value = products.value.filter(val => !selectedProducts.value.includes(val));
  deleteProductsDialog.value = false;
  selectedProducts.value = null;
  toast.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
};

const getStatusLabel = (status) => {
  switch (status) {
      case 'renewal':
          return 'success';

      case 'negotiation':
          return 'warning';
      case 'new':
          return 'success';

      case 'unqualified':
          return 'danger';

      default:
          return 'info';
  }
};

</script>

<template>
  <div>
      <div class="card">
          <Toolbar class="mb-4">
              <template #end>
                  <Button label="New" icon="pi pi-plus" size="small"  severity="success"  class="mr-2" @click="openNew" />
                  <!-- <Button label="Delete" icon="pi pi-trash" size="small" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" /> -->
              </template>

              <!-- <template #end>
                  <Button label="Export" icon="pi pi-upload" size="small" severity="info" @click="exportCSV($event)"  />
              </template> -->
          </Toolbar>

          <DataTable ref="dt" :value="products" size="small" v-model:selection="selectedProducts" dataKey="id" 
              :paginator="true" :rows="10" :filters="filters"
              paginatorTemplate=" PrevPageLink PageLinks NextPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users">
              <template #header>
                  <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                      <h4 class="m-0">Manage Users</h4>
          <span class="p-input-icon-left">
                          <i class="pi pi-search" />
                          <InputText v-model="filters['global'].value" placeholder="Search..." />
                      </span>
        </div>
              </template>

              <Column selectionMode="multiple" style="width: 3rem" :exportable="true"></Column>
              <Column field="name" header="Name" sortable style="min-width:16rem"></Column>
              <Column field="email" header="Email" sortable style="min-width:12rem"></Column>
              <Column field="phone" header="Phone" sortable style="min-width:12rem"></Column>
            
              <Column field="role" header="Role" sortable style="min-width:10rem"></Column>
              <Column field="status" header="Status" sortable style="min-width:12rem">
                  <template #body="slotProps">
                      <Tag :value="slotProps.data.status" :severity="getStatusLabel(slotProps.data.status)" />
                  </template>
              </Column>
              <Column header="Action" :exportable="false" style="min-width:8rem">
                  <template #body="slotProps">
                      <Button icon="pi pi-pencil" rounded class="mr-2" size="small" @click="editProduct(slotProps.data)" />
                      <Button icon="pi pi-trash" rounded severity="danger" size="small" @click="confirmDeleteProduct(slotProps.data)" />
                  </template>
              </Column>
          </DataTable>
      </div>

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
            <label for="email">Email</label>
            <Field  v-model="user.email" name="email"  v-slot="{ field }" >
                <InputText id="email" v-bind="field" required="true" :class="{'p-invalid': errors && errors.email}" />
            </Field>
            <ErrorMessage name="email" class="p-error" />
        </div>  
        <div class="field">
            <label for="phone">Phone</label>
            <Field  v-model.trim="user.phone" name="phone"  v-slot="{ field }" >
                <InputText id="phone" type="number" v-bind="field" required="true" :class="{'p-invalid': errors && errors.phone}" />
            </Field>
            <ErrorMessage name="phone" class="p-error" />
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
              <span v-if="product">Are you sure you want to delete the selected products?</span>
          </div>
          <template #footer>
              <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false"/>
              <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
          </template>
      </Dialog>
</div>
</template>
 