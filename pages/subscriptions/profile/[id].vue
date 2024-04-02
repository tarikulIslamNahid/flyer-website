<script setup>
useHead({
  title: `Subscription Profile`,
});
import { ref, onMounted } from 'vue'; 
const useCommon = useCommonStore();
useCommon.setBreadcrumbs([
    { label: 'Subscriptions', route: '/subscriptions' },
    { label: 'Subscription Profile' }
]); 

import { useRoute } from 'vue-router';
const route = useRoute();
const subscriberId = route.params.id
const active = ref(0);
import {TransactionService} from "@/service/Transactions";
const transactions = ref([]);
const payments = ref([]);
const templates = ref([]);
onMounted(() => {
    TransactionService.getTransactions().then((data) => (transactions.value = data));
    TransactionService.getPayments().then((data) => (payments.value = data));
    TransactionService.getTemplates().then((data) => (templates.value = data));
});
</script>

<template>
  <div class="p-fluid">
    <Card >
        <template #header>
         
<div class="relative md:bg-bottom  border-round  bg-no-repeat w-full h-13rem flex justify-content-center align-items-end m-3" style="background-image: url('https://cdn.pixabay.com/photo/2021/06/24/11/18/background-6360865_1280.png')">
        <Avatar image="https://images.pexels.com/photos/1680175/pexels-photo-1680175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" size="xlarge" width="100px" height="100px" shape="circle" class="profileAvatar absolute" />            
    </div>
                
        </template>
        <template #title>
        <h4 class=" font-bold text-center">
            Tarikul Islam Nahid
        </h4>
        </template>
        <template #subtitle>
            <div class="text-center">
                <span>
                    <i class="pi pi-map-marker" style="font-size: 1rem"></i>
                    Dhaka, Bangladesh
                </span>
                <span class="pl-3">
                      <i class="pi pi-calendar" style="font-size: 1rem"></i>
                    Dhaka, Bangladesh
                </span>
            </div>
        </template>
        <template #content>
            <TabView v-model:activeIndex="active">
                <TabPanel header="Profile">
                    <SubscriberProfile />
                </TabPanel>
                <TabPanel header="Transactions">
                    <SubscriberTransactionsTable title="Transactions" :isPaginate="true" :data="transactions" />
                </TabPanel> 
                <TabPanel header="Payment History">
                    <SubscriberPaymentTable title="Payment Logs" :isPaginate="true" :data="payments" />
                </TabPanel> 
                <TabPanel header="Templates">
                    <SubscriberTemplateTable title="Templates" :isPaginate="true" :data="templates" />
                </TabPanel> 
                <TabPanel header=" Billing Address">
                    <SubscriberBillingInfo />
                </TabPanel> 
            </TabView>
        </template> 
    </Card>
</div>
</template>
<style>
.img-fluid img {
    width: 100% !important;
    height: 100%;
    object-fit: cover;
}

.img-fluid {
    width: 100%;
    height: 250px !important;
}
.profileAvatar{
    bottom: -10%;
}
.profileAvatar img{
    object-fit:cover;

}
</style>
 