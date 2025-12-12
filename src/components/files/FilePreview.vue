<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import type { FileType } from '../../types/entities';
    import { Icon } from '@iconify/vue';
    import PrimaryShinyContainer from '../common/shinyContainer/PrimaryShinyContainer.vue';
    const props = defineProps<{ file: FileType }>();
    const router = useRouter();

    function handleClick() {
        router.push({ name: 'File', params: { id: props.file.id } });
    };
</script>


<template>
    <PrimaryShinyContainer @click="handleClick" class="rounded-sm">
        <div class="flex items-center gap-4 justify-between p-2 rounded-sm bg-(--foreground)">
            
            <div class="flex items-center gap-2 leading-tight whitespace-nowrap basis-1 grow overflow-hidden">
                <div class="shrink-0">
                    <Icon icon="mdi:file-code-outline" width="22" height="22" />
                </div>
                <p class="basis-1 grow overflow-auto">{{ props.file.name }}</p>
            </div>

            <Icon icon="mdi:dots-vertical" width="22" height="22" class="-mr-1" />

        </div>
    </PrimaryShinyContainer>
</template>


<style scoped>

</style>