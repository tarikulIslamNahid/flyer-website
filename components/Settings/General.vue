<script setup>
useHead({
  title: `Setting General`,
});
import { usePrimeVue } from 'primevue/config';
const $primevue = usePrimeVue();
import { ref, onMounted } from 'vue';
import { required,helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

const useCommon = useCommonStore();
useCommon.setBreadcrumbs([
    { label: 'Settings' },
    { label: 'General' }
]);

const generals = reactive({
    siteTitle: null,
    websiteFavIcon: null,
    websiteLogo: null,
    adminFavIcon: null,
    adminLogo: null,
});

// computed rules for generals
const generalsRules = computed(() => {
    return {
        siteTitle: {
            required: helpers.withMessage('The Site Title field is required', required,),
            $autoDirty: true,
        },
        websiteFavIcon: {
            required: helpers.withMessage('The Favicon field is required', required,),
            $autoDirty: true,
        },
        websiteLogo: {
            required: helpers.withMessage('The Website Logo field is required', required,),
            $autoDirty: true,
        },
        adminFavIcon: {
            required: helpers.withMessage('The Admin Favicon field is required', required,),
            $autoDirty: true,
        },
        adminLogo: {
            required: helpers.withMessage('The Admin Logo field is required', required,),
            $autoDirty: true,
        },
    };
});
const v$ = useVuelidate(generalsRules, generals)
const saveSettings =   () => {
     v$.value.$validate();
    console.log(v$.value.$error,'errors');
    console.log(v$.value,'values');
    v$.generals.$reset()
};

// File Upload
const websiteFavIcon =ref({
    files: [],
    totalSize: null,
    totalSizePercent: null,
});
const websiteLogo =ref({
    files: [],
    totalSize: null,
    totalSizePercent: null,
});
const adminFavIcon =ref({
    files: [],
    totalSize: null,
    totalSizePercent: null,
});
const adminLogo =ref({
    files: [],
    totalSize: null,
    totalSizePercent: null,
});
const onRemoveTemplatingFile = (file, removeFileCallback, index,fileObjectName,modelName) => {
    removeFileCallback(index);
    console.log(fileObjectName.totalSize,'fileObjectName')
    fileObjectName.totalSize -= parseInt(formatSize(file.size));
    fileObjectName.totalSizePercent = fileObjectName.totalSize / 10;
    generals[modelName] = null;
};
const onSelectedFiles = (event,fileObjectName,modelName) => {
    fileObjectName.files = event.files;
    generals[modelName] = fileObjectName.files[0];
    fileObjectName.files.forEach((file) => {
        fileObjectName.totalSize += parseInt(formatSize(file.size));
    });
};
// file upload end here
const formatSize = (bytes) => {
    const k = 1024;
    const dm = 3;
    const sizes = $primevue.config.locale.fileSizeTypes;
    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
    return `${formattedSize} ${sizes[i]}`;
};
</script>
<template>
    <div class="p-fluid">
        <form @submit.prevent="saveSettings">
            <div class="field"> 
                <label for="siteTitle">Site Title</label>
                <InputText  id="siteTitle" v-model="generals.siteTitle" required="true" :class="{'p-invalid': v$.siteTitle?.$error}"/> 
                <span v-if="v$.siteTitle.$error" role="alert" class="p-error">{{ v$.siteTitle?.$errors[0].$message}}</span>
           </div> 
           <div class="grid">
            <!-- website favicon  -->
                 <div class="field col-6">
                     <label for="websiteFavIcon">Website Favicon</label>
                        <FileUpload :class="{'p-invalid': v$.websiteFavIcon?.$error}" name="websiteFavIcon" :multiple="false" v-model="generals.websiteFavIcon" accept="image/*" :maxFileSize="1000000" @select="onSelectedFiles($event,websiteFavIcon,'websiteFavIcon')">
                            <template #header="{ chooseCallback }">
                                    <div class="flex gap-2">
                                        <Button @click="chooseCallback()" :disabled="websiteFavIcon.files.length > 0" size="small" label="upload" icon="pi pi-images" outlined></Button>  
                                    </div>
                                 
                            </template>
                            <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
                                <div v-if="files.length > 0">
                                        <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="p-fileupload-file">
                                         
                                                <img role="presentation" :alt="file.name" :src="file.objectURL" class="p-fileupload-file-thumbnail" width="50" data-pc-section="thumbnail" />
                                         
                                            <div class="p-fileupload-file-details">

                                                <span class="font-semibold">{{ file.name }}</span>
                                                <div>{{ formatSize(file.size) }}</div>
                                                <Badge value="Pending" severity="warning" />
                                            </div>
                                            <div class="p-fileupload-file-actions">

                                                <Button icon="pi pi-times" @click="onRemoveTemplatingFile(file, removeFileCallback, index,websiteFavIcon,'websiteFavIcon')" outlined size="small"  severity="danger" class="" />
                                            </div>
                                        </div>
                                </div>
                
                                <div v-if="uploadedFiles.length > 0">
                                    <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                        <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                            <div>
                                                <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                                            </div>
                                            <span class="font-semibold">{{ file.name }}</span>
                                            <div>{{ formatSize(file.size) }}</div>
                                            <Badge value="Completed" class="mt-3" severity="success" />
                                            <Button icon="pi pi-times" @click="removeUploadedFileCallback(index)" outlined size="small"  severity="danger" />
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #empty>
                                <div class="flex align-items-center justify-content-center flex-column">
                                    <i class="pi pi-cloud-upload border-2 border-circle p-3 text-5xl text-400 border-400" />
                                    <p class="mt-2 mb-0">Drag and drop files to here to upload.</p>
                                </div>
                            </template>
                        </FileUpload>
                <span v-if="v$.websiteFavIcon.$error" role="alert" class="p-error">{{ v$.websiteFavIcon?.$errors[0].$message}}</span>

                </div> 
            <!-- website favicon end -->
            <!-- website Logo   -->
                 <div class="field col-6">
                     <label for="websiteLogo">Website Logo</label>
                        <FileUpload :class="{'p-invalid': v$.websiteLogo?.$error}" name="websiteLogo" :multiple="false" v-model="generals.websiteLogo" accept="image/*" :maxFileSize="1000000" @select="onSelectedFiles($event,websiteLogo,'websiteLogo')">
                            <template #header="{ chooseCallback }">
                                    <div class="flex gap-2">
                                        <Button @click="chooseCallback()" :disabled="websiteLogo.files.length > 0" size="small" label="upload" icon="pi pi-images" outlined></Button>  
                                    </div>
                                 
                            </template>
                            <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
                                <div v-if="files.length > 0">
                                        <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="p-fileupload-file">
                                         
                                                <img role="presentation" :alt="file.name" :src="file.objectURL" class="p-fileupload-file-thumbnail" width="50" data-pc-section="thumbnail" />
                                         
                                            <div class="p-fileupload-file-details">

                                                <span class="font-semibold">{{ file.name }}</span>
                                                <div>{{ formatSize(file.size) }}</div>
                                                <Badge value="Pending" severity="warning" />
                                            </div>
                                            <div class="p-fileupload-file-actions">

                                                <Button icon="pi pi-times" @click="onRemoveTemplatingFile(file, removeFileCallback, index,websiteLogo,'websiteLogo')" outlined size="small"  severity="danger" class="" />
                                            </div>
                                        </div>
                                </div>
                
                                <div v-if="uploadedFiles.length > 0">
                                    <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                        <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                            <div>
                                                <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                                            </div>
                                            <span class="font-semibold">{{ file.name }}</span>
                                            <div>{{ formatSize(file.size) }}</div>
                                            <Badge value="Completed" class="mt-3" severity="success" />
                                            <Button icon="pi pi-times" @click="removeUploadedFileCallback(index)" outlined size="small"  severity="danger" />
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #empty>
                                <div class="flex align-items-center justify-content-center flex-column">
                                    <i class="pi pi-cloud-upload border-2 border-circle p-3 text-5xl text-400 border-400" />
                                    <p class="mt-2 mb-0">Drag and drop files to here to upload.</p>
                                </div>
                            </template>
                        </FileUpload>
                <span v-if="v$.websiteLogo.$error" role="alert" class="p-error">{{ v$.websiteLogo?.$errors[0].$message}}</span>

                </div> 
            <!-- website Logo end -->
            <!-- admin favicon   -->
                 <div class="field col-6">
                     <label for="adminFavIcon">Admin Favicon</label>
                        <FileUpload :class="{'p-invalid': v$.adminFavIcon?.$error}" name="adminFavIcon" :multiple="false" v-model="generals.adminFavIcon" accept="image/*" :maxFileSize="1000000" @select="onSelectedFiles($event,adminFavIcon,'adminFavIcon')">
                            <template #header="{ chooseCallback }">
                                    <div class="flex gap-2">
                                        <Button @click="chooseCallback()" :disabled="adminFavIcon.files.length > 0" size="small" label="upload" icon="pi pi-images" outlined></Button>  
                                    </div>
                                 
                            </template>
                            <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
                                <div v-if="files.length > 0">
                                        <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="p-fileupload-file">
                                         
                                                <img role="presentation" :alt="file.name" :src="file.objectURL" class="p-fileupload-file-thumbnail" width="50" data-pc-section="thumbnail" />
                                         
                                            <div class="p-fileupload-file-details">

                                                <span class="font-semibold">{{ file.name }}</span>
                                                <div>{{ formatSize(file.size) }}</div>
                                                <Badge value="Pending" severity="warning" />
                                            </div>
                                            <div class="p-fileupload-file-actions">

                                                <Button icon="pi pi-times" @click="onRemoveTemplatingFile(file, removeFileCallback, index,adminFavIcon,'adminFavIcon')" outlined size="small"  severity="danger" class="" />
                                            </div>
                                        </div>
                                </div>
                
                                <div v-if="uploadedFiles.length > 0">
                                    <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                        <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                            <div>
                                                <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                                            </div>
                                            <span class="font-semibold">{{ file.name }}</span>
                                            <div>{{ formatSize(file.size) }}</div>
                                            <Badge value="Completed" class="mt-3" severity="success" />
                                            <Button icon="pi pi-times" @click="removeUploadedFileCallback(index)" outlined size="small"  severity="danger" />
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #empty>
                                <div class="flex align-items-center justify-content-center flex-column">
                                    <i class="pi pi-cloud-upload border-2 border-circle p-3 text-5xl text-400 border-400" />
                                    <p class="mt-2 mb-0">Drag and drop files to here to upload.</p>
                                </div>
                            </template>
                        </FileUpload>
                <span v-if="v$.adminFavIcon.$error" role="alert" class="p-error">{{ v$.adminFavIcon?.$errors[0].$message}}</span>

                </div> 
            <!-- admin favicon end -->
            <!-- admin logo   -->
                 <div class="field col-6">
                     <label for="adminLogo">Admin Logo</label>
                        <FileUpload :class="{'p-invalid': v$.adminLogo?.$error}" name="adminLogo" :multiple="false" v-model="generals.adminLogo" accept="image/*" :maxFileSize="1000000" @select="onSelectedFiles($event,adminLogo,'adminLogo')">
                            <template #header="{ chooseCallback }">
                                    <div class="flex gap-2">
                                        <Button @click="chooseCallback()" :disabled="adminLogo.files.length > 0" size="small" label="upload" icon="pi pi-images" outlined></Button>  
                                    </div>
                                 
                            </template>
                            <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
                                <div v-if="files.length > 0">
                                        <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="p-fileupload-file">
                                         
                                                <img role="presentation" :alt="file.name" :src="file.objectURL" class="p-fileupload-file-thumbnail" width="50" data-pc-section="thumbnail" />
                                         
                                            <div class="p-fileupload-file-details">

                                                <span class="font-semibold">{{ file.name }}</span>
                                                <div>{{ formatSize(file.size) }}</div>
                                                <Badge value="Pending" severity="warning" />
                                            </div>
                                            <div class="p-fileupload-file-actions">

                                                <Button icon="pi pi-times" @click="onRemoveTemplatingFile(file, removeFileCallback, index,adminLogo,'adminLogo')" outlined size="small"  severity="danger" class="" />
                                            </div>
                                        </div>
                                </div>
                
                                <div v-if="uploadedFiles.length > 0">
                                    <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                                        <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                            <div>
                                                <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                                            </div>
                                            <span class="font-semibold">{{ file.name }}</span>
                                            <div>{{ formatSize(file.size) }}</div>
                                            <Badge value="Completed" class="mt-3" severity="success" />
                                            <Button icon="pi pi-times" @click="removeUploadedFileCallback(index)" outlined size="small"  severity="danger" />
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template #empty>
                                <div class="flex align-items-center justify-content-center flex-column">
                                    <i class="pi pi-cloud-upload border-2 border-circle p-3 text-5xl text-400 border-400" />
                                    <p class="mt-2 mb-0">Drag and drop files to here to upload.</p>
                                </div>
                            </template>
                        </FileUpload>
                <span v-if="v$.adminLogo.$error" role="alert" class="p-error">{{ v$.adminLogo?.$errors[0].$message}}</span>

                </div> 
            <!-- admin logo end -->
            
            </div>
        
               <div class="flex gap-2 justify-content-end mt-5"> 
                
                   <Button type="submit" class="px-6" label="Update" :disabled="v$.$errors.length!=0" />
               </div> 
           </form>
    </div>
</template>
<style>
</style>