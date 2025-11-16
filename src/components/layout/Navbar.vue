<script setup lang="ts">
    import HoverableIcon from '../common/HoverableIcon.vue';
    import Logo from '../../assets/logo/new_white.png'

</script>


<template>
    <div class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-2 px-4 bg-(--foreground) shadow-md">
        <div class="flex items-center gap-1.5">
            <img :src="Logo" class="w-8" />
            <div class="flex flex-col leading-tight font-mono">
                <p>Dcomp</p>
                <p class="text-xs -mt-1">Studio</p>
            </div>
        </div>

        <HoverableIcon icon="mdi:menu" :size="24" />
    </div>
</template>


<style scoped>

</style>