<script setup lang="ts">
    import { ref, watch } from 'vue';
    import CloseButton from './CloseButton.vue';
    import TransitionFadeHorizontal from '../transitions/TransitionFadeHorizontal.vue';

    const props = withDefaults(defineProps<{ open?: boolean, persistent?: boolean }>(), {
        open: true,
        persistent: false,
    });

    const modalContentRef = ref<HTMLElement | null>(null);
    const emit = defineEmits(['close']);

    watch(() => props.open, handleOpenChange);

    function handleOpenChange() {
        if (props.open) { document.body.style.overflow = "hidden"; }
        else { document.body.style.overflow = ""; }
    }

    const handleClickOutsideModal = (_event: MouseEvent) => {
        if(props.persistent || !modalContentRef.value) return;
        if(!modalContentRef.value.contains(_event.target as Node)){ emit('close'); }
    }
</script>


<template>
    <TransitionFadeHorizontal>
        <div v-if="props.open" @click="handleClickOutsideModal" class="z-50 fixed top-0 bottom-0 left-0 right-0 flex flex-col items-stretch justify-center p-2 bg-black/30 backdrop-blur-sm">
            <div ref="modalContentRef" class="relative max-w-(--max-modal-width) overflow-y-auto">
                <CloseButton @click="() => { emit('close'); }" />
                <slot />
            </div>
        </div>
    </TransitionFadeHorizontal>
</template>


<style scoped>

</style>