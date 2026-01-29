<script setup lang="ts">
    import { Icon } from '@iconify/vue';

    type MenuCardPropsType = {
        label: string,
        icon: string,
        link: string,
    }

    const props = defineProps<MenuCardPropsType>();
</script>


<template>
    <RouterLink :to="props.link" class="flex items-center justify-between gap-2 p-3 rounded-md border border-(--border-02) shadow-md bg-(--foreground) hover:brightness-120 hover:underline transition-colors fade-in-left-short">
        <div class="flex items-center gap-2">
            <Icon :icon="props.icon" width="22" height="22" />
            <p>{{ props.label }}</p>
        </div>
        <Icon icon="mdi:login" width="24" height="24" />
    </RouterLink>
</template>


<style scoped>

</style>