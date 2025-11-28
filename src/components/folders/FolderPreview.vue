<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import type { FolderType } from '../../types/entities';
    import { Icon } from '@iconify/vue';
    import ShinyContainer from '../common/shinyContainer/ShinyContainer.vue';

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
        <div class="shiny-background-color flex items-center gap-4 justify-between p-2 pr-3 rounded-sm">

            <div class="flex items-center gap-2 leading-tight whitespace-nowrap basis-1 grow overflow-hidden">
                <div class="shrink-0">
                    <Icon icon="mdi:folder-outline" width="22" height="22" />
                </div>
                <p class="basis-1 grow overflow-auto">{{ props.folder.name }}</p>
            </div>

            <Icon v-if="props.interactable" icon="mdi:dots-vertical" width="22" height="22" class="-mr-1" />

        </div>
    </ShinyContainer>
</template>


<style scoped>

</style>