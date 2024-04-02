<script setup>
useHead({
  title: `Invoice Setup`,
});
import { required,helpers,integer } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
// use getCountries from service/countryService

const useCommon = useCommonStore();
useCommon.setBreadcrumbs([
    { label: 'Settings' },
    { label: 'Invoice Setup' }
]);

 
const invoiceSetup = reactive({
    invoiceNumberPrefix: 'INV-',
    invoiceStartNumber: 0,
    invoiceReminderBeforeExpire: 0,
    upcomingInvoiceGenerate: 0,
    cancelAfterReminder: 0,
});

// rules for greter then 
const greaterThen = (value) => parseInt(value) > parseInt(invoiceSetup.invoiceReminderBeforeExpire);
 
// computed rules for generals
const invoiceSetupRules = computed(() => {
    return {
        invoiceNumberPrefix: {
            required: helpers.withMessage('The Invoice Prefix Field Is Require', required,),
            $autoDirty: true,
        },
        invoiceStartNumber: {
            required: helpers.withMessage('The Invoice Start Number Field Is Require', required,),
            integer: helpers.withMessage('The Invoice Start Number Field Must Be A Number', integer,),
            $autoDirty: true,
        },
        invoiceReminderBeforeExpire: {
            required: helpers.withMessage('The Invoice Reminder Before Expire Field Is Require', required,),
            integer: helpers.withMessage('The Invoice Reminder Before Expire Field Must Be A Number', integer,),
            $autoDirty: true,
        },
        upcomingInvoiceGenerate: {
            required: helpers.withMessage('The Upcoming Invoice Generate Field Is Require', required,),
            integer: helpers.withMessage('The Upcoming Invoice Generate Field Must Be A Number', integer,),
            greaterThen: helpers.withMessage('The Upcoming Invoice Generate Field Must Be Greater Then Invoice Reminder Before Expire', greaterThen,),
            $autoDirty: true,
        },
        cancelAfterReminder: {
            required: helpers.withMessage('The Cancel After Reminder Field Is Require', required,),
            integer: helpers.withMessage('The Cancel After Reminder Field Must Be A Number', integer,),
            $autoDirty: true,
        },
    };
});
const v$ = useVuelidate(invoiceSetupRules, invoiceSetup)
const saveSettings =   () => {
     v$.value.$validate();
    console.log(v$.value.$error,'errors');
    console.log(v$.value,'values');
    v$.invoiceSetup.$reset()
};


</script>
<template>
    <div class="p-fluid">
        <form @submit.prevent="saveSettings">
         

        <div class="grid">
         
            <!-- Invoice Prefix Box  -->
            <div class="field col-12">
                <label for="invoiceNumberPrefix">Invoice Number Prefix</label>
                <InputText  id="invoiceNumberPrefix" v-model="invoiceSetup.invoiceNumberPrefix" required="true" :class="{'p-invalid': v$.invoiceNumberPrefix?.$error}"/> 
                <span v-if="v$.invoiceNumberPrefix.$error" role="alert" class="p-error">{{ v$.invoiceNumberPrefix?.$errors[0].$message}}</span>
            </div>
            <!-- Invoice Prefix box wnd  -->
 
            <!-- Invoice Start Number Box  -->
            <div class="field col-6">
                <label for="invoiceStartNumber">Invoice Start Number</label>
                <InputText  id="invoiceStartNumber" type="number" v-model="invoiceSetup.invoiceStartNumber" required="true" :class="{'p-invalid': v$.invoiceStartNumber?.$error}"/> 
                <span v-if="v$.invoiceStartNumber.$error"  role="alert" class="p-error">{{ v$.invoiceStartNumber?.$errors[0].$message}}</span>
            </div>
            <!-- Invoice Start Number box wnd  -->

            <!-- Invoice Reminder Before Expire Box  -->
            <div class="field col-6">
                <label for="invoiceReminderBeforeExpire">Invoice Reminder Before Expire</label>
                <div class="p-inputgroup">

                    <InputText  id="invoiceReminderBeforeExpire" type="number" v-model="invoiceSetup.invoiceReminderBeforeExpire" required="true" :class="{'p-invalid': v$.invoiceReminderBeforeExpire?.$error}"/> 
                    <span class="p-inputgroup-addon">days</span>
                </div>

                <span v-if="v$.invoiceReminderBeforeExpire.$error" role="alert" class="p-error">{{ v$.invoiceReminderBeforeExpire?.$errors[0].$message}}</span>
            </div>
            <!-- Invoice Reminder Before Expire box wnd  -->

            <!-- Upcoming Invoice Generate Box  -->
            <div class="field col-6">
                <label for="upcomingInvoiceGenerate">Upcoming Invoice Generate Before Expire</label>
                <div class="p-inputgroup">
                    <InputText  id="upcomingInvoiceGenerate" type="number" v-model="invoiceSetup.upcomingInvoiceGenerate" required="true" :class="{'p-invalid': v$.upcomingInvoiceGenerate?.$error}"/> 
                    <span class="p-inputgroup-addon">days</span>
                </div>

                <span v-if="v$.upcomingInvoiceGenerate.$error" role="alert" class="p-error">{{ v$.upcomingInvoiceGenerate?.$errors[0].$message}}</span>
            </div>
            <!-- Upcoming Invoice Generate box wnd  -->
            <!-- cancel after reminder box  -->
            <div class="field col-6">
                <label for="cancelAfterReminder">Cancel After Reminder</label>
                <div class="p-inputgroup">
                    <InputText  id="cancelAfterReminder" type="number" v-model="invoiceSetup.cancelAfterReminder" required="true" :class="{'p-invalid': v$.cancelAfterReminder?.$error}"/> 
                    <span class="p-inputgroup-addon">days</span>
                </div>

                <span v-if="v$.cancelAfterReminder.$error" role="alert" class="p-error">{{ v$.cancelAfterReminder?.$errors[0].$message}}</span>
            </div>
            <!-- cancel after reminder box wnd  -->
 
        </div>
        
               <div class="flex gap-2 justify-content-end mt-5"> 
                   <Button type="submit" class="px-6" label="Update" :disabled="v$.$errors.length!=0" />
               </div> 
           </form>
    </div>
</template>
<style>
</style>