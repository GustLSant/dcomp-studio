<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue';
    import LoadingOverlay from '../common/LoadingOverlay.vue';

    const modalContentRef = ref<HTMLElement | null>(null);
    const isOpen = ref<boolean>(false);
    const isLoading = ref<boolean>(false);

    onMounted(() => { window.addEventListener('popstate', onPopState); });
    onUnmounted(() => { window.removeEventListener('popstate', onPopState); });

    function openModal() {
        history.pushState({ modal: true }, ''); // empilha estado no histórico
        document.body.style.overflow = "hidden";
        isOpen.value = true;
    }

    function closeModal() {
        if (history.state?.modal) { history.back(); } // Remove o estado do histórico sem voltar página
        document.body.style.overflow = "";
        isOpen.value = false;
    }
    
    
    function onPopState(event: PopStateEvent) {
        if (isOpen.value) {
            event.preventDefault(); // Intercepta o botão voltar
            isOpen.value = false;
        }
    }


    const handleClickOutsideModal = (_event: MouseEvent) => {
        if(!modalContentRef.value) return;
        if(!modalContentRef.value.contains(_event.target as Node)){ closeModal(); }
    }


    defineExpose({
        isOpen,
        isLoading,
        openModal,
        closeModal,
    })
</script>


<template>
    <div v-if="isOpen" @click="handleClickOutsideModal" class="z-50 fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center p-2 bg-black/30 backdrop-blur-sm">
        <LoadingOverlay v-if="isLoading" />

        <div ref="modalContentRef" class="grow max-w-(--max-modal-width)">
            <slot />
        </div>
    </div>
</template>


<style scoped>

</style>