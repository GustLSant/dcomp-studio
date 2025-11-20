<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import CodeFileCard from './CodeFileCard.vue';
    import { addFile, getRecentFiles } from '../../services/files';
    import { getDefaultFile } from '../../utils/entities';
    import { onMounted, ref } from 'vue';
    import { type FileType } from '../../types/entities';
    import router from '../../router';

    const fileList = ref<FileType[]>([]);

    onMounted(getFilesFromDB);

    async function getFilesFromDB() {
        fileList.value = await getRecentFiles(5);
    }

    async function handleClickAddFile() {
        const newFileId: number = await addFile(getDefaultFile());
        router.push('/file/' + newFileId.toString());
    }
</script>


<template>
    <section class="flex flex-col gap-6 bg-(--foreground) p-4 shadow-md rounded-md border border-neutral-600 mb-6">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-1">
                <Icon icon="mdi:file" width="20" height="20" />
                <p class="text-lg">Arquivos Recentes</p>
            </div>

            <div class="py-1 px-2 border bg-(--primary) border-(--primary) rounded-sm">
                <Icon @click="handleClickAddFile" icon="mdi:add" width="24" height="24" class="shrink-0" />
            </div>
        </div>

        <div class="flex flex-col gap-2 max-h-[312px] overflow-y-auto">
            <CodeFileCard v-for="(file, idx) in fileList" :key="idx" :id="file.id!" :name="file.name" :creation-date="file.creationDate"  />
        </div>

        <div class="flex items-center justify-end">
            <p class="text-sm text-(--primary) underline">Explorar todos os arquivos</p>
        </div>
    </section>
</template>


<style scoped>

</style>