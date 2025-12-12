<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import type { EntityPreviewPropType } from '../../types/entities';

    const props = withDefaults(
        defineProps<EntityPreviewPropType>(),
        {
            interactable: true,
        }
    );
</script>


<template>
    <div class="flex items-center gap-4 justify-between p-2 pr-3 rounded-sm">

        <div class="flex items-center gap-2 leading-tight whitespace-nowrap basis-1 grow overflow-hidden">
            <div class="shrink-0">
                <Icon :icon="props.icon" width="22" height="22" />
            </div>
            <p class="basis-1 grow overflow-auto">{{ props.name }}</p>
        </div>

        <Icon v-if="props.interactable" icon="mdi:dots-vertical" width="22" height="22" class="-mr-1" />

    </div>
</template>


<style scoped>

</style>