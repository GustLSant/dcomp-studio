<script setup lang="ts">
    import { onMounted, onUnmounted, reactive, ref } from 'vue';
    import LeftFooterButton from '../codeEditor/footer/footerButtons/LeftFooterButton.vue';
    import TabFooterButton from '../codeEditor/footer/footerButtons/TabFooterButton.vue';
    import BracketsFooterButton from '../codeEditor/footer/footerButtons/BracketsFooterButton.vue';
    import BracesFooterButton from '../codeEditor/footer/footerButtons/BracesFooterButton.vue';
    import RightFooterButton from '../codeEditor/footer/footerButtons/RightFooterButton.vue';
    import UndoFooterButton from '../codeEditor/footer/footerButtons/UndoFooterButton.vue';
    import ShinyContainer from '../common/shinyContainer/ShinyContainer.vue';
    import type { CodeEditorButton } from '../../enums/codeEditorButtons';
    import { Icon } from '@iconify/vue';
    import Separator from '../common/Separator.vue';
    import eventBus from '../../eventBus';

    const footerOpenStates = reactive<boolean[]>([true, false]);
    const footerRef = ref<HTMLElement | null>(null);

    const updateFooterPosition = () => {
    if (!footerRef.value || !window.visualViewport) return;

    const offset =
        window.innerHeight - window.visualViewport.height - window.visualViewport.offsetTop;

    footerRef.value.style.transform =
        offset > 0 ? `translateY(-${offset}px)` : 'translateY(0)';
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

    function handleButtonPresed(_button: CodeEditorButton) {
        switch (_button) {
            case 'left':     eventBus.dispatchEvent(new Event('left-pressed'));     return;
            case 'tab':      eventBus.dispatchEvent(new Event('tab-pressed'));      return;
            case 'brackets': eventBus.dispatchEvent(new Event('brackets-pressed')); return;
            case 'braces':   eventBus.dispatchEvent(new Event('braces-pressed'));   return;
            case 'right':    eventBus.dispatchEvent(new Event('right-pressed'));    return;
            case 'undo':     eventBus.dispatchEvent(new Event('undo-pressed'));     return;
            case 'redo':     eventBus.dispatchEvent(new Event('redo-pressed'));     return;
            case 'shift':    eventBus.dispatchEvent(new Event('shift-pressed'));    return;
            case 'copy':     eventBus.dispatchEvent(new Event('copy-pressed'));     return;
            case 'paste':    eventBus.dispatchEvent(new Event('paste-pressed'));    return;
        }
    }

    function toggleFooterOpenState(_idx: number) {
        footerOpenStates[_idx] = !footerOpenStates[_idx];
    }
</script>


<template>
    <footer ref="footerRef" class="fixed bottom-0 left-0 right-0 flex flex-col max-w-(--max-app-width) m-auto">
        <div class="footer flex flex-col" :class="footerOpenStates[1] ? 'open' : 'closed'">
            
            <div class="flex justify-end pointer-events-none" @click="() => { toggleFooterOpenState(1) }">
                <div class="bg-(--foreground) p-1  pointer-events-auto transition-transform" :class="footerOpenStates[1] ? '-rotate-180 rounded-b-full' : 'rounded-t-full'">
                    <Icon icon="meteor-icons:angles-up" height="18" width="18" />
                </div>
            </div>

            <ShinyContainer class="footer-menu self-stretch">
                <section>
                    <UndoFooterButton />

                    <Separator direction="vertical" />

                    <button @click="() => { handleButtonPresed('redo') }">
                        <p>refazer</p>
                    </button>

                    <Separator direction="vertical" />

                    <button @click="() => { handleButtonPresed('shift') }">
                        <Icon icon="mdi:apple-keyboard-shift" width="18" height="18" />
                    </button>

                    <Separator direction="vertical" />

                    <button @click="() => { handleButtonPresed('copy') }">
                        <p>copiar</p>
                    </button>

                    <Separator direction="vertical" />

                    <button @click="() => { handleButtonPresed('paste') }">
                        <p>colar</p>
                    </button>
                </section>
            </ShinyContainer>
        </div>

        <ShinyContainer class="footer open">
            <section>
                <LeftFooterButton />

                <Separator direction="vertical" />

                <TabFooterButton />

                <Separator direction="vertical" />

                <BracketsFooterButton />

                <Separator direction="vertical" />

                <BracesFooterButton />

                <Separator direction="vertical" />

                <RightFooterButton />
            </section>
        </ShinyContainer>
    </footer>
</template>


<style scoped>
    footer {
        padding-bottom: env(safe-area-inset-bottom);
    }
    
    .footer {
        --footer-height: 28px;

        transition: transform var(--anim-duration-short);

        &.closed {
            transform: translateY(var(--footer-height));

            .footer-menu {
                opacity: 0%;
            }
        }

        &.open {
            transform: translateY(0px);
        }    
    }

    .footer-menu {
        transition: opacity var(--anim-duration-short);
    }

    section {
        display: flex;
        align-items: center;
        gap: 2px;
        padding: 4px;
        background-color: var(--foreground);
    }

    button {
        display: flex;
        justify-content: center;
        flex-grow: 1;
        flex-basis: 1px;

        p {
            font-size: 12px;
        }
    }

    .second-menu {
        &.open {
            transform: translateY(-100%);
        }
    }
</style>