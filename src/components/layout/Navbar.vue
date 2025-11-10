<script setup lang="ts">
    import HoverableIcon from '../common/HoverableIcon.vue';


</script>


<template>
    <div class="fixed top-0 left-0 right-0 flex items-center justify-between p-2 px-4 bg-(--foreground) shadow-md">
        <div class="flex flex-col leading-tight">
            <p>Dcomp</p>
            <p class="text-xs">Studio</p>
        </div>

        <HoverableIcon icon="mdi:menu" :size="24" />
    </div>
</template>


<style scoped>

</style>