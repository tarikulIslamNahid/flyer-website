<script setup>
useHead({
  title: `Email Template`,
});
const useCommon = useCommonStore();
useCommon.setBreadcrumbs([
    { label: 'Settings' },
    { label: 'Email Template' }
]); 
</script>
<template>
    <div>
        <h1>Email Template</h1> 
    </div>
</template>
<style>
</style>