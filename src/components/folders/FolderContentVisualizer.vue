<script setup lang="ts">
    import type { FileType, FolderType } from '../../types/entities';
    import FilePreview from '../files/FilePreview.vue';
    import FolderPreview from './FolderPreview.vue';

    const props = defineProps<{ folder: FolderType }>();
</script>


<template>
    <div class="flex items-center gap-2 flex-wrap">
        <div v-for="file in props.folder.content">
            <FolderPreview v-if="(Array.isArray(file.content))" :folder="(file as FolderType)" />
            <FilePreview v-else :file="(file as FileType)" />
        </div>
    </div>
</template>


<style scoped>

</style>