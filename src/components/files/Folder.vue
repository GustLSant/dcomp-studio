<script setup lang="ts">
    import type { FolderType } from '../../types/entities';
    import { Icon } from '@iconify/vue';
    import './entity.css';

    const props = defineProps<{ folder: FolderType }>()
</script>


<template>
    <div class="entity flex items-center gap-2 px-2 py-1 rounded-sm bg-gray-700 border border-white">
        <Icon icon="mdi:folder" />
        <p>{{ props.folder.name }}</p>
    </div>
</template>


<style scoped>

</style>