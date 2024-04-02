<script setup>
useHead({
  title: `Setting Management`,
});
const useCommon = useCommonStore();
useCommon.setBreadcrumbs([
    { label: 'Settings' }
]); 
const active = ref(0);

</script>
<template>
    <div class="card">
        <TabView v-model:activeIndex="active">
            <TabPanel header="General">
                <SettingsGeneral v-if="active==0"></SettingsGeneral>
            </TabPanel>
            <TabPanel header="Company Information">
                <SettingsCompanyInfo v-if="active==1"></SettingsCompanyInfo>
            </TabPanel>
            <TabPanel header="Email Setup">
                <SettingsEmail v-if="active==2"></SettingsEmail>
            </TabPanel>
            <TabPanel header="Invoice Setup">
                <SettingsInvoice v-if="active==3"></SettingsInvoice>
            </TabPanel>
            <TabPanel header="Payment Gateway">
                <SettingsPaymentGateway v-if="active==4"></SettingsPaymentGateway>
            </TabPanel>
            <TabPanel header="SMS Setup">
                <SettingsSms v-if="active==5"></SettingsSms>
            </TabPanel>
            <TabPanel header="Google Recaptcha">
                <SettingsGoogleRecaptcha v-if="active==6"></SettingsGoogleRecaptcha>
            </TabPanel>
            <!-- <TabPanel header="Email template">
                <SettingsEmailTemplate v-if="active==7"></SettingsEmailTemplate>
            </TabPanel> -->
        </TabView>
    </div>
</template>
<style>
</style>
