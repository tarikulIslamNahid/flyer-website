<script setup>
useHead({
  title: `Email Setup`,
});
import { usePrimeVue } from 'primevue/config';
const $primevue = usePrimeVue();
import { ref, onMounted } from 'vue';
import { required,helpers,integer,email } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
// use getCountries from service/countryService
import { CountryService } from '@/service/countryService';

const useCommon = useCommonStore();
useCommon.setBreadcrumbs([
    { label: 'Settings' },
    { label: 'Email Setup' }
]);
const encryptions = ref([
    { label: 'None', value: 'none' },
    { label: 'SSL', value: 'ssl' },
    { label: 'TLS', value: 'tls' }
]);
const emailSetup = reactive({
    emailEncryption: null,
    smtpHost: null,
    smtpPort: null,
    fromEmail: null,
    smtpUserName: null,
    smtpPassword: null,
});
const countries = ref([]);
onMounted(async () => {
    countries.value = await CountryService.getCountries();
});
// computed rules for generals
const emailSetupRules = computed(() => {
    return {
        emailEncryption: {
            required: helpers.withMessage('The Email Encryption Field Is Require', required,),
            $autoDirty: true,
        }, 
        smtpHost: {
            required: helpers.withMessage('The SMTP Host Field Is Require', required,),
            $autoDirty: true,
        },
        smtpPort: {
            required: helpers.withMessage('The SMTP Port Field Is Require', required,),
            integer: helpers.withMessage('The SMTP Port Field Must Be A Number', integer,),
            $autoDirty: true,
        },
        fromEmail: {
            required: helpers.withMessage('The From Email Field Is Require', required,),
            email: helpers.withMessage('The From Email Field Must Be A Valid Email', email,),
            $autoDirty: true,
        },
        smtpUserName: {
            required: helpers.withMessage('The SMTP User Name Field Is Require', required,),
            $autoDirty: true,
        },
        smtpPassword: {
            required: helpers.withMessage('The SMTP Password Field Is Require', required,),
            $autoDirty: true,
        },


    };
});
const v$ = useVuelidate(emailSetupRules, emailSetup)
const saveSettings =   () => {
     v$.value.$validate();
    console.log(v$.value.$error,'errors');
    console.log(v$.value,'values');
    v$.emailSetup.$reset()
};


</script>
<template>
    <div class="p-fluid">
        <form @submit.prevent="saveSettings">
         

        <div class="grid">
            <!-- Encryption Box  -->
         <div class="field col-6">
            <label for="emailEncryption">Email Encryption</label>
            <Dropdown v-model="emailSetup.emailEncryption" :options="encryptions" optionLabel="label" optionValue="value" placeholder="Select Email Encryption" class="w-full">
             
            </Dropdown>
            <span v-if="v$.emailEncryption.$error" role="alert" class="p-error">{{ v$.emailEncryption?.$errors[0].$message}}</span>
         </div>
         <!-- Encryption box wnd  -->
         
            <!-- SMTP Host Box  -->
            <div class="field col-6">
                <label for="smtpHost">SMTP Host</label>
                <InputText  id="smtpHost" v-model="emailSetup.smtpHost" required="true" :class="{'p-invalid': v$.smtpHost?.$error}"/> 
                <span v-if="v$.smtpHost.$error" role="alert" class="p-error">{{ v$.smtpHost?.$errors[0].$message}}</span>
            
            </div>
            <!-- SMTP Host box wnd  -->

            <!-- SMTP Port Box  -->
            <div class="field col-6">
                <label for="smtpPort">SMTP Port</label>
                <InputText  id="smtpPort" v-model="emailSetup.smtpPort" required="true" :class="{'p-invalid': v$.smtpPort?.$error}"/> 
                <span v-if="v$.smtpPort.$error" role="alert" class="p-error">{{ v$.smtpPort?.$errors[0].$message}}</span>
            </div>
            <!-- SMTP Port box wnd  -->

            <!-- From Email Box  -->
            <div class="field col-6">
                <label for="fromEmail">From Email</label>
                <InputText  id="fromEmail" v-model="emailSetup.fromEmail" required="true" :class="{'p-invalid': v$.fromEmail?.$error}"/> 
                <span v-if="v$.fromEmail.$error" role="alert" class="p-error">{{ v$.fromEmail?.$errors[0].$message}}</span>
            </div>
            <!-- From Email box wnd  -->

            <!-- SMTP User Name Box  -->
            <div class="field col-6">
                <label for="smtpUserName">SMTP User Name</label>
                <InputText  id="smtpUserName" v-model="emailSetup.smtpUserName" required="true" :class="{'p-invalid': v$.smtpUserName?.$error}"/> 
                <span v-if="v$.smtpUserName.$error" role="alert" class="p-error">{{ v$.smtpUserName?.$errors[0].$message}}</span>
            </div>
            <!-- SMTP User Name box wnd  -->

            <!-- SMTP Password Box  -->
            <div class="field col-6">
                <label for="smtpPassword">SMTP Password</label>
                <InputText  id="smtpPassword" v-model="emailSetup.smtpPassword" type="password" required="true" :class="{'p-invalid': v$.smtpPassword?.$error}"/> 
                <span v-if="v$.smtpPassword.$error" role="alert" class="p-error">{{ v$.smtpPassword?.$errors[0].$message}}</span>
            </div>
            <!-- SMTP Password box wnd  -->

        </div>
        
               <div class="flex gap-2 justify-content-end mt-5"> 
                   <Button type="submit" class="px-6" label="Update" :disabled="v$.$errors.length!=0" />
               </div> 
           </form>
    </div>
</template>
<style>
</style>