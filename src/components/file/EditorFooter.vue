<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue';
    import HoverableIcon from '../common/HoverableIcon.vue';
import ShinyContainer from '../common/shinyContainer/ShinyContainer.vue';

    const isOpen = ref<boolean>(false);
    const footerRef = ref<HTMLElement | null>(null);

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

    function toggleFooter() { isOpen.value = !isOpen.value; }
</script>


<template>
    <footer ref="footerRef" class="fixed bottom-0 left-0 right-0  flex items-stretch  max-w-(--max-app-width) m-auto">
        <div :class="(isOpen) ? 'ml-0' : 'ml-[calc(100%-30px-12px)]'" class="w-full px-2 flex items-center gap-4">
            <ShinyContainer class="rounded-full">
                <div class="rounded-full bg-(--foreground)">
                    <HoverableIcon @click="toggleFooter" :class="(isOpen) ? '-scale-x-100' : 'scale-x-100'" icon="mdi:chevron-left" :size="20" />
                </div>
            </ShinyContainer>
            
            <div class="flex items-center gap-2 basis-1 grow overflow-x-auto">
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
                <p>awd</p>
            </div>
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