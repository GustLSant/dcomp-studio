<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    const props = defineProps<{ icon: string, size: number, disabled?: boolean }>();
</script>


<template>
    <div class="border border-transparent p-1 rounded-full transition-colors duration-150 hover:border-black/20 dark:hover:border-white/20 hover:cursor-pointer select-none" :class="(props.disabled) ? 'opacity-40 pointer-events-none' : ''">
        <Icon :icon="props.icon" :width="props.size" :height="props.size" />
    </div>
</template>


<style scoped>

</style>