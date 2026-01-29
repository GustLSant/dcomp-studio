<script setup lang="ts">
    import { useRoute, useRouter } from 'vue-router';
    import { Icon } from '@iconify/vue';
    import Logo from '../common/Logo.vue';

    const route = useRoute();
    const router = useRouter();

    function handleClickButton() {
        if (route.path !== '/menu') { router.push('/menu'); }
        else { router.back(); }
    }
</script>


<template>
    <div class="fixed top-0 left-0 right-0 z-30 max-w-(--max-app-width) m-auto">

        <div class="flex items-center justify-between p-2">
            <RouterLink to="/" class="flex items-center gap-1.5">
                <Logo size="32px" />
                <div class="flex flex-col leading-tight font-mono">
                    <p>Dcomp</p>
                    <p class="text-xs -mt-1">Studio</p>
                </div>
            </RouterLink>
    
            <div @click="handleClickButton" class="flex items-center bg-(--foreground) py-2 px-4 gap-1.5 rounded-full border border-(--border-02)">
                <Icon :icon="(route.path !== '/menu') ? 'mdi:menu' : 'mdi:arrow-left'" width="24" height="24" />
                <p class="mr-1">{{ (route.path !== '/menu') ? 'Menu' : 'Voltar' }}</p>
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