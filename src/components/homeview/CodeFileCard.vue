<script setup lang="ts">
import CodePreview from '../common/CodePreview.vue';
import HoverableIcon from '../common/HoverableIcon.vue';

    const props = defineProps<{
        fileName: string,
        creationDate: Date,
    }>();
</script>

<template>
    <div class="flex items-center gap-2 p-2 bg-neutral-600 rounded-md font-mono">
        <CodePreview />

        <div class="flex items-start flex-col justify-center gap-1 grow">
            <p>{{ props.fileName }}</p>
            <p class="text-sm opacity-70">{{ props.creationDate.getDate() }}</p>
        </div>

        <HoverableIcon icon="mdi:login" :size="24" />
    </div>
</template>


<style scoped>

</style>