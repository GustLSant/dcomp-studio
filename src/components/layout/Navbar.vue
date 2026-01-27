<script setup lang="ts">
    import Logo from '../../assets/logo/white.png'
    import { Icon } from '@iconify/vue';
</script>


<template>
    <div class="fixed top-0 left-0 right-0 z-30 max-w-(--max-app-width) m-auto">

        <div class="flex items-center justify-between p-2">
            <RouterLink to="/" class="flex items-center gap-1.5">
                <img :src="Logo" class="w-8" />
                <div class="flex flex-col leading-tight font-mono">
                    <p>Dcomp</p>
                    <p class="text-xs -mt-1">Studio</p>
                </div>
            </RouterLink>
    
            <div class="flex items-center bg-(--foreground) py-2 px-4 gap-1.5 rounded-full border border-(--border-02)">
                <Icon icon="mdi:menu" width="24" height="24" />
                <p class="mr-1">Menu</p>
            </div>
        </div>

    </div>
</template>


<style scoped>
    .aa {
        border-top: 1px solid rgba(255,255,255, 0.15);
        border-left: 1px solid rgba(255,255,255, 0.15);
    }
</style>