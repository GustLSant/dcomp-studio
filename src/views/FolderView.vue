<script setup lang="ts">
    import { onMounted, onUnmounted, ref, watch } from 'vue';
    import { type FileType, type FolderType } from '../types/entities';
    import LoadingComponent from '../components/common/LoadingComponent.vue';
    import { useRoute } from 'vue-router';
    import { getFolderById, getFolderContent } from '../services/folders';
    import { Icon } from '@iconify/vue';
    import FolderPreview from '../components/entities/FolderPreview.vue';
    import FilePreview from '../components/entities/FilePreview.vue';
    import { createPopup } from '../utils/popup';
    import { openCreateEntityModal } from '../utils/actionModal';
    import eventBus from '../eventBus';
    import { EVENT_ENTITY_TREE_UPDATED } from '../events/entitiesTree';
    import PageHeader from '../components/common/PageHeader.vue';
    import PageContainer from '../components/common/PageContainer.vue';

    const folder = ref<FolderType | undefined>(undefined);
    const content = ref<(FolderType | FileType)[]>([]);
    const loading = ref<boolean>(false);
    const route = useRoute();

    onMounted(getFolderData);
    watch(() => (route.params), getFolderData);

    onMounted(()   => { eventBus.addEventListener(EVENT_ENTITY_TREE_UPDATED, getFolderData); });
    onUnmounted(() => { eventBus.removeEventListener(EVENT_ENTITY_TREE_UPDATED, getFolderData); })

    
    function getFolderData() {
        const folderId: number = getFolderIdFromRoute();

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


    function getFolderIdFromRoute(): number {
        const folderIdFromRoute = route.params.id;

        if (!folderIdFromRoute || Array.isArray(folderIdFromRoute)) { return 0; }

        return Number(folderIdFromRoute);
    }


    function handleClickAddFolder() {
        if (!folder.value) { return; }
        openCreateEntityModal('folder', folder.value);
    }

    function handleClickAddFile() {
        if (!folder.value) { return; }
        openCreateEntityModal('file', folder.value);
    }
</script>


<template>
    <PageContainer>
        <PageHeader icon="mdi:folder-outline" title="Explorador de arquivos" />
        
        <div v-if="loading" class="flex items-center justify-center py-4">
            <LoadingComponent />
        </div>
        
        <div v-if="!loading && folder && content" class="flex flex-col gap-4 p-2 bg-(--foreground) rounded-md border border-(--border-02)">
            <div class="flex items-center justify-between gap-2">
                <div class="flex items-center gap-2">
                    <Icon icon="mdi:folder-outline" width="28" height="28" />
                    <p class="text-lg">/ {{ folder.name }}</p>
                </div>

                <div class="flex items-center gap-2">
                    <div class="p-2 rounded-sm border border-(--border-01) bg-(--bg-input) hover:cursor-pointer" @click="handleClickAddFolder" icon="mdi:create-new-folder-outline">
                        <Icon icon="mdi:create-new-folder-outline" width="24" height="24" />
                    </div>
                    <div class="p-2 rounded-sm primary-bg-gradient hover:cursor-pointer" @click="handleClickAddFile" icon="mdi:file-plus-outline">
                        <Icon icon="mdi:file-plus-outline" width="24" height="24" />
                    </div>
                </div>
            </div>

            <div class="self-stretch bg-white/20 h-px"></div>

            <div v-if="content.length > 0" class="flex gap-1 items-start flex-wrap">
                <template v-for="entity in content">
                    <FolderPreview
                        v-if="entity.kind === 'folder'"
                        :entity="entity"
                        :interactable="true"
                        class="basis-1 grow max-w-[50%]"
                    />
                    <FilePreview
                        v-else
                        :entity="entity"
                        :interactable="true"
                        class="basis-1 grow max-w-[50%]"
                    />
                </template>
            </div>

            <div v-else class="grow flex flex-col items-center pb-4 opacity-40">
                <Icon icon="mdi:archive-alert-outline" width="28" height="28" />
                <p class="text-center">Nenhum conteúdo encontrado</p>
            </div>
        </div>
        
        <div v-if="!loading && !folder" class="grow flex flex-col items-center justify-center gap-1 -mt-[50px]">
            <p class="text-lg">Ops, algo deu errado</p>
            <p class="text-sm opacity-60 font-light">Por favor, recarregue a página para tentar novamente</p>
        </div>
    </PageContainer>
</template>


<style scoped>

</style>