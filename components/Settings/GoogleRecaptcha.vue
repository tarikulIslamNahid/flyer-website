<script setup>
useHead({
  title: `Google Recaptcha`,
});

import { usePrimeVue } from 'primevue/config';
const $primevue = usePrimeVue();
import { ref, onMounted } from 'vue';
import { required,helpers,integer,email } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

const useCommon = useCommonStore();
useCommon.setBreadcrumbs([
    { label: 'Settings' },
    { label: 'Google Recaptcha' }
]); 
const recaptchaSetup = reactive({
    status: false,
    siteKey: null,
    secretKey: null,
});
const status = ref([
  { label: "Active", value: true },
  { label: "Deactive", value: false },
]);
// computed rules for generals
const recaptchaSetupRules = computed(() => {
    return {
        status: {
            required: helpers.withMessage('Status is required', required,),
            $autoDirty: true,
        },
        siteKey: {
            required: helpers.withMessage('Site Key is required', required,),
            $autoDirty: true,
        },
        secretKey: {
            required: helpers.withMessage('Secret Key is required', required,),
            $autoDirty: true,
        },

    };
});
const v$ = useVuelidate(recaptchaSetupRules, recaptchaSetup)
const saveSettings =   () => {
     v$.value.$validate();
    console.log(v$.value.$error,'errors');
    console.log(v$.value,'values');
    v$.recaptchaSetup.$reset()
};


</script>
<template>
    <div class="p-fluid">
        <form @submit.prevent="saveSettings">
        <div class="grid">
        <!-- Status Start -->
        <div class="field col-12">
            <div
              class="flex flex-wrap justify-content-between align-items-center flex-wrap gap-3"
            >
              <label for="status" class="mb-0 font-bold"
                >Google Recaptcha Status</label
              >
              <SelectButton
                :class="{ 'p-invalid': v$.status?.$error }"
                v-model="recaptchaSetup.status"
                optionValue="value"
                optionLabel="label"
                :options="status"
              />
            </div>
  
            <span
              v-if="v$.status.$error"
              role="alert"
              class="p-error"
              >{{ v$.status?.$errors[0].$message }}</span
            >
          </div>
        <!-- Status End -->

        <!-- site Key Start -->
        <div class="field col-12">
            <label for="siteKey">Google Recaptcha Site Key</label>
            <InputText  id="siteKey" v-model="recaptchaSetup.siteKey" required="true" :class="{'p-invalid': v$.siteKey?.$error}"/> 
            <span v-if="v$.siteKey.$error" role="alert" class="p-error">{{ v$.siteKey?.$errors[0].$message}}</span>
        </div>
        <!-- site Key End -->

        <!-- Secret Key Start -->
        <div class="field col-12">
            <label for="secretKey">Google Recaptcha Secret Key</label>
            <InputText  id="secretKey" v-model="recaptchaSetup.secretKey" required="true" type="password" :class="{'p-invalid': v$.secretKey?.$error}"/> 
            <span v-if="v$.secretKey.$error" role="alert" class="p-error">{{ v$.secretKey?.$errors[0].$message}}</span>
        </div>
        <!-- Secret Key End -->
        
     
        </div>
        
               <div class="flex gap-2 justify-content-end mt-5"> 
                   <Button type="submit" class="px-6" label="Update" :disabled="v$.$errors.length!=0" />
               </div> 
           </form>
    </div>
</template>
<style>
</style>