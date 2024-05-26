<script setup>
definePageMeta({
    layout: 'website',
    // middleware: 'guest' 
});
useHead({
  title: `Sing Up`,
});
import { required, helpers, sameAs,minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useToast } from 'primevue/usetoast';
import { useRoute,useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
import InputOtp from 'primevue/inputotp';
const toast = useToast();
const config = useRuntimeConfig();
const isLoad = ref(true);
const step = ref(1); 
const loading = ref(false);
const user = ref(null);
const isSubmitting = ref(false);

const accountInfoSetup = reactive({
    name: 'null', 
    username:'null',
    email:'null@null.com',
    phone:"21313123",
    password:"12121212",
    password_confirmation:"12121212",
    plan_id: route.query.plan,
    type: route.query.type,
    otp: null,
});
const emailVerifySetup = reactive({
    otp: null,
});
// username without space
const userName = (value) => {
  return /^[a-zA-Z0-9_]*$/.test(value);
};

const emailVerifyRules = computed(() => {
  return {  
    otp: {
      required: helpers.withMessage(
        "The OTP Field Is Require",
        required
      ),
      minLength: helpers.withMessage(
        "The OTP Field Must Be At Least 6 Characters",
        minLength(6)
      ),
      $autoDirty: true,
    },
  };
});
const accountInfoRules = computed(() => {
  return {
    name: {
      required: helpers.withMessage(
        "The Name Field Is Require",
        required
      ),
      $autoDirty: true,
    }, 
    username: {
      required: helpers.withMessage(
        "without space and spacial word", userName,required
      ),
      $autoDirty: true,
    },  
    email: {
      required: helpers.withMessage(
        "The Email Field Is Require",
        required
      ),
      $autoDirty: true,
    },
    phone: {
      required: helpers.withMessage(
        "The Phone Field Is Require",
        required
      ),
      $autoDirty: true,
    },
    password: {
      required: helpers.withMessage(
        "The Password Field Is Require",
        required
      ),
        minLength: helpers.withMessage(
            "The Password Field Must Be At Least 8 Characters",
            minLength(8)
        ),
      $autoDirty: true,
    },
    password_confirmation: {
      required: helpers.withMessage(
        "The Password Confirmation Field Is Require",
        required
      ),
      sameAs: helpers.withMessage(
        "The Password Confirmation Field Must Be Same As Password",
        sameAs(accountInfoSetup.password)
      ),
      $autoDirty: true,
    },
  };
});
const v$ = useVuelidate(accountInfoRules, accountInfoSetup);
const email$ = useVuelidate(emailVerifyRules, emailVerifySetup);


const submitAccountInfo = async () => {
  v$.value.$validate();
  if (v$.value.$invalid) {
        return;}
  isSubmitting.value = true;
  let accountInfoInsert = null;
  let fd = {};
        for (const [key, value] of Object.entries(accountInfoSetup)) {
          if (value !== null) {
            fd[key] = value;
          }
        }
        fd['plan_id'] = route.query.plan;
        fd['type'] = route.query.type;

  accountInfoInsert = await useApiFetch("subscriber/register", {
        method: "POST",
        body: fd,
    });
    isSubmitting.value = false;
    console.log(accountInfoInsert.data.value)
    if(accountInfoInsert.data.value){
        if(accountInfoInsert.data.value?.data && accountInfoInsert.data.value?.data.error_code=="subscriber_email_otp"){
    toast.add({severity:'success', summary: 'Successful', detail: accountInfoInsert.data.value?.data.message, life:3000});
        }else{
            toast.add({severity:'success', summary: 'Successful', detail: accountInfoInsert.data.value.message, life: 3000});
        }
        step.value=2
    }
    else{
      console.log(accountInfoInsert.error.value.data,'error')
        toast.add({severity:'error', summary: 'Error', detail: accountInfoInsert.error?.value?.data?.message, life: 3000});
        console.log(accountInfoInsert.error)
    } 
}

const emailVerify = async () =>{
     // validate accountInfoSetup.otp
  email$.value.$validate();
  // check if the form is valid
    if (email$.value.$invalid) {
        return;}

    isSubmitting.value = true;
    let accountInfoInsert = null;
    let fd = {};
        fd['email'] = accountInfoSetup.email;
        fd['otp'] = emailVerifySetup.otp;
    accountInfoInsert = await useApiFetch("subscriber/verify-email", {
        method: "POST",
        body: fd,
    });
    isSubmitting.value = false;
    console.log(accountInfoInsert.data.value)
    if(accountInfoInsert.data.value){
        toast.add({severity:'success', summary: 'Successful', detail: accountInfoInsert.data.value.message, life: 3000});
        step.value=3
    }
    else{
        toast.add({severity:'error', summary: 'Error', detail: accountInfoInsert.error.value.data.message, life: 3000});
    }

}

onMounted( async () => {
    console.log(route,'route')
    if (!route.query.plan || !route.query.type) {
        router.push("/");
    }
    const links = [
        '/assets/signup.css',
    ]

     links.forEach((link) => {
        const head = document.getElementsByTagName('head')[0];
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = link;
     head.appendChild(linkElement);
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    isLoad.value = false;
});
</script>
<template>
    <div v-if="isLoad" id="loading">
        <div id="loading-center">
            <div id="loading-center-absolute">
                <div class="object" id="object_one"></div>
                <div class="object" id="object_two"></div>
                <div class="object" id="object_three"></div>
                <div class="object" id="object_four"></div>
            </div>
        </div>
    </div>
    <div v-else class="d-flex flex-column flex-root" id="kt_app_root">
        <!--begin::Authentication - Multi-steps-->
        <div class="d-flex flex-column flex-lg-row flex-column-fluid stepper stepper-pills stepper-column stepper-multistep" id="kt_create_account_stepper">
            <!--begin::Aside-->
            <div class="d-flex flex-column flex-lg-row-auto w-lg-350px w-xl-500px">
                <div class="d-flex flex-column position-lg-fixed top-0 bottom-0 w-lg-350px w-xl-500px scroll-y bgi-size-cover bgi-position-center" style="background-image: url(_nuxt/assets/media/misc/auth-bg.png)">
                    <!--begin::Header-->
                    <div class="d-flex flex-center py-10  py-lg-10 mt-lg-20">
                        <!--begin::Logo-->
                        <nuxtLink to="/" class="logo-2"
                        >
                        <!-- <img src="/assets/img/logo/logo.webp" alt="image not found"/> -->
                        <img :src="config.public.APP_URL + '/layout/images/icon.svg'" alt="image not found" width="25px"/>
     <img src="/assets/images/white.svg" alt="image not found" width="120px" class="h-70px"/>
                        </nuxtLink>
                        <!--end::Logo-->
                    </div>
                    <!--end::Header-->
                    <!--begin::Body-->
                    <div class="d-flex flex-row-fluid justify-content-center p-10">
                        <!--begin::Nav-->
                        <div class="stepper-nav">
                             
                            <!--begin::Step 2-->
                            <div class="stepper-item " :class="step==1?'current':''" data-kt-stepper-element="nav">
                                <!--begin::Wrapper-->
                                <div class="stepper-wrapper">
                                    <!--begin::Icon-->
                                    <div class="stepper-icon rounded-3">
                                        <i class="ki-duotone ki-check fs-2 stepper-check"></i>
                                        <span class="stepper-number">1</span>
                                    </div>
                                    <!--end::Icon-->
                                    <!--begin::Label-->
                                    <div class="stepper-label">
                                        <h3 class="stepper-title fs-2">Account Info</h3>
                                        <div class="stepper-desc fw-normal">Setup your account Information</div>
                                    </div>
                                    <!--end::Label-->
                                </div>
                                <!--end::Wrapper-->
                                <!--begin::Line-->
                                <div class="stepper-line h-40px"></div>
                                <!--end::Line-->
                            </div>
                            <!--end::Step 2-->
                            <!--begin::Step 3-->
                            <div class="stepper-item" :class="step==2?'current':''" data-kt-stepper-element="nav">
                                <!--begin::Wrapper-->
                                <div class="stepper-wrapper">
                                    <!--begin::Icon-->
                                    <div class="stepper-icon">
                                        <i class="ki-duotone ki-check fs-2 stepper-check"></i>
                                        <span class="stepper-number">2</span>
                                    </div>
                                    <!--end::Icon-->
                                    <!--begin::Label-->
                                    <div class="stepper-label">
                                        <h3 class="stepper-title fs-2">Email</h3>
                                        <div class="stepper-desc fw-normal">Verify Your Email</div>
                                    </div>
                                    <!--end::Label-->
                                </div>
                                <!--end::Wrapper-->
                                <!--begin::Line-->
                                <div class="stepper-line h-40px"></div>
                                <!--end::Line-->
                            </div>
                            <!--end::Step 3-->
                            <!--begin::Step 4-->
                            <div class="stepper-item" :class="step==3?'current':''" data-kt-stepper-element="nav">
                                <!--begin::Wrapper-->
                                <div class="stepper-wrapper">
                                    <!--begin::Icon-->
                                    <div class="stepper-icon">
                                        <i class="ki-duotone ki-check fs-2 stepper-check"></i>
                                        <span class="stepper-number">3</span>
                                    </div>
                                    <!--end::Icon-->
                                    <!--begin::Label-->
                                    <div class="stepper-label">
                                        <h3 class="stepper-title">Billing Details</h3>
                                        <div class="stepper-desc fw-normal">Provide your payment info</div>
                                    </div>
                                    <!--end::Label-->
                                </div>
                                <!--end::Wrapper-->
                                <!--begin::Line-->
                                <div class="stepper-line h-40px"></div>
                                <!--end::Line-->
                            </div>
                            <!--end::Step 4-->
                            <!--begin::Step 5-->
                            <div class="stepper-item" :class="step==4?'current':''" data-kt-stepper-element="nav">
                                <!--begin::Wrapper-->
                                <div class="stepper-wrapper">
                                    <!--begin::Icon-->
                                    <div class="stepper-icon">
                                        <i class="ki-duotone ki-check fs-2 stepper-check"></i>
                                        <span class="stepper-number">4</span>
                                    </div>
                                    <!--end::Icon-->
                                    <!--begin::Label-->
                                    <div class="stepper-label">
                                        <h3 class="stepper-title">Completed</h3>
                                        <div class="stepper-desc fw-normal">Your account is created</div>
                                    </div>
                                    <!--end::Label-->
                                </div>
                                <!--end::Wrapper-->
                            </div>
                            <!--end::Step 5-->
                        </div>
                        <!--end::Nav-->
                    </div>
                    <!--end::Body-->
             
                </div>
            </div>
            <!--begin::Aside-->
            <!--begin::Body-->
            <div class="d-flex flex-column flex-lg-row-fluid py-10">
                <!--begin::Content-->
                <div class="d-flex flex-center flex-column flex-column-fluid">
                    <!--begin::Wrapper-->
                    <div class="wp-10 p-lg-15 mx-auto">
                        <!--begin::Form-->
                        <form class="my-auto pb-5" v-if="step==1" @submit.prevent="submitAccountInfo">
                         
                            <!--begin::Step 2-->
                            <div :class="step==1?'current':''" data-kt-stepper-element="content">
                                <!--begin::Wrapper-->
                                <div class="w-100">
                                    <!--begin::Heading-->
                                    <div class="pb-10 pb-lg-15">
                                        <!--begin::Title-->
                                        <h2 class="fw-bold text-gray-900">Account Info</h2>
                                        <!--end::Title--> 
                                        <!--end::Notice-->
                                    </div>
                                    <div class="mb-10 row">
                                        <div class="col-6">
    <label class="form-label mb-3">Name</label>
    <InputText class="form-control form-control-lg form-control-solid" id="name" v-model="accountInfoSetup.name" required="true" :class="{'p-invalid': v$.name?.$error}" />
    <span v-if="v$?.name?.$error" role="alert" class="p-error">{{ v$.name?.$errors[0].$message}}</span>
     
                                        </div>
                                        <div class="col-6">
    <label class="form-label mb-3">Username</label>
    <InputText class="form-control form-control-lg form-control-solid" id="username" v-model="accountInfoSetup.username" required="true" :class="{'p-invalid': v$.username?.$error}" />
    <span v-if="v$?.username?.$error" role="alert" class="p-error w-full">{{ v$.username?.$errors[0].$message}}</span>
                                        </div>
                                    
                                    </div>
                                    <div class="mb-10 fv-row">
                                        <label class="form-label mb-3">Email</label>
                                        <InputText class="form-control form-control-lg form-control-solid" id="email" type="email" v-model="accountInfoSetup.email" required="true" :class="{'p-invalid': v$.email?.$error}" />
                                        <span v-if="v$?.email?.$error" role="alert" class="p-error">{{ v$.email?.$errors[0].$message}}</span>
                                         
                                    </div>
                                    <div class="mb-10 fv-row">
                                        <label class="form-label mb-3">Phone</label>
                                        <InputText class="form-control form-control-lg form-control-solid" id="name" v-model="accountInfoSetup.phone" type="number" required="true" :class="{'p-invalid': v$.phone?.$error}" />
                                        <span v-if="v$?.phone?.$error" role="alert" class="p-error">{{ v$.phone?.$errors[0].$message}}</span>
                                         
                                    </div>

                                    <div class="mb-10 row">
                                        <div class="col-6">
    <label class="form-label mb-3">Password</label>
    <InputText class="form-control form-control-lg form-control-solid" type="password" id="password" v-model="accountInfoSetup.password" required="true" :class="{'p-invalid': v$.password?.$error}" />
    <span v-if="v$?.password?.$error" role="alert" class="p-error">{{ v$.password?.$errors[0].$message}}</span>
     
                                        </div>
                                        <div class="col-6">
    <label class="form-label mb-3">Confirm Password</label>
    <InputText class="form-control form-control-lg form-control-solid" id="password_confirmation" v-model="accountInfoSetup.password_confirmation" required="true" type="password" :class="{'p-invalid': v$.password_confirmation?.$error}" />
    <span v-if="v$?.password_confirmation?.$error" role="alert" class="p-error w-full">{{ v$.password_confirmation.$errors[0].$message}}</span>
                                        </div>
                                    
                                    </div>
                                 
                                </div>
                                <!--end::Wrapper-->
                            </div>
                            <!--end::Step 2-->
                            <!--begin::Actions-->
                            <div class="d-flex flex-end pt-15">
                                <div>
                <Button type="submit"  class="primaryBtn btn btn-primary" :disabled="v$.$errors.length!=0" :loading="isSubmitting"  label="Sign Up" />
                                </div>
                            </div>
                            <!--end::Actions-->
                        </form>
                        <!--end::Form-->
                        <!--begin::Form-->
                        <form class="my-auto pb-5" v-if="step==2" @submit.prevent="emailVerify">
                         
                        <!--begin::Step 3-->
                        <div :class="step==2?'current':''" data-kt-stepper-element="content">
                            <!--begin::Wrapper-->
                            <div class="w-100">
                                <div class="d-flex flex-center flex-column flex-lg-row-fluid">
                                    <!--begin::Wrapper-->
                                    <div class="w-lg-500px p-10">
                                        <!--begin::Form-->
                                            <!--begin::Icon-->
                                            <div class="text-center mb-10">
                                                <img alt="Logo" class="mh-125px" src="/assets/images/smartphone-2.svg" />
                                            </div>
                                            
                                            <!--end::Icon-->
                                            <!--begin::Heading-->
                                            <div class="text-center mb-10">
                                                <!--begin::Title-->
                                                <h1 class="text-gray-900 mb-3">Email Verification</h1>
                                                <!--end::Title-->
                                                <!--begin::Sub-title-->
                                                <div class="text-muted fw-semibold fs-5 mb-5">Enter the verification code we sent to</div>
                                                <!--end::Sub-title-->
                                                <!--begin::Mobile no-->
                                                <div class="fw-bold text-gray-900 fs-3">{{accountInfoSetup.email}}</div>
                                                <!--end::Mobile no-->
                                            </div>
                                            <!--end::Heading-->
                                            <!--begin::Section-->
                                            <div class="mb-10">
                                                <!--begin::Label-->
                                                <div class="mb-4 fw-bold text-start text-gray-900 fs-6 mb-1 ms-1">Type your 6 digit OTP code</div>
                                                <!--end::Label-->
                                                <!--begin::Input group-->
                                                <InputOtp v-model="emailVerifySetup.otp" :class="{'p-invalid': email$.otp?.$error}" integerOnly :length="6" />
 <span v-if="email$?.otp?.$error" role="alert" class="p-error">{{ email$.otp?.$errors[0].$message}}</span>
                                                <!--begin::Input group-->
                                            </div>
                                            <!--end::Section-->
                                            <!--begin::Submit-->
                                            <div class="d-flex flex-center">
<Button type="submit" id="kt_sing_in_two_factor_submit" class="btn primaryBtn btn-lg btn-primary fw-bold" :disabled="v$.$errors.length!=0" :loading="isSubmitting"  label="Submit" />
 
                                            </div>
                                            <!--end::Submit-->
                                        <!--end::Form-->
                                        <!--begin::Notice-->
                                        <div class="text-center fw-semibold fs-5">
                                            <span class="text-muted me-1">Didn’t get the code ?</span>
                                            <a href="#" class="link-primary fs-5 me-1">Resend</a>
                                        </div>
                                        <!--end::Notice-->
                                    </div>
                                    <!--end::Wrapper-->
                                </div>
                            </div>
                            <!--end::Wrapper-->
                        </div>
                        <!--end::Step 3-->
                        </form>
                        <!--end::Form-->
                        <!--begin::Form-->
                        <form class="my-auto pb-5" v-if="step==3" @submit.prevent="submitFrom">
                         
                        <!--begin::Step 4-->
                        <div :class="step==3?'current':''" data-kt-stepper-element="content">
                            <!--begin::Wrapper-->
                            <div class="w-100">
                                <!--begin::Heading-->
                                <div class="pb-10 pb-lg-15">
                                    <!--begin::Title-->
                                    <h2 class="fw-bold text-gray-900">Billing Details</h2>
                                    <!--end::Title-->
                                    <!--begin::Notice-->
                                    <div class="text-muted fw-semibold fs-6">If you need more info, please check out 
                                    <a href="#" class="text-primary fw-bold">Help Page</a>.</div>
                                    <!--end::Notice-->
                                </div>
                                <!--end::Heading-->
                                <!--begin::Input group-->
                                <div class="d-flex flex-column mb-7 fv-row">
                                    <!--begin::Label-->
                                    <label class="d-flex align-items-center fs-6 fw-semibold form-label mb-2">
                                        <span class="required">Name On Card</span>
                                        <span class="ms-1" data-bs-toggle="tooltip" title="Specify a card holder's name">
                                            <i class="ki-duotone ki-information-5 text-gray-500 fs-6">
                                                <span class="path1"></span>
                                                <span class="path2"></span>
                                                <span class="path3"></span>
                                            </i>
                                        </span>
                                    </label>
                                    <!--end::Label-->
                                    <input type="text" class="form-control form-control-solid" placeholder="" name="card_name" value="Max Doe" />
                                </div>
                                <!--end::Input group-->
                                <!--begin::Input group-->
                                <div class="d-flex flex-column mb-7 fv-row">
                                    <!--begin::Label-->
                                    <label class="required fs-6 fw-semibold form-label mb-2">Card Number</label>
                                    <!--end::Label-->
                                    <!--begin::Input wrapper-->
                                    <div class="position-relative">
                                        <!--begin::Input-->
                                        <input type="text" class="form-control form-control-solid" placeholder="Enter card number" name="card_number" value="4111 1111 1111 1111" />
                                        <!--end::Input-->
                                        <!--begin::Card logos-->
                                        <div class="position-absolute translate-middle-y top-50 end-0 me-5">
                                            <img src="assets/media/svg/card-logos/visa.svg" alt="" class="h-25px" />
                                            <img src="assets/media/svg/card-logos/mastercard.svg" alt="" class="h-25px" />
                                            <img src="assets/media/svg/card-logos/american-express.svg" alt="" class="h-25px" />
                                        </div>
                                        <!--end::Card logos-->
                                    </div>
                                    <!--end::Input wrapper-->
                                </div>
                                <!--end::Input group-->
                                <!--begin::Input group-->
                                <div class="row mb-10">
                                    <!--begin::Col-->
                                    <div class="col-md-8 fv-row">
                                        <!--begin::Label-->
                                        <label class="required fs-6 fw-semibold form-label mb-2">Expiration Date</label>
                                        <!--end::Label-->
                                        <!--begin::Row-->
                                        <div class="row fv-row">
                                            <!--begin::Col-->
                                            <div class="col-6">
                                                <select name="card_expiry_month" class="form-select form-select-solid" data-control="select2" data-hide-search="true" data-placeholder="Month">
                                                    <option></option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                </select>
                                            </div>
                                            <!--end::Col-->
                                            <!--begin::Col-->
                                            <div class="col-6">
                                                <select name="card_expiry_year" class="form-select form-select-solid" data-control="select2" data-hide-search="true" data-placeholder="Year">
                                                    <option></option>
                                                    <option value="2024">2024</option>
                                                    <option value="2025">2025</option>
                                                    <option value="2026">2026</option>
                                                    <option value="2027">2027</option>
                                                    <option value="2028">2028</option>
                                                    <option value="2029">2029</option>
                                                    <option value="2030">2030</option>
                                                    <option value="2031">2031</option>
                                                    <option value="2032">2032</option>
                                                    <option value="2033">2033</option>
                                                    <option value="2034">2034</option>
                                                </select>
                                            </div>
                                            <!--end::Col-->
                                        </div>
                                        <!--end::Row-->
                                    </div>
                                    <!--end::Col-->
                                    <!--begin::Col-->
                                    <div class="col-md-4 fv-row">
                                        <!--begin::Label-->
                                        <label class="d-flex align-items-center fs-6 fw-semibold form-label mb-2">
                                            <span class="required">CVV</span>
                                            <span class="ms-1" data-bs-toggle="tooltip" title="Enter a card CVV code">
                                                <i class="ki-duotone ki-information-5 text-gray-500 fs-6">
                                                    <span class="path1"></span>
                                                    <span class="path2"></span>
                                                    <span class="path3"></span>
                                                </i>
                                            </span>
                                        </label>
                                        <!--end::Label-->
                                        <!--begin::Input wrapper-->
                                        <div class="position-relative">
                                            <!--begin::Input-->
                                            <input type="text" class="form-control form-control-solid" minlength="3" maxlength="4" placeholder="CVV" name="card_cvv" />
                                            <!--end::Input-->
                                            <!--begin::CVV icon-->
                                            <div class="position-absolute translate-middle-y top-50 end-0 me-3">
                                                <i class="ki-duotone ki-credit-cart fs-2hx">
                                                    <span class="path1"></span>
                                                    <span class="path2"></span>
                                                </i>
                                            </div>
                                            <!--end::CVV icon-->
                                        </div>
                                        <!--end::Input wrapper-->
                                    </div>
                                    <!--end::Col-->
                                </div>
                                <!--end::Input group-->
                                <!--begin::Input group-->
                                <div class="d-flex flex-stack">
                                    <!--begin::Label-->
                                    <div class="me-5">
                                        <label class="fs-6 fw-semibold form-label">Save Card for further billing?</label>
                                        <div class="fs-7 fw-semibold text-muted">If you need more info, please check budget planning</div>
                                    </div>
                                    <!--end::Label-->
                                    <!--begin::Switch-->
                                    <label class="form-check form-switch form-check-custom form-check-solid">
                                        <input class="form-check-input" type="checkbox" value="1" checked="checked" />
                                        <span class="form-check-label fw-semibold text-muted">Save Card</span>
                                    </label>
                                    <!--end::Switch-->
                                </div>
                                <!--end::Input group-->
                            </div>
                            <!--end::Wrapper-->
                        </div>
                        <!--end::Step 4-->
                    
                            <!--begin::Actions-->
                            <div class="d-flex flex-end pt-15">
                                <div>
                <Button type="submit"  class="primaryBtn btn btn-primary" :disabled="v$.$errors.length!=0" :loading="isSubmitting"  label="Sign Up" />
                                </div>
                            </div>
                            <!--end::Actions-->
                        </form>
                        <!--end::Form-->
                        <!--begin::Form-->
                        <form class="my-auto pb-5" v-if="step==4" @submit.prevent="submitFrom">
                            <!--begin::Step 5-->
                            <div :class="step==4?'current':''" data-kt-stepper-element="content">
                                <!--begin::Wrapper-->
                                <div class="w-100">
                                    <!--begin::Heading-->
                                    <div class="pb-8 pb-lg-10">
                                        <!--begin::Title-->
                                        <h2 class="fw-bold text-gray-900">Your Are Done!</h2>
                                        <!--end::Title-->
                                        <!--begin::Notice-->
                                        <div class="text-muted fw-semibold fs-6">If you need more info, please 
                                        <a href="authentication/layouts/corporate/sign-in.html" class="link-primary fw-bold">Sign In</a>.</div>
                                        <!--end::Notice-->
                                    </div>
                                    <!--end::Heading-->
                                    <!--begin::Body-->
                                    <div class="mb-0">
                                        <!--begin::Text-->
                                        <div class="fs-6 text-gray-600 mb-5">Writing headlines for blog posts is as much an art as it is a science and probably warrants its own post, but for all advise is with what works for your great & amazing audience.</div>
                                        <!--end::Text-->
                                        <!--begin::Alert-->
                                        <!--begin::Notice-->
                                        <div class="notice d-flex bg-light-warning rounded border-warning border border-dashed p-6">
                                            <!--begin::Icon-->
                                            <i class="ki-duotone ki-information fs-2tx text-warning me-4">
                                                <span class="path1"></span>
                                                <span class="path2"></span>
                                                <span class="path3"></span>
                                            </i>
                                            <!--end::Icon-->
                                            <!--begin::Wrapper-->
                                            <div class="d-flex flex-stack flex-grow-1">
                                                <!--begin::Content-->
                                                <div class="fw-semibold">
                                                    <h4 class="text-gray-900 fw-bold">We need your attention!</h4>
                                                    <div class="fs-6 text-gray-700">To start using great tools, please, 
                                                    <a href="utilities/wizards/vertical.html" class="fw-bold">Create Team Platform</a></div>
                                                </div>
                                                <!--end::Content-->
                                            </div>
                                            <!--end::Wrapper-->
                                        </div>
                                        <!--end::Notice-->
                                        <!--end::Alert-->
                                    </div>
                                    <!--end::Body-->
                                </div>
                                <!--end::Wrapper-->
                            </div>
                            <!--end::Step 5-->
                            <!--begin::Actions-->
                            <div class="d-flex flex-end pt-15">
                                <div>
                <Button type="submit"  class="primaryBtn btn btn-primary" :disabled="v$.$errors.length!=0" :loading="isSubmitting"  label="Sign Up" />
                                </div>
                            </div>
                            <!--end::Actions-->
                        </form>
                        <!--end::Form-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<style>
.primaryBtn{
    color:white !important;
}
.primaryBtn:not(.btn-outline):not(.btn-dashed):not(.btn-bordered):not(.border-hover):not(.border-active):not(.btn-flush):not(.btn-icon):not(.btn-hover-outline){
    background-color: #1B84FF !important;
}
.flex-root {
    flex: 1
}
.flex-column {
    flex-direction: column !important
}
button.p-toast-icon-close.p-link{
    display: none !important;
}
</style>