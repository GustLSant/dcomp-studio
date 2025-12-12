<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import type { FolderType } from '../../types/entities';
    import ShinyContainer from '../common/shinyContainer/ShinyContainer.vue';
    import EntityPreview from '../entities/EntityPreview.vue';

    const props = withDefaults(
        defineProps<{ folder: FolderType, interactable?: boolean }>(),
        {
            interactable: true
        }
    );

    const router = useRouter();

    function handleClick() {
        if (!props.interactable) return;
        router.push({ name: 'Folder', params: { id: props.folder.id } });
    }
</script>


<template>
    <ShinyContainer @click="handleClick" class="rounded-sm">
        <div class="bg-(--folder-bg-color) rounded-sm">
            <EntityPreview :name="props.folder.name" icon="mdi:folder-outline" :interactable="props.interactable" />
        </div>
    </ShinyContainer>
</template>


<style scoped>

</style>