<script setup>
useHead({
  title: `Subscription Management`,
});
const useCommon = useCommonStore();
useCommon.setBreadcrumbs([
    { label: 'Subscription Management' }
]); 
import { useRouter } from 'vue-router';
const router = useRouter();
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const dt = ref();
const resendMailDialog = ref(false)
const subscriptions = ref([
  {
    id: 1,
    planName: 'Basic',
    duration: 'Monthly',
    price: 10,
    paidBy: 'Stripe',
    subscriber:{
      name: 'John Doe',
      username: 'johndoe',
    },
    status:1,
    expireOn: '2022-12-12',
  },
  {
    id: 2,
    planName: 'Standard',
    duration: 'Monthly',
    price: 20,
    paidBy: 'Paypal',
    subscriber:{
      name: 'Paul Walker',
      username: 'paulwalker',
    },
    status:0,
    expireOn: '2023-04-12',
  },
  {
    id: 3,
    planName: 'Premium',
    duration: 'Yearly',
    price: 100,
    paidBy: 'Stripe',
    subscriber:{
      name: 'John Doe',
      username: 'johndoe',
    },
    status:1,
    expireOn: '2022-12-12',
  },
  {
    id: 4,
    planName: 'Basic',
    duration: 'Monthly',
    price: 10,
    paidBy: 'Stripe',
    subscriber:{
      name: 'John Doe',
      username: 'johndoe',
    },
    status:1,
    expireOn: '2022-12-12',
  },
  {
    id: 5,
    planName: 'Standard',
    duration: 'Monthly',
    price: 20,
    paidBy: 'Paypal',
    subscriber:{
      name: 'Paul Walker',
      username: 'paulwalker',
    },
    status:0,
    expireOn: '2023-04-12',
  },
  {
    id: 6,
    planName: 'Premium',
    duration: 'Yearly',
    price: 100,
    paidBy: 'Stripe',
    subscriber:{
      name: 'John Doe',
      username: 'johndoe',
    },
    status:1,
    expireOn: '2022-12-12',
  }
 ]);
 const sendMail = () =>{
  resendMailDialog.value=true
 }
const coupon = ref([]);
const couponDialog = ref(false);
 
const filters = ref({
  'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});

const exportCSV = () => {
  dt.value.exportCSV();
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
          <DataTable ref="dt" :value="subscriptions" size="small" dataKey="id" 
              :paginator="true" :rows="10" :filters="filters"
              paginatorTemplate=" PrevPageLink PageLinks NextPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users">
              <template #header>
                  <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                      <h5 class="m-0">Subscription List</h5>
          <span class="p-input-icon-left">
                          <i class="pi pi-search" />
                          <InputText v-model="filters['global'].value" placeholder="Search..." />
                      </span>
        </div>
              </template>

              <Column field="planName" header="Plan Name" sortable style="min-width:10rem"></Column>
              <Column field="duration" header="Duration" sortable style="min-width:8rem"></Column>
              <Column field="price" header="Price" sortable style="min-width:8rem"></Column>
              <Column field="paidBy" header="Paid By" sortable style="min-width:9rem"></Column>
              <Column field="subscriber" header="Subscriber" sortable style="min-width:9rem">
                <template #body="slotProps">
                  
                  <nuxt-link v-tooltip.bottom="'view profile'" class=" text-black-alpha-80 " :to="'/subscriptions/profile/'+slotProps.data.id">
                    Name: {{slotProps.data.subscriber.name}} <br>
                    Username: {{slotProps.data.subscriber.username}}
                  </nuxt-link>
              </template>
              </Column>
              <Column field="expireOn" header="Expired On" sortable style="min-width:8rem"></Column>
              <Column field="status" header="Status" sortable style="min-width:8rem">
                  <template #body="slotProps">
                      <Tag v-if="slotProps.data.status==1" value="Active" severity="success" />
                      <Tag v-else value="Inactive" severity="danger" />
                  </template>
              </Column>
              <Column header="Action" :exportable="false" style="min-width:8rem">
                  <template #body="slotProps">
                    <!-- view button  -->
                      <Button icon="pi pi-eye"   v-tooltip.bottom="'View Profile'" rounded class="mr-2" severity="info" size="small" @click="router.push('/subscriptions/profile/'+slotProps.data.id)" /> 
                      <Button icon="pi pi-send" v-tooltip.bottom="'Send Reminder'" rounded severity="secondary" size="small" @click="sendMail(slotProps.data)" />
                  </template>
              </Column>
          </DataTable>
      </div>
 
      <Dialog dismissableMask :pt="{
        mask: {
            style: 'backdrop-filter: blur(4px)'
        } 
    }" v-model:visible="resendMailDialog" :style="{width: '450px'}" header="Resend Payment Alert" :modal="true">
          <div class="confirmation-content text-center">
              <i class="pi pi-stopwatch mr-3" style="font-size: 1rem" />
              <span >Do you want to resend payment reminder? </span>
          </div>
          
          <template #footer>
            <div class="flex justify-content-center gap-2">
              <Button label="No" icon="pi pi-times" outlined severity="danger" size="small" @click="resendMailDialog = false"/>
              <Button label="Yes" icon="pi pi-check" @click="deleteProduct" size="small" />
          </div>
               
          </template>
      </Dialog>
 
</div>
</template>
 