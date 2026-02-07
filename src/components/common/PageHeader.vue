<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    const props = defineProps<{ icon: string, title: string }>();
</script>


<template>
    <header class="flex items-center gap-2">
        <Icon :icon="props.icon" width="28" height="28" />
        <p class="text-xl">{{ props.title }}</p>
    </header>
</template>


<style scoped>

</style>