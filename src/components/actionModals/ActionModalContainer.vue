<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { watch } from 'vue';
    
    const modalContentRef = ref<HTMLElement | null>(null);
    const modalName = ref<string>('actionModal');
    const isOpen = ref<boolean>(false);
    const route = useRoute();

    onMounted(() => { window.addEventListener('popstate', syncStateAndVisibility); });
    onUnmounted(() => { window.removeEventListener('popstate', syncStateAndVisibility); });


    watch(() => route.fullPath, clearModalFromHistory);


    function setModalName(_newName: string): void { modalName.value = _newName; }


    function requestModalOpen() {
        const isModalAlreadyOpen: boolean = history.state?.[modalName.value];
        if (isModalAlreadyOpen) return;

        history.pushState({ ...history.state, [modalName.value]: true }, '');
        syncStateAndVisibility(); // pq o pushState nao emit o evento popState
    }


    function requestModalClose() {
        if (history.state?.[modalName.value]) { history.back(); }
    }


    function syncStateAndVisibility() {
        const shouldBeOpen = !!history.state?.[modalName.value];

        if (shouldBeOpen) { openModal(); }
        else { closeModal(); }
    }


    function openModal() {
        isOpen.value = true;
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        isOpen.value = false
        document.body.style.overflow = ''
    }


    function handleClickOutsideModal (_event: MouseEvent) {
        if(!modalContentRef.value) return;
        if(!modalContentRef.value.contains(_event.target as Node)){ requestModalClose(); }
    }


    function clearModalFromHistory() {
        if (isOpen.value) {
            const newState = { ...history.state };
            delete newState[modalName.value];

            history.replaceState(newState, '');
            closeModal();
        }
    }


    defineExpose({
        isOpen,
        setModalName,
        requestModalOpen,
        requestModalClose,
    })
</script>


<template>
    <div v-if="isOpen" @click="handleClickOutsideModal" class="z-50 fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center p-2 bg-black/30 backdrop-blur-sm">
        <div ref="modalContentRef" class="grow max-w-(--max-modal-width)">
            <slot />
        </div>
    </div>
</template>


<style scoped>

</style>