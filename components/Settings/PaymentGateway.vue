<script setup>
useHead({
  title: `Payment Gateway`,
});
import { required, helpers, integer, requiredIf } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

const useCommon = useCommonStore();
useCommon.setBreadcrumbs([{ label: "Settings" }, { label: "Payment Gateway" }]);

const methods = ref([
  { label: "Paypal", value: "paypal" },
  { label: "Stripe", value: "stripe" },
]);
const options = ref(["Off", "On"]);
const paymentGatewaySetup = reactive({
  receiveNotificationAfterPay: false,
  paymentMethod: null,
  // paymentMethod: 'paypal',
  label: null,
  fixedFee: 0,
  percentageFee: 0,
  apiUserName: null,
  apiPassword: null,
  apiSignature: null,
  descriptionDashboard: null,
  testMode: false,
  //stripe
  updateCreditCardToken: false,
});

const changePaymentMethods = (e) => {
  console.log(e.value, "changePaymentMethods");
};
const fixedFeeChange = (e) => {
  console.log(paymentGatewaySetup.percentageFee, "fixedFeeChange");
  if (e.target.value != 0 && paymentGatewaySetup.fixedFee != "") {
    paymentGatewaySetup.percentageFee = 0;
  }
};
const percentageChange = (e) => {
  if (e.target.value != 0 && paymentGatewaySetup.percentageFee != "") {
    paymentGatewaySetup.fixedFee = 0;
  }
};

// computed rules for generals
const paymentGatewaySetupRules = computed(() => {
  return {
    receiveNotificationAfterPay: {
      required: helpers.withMessage(
        "The Receive Notification After Pay Field Is Require",
        required
      ),
      $autoDirty: true,
    },
    paymentMethod: {
      required: helpers.withMessage("The Payment Method Field Is Require", required),
      $autoDirty: true,
    },
    label: {
      required: helpers.withMessage("The Label Field Is Require", required),
      $autoDirty: true,
    },
    fixedFee: {
      required: requiredIf(
        function () {
          return paymentGatewaySetup.percentageFee == 0;
        },
        "The Fixed Fee Field Is Require",
        required
      ),
      integer: helpers.withMessage("The Fixed Fee Field Must Be A Number", integer),
      $autoDirty: true,
    },
    percentageFee: {
      required: requiredIf(
        function () {
          return paymentGatewaySetup.fixedFee == 0;
        },
        "The Percentage Fee Field Is Require",
        required
      ),
      integer: helpers.withMessage("The Percentage Fee Field Must Be A Number", integer),
      $autoDirty: true,
    },
    apiUserName: {
      required: helpers.withMessage("The API User Name Field Is Require", required),
      $autoDirty: true,
    },
    apiPassword: {
      required: helpers.withMessage("The API Password Field Is Require", required),
      $autoDirty: true,
    },
    apiSignature: {
      required: helpers.withMessage("The API Signature Field Is Require", required),
      $autoDirty: true,
    },
    descriptionDashboard: {
      required: helpers.withMessage(
        "The Description Dashboard Field Is Require",
        required
      ),
      $autoDirty: true,
    },
    testMode: {
      required: helpers.withMessage("The Test Mode Field Is Require", required),
      $autoDirty: true,
    },
    updateCreditCardToken: {
      required: requiredIf(
        function () {
          return paymentGatewaySetup.paymentMethod == "stripe";
        },
        "The Update Credit Card Token Field Is Require",
        required
      ),
      $autoDirty: true,
    },
  };
});
const v$ = useVuelidate(paymentGatewaySetupRules, paymentGatewaySetup);
const saveSettings = () => {
  v$.value.$validate();
  console.log(v$.value.$error, "errors");
  console.log(v$.value, "values");
  v$.paymentGatewaySetup.$reset();
};
</script>
<template>
  <div class="p-fluid">
    <form @submit.prevent="saveSettings">
      <div class="grid">
        <!-- Notification receive Box  -->
        <div class="field col-12">
          <div
            class="flex flex-wrap justify-content-between align-items-center flex-wrap gap-3"
          >
            <label for="receiveNotificationAfterPay" class="mb-0 font-bold"
              >Receive notification when customer pay invoice</label
            >
            <SelectButton
              :class="{ 'p-invalid': v$.receiveNotificationAfterPay?.$error }"
              v-model="paymentGatewaySetup.receiveNotificationAfterPay"
              :options="options"
            />
          </div>

          <span
            v-if="v$.receiveNotificationAfterPay.$error"
            role="alert"
            class="p-error"
            >{{ v$.receiveNotificationAfterPay?.$errors[0].$message }}</span
          >
        </div>
        <!-- Notification receive box wnd  -->
        <!-- Payment Method Box  -->
        <div class="field col-12">
          <div
            class="flex flex-wrap justify-content-between align-items-center flex-wrap gap-3"
          >
            <label for="paymentMethod" class="mb-0 font-bold">Payment Method</label>
            <SelectButton
              @change="changePaymentMethods($event)"
              :class="{ 'p-invalid': v$.paymentMethod?.$error }"
              v-model="paymentGatewaySetup.paymentMethod"
              :options="methods"
              optionLabel="label"
              optionValue="value"
            />
          </div>

          <span v-if="v$.paymentMethod.$error" role="alert" class="p-error">{{
            v$.paymentMethod?.$errors[0].$message
          }}</span>
        </div>
        <!-- Payment Method box end  -->

        <template v-if="paymentGatewaySetup.paymentMethod">
          <!-- Label Box  -->
          <div
            class="field col-12 flex flex-wrap justify-content-between align-items-center flex-wrap gap-3"
          >
            <label for="label" class="mb-0 font-bold">Label</label>
            <InputText
              id="label"
              v-model="paymentGatewaySetup.label"
              required="true"
              :class="{ 'p-invalid': v$.label?.$error }"
            />
            <span v-if="v$.label.$error" role="alert" class="p-error">{{
              v$.label?.$errors[0].$message
            }}</span>
          </div>

          <!-- Label box wnd  -->
          <!-- Fixed Fee Box  -->
          <div
            class="field col-6 flex flex-wrap justify-content-between align-items-center flex-wrap gap-3"
          >
            <label for="fixedFee" class="mb-0 font-bold">Fixed Fee</label>
            <InputText
              id="fixedFee"
              type="number"
              v-model="paymentGatewaySetup.fixedFee"
              required="true"
              @input="fixedFeeChange($event)"
              :class="{ 'p-invalid': v$.fixedFee?.$error }"
            />
            <span v-if="v$.fixedFee.$error" role="alert" class="p-error">{{
              v$.fixedFee?.$errors[0].$message
            }}</span>
          </div>
          <!-- Fixed Fee box wnd  -->
          <!-- Percentage Fee Box  -->
          <div
            class="field col-6 flex flex-wrap justify-content-between align-items-center flex-wrap gap-3"
          >
            <label for="percentageFee" class="mb-0 font-bold">Percentage Fee</label>
            <InputText
              id="percentageFee"
              type="number"
              v-model="paymentGatewaySetup.percentageFee"
              required="true"
              @input="percentageChange($event)"
              :class="{ 'p-invalid': v$.percentageFee?.$error }"
            />
            <span v-if="v$.percentageFee.$error" role="alert" class="p-error">{{
              v$.percentageFee?.$errors[0].$message
            }}</span>
          </div>
          <!-- Percentage Fee box wnd  -->
          <!-- API User Name Box  -->
          <div
            class="field col-6 flex flex-wrap justify-content-between align-items-center flex-wrap gap-3"
          >
            <label for="apiUserName" class="mb-0 font-bold">API User Name</label>
            <InputText
              id="apiUserName"
              v-model="paymentGatewaySetup.apiUserName"
              required="true"
              :class="{ 'p-invalid': v$.apiUserName?.$error }"
            />
            <span v-if="v$.apiUserName.$error" role="alert" class="p-error">{{
              v$.apiUserName?.$errors[0].$message
            }}</span>
          </div>
          <!-- API User Name box wnd  -->
          <!-- API Password Box  -->
          <div
            class="field col-6 flex flex-wrap justify-content-between align-items-center flex-wrap gap-3"
          >
            <label for="apiPassword" class="mb-0 font-bold">API Password</label>
            <InputText
              id="apiPassword"
              v-model="paymentGatewaySetup.apiPassword"
              type="password"
              required="true"
              :class="{ 'p-invalid': v$.apiPassword?.$error }"
            />
            <span v-if="v$.apiPassword.$error" role="alert" class="p-error">{{
              v$.apiPassword?.$errors[0].$message
            }}</span>
          </div>
          <!-- API Password box wnd  -->
          <!-- API Signature Box  -->
          <div
            class="field col-6 flex flex-wrap justify-content-between align-items-center flex-wrap gap-3"
          >
            <label for="apiSignature" class="mb-0 font-bold">API Signature</label>
            <InputText
              id="apiSignature"
              v-model="paymentGatewaySetup.apiSignature"
              required="true"
              :class="{ 'p-invalid': v$.apiSignature?.$error }"
            />
            <span v-if="v$.apiSignature.$error" role="alert" class="p-error">{{
              v$.apiSignature?.$errors[0].$message
            }}</span>
          </div>
          <!-- API Signature box wnd  -->
          <!-- Description Dashboard Box  -->
          <div
            class="field col-6 flex flex-wrap justify-content-between align-items-center flex-wrap gap-3"
          >
            <label for="descriptionDashboard" class="mb-0 font-bold"
              >Description Dashboard</label
            >
            <InputText
              id="descriptionDashboard"
              v-model="paymentGatewaySetup.descriptionDashboard"
              required="true"
              :class="{ 'p-invalid': v$.descriptionDashboard?.$error }"
            />
            <span v-if="v$.descriptionDashboard.$error" role="alert" class="p-error">{{
              v$.descriptionDashboard?.$errors[0].$message
            }}</span>
          </div>
          <!-- Description Dashboard box wnd  -->
          <!-- Test Mode Box  -->
          <div class="field col-6">
            <div
              class="flex flex-wrap justify-content-between align-items-center flex-wrap gap-3"
            >
              <label for="testMode" class="mb-0 font-bold">Test Mode</label>
              <SelectButton
                :class="{ 'p-invalid': v$.testMode?.$error }"
                v-model="paymentGatewaySetup.testMode"
                :options="options"
              />
            </div>
            <span v-if="v$.testMode.$error" role="alert" class="p-error">{{
              v$.testMode?.$errors[0].$message
            }}</span>
          </div>
          <!-- Test Mode box wnd  -->
          <template v-if="paymentGatewaySetup.paymentMethod == 'stripe'">
            <!-- Update Credit Card Token Box  -->
            <div class="field col-6">
              <div
                class="flex flex-wrap justify-content-between align-items-center flex-wrap gap-3"
              >
                <label for="updateCreditCardToken" class="mb-0 font-bold"
                  >Update Credit Card Token</label
                >
                <SelectButton
                  :class="{ 'p-invalid': v$.updateCreditCardToken?.$error }"
                  v-model="paymentGatewaySetup.updateCreditCardToken"
                  :options="options"
                />
              </div>
              <span v-if="v$.updateCreditCardToken.$error" role="alert" class="p-error">{{
                v$.updateCreditCardToken?.$errors[0].$message
              }}</span>
            </div>
            <!-- Update Credit Card Token box wnd  -->
          </template>
        </template>
      </div>

      <div class="flex gap-2 justify-content-end mt-5">
        <Button
          type="submit"
          class="px-6"
          label="Update"
          :disabled="v$.$errors.length != 0"
        />
      </div>
    </form>
  </div>
</template>
<style></style>
