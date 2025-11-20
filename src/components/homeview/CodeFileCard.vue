<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import { formatDate } from '../../utils/date';
    import CodePreview from '../common/CodePreview.vue';
    import HoverableIcon from '../common/HoverableIcon.vue';

    const router = useRouter();
    const props = defineProps<{ id: number, name: string, creationDate: Date }>();

    function handleClickFile() {
        router.push({ path: '/file/' + props.id });
    }
</script>

<template>
    <div @click="handleClickFile" class="flex items-center gap-2 p-2 bg-neutral-600 rounded-md font-mono">
        <CodePreview />

        <div class="flex items-start flex-col justify-center grow">
            <p>{{ props.name }}</p>
            <p class="text-sm opacity-70">{{ formatDate(props.creationDate) }}</p>
        </div>

        <HoverableIcon icon="mdi:login" :size="24" />
    </div>
</template>


<style scoped>

</style>