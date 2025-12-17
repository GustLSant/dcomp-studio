<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import { formatDate } from '../../utils/date';
    import CodePreview from '../common/CodePreview.vue';
    import HoverableIcon from '../common/HoverableIcon.vue';

    const router = useRouter();
    const props = defineProps<{ id: number, name: string, date: Date }>();

    function handleClickFile() {
        router.push({ path: '/file/' + props.id });
    }
</script>

<template>
    <div @click="handleClickFile" class="flex items-center gap-2 asd rounded-r-md font-mono">
        <div class="neon-strike w-0.5 self-stretch primary-bg-gradient"></div>

        <div class="grow flex items-center gap-2 p-2 overflow-hidden">
            <CodePreview />

            <div class="flex items-start flex-col justify-center grow basis-1 overflow-auto">
                <p>{{ props.name }}</p>
                <p class="text-sm opacity-50">{{ formatDate(props.date) }}</p>
            </div>

            <HoverableIcon icon="mdi:login" :size="24" />
        </div>
    </div>
</template>


<style scoped>
    .asd {
        background-color: rgba(255,255,255, 2.5%);
        background-image: linear-gradient(to right, rgba(20, 140, 255, 5%), rgba(20, 140, 255, 10%), rgba(20, 140, 255, 5%));

        .neon-strike{
            filter: brightness(70%);
        }

        &:hover {
            cursor: pointer;
            background-image: linear-gradient(to right, rgba(20, 140, 255, 30%), rgba(20, 140, 255, 5%));

            .neon-strike{
                filter: brightness(100%);
            }
        }
    }
</style>