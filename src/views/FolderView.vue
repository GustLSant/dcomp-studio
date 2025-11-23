<script setup lang="ts">
    import { onMounted, ref, watch } from 'vue';
    import HoverableIcon from '../components/common/HoverableIcon.vue';
    import type { FileType, FolderType } from '../types/entities';
    import LoadingComponent from '../components/common/LoadingComponent.vue';
    import { useRoute, useRouter } from 'vue-router';
    import { addFolder, getFolderById, getRootFolder } from '../services/folders';
    import { addFile } from '../services/files';
    import { Icon } from '@iconify/vue';
    import FolderPreview from '../components/folders/FolderPreview.vue';
    import { getDefaultFile, getDefaultFolder, getEntityType } from '../utils/entities';
    import FilePreview from '../components/files/FilePreview.vue';
    import ShinyContainer from '../components/common/shinyContainer/ShinyContainer.vue';
    import { createPopup } from '../utils/popup';
    import PrimaryShinyContainer from '../components/common/shinyContainer/PrimaryShinyContainer.vue';

    const folder = ref<FolderType | undefined>(undefined);
    const loading = ref<boolean>(false);
    const route = useRoute();
    const router = useRouter();

    onMounted(getFolderData);
    watch(() => (route.params), getFolderData);


    async function getFolderData() {
        const folderIdFromRoute = route.params.id;

        if (!folderIdFromRoute || Array.isArray(folderIdFromRoute)) { return; }

        const folderId: number = Number(folderIdFromRoute)
        const isRootFolder: boolean = folderId === 0;

        if (!isRootFolder) {
            loading.value = true;
    
            getFolderById(folderId)
            .then((_response) => {
                folder.value = _response;
            })
            .catch((_error) => {
                createPopup('error', 'Erro ao obter os dados da pasta', 'Por favor, tente novamente');
            })
            .finally(() => {
                loading.value = false;
            })
        }
        else {
            loading.value = true;

            getRootFolder()
            .then((_response) => {
                folder.value = _response;
            })
            .catch((_error) => {
                createPopup('error', 'Erro ao obter os dados da pasta', 'Por favor, tente novamente');
            })
            .finally(() => {
                loading.value = false;
            })
        }
    }


    async function handleClickAddFolder() {
        const newFolder: FolderType = getDefaultFolder();
        newFolder.parentFolderId = folder.value!.id!;

        addFolder(newFolder)
        .then((_response: number) => { getFolderData(); })
        .catch((_error) => { createPopup('error', 'Erro ao criar nova pasta', 'Por favor, tente novamente'); })
        .finally(() => {  })
    }


    async function handleClickAddFile() {
        const newFile: FileType = getDefaultFile();
        newFile.parentFolderId = folder.value!.id!;

        addFile(newFile)
        .then((_response) => { getFolderData(); })
        .catch((_error) => { createPopup('error', 'Erro ao criar arquivo', 'Por favor, tente novamente'); })
        .finally(() => {  })
    }


    function handleClickReturn() {
        router.back();
    }
</script>


<template>
    <div class="flex flex-col px-2 py-4 gap-4">

        <div class="flex items-center gap-2">
            <HoverableIcon icon="mdi:arrow-left" :size="24" @click="handleClickReturn" />
            <Icon icon="mdi:folder" width="28" height="28" />
            <p class="text-xl">Explorador de arquivos</p>
        </div>
        
        <div v-if="loading" class="flex items-center justify-center py-4">
            <LoadingComponent />
        </div>
        
        <ShinyContainer v-if="!loading && folder" class="rounded-md">
            <div class="flex flex-col gap-4 p-2 bg-(--foreground) rounded-md">
                <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                        <Icon icon="mdi:folder-outline" width="28" height="28" />
                        <p class="text-lg">/ {{ folder.name }}</p>
                    </div>

                    <div class="flex items-center gap-2">
                        <PrimaryShinyContainer class="rounded-sm">
                            <div class="p-2 rounded-sm bg-(--foreground)" @click="handleClickAddFolder" icon="mdi:create-new-folder-outline">
                                <Icon icon="mdi:create-new-folder-outline" width="24" height="24" />
                            </div>
                        </PrimaryShinyContainer>
                        <div class="p-2 rounded-sm primary-bg-gradient" @click="handleClickAddFile" icon="mdi:file-plus-outline">
                            <Icon icon="mdi:file-plus-outline" width="24" height="24" />
                        </div>
                    </div>
                </div>

                <div class="self-stretch bg-white/20 h-px"></div>

                <div class="flex gap-1 flex-wrap">
                    <template v-for="item in folder.content">
                        <FolderPreview v-if="getEntityType(item) === 'folder'" :folder="(item as FolderType)" />
                        <FilePreview v-else :file="(item as FileType)" />
                    </template>
                </div>
            </div>
        </ShinyContainer>
        
        <div v-if="!loading && !folder" class="grow flex flex-col items-center justify-center gap-1 -mt-[50px]">
            <p class="text-lg">Ops, algo deu errado</p>
            <p class="text-sm opacity-60 font-light">Por favor, recarregue a página para tentar novamente</p>
        </div>
    </div>
</template>


<style scoped>

</style>