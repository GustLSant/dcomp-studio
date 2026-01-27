<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import HoverableIcon from './HoverableIcon.vue';
    import { useRouter } from 'vue-router';

    const props = defineProps<{ icon: string, title: string }>();
    const router = useRouter();

    function handleClickReturn() {
        router.back();
    }
</script>


<template>
    <header class="flex items-center gap-2">
        <HoverableIcon icon="mdi:arrow-left" :size="24" @click="handleClickReturn" />
        <Icon :icon="props.icon" width="28" height="28" />
        <p class="text-xl">{{ props.title }}</p>
    </header>
</template>


<style scoped>

</style>