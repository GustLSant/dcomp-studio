<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import CodeFileCard from './CodeFileCard.vue';
    import { getRecentFiles } from '../../services/files';
    import { onMounted, ref } from 'vue';
    import { type FileType, type FolderType } from '../../types/entities';
    import router from '../../router';
    import ShinyContainer from '../common/shinyContainer/ShinyContainer.vue';
    import { createPopup } from '../../utils/popup';
    import { openCreateEntityModal } from '../../utils/actionModal';
    import { getFolderById } from '../../services/folders';

    const fileList = ref<FileType[]>([]);

    onMounted(getFilesFromDB);

    async function getFilesFromDB() {
        getRecentFiles(5)
        .then((_response) => {
            fileList.value = _response;
        })
        .catch((_error) => {
            createPopup('error', 'Erro ao carregar os arquivos', 'Por favor, tente novamente');
            fileList.value = [];
        })
        .finally(() => {  })
    }

    async function handleClickAddFile() {
        const rootFolder: FolderType = await getFolderById(0);
        openCreateEntityModal('file', rootFolder);
    }

    function handleClickExploreFiles() {
        router.push({ name: 'Folder', params: { id: 0 } });
    }
</script>


<template>
    <ShinyContainer class="rounded-md mb-6">
        <section class="flex flex-col gap-6 bg-(--foreground) p-4 shadow-md rounded-md">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-1">
                    <Icon icon="mdi:file" width="20" height="20" />
                    <p class="text-lg">Arquivos Recentes</p>
                </div>

                <div @click="handleClickAddFile" class="py-1 px-2 border bg-(--primary) border-(--primary) rounded-sm hover:cursor-pointer">
                    <Icon icon="mdi:file-plus-outline" width="24" height="24" class="shrink-0" />
                </div>
            </div>

            <div class="flex flex-col gap-2 max-h-[312px] overflow-y-auto">
                <CodeFileCard v-for="(file, idx) in fileList" :key="idx" :id="file.id!" :name="file.name" :date="file.editDate"  />
            </div>

            <div class="flex items-center justify-end hover:cursor-pointer">
                <p @click="handleClickExploreFiles" class="text-sm text-(--primary) underline">Explorar todos os arquivos</p>
            </div>
        </section>
    </ShinyContainer>
</template>


<style scoped>
    
</style>