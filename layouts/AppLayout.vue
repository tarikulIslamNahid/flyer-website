<script setup>
import { computed, watch, ref } from 'vue';
import { usePrimeVue } from 'primevue/config';
import AppTopbar from './AppTopbar.vue';
import AppSidebar from './AppSidebar.vue';
import AppConfig from './AppConfig.vue';
import { useLayout } from './composables/layout';

const $primevue = usePrimeVue();
const { layoutConfig, layoutState, isSidebarActive } = useLayout();
const outsideClickListener = ref(null);

watch(isSidebarActive, (newVal) => {
    if (newVal) {
        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }
});
const containerClass = computed(() => {
    return { 
        'layout-static': layoutConfig.menuMode.value === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive.value,
        'layout-mobile-active': layoutState.staticMenuMobileActive.value,
        'p-input-filled': $primevue.config.inputStyle === 'filled',
        'p-ripple-disabled': $primevue.config.ripple === false
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                layoutState.overlayMenuActive.value = false;
                layoutState.staticMenuMobileActive.value = false;
                layoutState.menuHoverActive.value = false;
            }
        };

        document.addEventListener('click', outsideClickListener.value);
    }
};

const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};

const isOutsideClicked = (event) => {
    const sidebarEl = document.querySelector('.layout-sidebar');
    const topbarEl = document.querySelector('.layout-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
const home = ref({
    icon: 'pi pi-home',
    route: '/'
});
const useCommon = useCommonStore();
// setBreadcrumbs 

</script>

<template>
    <div class="layout-wrapper" :class="containerClass">
        <Toast />
        <div class="layout-sidebar">
            <app-sidebar></app-sidebar>
        </div>
        <div class="layout-main-container">
            <app-topbar></app-topbar>
            <div class="layout-main">
            <Breadcrumb class="subHeader" :home="home" :model="useCommon.breadcrumbs">
                <template #item="{ item, props }">
                    <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                        <a :href="href" v-bind="props.action" @click="navigate">
                            <span :class="[item.icon, 'text-color']" />
                            <span class="text-primary font-semibold">{{ item.label }}</span>
                        </a>
                    </router-link>
                    <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                        <span class="text-color">{{ item.label }}</span>
                    </a>
                </template>
            </Breadcrumb>
                <!-- <router-view></router-view> -->
                <NuxtPage />
            </div>
            <AppFooter />
        </div>
        <!-- 
            HIDE CONFIGURATION SIDEBAR 
            <app-config></app-config>
        -->
        <div class="layout-mask"></div>
    </div>
</template>

<style lang="scss" scoped></style>
