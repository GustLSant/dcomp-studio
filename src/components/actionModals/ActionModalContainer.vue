<script setup lang="ts">
    import { ref } from 'vue';
    import Modal from '../common/Modal.vue';
    import LoadingOverlay from '../common/LoadingOverlay.vue';
    
    const open = ref<boolean>(false);
    const loading = ref<boolean>(false);
    
    function checkIsOpen() { return open.value; }
    function openModal() { open.value = true; }
    function closeModal() { open.value = false; }

    function setLoading(_newValue: boolean) { loading.value = _newValue; }

    defineExpose({
        checkIsOpen,
        openModal,
        closeModal,
        setLoading,
    })
</script>


<template>
    <Modal :open="open" @close="closeModal">
        <slot />
    </Modal>

    <LoadingOverlay v-if="loading" />
</template>


<style scoped>

</style>