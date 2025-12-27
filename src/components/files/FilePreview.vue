<script setup lang="ts">
    import type { EntityPreviewPropType } from '../../types/entities';
    import PrimaryShinyContainer from '../common/shinyContainer/PrimaryShinyContainer.vue';
    import EntityPreview from '../entities/EntityPreview.vue';

    const props = withDefaults(
        defineProps<Omit<EntityPreviewPropType, 'icon'>>(), { interactable: true }
    );
</script>


<template>
    <PrimaryShinyContainer class="rounded-sm">
        <EntityPreview
            :entity="props.entity"
            icon="mdi:file-outline"
            :interactable="props.interactable"
            class="bg-(--folder-bg-color) rounded-sm"
        />
    </PrimaryShinyContainer>
</template>


<style scoped>

</style>