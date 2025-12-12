<script setup lang="ts">
    import { onMounted, ref, watch } from 'vue';
    import HoverableIcon from '../components/common/HoverableIcon.vue';
    import { type EntityKind, type FileType, type FolderType } from '../types/entities';
    import LoadingComponent from '../components/common/LoadingComponent.vue';
    import { useRoute, useRouter } from 'vue-router';
    import { getFolderById, getFolderContent } from '../services/folders';
    import { Icon } from '@iconify/vue';
    import FolderPreview from '../components/folders/FolderPreview.vue';
    import FilePreview from '../components/files/FilePreview.vue';
    import ShinyContainer from '../components/common/shinyContainer/ShinyContainer.vue';
    import { createPopup } from '../utils/popup';
    import CreateEntityModal from '../components/common/CreateEntityModal.vue';

    const folder = ref<FolderType | undefined>(undefined);
    const content = ref<(FolderType | FileType)[]>([]);
    const loading = ref<boolean>(false);
    const route = useRoute();
    const router = useRouter();

    const canShowCreatingModal = ref<boolean>(false);
    const newEntityKind = ref<EntityKind>('file');

    onMounted(getFolderData);
    watch(() => (route.params), getFolderData);


    async function getFolderData() {
        canShowCreatingModal.value = false;
        const folderIdFromRoute = route.params.id;

        if (!folderIdFromRoute || Array.isArray(folderIdFromRoute)) { return; }

        const folderId: number = Number(folderIdFromRoute);

        loading.value = true;

        getFolderById(folderId)
        .then((_response) => {
            folder.value = _response;
        })
        .catch((_error) => {
            createPopup('error', 'Erro ao obter os dados da pasta', 'Por favor, tente novamente');
        })
        .finally(() => {
            getFolderContent(folderId)
            .then((_response) => { content.value = _response; })
            .catch((_error)   => { createPopup('error', 'Erro ao obter os dados da pasta', 'Por favor, tente novamente'); })
            .finally(()       => { loading.value = false; })
        })
    }


    async function handleClickAddFolder() {
        newEntityKind.value = 'folder';
        canShowCreatingModal.value = true;
    }

    async function handleClickAddFile() {
        newEntityKind.value = 'file';
        canShowCreatingModal.value = true;
    }


    function handleClickReturn() {
        router.back();
    }
</script>


<template>
    <CreateEntityModal
        v-if="canShowCreatingModal && folder"
        :kind="newEntityKind"
        :parent-folder="folder"
        @close-modal="() => { canShowCreatingModal = false; }"
        @update-content="getFolderData"
    />

    <div class="flex flex-col px-2 py-4 gap-4">

        <div class="flex items-center gap-2">
            <HoverableIcon icon="mdi:arrow-left" :size="24" @click="handleClickReturn" />
            <Icon icon="mdi:folder" width="28" height="28" />
            <p class="text-xl">Explorador de arquivos</p>
        </div>
        
        <div v-if="loading" class="flex items-center justify-center py-4">
            <LoadingComponent />
        </div>
        
        <ShinyContainer v-if="!loading && folder && content" class="rounded-md">
            <div class="flex flex-col gap-4 p-2 bg-(--foreground) rounded-md">
                <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2">
                        <Icon icon="mdi:folder-outline" width="28" height="28" />
                        <p class="text-lg">/ {{ folder.name }}</p>
                    </div>

                    <div class="flex items-center gap-2">
                        <ShinyContainer class="rounded-sm">
                            <div class="p-2 rounded-sm shiny-background-color" @click="handleClickAddFolder" icon="mdi:create-new-folder-outline">
                                <Icon icon="mdi:create-new-folder-outline" width="24" height="24" />
                            </div>
                        </ShinyContainer>
                        <div class="p-2 rounded-sm primary-bg-gradient" @click="handleClickAddFile" icon="mdi:file-plus-outline">
                            <Icon icon="mdi:file-plus-outline" width="24" height="24" />
                        </div>
                    </div>
                </div>

                <div class="self-stretch bg-white/20 h-px"></div>

                <div class="flex gap-1 items-start flex-wrap">
                    <template v-for="entity in content">
                        <FolderPreview v-if="entity.kind === 'folder'" :folder="(entity as FolderType)" class="basis-1 grow max-w-[50%]" />
                        <FilePreview v-else :file="(entity as FileType)" class="basis-1 grow max-w-[50%]" />
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