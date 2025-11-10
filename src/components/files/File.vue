<script setup lang="ts">
    import type { FileType } from '../../types/entities';
    import './entity.css';
    import Button from '../common/Button.vue';

    const props = defineProps<{ file: FileType }>()
</script>


<template>
    <Button variant="primary-filled" icon="mdi:file-outline">
        <p>{{ props.file.name }}</p>
    </Button>
</template>


<style scoped>

</style>