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
    // layout: 'guest',
    layout: 'website',
    // middleware: 'guest' 
});
useHead({
  title: `Login`,
});
</script>

<template>
    <main>

        <!-- sign-in area start  -->
        <section class="df-sign-in__area pt-130 pb-115">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-xl-6 col-lg-8">
                        <div class="df-booking2__form wow fadeInUp" data-wow-delay=".3s">
                            <div class="login__title-wrapper text-center mb-50">
                                <h3 class="login__title">Wellcome Again</h3>
                                <p class="mt-15">The faster you fill up. the faster you get a login</p>
                            </div>
                            <form action="#">
                                <div class="row gx-5">
                                    <div class="col-md-12">
                                        <div class="df-input-field">
                                            <input type="text" id="email3" name="email3" placeholder="Username or Email *">
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="df-input-field mb-0">
                                            <input type="password" name="password" placeholder="Password *">
                                            <span class="fa fa-eye pass-icon"></span>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="row align-items-center justify-content-between">
                                            <div class="sign-meta">
                                                <div class="df-login">
                                                    <!-- <input type="checkbox" value="lsRememberMe" id="rememberMe">
                                                    <label for="rememberMe">Remember me</label> -->
                                                </div>
                                                <div class="edu-lost-password mt-3 pb-0">
                                                    <a class="btn-read-more" href="reset-password.html"><span>Lost your
                                                            password?</span></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="df-booking2__form-btn mt-15 mb-30">
                                            <button type="submit" class="sasup-theme-btn-2 w-100">Login
                                            </button>
                                        </div>
                                    </div> 
                                    <div class="col-md-12">
                                        <div class="sing-up-text text-center">
                                            <span class="sign-title">
                                                Don’t have an account?
                                            </span>
                                            <a class="sign-link" href="sign-up.html">Sign Up</a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- sign-in area end  -->

    </main>

    <!-- <AppConfig simple /> -->
    <websiteFooter :isNone="true" />

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
.sasup-footer-space-4{
    margin-top:0px !important;
}
</style> 