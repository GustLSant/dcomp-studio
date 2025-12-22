<script setup lang="ts">
    import { onBeforeUnmount, onMounted, ref } from 'vue';
    import CloseButton from './CloseButton.vue';
    import TransitionFadeHorizontal from '../transitions/TransitionFadeHorizontal.vue';

    const props = withDefaults(defineProps<{ open?: boolean, persistent?: boolean }>(), {
        open: true,
        persistent: false,
    });

    const modalContentRef = ref<HTMLElement | null>(null);
    const emit = defineEmits(['close']);

    onMounted(() => {
        document.body.style.overflow = "hidden";
    });
    onBeforeUnmount(() => {
        document.body.style.overflow = "";
    });

    const handleClickOutsideModal = (_event: MouseEvent) => {
        if(props.persistent || !modalContentRef.value) return;
        if(!modalContentRef.value.contains(_event.target as Node)){ emit('close'); }
    }
</script>


<template>
    <TransitionFadeHorizontal>
        <div v-if="props.open" @click="handleClickOutsideModal" class="z-50 fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center p-2 bg-black/30 backdrop-blur-sm">
            <div ref="modalContentRef" class="grow relative max-w-(--max-modal-width)">
                <CloseButton @click="() => { emit('close'); }" />
                <slot />
            </div>
        </div>
    </TransitionFadeHorizontal>
</template>


<style scoped>

</style>