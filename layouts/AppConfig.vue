<script setup>
import { ref } from 'vue';
import { usePrimeVue } from 'primevue/config';
import { useLayout } from './composables/layout';

defineProps({
    simple: {
        type: Boolean,
        default: false
    }
});

const $primevue = usePrimeVue();
const rippleActive = computed(() => $primevue.config.ripple);
const inputStyle = computed(() => $primevue.config.inputStyle);

const scales = ref([12, 13, 14, 15, 16]);
const visible = ref(false);
const { changeThemeSettings, setScale, layoutConfig } = useLayout();

const onConfigButtonClick = () => {
    visible.value = !visible.value;
};

const onChangeTheme = (theme, mode) => {
    const elementId = 'theme-css';
    const linkElement = document.getElementById(elementId);
    const cloneLinkElement = linkElement.cloneNode(true);
    const newThemeUrl = linkElement.getAttribute('href').replace(layoutConfig.theme.value, theme);

    cloneLinkElement.setAttribute('id', elementId + '-clone');
    cloneLinkElement.setAttribute('href', newThemeUrl);
    cloneLinkElement.addEventListener('load', () => {
        linkElement.remove();
        cloneLinkElement.setAttribute('id', elementId);
        changeThemeSettings(theme, mode === 'dark');
    });
    linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
};

const decrementScale = () => {
    setScale(layoutConfig.scale.value - 1);
    applyScale();
};

const incrementScale = () => {
    setScale(layoutConfig.scale.value + 1);
    applyScale();
};

const applyScale = () => {
    document.documentElement.style.fontSize = layoutConfig.scale.value + 'px';
};

const onInputStyleChange = (value) => {
    $primevue.config.inputStyle = value;
};

const onRippleChange = (value) => {
    $primevue.config.ripple = value;
};
</script>

<template>
    <button class="layout-config-button p-link" type="button" @click="onConfigButtonClick()">
        <i class="pi pi-cog"></i>
    </button>

    <Sidebar v-model:visible="visible" position="right" class="layout-config-sidebar w-20rem">
        <h5>Scale</h5>
        <div class="flex align-items-center">
            <Button icon="pi pi-minus" type="button" @click="decrementScale()" class="p-button-text p-button-rounded w-2rem h-2rem mr-2" :disabled="layoutConfig.scale.value === scales[0]"></Button>
            <div class="flex gap-2 align-items-center">
                <i v-for="scale in scales" :key="scale" class="pi pi-circle-fill text-300" :class="{ 'text-primary-500': scale === layoutConfig.scale.value }"></i>
            </div>
            <Button icon="pi pi-plus" type="button" @click="incrementScale()" class="p-button-text p-button-rounded w-2rem h-2rem ml-2" :disabled="layoutConfig.scale.value === scales[scales.length - 1]"></Button>
        </div>

        <template v-if="!simple">
            <h5>Menu Type</h5>
            <div class="flex">
                <div class="field-radiobutton flex-1">
                    <RadioButton v-model="layoutConfig.menuMode.value" name="menuMode" value="static" inputId="mode1"></RadioButton>
                    <label for="mode1">Static</label>
                </div>

                <div class="field-radiobutton flex-1">
                    <RadioButton v-model="layoutConfig.menuMode.value" name="menuMode" value="overlay" inputId="mode2"></RadioButton>
                    <label for="mode2">Overlay</label>
                </div>
            </div>
        </template>

        <template v-if="!simple">
            <h5>Input Style</h5>
            <div class="flex">
                <div class="field-radiobutton flex-1">
                    <RadioButton :modelValue="inputStyle" name="inputStyle" value="outlined" inputId="outlined_input" @update:modelValue="onInputStyleChange"></RadioButton>
                    <label for="outlined_input">Outlined</label>
                </div>
                <div class="field-radiobutton flex-1">
                    <RadioButton :modelValue="inputStyle" name="inputStyle" value="filled" inputId="filled_input" @update:modelValue="onInputStyleChange"></RadioButton>
                    <label for="filled_input">Filled</label>
                </div>
            </div>

            <h5>Ripple Effect</h5>
            <InputSwitch :modelValue="rippleActive" @update:modelValue="onRippleChange"></InputSwitch>
        </template>
  
        <h5>Tailwind</h5>
        <div class="grid">
            <div class="col-3">
                <button class="p-link w-2rem h-2rem" @click="onChangeTheme('tailwind-light', 'light')">
                    <img src="/layout/images/themes/tailwind-light.png" class="w-2rem h-2rem" alt="Tailwind Light" />
                </button>
            </div>
        </div>
 
        <h5>Mode</h5>
        <div class="grid">
             
            <div class="col-3">
                <button class="p-link w-2rem h-2rem" @click="onChangeTheme('lara-light-teal', 'light')">
                    <img src="/layout/images/themes/lara-light-teal.png" class="w-2rem h-2rem" alt="Lara Light Teal" />
                </button>
            </div>
             
            <div class="col-3">
                <button class="p-link w-2rem h-2rem" @click="onChangeTheme('lara-dark-teal', 'dark')">
                    <img src="/layout/images/themes/lara-dark-teal.png" class="w-2rem h-2rem" alt="Lara Dark Teal" />
                </button>
            </div>
        </div>
 
    </Sidebar>
</template>

<style lang="scss" scoped></style>
