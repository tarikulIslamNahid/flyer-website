<script setup>
useHead({
  title: `SMS Setup`,
});
import { usePrimeVue } from 'primevue/config';
const $primevue = usePrimeVue();
import { ref, onMounted } from 'vue';
import { required,helpers,integer,email } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

const useCommon = useCommonStore();
useCommon.setBreadcrumbs([
    { label: 'Settings' },
    { label: 'SMS Setup' }
]); 
const smsSetup = reactive({
    accountSid: null,
    authToken: null,
    twilioNumber: null,
    senderId: null,
});
 
// computed rules for generals
const smsSetupRules = computed(() => {
    return {
        accountSid: {
            required: helpers.withMessage('Account Sid is required', required,),
            $autoDirty: true,
        },
        authToken: {
            required: helpers.withMessage('Auth Token is required', required,),
            $autoDirty: true,
        },
        twilioNumber: {
            required: helpers.withMessage('Twilio Number is required', required,),
            $autoDirty: true,
        },
        senderId: {
            required: helpers.withMessage('Sender Id is required', required,),
            $autoDirty: true,
        },

    };
});
const v$ = useVuelidate(smsSetupRules, smsSetup)
const saveSettings =   () => {
     v$.value.$validate();
    console.log(v$.value.$error,'errors');
    console.log(v$.value,'values');
    v$.smsSetup.$reset()
};


</script>
<template>
    <div class="p-fluid">
        <form @submit.prevent="saveSettings">
        <div class="grid">
     
            <!-- Account SID Box  -->
            <div class="field col-6">
                <label for="accountSid">Account SID</label>
                <InputText  id="accountSid" v-model="smsSetup.accountSid" required="true" :class="{'p-invalid': v$.accountSid?.$error}"/> 
                <span v-if="v$.accountSid.$error" role="alert" class="p-error">{{ v$.accountSid?.$errors[0].$message}}</span>
            </div>
            <!-- Account SID box wnd  -->

            <!-- Auth Token Box  -->
            <div class="field col-6">
                <label for="authToken">Auth Token</label>
                <InputText  id="authToken" v-model="smsSetup.authToken" required="true" :class="{'p-invalid': v$.authToken?.$error}"/> 
                <span v-if="v$.authToken.$error" role="alert" class="p-error">{{ v$.authToken?.$errors[0].$message}}</span>
            </div>
            <!-- Auth Token box wnd  -->

            <!-- Twilio Number Box  -->
            <div class="field col-6">
                <label for="twilioNumber">Twilio Number</label>
                <InputText  id="twilioNumber" v-model="smsSetup.twilioNumber" required="true" :class="{'p-invalid': v$.twilioNumber?.$error}"/> 
                <span v-if="v$.twilioNumber.$error" role="alert" class="p-error">{{ v$.twilioNumber?.$errors[0].$message}}</span>
            </div>
            <!-- Twilio Number box wnd  -->

            <!-- Sender Id Box  -->
            <div class="field col-6">
                <label for="senderId">Alphanumeric Sender Id</label>
                <InputText aria-describedby="username-help" id="senderId" v-model="smsSetup.senderId" required="true" :class="{'p-invalid': v$.senderId?.$error}"/> 
                <span v-if="v$.senderId.$error" role="alert" class="p-error">{{ v$.senderId?.$errors[0].$message}}</span>
                <small id="username-help">
                    <a class=" text-primary " href="https://www.twilio.com/blog/personalize-sms-alphanumeric-sender-id" target="_blank">
                        https://www.twilio.com/blog/personalize-sms-alphanumeric-sender-id
                    </a>
                </small>
            </div>
            <!-- Sender Id box wnd  -->

 
        </div>
        
               <div class="flex gap-2 justify-content-end mt-5"> 
                   <Button type="submit" class="px-6" label="Update" :disabled="v$.$errors.length!=0" />
               </div> 
           </form>
    </div>
</template>
<style>
</style>