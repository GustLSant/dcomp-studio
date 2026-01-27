<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import type { EntityPreviewPropType } from '../../types/entities';
    import { openEntityMenu } from '../../utils/entities';
    import { useRouter } from 'vue-router';

    const props = defineProps<EntityPreviewPropType>();
    const router = useRouter();

    function handleClickMenu() {
        if (!props.interactable) return;
        openEntityMenu(props.entity.id!, props.entity.kind);
    }

    function handleClick(_event: MouseEvent) {
        if (!props.interactable) return;
        const routeName: string = props.entity.kind === 'file' ? 'File' : 'Folder';
        router.push({ name: routeName, params: { id: props.entity.id } });
    }
</script>


<template>
    <div @click="handleClick" class="flex items-center gap-4 justify-between p-2 pr-3 rounded-sm bg-(--bg-input) border border-(--border-01) hover:cursor-pointer hover:underline">

        <div class="flex items-center gap-2 leading-tight whitespace-nowrap basis-1 grow overflow-hidden">
            <div class="shrink-0">
                <Icon :icon="props.icon" width="22" height="22" />
            </div>
            <p class="basis-1 grow overflow-x-auto">{{ props.entity.name }}</p>
        </div>

        <Icon v-if="props.interactable" @click.stop="handleClickMenu" icon="mdi:dots-vertical" width="22" height="22" class="-mr-1" />

    </div>
</template>


<style scoped>

</style>