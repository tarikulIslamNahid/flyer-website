<script setup>
useHead({
  title: `Company Information`,
});
import { usePrimeVue } from 'primevue/config';
const $primevue = usePrimeVue();
import { ref, onMounted } from 'vue';
import { required,helpers,integer } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
// use getCountries from service/countryService
import { CountryService } from '@/service/countryService';

const useCommon = useCommonStore();
useCommon.setBreadcrumbs([
    { label: 'Settings' },
    { label: 'Company Information' }
]);

const companyInformation = reactive({
    companyName: null,
    countryId: null,
    cityId: null,
    state: null,
    phone: null,
    vatNumber: null,
    address: null,
});
const countries = ref([]);
onMounted(async () => {
    countries.value = await CountryService.getCountries();
});
// computed rules for generals
const companyInformationRules = computed(() => {
    return {
        companyName: {
            required: helpers.withMessage('The Company Name field is required', required,),
            $autoDirty: true,
        },
        countryId: {
            required: helpers.withMessage('The Country field is required', required,),
            $autoDirty: true,
        },
        cityId: {
            required: helpers.withMessage('The City field is required', required,),
            $autoDirty: true,
        },
        state: {
            required: helpers.withMessage('The State field is required', required,),
            $autoDirty: true,
        },
        phone: {
            required: helpers.withMessage('The Phone field is required', required,),
            integer: helpers.withMessage('The Phone field must be a number', integer,),
            $autoDirty: true,
        },
        vatNumber: {
            required: helpers.withMessage('The VAT Number field is required', required,),
            $autoDirty: true,
        },
        address: {
            required: helpers.withMessage('The Address field is required', required,),
            $autoDirty: true,
        },

    };
});
const v$ = useVuelidate(companyInformationRules, companyInformation)
const saveSettings =   () => {
     v$.value.$validate();
    console.log(v$.value.$error,'errors');
    console.log(v$.value,'values');
    v$.companyInformation.$reset()
};


</script>
<template>
    <div class="p-fluid">
        <form @submit.prevent="saveSettings">
            <div class="field"> 
                <label for="companyName">Company Name</label>
                <InputText  id="companyName" v-model="companyInformation.companyName" required="true" :class="{'p-invalid': v$.companyName?.$error}"/> 
                <span v-if="v$.companyName.$error" role="alert" class="p-error">{{ v$.companyName?.$errors[0].$message}}</span>
           </div> 

        <div class="grid">
            <!-- country Box  -->
         <div class="field col-6">
            <label for="countryId">Select Country</label>
            <Dropdown v-model="companyInformation.countryId" :options="countries" filter optionLabel="name" optionValue="code" placeholder="Select a Country" class="w-full">
             
            </Dropdown>
            <span v-if="v$.countryId.$error" role="alert" class="p-error">{{ v$.countryId?.$errors[0].$message}}</span>
         </div>
         <!-- country box wnd  -->
            <!-- country Box  -->
         <div class="field col-6">
            <label for="cityId">Select City</label>
            <Dropdown v-model="companyInformation.cityId" :options="countries" filter optionLabel="name" optionValue="code" placeholder="Select a City" class="w-full">
             
            </Dropdown>
            <span v-if="v$.cityId.$error" role="alert" class="p-error">{{ v$.cityId?.$errors[0].$message}}</span>
         </div>
         <!-- country box wnd  -->
         <!-- State start  -->
         <div class="field col-6"> 
            <label for="state">Enter State</label>
            <InputText  id="state" v-model="companyInformation.state" required="true" :class="{'p-invalid': v$.state?.$error}"/> 
            <span v-if="v$.state.$error" role="alert" class="p-error">{{ v$.state?.$errors[0].$message}}</span>
       </div> 
         <!-- State end  -->
         <!-- phone start  -->
         <div class="field col-6"> 
            <label for="phone">Enter Phone</label>
            <InputText  id="phone" v-model="companyInformation.phone" type="number" required="true" :class="{'p-invalid': v$.phone?.$error}"/> 
            <span v-if="v$.phone.$error" role="alert" class="p-error">{{ v$.phone?.$errors[0].$message}}</span>
       </div> 
         <!-- phone end  -->
         <!-- Vat Number start  -->
         <div class="field col-6"> 
            <label for="vatNumber">Enter Vat Number</label>
            <InputText  id="vatNumber" v-model="companyInformation.vatNumber" required="true" :class="{'p-invalid': v$.vatNumber?.$error}"/> 
            <span v-if="v$.vatNumber.$error" role="alert" class="p-error">{{ v$.vatNumber?.$errors[0].$message}}</span>
       </div> 
         <!-- Vat Number end  -->
        <!-- Address start  -->
        <div class="field col-6"> 
            <label for="address">Enter Company Address</label>
            <InputText  id="address" v-model="companyInformation.address" required="true" :class="{'p-invalid': v$.address?.$error}"/> 
            <span v-if="v$.address.$error" role="alert" class="p-error">{{ v$.address?.$errors[0].$message}}</span>
        </div> 
            <!-- Address end  -->
        </div>
        
               <div class="flex gap-2 justify-content-end mt-5"> 
                
                   <Button type="submit" class="px-6" label="Update" :disabled="v$.$errors.length!=0" />
               </div> 
           </form>
    </div>
</template>
<style>
</style>