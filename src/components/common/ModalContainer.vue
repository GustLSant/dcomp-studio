<script setup lang="ts">
    import { onBeforeUnmount, onMounted, ref } from 'vue';

    const modalContentRef = ref<HTMLElement | null>(null);
    const emit = defineEmits(['clickOutside']);

    onMounted(() => {
        document.body.style.overflow = "hidden";
    });
    onBeforeUnmount(() => {
        document.body.style.overflow = "";
    });

    const handleClickOutsideModal = (_event: MouseEvent) => {
        if(!modalContentRef.value) return;
        if(!modalContentRef.value.contains(_event.target as Node)){ emit('clickOutside'); }
    }
</script>


<template>
    <div @click="handleClickOutsideModal" class="z-50 fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center p-2 bg-black/30 backdrop-blur-sm">
        <div ref="modalContentRef" class="grow max-w-(--max-modal-width)">
            <slot />
        </div>
    </div>
</template>


<style scoped>

</style>