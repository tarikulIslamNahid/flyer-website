<script setup>
import { required, helpers, email, requiredIf } from "@vuelidate/validators";
import { useToast } from 'primevue/usetoast';

import { useVuelidate } from "@vuelidate/core";
 
const useCommon = useCommonStore();
const auth = useAuthStore();
const toast = useToast();

const errors = ref(null);
const authSetup = ref({
  email: "admin@admin.com",
  password: "12345678",
});
const loading = ref(false);
const authSetupRules = computed(() => {
  return {
    email: {
      required: helpers.withMessage(
        "The Email Field Is Require",
        required
      ),
      email: helpers.withMessage("Invalid Email", email),
      $autoDirty: true,
      $anyDirty: true,
    },
    password: {
      required: helpers.withMessage(
        "The Password Field Is Require",
        required
      ),
      $autoDirty: true,
    },
  
  };
});
const v$ = useVuelidate(authSetupRules, authSetup,{ $externalResults: errors });
// console.log(v$,'v$');

const submitLogin =async () => {
    v$.value.$validate();
    loading.value = true;
    const {data,pending,error,status} = await auth.login(authSetup);
    loading.value = false;
    // check if there is an error
    if(error.value){
        toast.add({severity:'error', detail: error.value.data.message, life: 3000});
        if(error.value.data.errors){
            errors.value = error.value.data.errors
        }else if(error.value.data.error_code=='wrong_email_or_password'){
            errors.value =  {password:['Invalid Password']};
        }
        
    }
    if(data){
        await auth.setToken(data.value.token);
        await auth.setUser(data.value.data);
        await auth.setPermissions(data.value.permissions);
        toast.add({severity:'success', detail: data.value.message, life: 3000});
        navigateTo('/')
    }
    console.log(data.value.permissions,'data');
};

definePageMeta({
    layout: 'guest',
    // middleware: 'guest' 
});
useHead({
  title: `Login`,
});
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        
        <div class="flex flex-column align-items-center justify-content-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-8">
                        <router-link to="/" class="layout-topbar-logo ">
                            <img src="/layout/images/icon.svg" alt="logo" width="30" />
                            <img src="/layout/images/logo-icon.svg" alt="logo" width="150" />
                        </router-link>
                        <!-- <div class="text-900 text-3xl font-medium mb-3">Welcome To  Karam!</div> -->
                        <!-- <span class="text-600 font-medium">Sign in to continue</span> -->
                    </div>
 
<br>
<pre>
 
</pre>
<br>
                    <form @submit.prevent="submitLogin">
                        <div class="field">

                            <label for="email" class="block  mb-2">Email address</label>
                            <InputText  id="email" v-model="authSetup.email" required="true" type="email" placeholder="Email address" class="w-full md:w-30rem" style="padding: 1rem" :class="{'p-invalid': v$.email?.$error}" />
                            <span v-if="v$.email.$error" role="alert" class="block p-error">{{ v$.email?.$errors[0].$message}}</span>
                            
                        </div>
                        <div class="field py-3">

                            <label for="password" class="block mb-2">Password</label>
                            <InputText  id="password" v-model="authSetup.password" required="true" type="password" placeholder="Enter Password" class="w-full md:w-30rem " style="padding: 1rem" :class="{'p-invalid': v$.password?.$error}" />
                            <span v-if="v$.password.$error" role="alert" class="block p-error">{{ v$.password?.$errors[0].$message}}</span>
                            
                        </div>
                     
                        <div class="flex align-items-center justify-content-end mb-5 gap-5">
                             
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div>
                        <Button label="Sign In" :loading="loading" type="submit" class="w-full p-3 text-xl"></Button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- <AppConfig simple /> -->
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}
.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
