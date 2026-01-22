<script setup lang="ts">
    import HoverableIcon from '../common/HoverableIcon.vue';
    import Logo from '../../assets/logo/white.png'
    import ShinyContainer from '../common/shinyContainer/ShinyContainer.vue';
</script>


<template>
    <ShinyContainer class="p-0! pb-px! fixed top-0 left-0 right-0 z-30 shadow-md backdrop-brightness-50 max-w-(--max-app-width) m-auto">
        <div class="flex items-center justify-between p-2 px-4 bg-(--foreground)">
            <RouterLink to="/home" class="flex items-center gap-1.5">
                <img :src="Logo" class="w-8" />
                <div class="flex flex-col leading-tight font-mono">
                    <p>Dcomp</p>
                    <p class="text-xs -mt-1">Studio</p>
                </div>
            </RouterLink>
    
            <HoverableIcon icon="mdi:menu" :size="24" />
        </div>
    </ShinyContainer>
</template>


<style scoped>

</style>