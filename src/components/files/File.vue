<script setup lang="ts">
    import type { FileType } from '../../types/entities';
    import { Icon } from '@iconify/vue';
    import './entity.css';

    const props = defineProps<{ file: FileType }>()
</script>


<template>
    <div class="entity flex items-center gap-2 px-2 py-1 rounded-sm bg-gray-700 border border-white">
        <Icon icon="mdi:file-outline" />
        <p>{{ props.file.name }}</p>
    </div>
</template>


<style scoped>

</style>