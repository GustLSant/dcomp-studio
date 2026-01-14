<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue';
    import HoverableIcon from '../common/HoverableIcon.vue';
    import ShinyContainer from '../common/shinyContainer/ShinyContainer.vue';
    import { EDITOR_FOOTER_BUTTONS } from '../../enums/editorFooterButtons';

    const isOpen = ref<boolean>(false);
    const footerRef = ref<HTMLElement | null>(null);
    const editorView = defineModel<any>('editorView');

    const updateFooterPosition = () => {
        if (!footerRef.value || !window.visualViewport) return;

        const offset = window.innerHeight - window.visualViewport.height - window.visualViewport.offsetTop;
        footerRef.value.style.transform = offset > 0 ? `translateY(-${offset}px)` : 'translateY(0)';
    };

    onMounted(() => {
        window.visualViewport?.addEventListener('resize', updateFooterPosition);
        window.visualViewport?.addEventListener('scroll', updateFooterPosition);
        updateFooterPosition();
    });

    onUnmounted(() => {
        window.visualViewport?.removeEventListener('resize', updateFooterPosition);
        window.visualViewport?.removeEventListener('scroll', updateFooterPosition);
    });

    function toggleFooter() {
        isOpen.value = !isOpen.value;
        editorView.value.focus();
    }
</script>


<template>
    <footer ref="footerRef" @pointerdown.prevent class="fixed bottom-0 left-0 right-0  flex items-stretch px-2  max-w-(--max-app-width) m-auto pointer-events-none">
        <div :class="(isOpen) ? 'ml-0' : 'ml-[calc(100%-30px)]'" class="w-full flex items-center gap-2 pb-1.5 pointer-events-auto">
            
            <ShinyContainer class="rounded-full" @pointerdown.stop @click="toggleFooter">
                <div class="rounded-full bg-(--foreground)">
                    <HoverableIcon :class="(isOpen) ? '-scale-x-100' : 'scale-x-100'" icon="mdi:chevron-left" :size="20" />
                </div>
            </ShinyContainer>
            
            <ShinyContainer class="grow overflow-x-hidden rounded-md">
                <div class="overflow-x-auto flex items-center gap-2 py-1 px-2 rounded-md bg-(--foreground)">
                    <p v-for="button in EDITOR_FOOTER_BUTTONS" :key="button.id" @pointerdown.stop @click="() => { button.function(editorView) }" class="bg-white/15 px-4 rounded-sm whitespace-nowrap">
                        {{ button.label }}
                    </p>
                </div>
            </ShinyContainer>
            
        </div>
    </footer>
</template>


<style scoped>
    footer {
        padding-bottom: env(safe-area-inset-bottom);

        & > div {
            transition: margin var(--anim-duration-short);
        }
    }
</style>