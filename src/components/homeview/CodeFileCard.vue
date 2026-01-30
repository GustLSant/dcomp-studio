<script setup lang="ts">
    import { formatDate } from '../../utils/date';
    import CodePreview from '../common/CodePreview.vue';
    import HoverableIcon from '../common/HoverableIcon.vue';

    const props = defineProps<{ id: number, name: string, date: Date }>();
</script>


<template>
    <RouterLink :to="{ path: '/file/' + props.id }" class="file-card-light dark:file-card-dark flex items-center gap-2 rounded-r-md font-mono">
        <div class="w-0.5 self-stretch bg-(--primary) brightness-150 dark:brightness-75"></div>

        <div class="grow flex items-center gap-2 p-2 overflow-hidden">
            <CodePreview />

            <div class="flex items-start flex-col justify-center grow basis-1 overflow-auto">
                <p class="interactive-themed-text">{{ props.name }}</p>
                <p class="text-sm opacity-50 leading-tight">{{ formatDate(props.date) }}</p>
            </div>

            <HoverableIcon icon="mdi:login" :size="24" icon-class="interactive-themed-text" />
        </div>
    </RouterLink>
</template>


<style scoped>
    .file-card-dark {
        background-color: rgba(255,255,255, 5%);
        background-image: linear-gradient(to right, rgba(20, 140, 255, 15%), transparent, transparent);
        
        &:hover {
            cursor: pointer;
            background-color: rgba(255,255,255, 7.5%);
        }
    }

    .file-card-light {
        background-color: var(--foreground-02);
        background-image: none;
        
        &:hover {
            cursor: pointer;
            outline: 1px solid var(--border-02);
        }
    }
</style>