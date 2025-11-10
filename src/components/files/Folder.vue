<script setup lang="ts">
    import type { FolderType } from '../../types/entities';
    import './entity.css';
    import Button from '../common/Button.vue';

    const props = defineProps<{ folder: FolderType }>()
</script>


<template>
    <Button variant="secondary-filled" icon="mdi:folder">
        <p>{{ props.folder.name }}</p>
    </Button>
</template>


<style scoped>

</style>