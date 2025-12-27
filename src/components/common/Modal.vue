<script setup lang="ts">
    import { ref, watch } from 'vue';
    import CloseButton from './CloseButton.vue';
    import TransitionFadeHorizontal from '../transitions/TransitionFadeHorizontal.vue';
    import { useRoute } from 'vue-router';

    const props = withDefaults(defineProps<{ open?: boolean, persistent?: boolean }>(), {
        open: true,
        persistent: false,
    });

    const modalContentRef = ref<HTMLElement | null>(null);
    const route = useRoute();
    const emit = defineEmits(['close']);

    watch(() => props.open, handleOpenChange);
    watch(() => route.fullPath, handleRouteChange);

    function handleOpenChange() {
        if (props.open) { document.body.style.overflow = "hidden"; }
        else { document.body.style.overflow = ""; }
    }

    function handleClickOutsideModal(_event: MouseEvent) {
        if (props.persistent || !modalContentRef.value) return;
        if (!modalContentRef.value.contains(_event.target as Node)) { emit('close'); }
    }

    function handleRouteChange() {
        if (props.open) {  emit('close'); }
    }
</script>


<template>
    <TransitionFadeHorizontal>
        <div v-if="props.open" @click="handleClickOutsideModal" class="z-50 fixed top-0 bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm">
            <div class="w-full h-full flex items-center justify-center">
                <div ref="modalContentRef" class="relative basis-(--max-modal-width) max-h-full p-2 overflow-y-auto">
                    <CloseButton @click="() => { emit('close'); }" />
                    <slot />
                </div>
            </div>
        </div>
    </TransitionFadeHorizontal>
</template>


<style scoped>

</style>