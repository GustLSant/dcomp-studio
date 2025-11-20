<script setup lang="ts">
    import type { FileType, FolderType } from '../../types/entities';
    import File from '../files/File.vue';
    import Folder from '../folders/Folder.vue';

    const props = defineProps<{ folder: FolderType }>();
</script>


<template>
    <div class="flex items-center gap-2 flex-wrap">
        <div v-for="file in props.folder.content">
            <Folder v-if="(Array.isArray(file.content))" :folder="(file as FolderType)" />
            <File v-else :file="(file as FileType)" />
        </div>
    </div>
</template>


<style scoped>

</style>