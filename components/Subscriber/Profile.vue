<script setup>
import { ref } from "vue";
import {TransactionService} from "@/service/Transactions";
const transactions = ref([]);
const payments = ref([]);
onMounted(() => {
    TransactionService.getTransactionMini().then((data) => (transactions.value = data));
    TransactionService.getPaymentMini().then((data) => (payments.value = data));
});
 const items = ref([
    {
        separator: true
    },
    {
        label: 'ABOUT',
        items: [
            {
                label: 'Tarikul Islam Nahid',
                icon: 'pi pi-user',
            },
            {
                label: '@tarikulIslam',
                icon: 'pi pi-briefcase',
            },
            {
                label: 'Dhaka, bangladesh',
                icon: 'pi pi-map-marker',
            },
            {
                label: 'Downloads - 3,330',
                icon: 'pi pi-download',
            }, 
        ]
    },
    {
        label: 'CONTACTS',
        items: [
            {
                label: 'tarikulnahid@gmail.com',
                icon: 'pi pi-at',
            },
            {
                label: '0177455811',
                icon: 'pi pi-mobile',
            }, 
        ]
    }, 
]);
 

const products = ref()
</script>
<template>
    <div class="grid mt-4">
        <Menu :model="items" class="col-3">
            <template #start>
                <h5 class=" mb-0 px-2 py-2">
                    Profile
                </h5>
            </template>
            <template #submenuheader="{ item }">
                <span class="text-primary font-bold">{{ item.label }}</span>
            </template>
            <template #item="{ item, props }">
                <a v-ripple class="flex align-items-center" v-bind="props.action">
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
             
                </a>
            </template> 
        </Menu>
        <div class="col-8 col-offset-1">
            <SubscriberTransactionsTable title="Transactions" :isPaginate="false" :data="transactions" />
            <SubscriberPaymentTable title="Payment Logs" :isPaginate="false" :data="payments" />
        </div>
    </div>
</template>
 