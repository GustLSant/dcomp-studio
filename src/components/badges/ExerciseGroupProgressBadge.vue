<script setup lang="ts">
    import { Icon } from '@iconify/vue';

    const props = defineProps<{ progress: number }>();
</script>


<template>
    <div class="flex items-center gap-1" :class="(progress === 100) ? 'text-(--success-color)' : 'opacity-60'">
        <p>{{ progress }}%</p>
        <Icon v-if="progress === 100" icon="mdi:medal-outline" width="18" height="18" />
        <Icon v-else icon="material-symbols:do-not-disturb-on-outline-rounded" width="18" height="18" /> 
    </div>
</template>


<style scoped>

</style>