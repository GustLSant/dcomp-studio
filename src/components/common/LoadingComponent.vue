<script setup lang="ts">
    import { Icon } from '@iconify/vue';
</script>


<template>
    <div class="flex items-center justify-center gap-2 text-base pointer-events-none select-none">
        <Icon icon="mdi:loading" width="24" height="24" class="animate-spin" style="animation-duration: 0.6s;" />
        <p>Carregando...</p>
    </div>
</template>


<style scoped>

</style>