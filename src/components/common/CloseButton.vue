<script setup lang="ts">
    import HoverableIcon from './HoverableIcon.vue';
    const props = defineProps<{ size?: number }>();
</script>


<template>
    <HoverableIcon icon="mdi:close" :size="(props.size) ? props.size : 22" class="absolute top-2 right-2 z-10" />
</template>


<style scoped>

</style>