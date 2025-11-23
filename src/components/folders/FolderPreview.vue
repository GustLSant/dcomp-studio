<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import type { FolderType } from '../../types/entities';
    import { Icon } from '@iconify/vue';
    import PrimaryShinyContainer from '../common/shinyContainer/PrimaryShinyContainer.vue';

    const props = defineProps<{ folder: FolderType }>();
    const router = useRouter();

    function handleClick() {
        router.push({ name: 'Folder', params: { id: props.folder.id } });
    }
</script>


<template>
    <PrimaryShinyContainer @click="handleClick" class="basis-1 grow max-w-[50%] rounded-sm">
        <div class="flex items-center gap-4 justify-between p-2 rounded-sm bg-(--foreground)">
            <div class="flex items-center gap-2">
                <Icon icon="mdi:folder-outline" width="22" height="22" />
                <p>{{ props.folder.name }}</p>
            </div>
            <Icon icon="mdi:dots-vertical" width="22" height="22" class="-mr-1" />
        </div>
    </PrimaryShinyContainer>
</template>


<style scoped>

</style>