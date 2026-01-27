<script setup lang="ts">
    import type { FileType, FolderType } from '../../../types/entities';
    import { openMoveEntityModal } from '../../../utils/actionModal';
    import FolderPreview from '../../entities/FolderPreview.vue';

    const props = defineProps<{ file:FileType, parentFolder: FolderType }>();
</script>


<template>
    <section class="flex-row! justify-between items-center">
        <p>Pasta de origem:</p>
        <FolderPreview :entity="props.parentFolder" :interactable="false" @click="() => { openMoveEntityModal(props.file) }" />
    </section>
</template>