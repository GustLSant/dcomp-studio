<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import Logo from '../assets/logo/new_white.png';
    import PulsingGridComponent from '../components/pulsingGrid/PulsingGridComponent.vue';
    import { ref } from 'vue';

    const isExiting = ref<boolean>(false)
    const router = useRouter();

    function handleClickContinue() {
        isExiting.value = true;
        setTimeout(() => { router.push('/home'); }, 600);
    }
</script>


<template>
    <div @click="handleClickContinue" class="relative flex flex-col min-h-screen p-4" :class="(isExiting) ? 'fade-out-short' : ''" style="animation-delay: 0.3s;">
        <PulsingGridComponent />

        <div class="flex items-center gap-2" :class="(isExiting) ? 'fade-out-left-normal' : 'fade-in-left-normal'">
            <img :src="Logo" alt="Logo" class="w-16 h-16" />
            <div class="flex flex-col font-mono font-light">
                <p class="text-4xl">Dcomp</p>
                <p class="text-2xl -mt-2">Studio</p>
            </div>
        </div>
    </div>

    <div class="fixed bottom-0 left-0 right-0 p-2 max-w-(--max-app-width) m-auto flex justify-end pointer-events-none">
        <div class="max-w-[80%] text-right flex flex-col items-end gap-2" :class="(isExiting) ? 'fade-out-right-normal' : 'fade-in-right-normal'" :style="{ animationDuration: (!isExiting) ? '0.6s' : '0.3s' }">
            <p class="max-w-60 text-3xl font-light">IDE MOBILE RÁPIDA E ACESSÍVEL PARA PROGRAMAÇÃO E ESTUDO USANDO PYTHON</p>
            <p class="text-xs font-light opacity-50">*Também disponível offline <a class="underline" href="https://www.google.com/search?q=como+instalar+pwa&ie=UTF-8" target="_blank">(instale a versão PWA)</a></p>
        </div>
    </div>
</template>


<style scoped>

</style>