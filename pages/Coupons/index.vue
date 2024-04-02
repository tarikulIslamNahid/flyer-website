<script setup>
useHead({
  title: `Coupon Management`,
});
const useCommon = useCommonStore();
useCommon.setBreadcrumbs([
    { label: 'Coupon Management' }
]); 
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const dt = ref();
const coupons = ref([
    {
      id:1,
      name:'Summer 10',
      type:'fixed',
      code: 'SUMMER10',
      validFor: 'Oct-22-2024',
      rate: 10,
      package:[
        {name: 'Basic', id: 1},
        {name: 'Standard', id: 2},
        {name: 'Premium', id: 3},
      ],
      totalUsed:20,
      status: 'Active',
    },
    {
      id:2,

      name:'Winter 20',
      type:'percentage',
      code: 'WINTER20',
      validFor: 'Oct-22-2024',
      rate: 20,
      package:[
        {name: 'Basic', id: 1},
        {name: 'Standard', id: 2},
        {name: 'Premium', id: 3},
      ],
      totalUsed:20,
      status: 'Active',
    },
    {
      id:3,

      name:'Spring 30',
      type:'fixed',
      code: 'SPRING30',
      validFor: 'Oct-22-2024',
      rate: 30,
      package:[
        {name: 'Basic', id: 1},
        {name: 'Standard', id: 2},
        {name: 'Premium', id: 3},
      ],
      totalUsed:20,
      status: 'Active',
    },
    {
      id:4,

      name:'Autumn 40',
      type:'percentage',
      code: 'AUTUMN40',
      validFor: 'Oct-22-2024',
      rate: 40,
      package:[
        {name: 'Basic', id: 1},
        {name: 'Standard', id: 2},
        {name: 'Premium', id: 3},
      ],
      totalUsed:20,
      status: 'Active',
    },
    {
      id:5,

      name:'Summer 50',
      type:'fixed',
      code: 'SUMMER50',
      validFor: 'Oct-22-2024',
      rate: 50,
      package:[
        {name: 'Basic', id: 1},
        {name: 'Standard', id: 2},
        {name: 'Premium', id: 3},
      ],
      totalUsed:20,
      status: 'Active',
    },
    {
      id:6,

      name:'Winter 60',
      type:'percentage',
      code: 'WINTER60',
      validFor: 'Oct-22-2024',
      rate: 60,
      package:[
        {name: 'Basic', id: 1},
        {name: 'Standard', id: 2},
        {name: 'Premium', id: 3},
      ],
      totalUsed:20,
      status: 'Active',
    },
    {
      id:7,

      name:'Spring 70',
      type:'fixed',
      code: 'SPRING70',
      validFor: 'Oct-22-2024',
      rate: 70,
      package:[
        {name: 'Basic', id: 1},
        {name: 'Standard', id: 2},
        {name: 'Premium', id: 3},
      ],
      totalUsed:20,
      status: 'Active',
    },

]);
const coupon = ref([]);
const couponDialog = ref(false);
const deleteCouponDialog = ref(false);
const plans = ref([
    {name: 'Basic', id: 1},
    {name: 'Standard', id: 2},
    {name: 'Premium', id: 3},
]);
import { required, helpers, integer, requiredIf } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
const couponSetup = reactive({
  name: null,
  type: null,
  rate: null,
  code: null,
  startDate: null,
  endDate: null,
  planId: [],
  status: null,
});
const couponTypes = ref([
  {label: 'Fixed', value: 1},
  {label: 'Percentage', value: 2},
]);

// nuxt watch startDate and endDate for parseDate
// watch(() => couponSetup.startDate, (value) => {
//   if (value) {
//     couponSetup.startDate = new Date(value).toISOString().split('T')[0];
//   }
// });
// watch(() => couponSetup.endDate, (value) => {
//   if (value) {
//     couponSetup.endDate = new Date(value).toISOString().split('T')[0];
//   }
// });


// computed rules for generals
const couponSetupRules = computed(() => {
  return {
    name: {
      required: helpers.withMessage(
        "The Coupon Name Field Is Require",
        required
      ),
      $autoDirty: true,
    },
    type: {
      required: helpers.withMessage(
        "The Type Field Is Require",
        required
      ),
      $autoDirty: true,
    },
    rate: {
      required: helpers.withMessage(
        "The Rate Field Is Require",
        required
      ),
      integer: helpers.withMessage(
        "The Rate Field Must Be Integer",
        integer
      ),
      $autoDirty: true,
    },
    code: {
      required: helpers.withMessage(
        "The Code Field Is Require",
        required
      ),
      $autoDirty: true,
    },
    startDate: {
      required: helpers.withMessage(
        "The Start Date Field Is Require",
        required
      ),
      $autoDirty: true,
    },
    endDate: {
      required: helpers.withMessage(
        "The End Date Field Is Require",
        required
      ),
      $autoDirty: true,
    },
    planId: {
      required: helpers.withMessage(
        "The Plan Id Field Is Require",
        required
      ),
      $autoDirty: true,
    },
    status: {
      required: helpers.withMessage(
        "The Status Field Is Require",
        required
      ),
      $autoDirty: true,
    },
  
  };
});
const v$ = useVuelidate(couponSetupRules, couponSetup);

const filters = ref({
  'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});
const submitted = ref(false);
 
const openNew = () => {
  coupon.value = {};
  submitted.value = false;
  couponDialog.value = true;
};
const hideDialog = () => {
  couponDialog.value = false;
  submitted.value = false;
};
const saveProduct = () => {
    v$.value.$validate();
  submitted.value = true;
 
};
const editProduct = (prod) => {
  coupon.value = {...prod};
  couponDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
  coupon.value = prod;
  deleteCouponDialog.value = true;
};
const deleteProduct = () => {
  coupons.value = coupons.value.filter(val => val.id !== product.value.id);
  deleteCouponDialog.value = false;
  coupon.value = {};
  toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
};
const findIndexById = (id) => {
  let index = -1;
  for (let i = 0; i < coupons.value.length; i++) {
      if (coupons.value[i].id === id) {
          index = i;
          break;
      }
  }

  return index;
};
// generate 6 digit random number with string
const generateRandomCode = () => {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
};


const exportCSV = () => {
  dt.value.exportCSV();
};
const confirmDeleteSelected = () => {
  deleteCouponDialog.value = true;
};
const deleteSelectedProducts = () => {
  coupons.value = coupons.value.filter(val => !selectedProducts.value.includes(val));
  deleteCouponDialog.value = false;
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
const status = ref([
  {label: 'Active', value: 1},
  {label: 'Inactive', value: 0},
]);
</script>

<template>
  <div>
      <div class="card">
          <Toolbar class="mb-4">
              <template #end>
                  <Button label="New" icon="pi pi-plus" size="small"  severity="success"  class="mr-2" @click="openNew" /> 
              </template>
 
          </Toolbar>

          <DataTable ref="dt" :value="coupons" size="small" dataKey="id" 
              :paginator="true" :rows="10" :filters="filters"
              paginatorTemplate=" PrevPageLink PageLinks NextPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users">
              <template #header>
                  <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                      <h4 class="m-0">Manage Coupons</h4>
          <span class="p-input-icon-left">
                          <i class="pi pi-search" />
                          <InputText v-model="filters['global'].value" placeholder="Search..." />
                      </span>
        </div>
              </template>

              <Column field="name" header="Coupon Name" sortable style="min-width:10rem"></Column>
              <Column field="type" header="Type" sortable style="min-width:8rem"></Column>
              <Column field="rate" header="Rate" sortable style="min-width:8rem"></Column>
              <Column field="code" header="Code" sortable style="min-width:9rem"></Column>
              <Column field="validFor" header="Valid For" sortable style="min-width:9rem"></Column>
              <Column field="package" header="Applicable Package" sortable style="min-width:14rem">
                <template #body="slotProps">
                      <Tag class="m-1" v-for="(pak,index) in slotProps.data.package" :key="index" :value="pak.name" severity="info" />
                  </template>
                </Column>
              <Column field="totalUsed" header="Total Used" sortable style="min-width:8rem"></Column>
              <Column field="status" header="Status" sortable style="min-width:8rem">
                  <template #body="slotProps">
                      <Tag  :value="slotProps.data.status" :severity="getStatusLabel(slotProps.data.status)" />
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

      <!-- coupon create Modal  -->
      <Dialog v-model:visible="couponDialog" dismissableMask maximizable class="p-fluid" :pt="{
        mask: {
            style: 'backdrop-filter: blur(2px)'
        } 
    }" :style="{width: '650px'}" header="Coupon Create" :modal="true" >
        <form @submit.prevent="saveProduct" class="p-fluid grid" >
        <div class="field col-6">
            <label for="name">Coupon Name</label>
                <InputText  id="name" v-model="couponSetup.name" required="true" :class="{'p-invalid': v$.name?.$error}" />
            <span v-if="v$.name.$error" role="alert" class="p-error">{{ v$.name?.$errors[0].$message}}</span>
        </div> 
        <div class="field col-6">
            <label for="type">Coupon Type</label>
            <Dropdown v-model="couponSetup.type" :options="couponTypes" optionLabel="label" optionValue="value" required="true" :class="{'p-invalid': v$.type?.$error}" placeholder="Select a Coupon Type" />
            <span v-if="v$.type.$error" role="alert" class="p-error">{{ v$.type?.$errors[0].$message}}</span>
        </div>
        <div class="field col-6">
            <label for="rate">Rate</label>
            <InputText  id="rate" v-model="couponSetup.rate" required="true" :class="{'p-invalid': v$.rate?.$error}" />
            <span v-if="v$.rate.$error" role="alert" class="p-error">{{ v$.rate?.$errors[0].$message}}</span>
        </div>
        <div class="field col-6">
            <label for="code">Coupon Code</label>
            <InputText  id="code" v-model="couponSetup.code" required="true" :class="{'p-invalid': v$.code?.$error}" />
            <span v-if="v$.code.$error" role="alert" class="p-error">{{ v$.code?.$errors[0].$message}}</span>
        </div>
        <div class="field col-6">
            <label for="startDate">Start Date</label>
            <Calendar v-model="couponSetup.startDate" dateFormat="mm/dd/yy" :selectOtherMonths="true" required="true" :class="{'p-invalid': v$.startDate?.$error}" />
            <span v-if="v$.startDate.$error" role="alert" class="p-error">{{ v$.startDate?.$errors[0].$message}}</span>
        </div>
        <div class="field col-6">
            <label for="endDate">End Date</label>
            <Calendar v-model="couponSetup.endDate" dateFormat="mm/dd/yy" :selectOtherMonths="true" :minDate="couponSetup.startDate" required="true" :class="{'p-invalid': v$.endDate?.$error}" />
            <span v-if="v$.endDate.$error" role="alert" class="p-error">{{ v$.endDate?.$errors[0].$message}}</span>
        </div>
        <div class="field col-6">
            <label for="planId">Applicable Package</label>
            <MultiSelect v-model="couponSetup.planId" optionLabel="name" optionValue="id" :options="plans" required="true" :class="{'p-invalid': v$.planId?.$error}" placeholder="Select a Applicable Plan" />
            <span v-if="v$.planId.$error" role="alert" class="p-error">{{ v$.planId?.$errors[0].$message}}</span>
        </div>
        <div class="field col-6">
            <label for="status">Status</label>
            <Dropdown v-model="couponSetup.status" :options="status" optionLabel="label" optionValue="value" required="true" :class="{'p-invalid': v$.status?.$error}" />
            <span v-if="v$.status.$error" role="alert" class="p-error">{{ v$.status?.$errors[0].$message}}</span>
        </div> 
   
     
          <div class="p-dialog-footer w-full flex gap-2 justify-content-end mt-5">
                <Button label="Cancel" severity="danger"  @click="hideDialog"/>
                <Button type="submit" class="px-6" label="Save" :disabled="v$.$errors.length!=0" />

        </div> 
    </form>
    
      </Dialog>

      <Dialog v-model:visible="deleteCouponDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
          <div class="confirmation-content">
              <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
              <span v-if="coupon">Are you sure you want to delete <b>{{coupon.name}}</b>?</span>
          </div>
          <template #footer>
              <Button label="No" icon="pi pi-times" text @click="deleteCouponDialog = false"/>
              <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
          </template>
      </Dialog>
 
</div>
</template>
 