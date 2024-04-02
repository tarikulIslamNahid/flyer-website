<script setup>
useHead({
  title: `Package Management`,
});
const useCommon = useCommonStore();
useCommon.setBreadcrumbs([
    { label: 'Packages Management' }
]); 
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import { CustomerService } from '@/service/CustomerService';
onMounted(() => {
  CustomerService.getCustomersXLarge().then((data) => (products.value = data));
}); 
const toast = useToast();
const dt = ref();
const products = ref();
const product = ref([]);
const productDialog = ref(false);
const deleteProductDialog = ref(false);

import { required, helpers, integer, requiredIf } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
const packageSetup = reactive({
  name: null,
  price: null,
  interval: null,
  short_description: null,
  features: [],
});
   

// computed rules for generals
const packageSetupRules = computed(() => {
  return {
    name: {
      required: helpers.withMessage(
        "The Plan Name Field Is Require",
        required
      ),
      $autoDirty: true,
    },
    price: {
      required: helpers.withMessage(
        "The Price Field Is Require",
        required
      ),
      integer: helpers.withMessage(
        "The Price Field Must Be Integer",
        integer
      ),
      $autoDirty: true,
    },
    interval: {
      required: helpers.withMessage(
        "The Interval Field Is Require",
        required
      ),
      $autoDirty: true,
    },
    short_description: {
      required: helpers.withMessage(
        "The Short Description Field Is Require",
        required
      ),
      $autoDirty: true,
    },
    // features array of object validation
    features: {
    //   required: helpers.withMessage(
    //     "The Features Field Is Require",
    //     required
    //   ),
      $each:helpers.forEach({
        value: {required},
      }),
      $autoDirty: true,
    },
  
  };
});
const v$ = useVuelidate(packageSetupRules, packageSetup);

const features = ref([
    {label: 'Projects',type:'number', id: 5}, // how many projects allowed
    {label: 'Premium Templates',type:'boolean', id: 1}, // premium templates
    {label: 'Chat Support',type:'boolean', id: 2}, // chat support
    {label: 'Storage Space',type:'number', id: 3}, // how much storage allowed
    {label: 'Downloads',type:'number', id: 4}, // how much download allowed
]);

// mounted call
onMounted(() => {
  // checkFeatures function call
    checkFeatures(features.value);
});
const options = ref([
    {label: 'Yes', value: 1},
    {label: 'No', value: 0},
]);

const checkFeatures = (features) => {
    if(features){
        // if features is not empty then make a array list and set on the user.features
        let arr = [];
        features.forEach((feature) => {
            arr.push({value: null, id: feature.id});
        });
        // set the features array list
        packageSetup.features = arr;
    }
    return [];
    };
const intervals = ref([
    {label: 'Unlimited', value: 0},
    {label: 'Monthly', value: 1},
    {label: 'Yearly', value: 2},
]);
const selectedProducts = ref();
const filters = ref({
  'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});
const submitted = ref(false);
 

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
    v$.value.$validate();
  submitted.value = true;

//   if (product.value.name.trim()) {
//       if (product.value.id) {
//           product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
//           products.value[findIndexById(product.value.id)] = product.value;
//           toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
//       }
//       else {
//           product.value.id = createId();
//           product.value.code = createId();
//           product.value.image = 'product-placeholder.svg';
//           product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
//           products.value.push(product.value);
//           toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
//       }

//       productDialog.value = false;
//       product.value = {};
//   }
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
const valu= ref(0);
</script>

<template>
  <div>
      <div class="card">
          <Toolbar class="mb-4">
              <template #end>
                  <Button label="New" icon="pi pi-plus" size="small"  severity="success"  class="mr-2" @click="openNew" /> 
              </template>
 
          </Toolbar>

          <DataTable ref="dt" :value="products" size="small" v-model:selection="selectedProducts" dataKey="id" 
              :paginator="true" :rows="10" :filters="filters"
              paginatorTemplate=" PrevPageLink PageLinks NextPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users">
              <template #header>
                  <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                      <h4 class="m-0">Manage Packages</h4>
          <span class="p-input-icon-left">
                          <i class="pi pi-search" />
                          <InputText v-model="filters['global'].value" placeholder="Search..." />
                      </span>
        </div>
              </template>

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
      <Dialog v-model:visible="productDialog" dismissableMask maximizable class="p-fluid" :pt="{
        mask: {
            style: 'backdrop-filter: blur(2px)'
        } 
    }" :style="{width: '650px'}" header="Package Create" :modal="true" >
        <form @submit.prevent="saveProduct" class="p-fluid grid" >
        <div class="field col-6">
            <label for="name">Plan Title</label>
                <InputText  id="name" v-model="packageSetup.name" required="true" :class="{'p-invalid': v$.name?.$error}" />
            <span v-if="v$.name.$error" role="alert" class="p-error">{{ v$.name?.$errors[0].$message}}</span>

        </div> 
        <div class="field col-6">
            <label for="price">Plan Price</label>
                <InputText id="price" type="number" v-model="packageSetup.price" required="true" :class="{'p-invalid': v$.price?.$error}" />
            <span v-if="v$.price.$error" role="alert" class="p-error">{{ v$.price?.$errors[0].$message}}</span>

        </div> 
        <div class="field col-6">
            <label for="interval">Duration</label>
                <Dropdown :modelValue="packageSetup.interval" :options="intervals"  required="true" :class="{'p-invalid':v$.interval?.$error}" optionValue="value" optionLabel="label" placeholder="Select a Duration" />
            <span v-if="v$.interval.$error" role="alert" class="p-error">{{ v$.interval?.$errors[0].$message}}</span>

        </div> 
        
        <template v-for="(feature,index) in features" :key="index">
            <div class="field col-6">
                <label :for="feature.label">{{feature.label}}</label>
                    <InputText v-if="feature.type=='number'" :id="feature.label" v-model="packageSetup.features[index]['value']" required="true" type="number" :class="{'p-invalid': v$.features?.$errors[0]?.$message[index]?.length}" />

                    <Dropdown v-if="feature.type=='boolean'" v-model="packageSetup.features[index]['value']" :options="options"  required="true" :class="{'p-invalid':v$.features?.$errors[0]?.$message[index]?.length}" optionValue="value" optionLabel="label" :placeholder="feature.label" />


                    <span v-if="v$.features?.$errors[0]?.$message[index]?.length" role="alert" class="p-error">{{feature.label}} {{ v$.features?.$errors[0].$message[index][0]}}</span>
                </div>
        </template>
     
        <div class="field col-12">
            <label for="short_description">Short Description</label>
                    <Textarea v-model="packageSetup.short_description" autoResize rows="5" cols="30" :class="{'p-invalid':v$.short_description?.$error}" />
                    <span v-if="v$.short_description.$error" role="alert" class="p-error">{{ v$.short_description?.$errors[0].$message}}</span>
        
                </div>  
 
          <div class="p-dialog-footer w-full flex gap-2 justify-content-end mt-5">
                <Button label="Cancel" severity="danger"  @click="hideDialog"/>
                <!-- <Button label="Save" :disabled="isSubmitting" icon="pi pi-check" text type="submit" /> -->
                <Button type="submit" class="px-6" label="Save" :disabled="v$.$errors.length!=0" />

        </div> 
    </form>
    
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
 