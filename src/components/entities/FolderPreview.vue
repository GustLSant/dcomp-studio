<script setup lang="ts">
    import type { EntityPreviewPropType } from '../../types/entities';
    import EntityPreview from '../entities/EntityPreview.vue';

    const props = withDefaults(
        defineProps<Omit<EntityPreviewPropType, 'icon'>>(), { interactable: true }
    );
</script>


<template>
    <EntityPreview
        :entity="props.entity"
        icon="mdi:folder-outline"
        :interactable="props.interactable"
    />
</template>


<style scoped>

</style>