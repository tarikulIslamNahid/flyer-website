<script setup>
const route = useRoute()
watchEffect(() => {
    // set the useHead title
    useHead({
        title: route.params.status,
    });
})
</script>
<template>
    <div>
        <h1>{{route.params.status}}</h1>
    </div>
</template>
<style>
</style>