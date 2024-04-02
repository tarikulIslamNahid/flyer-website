
<script setup>
// props declaration
const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    isPaginate: {
        type: Boolean,
        default: false
    }

});
import { FilterMatchMode } from 'primevue/api';
const filters = ref({
  'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});



</script>
<template>
    <div class="card shadow-1 mt-0">
        <h4>{{title}}</h4>
        <Toolbar v-if="isPaginate" class="mb-4">
            <template #end>
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filters['global'].value" placeholder="Search..." />
                </span>
            </template>

        </Toolbar>
    <DataTable :value="data" :filters="filters" :paginator="isPaginate" :rows="isPaginate==true?10:0"   :paginatorTemplate="isPaginate==true?'PrevPageLink PageLinks NextPageLink CurrentPageReport RowsPerPageDropdown':''" :rowsPerPageOptions="[5,10,25]"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" tableStyle="min-width: 50rem">
        <Column field="id" header="SL"></Column>
        <Column field="name" header="Template Name"></Column>
        <Column field="type" header="Type"></Column>
        <Column field="downloads" header="Downloads"></Column>
    </DataTable>
    </div>
</template>
<style>
</style>