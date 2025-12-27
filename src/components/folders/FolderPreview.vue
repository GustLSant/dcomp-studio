<script setup lang="ts">
    import type { EntityPreviewPropType } from '../../types/entities';
    import ShinyContainer from '../common/shinyContainer/ShinyContainer.vue';
    import EntityPreview from '../entities/EntityPreview.vue';

    const props = withDefaults(
        defineProps<Omit<EntityPreviewPropType, 'icon'>>(), { interactable: true }
    );
</script>


<template>
    <ShinyContainer class="rounded-sm">
        <EntityPreview
            :entity="props.entity"
            icon="mdi:folder-outline"
            :interactable="props.interactable"
            class="bg-(--folder-bg-color) rounded-sm"
        />
    </ShinyContainer>
</template>


<style scoped>

</style>