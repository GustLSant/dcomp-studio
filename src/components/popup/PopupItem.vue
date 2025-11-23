<script setup lang="ts">
    import type { PopupItemType } from '../../types/popup';
    import CloseButton from '../common/CloseButton.vue';

    const props = defineProps<PopupItemType>();

    const emits = defineEmits<{
        (e: 'close', _id: number): void;
    }>();

    const handleClickClose = () => {
        emits('close', props.id);
    }
</script>


<template>
    <div
        class="popup p-px relative rounded-md pointer-events-auto"
        :class="[
            props.type,
            props.isClosing ? 'fade-out-right-short closing' : 'fade-in-top-short'
        ]"
    >
        <div class="popup-content flex items-center gap-3 p-2 rounded-md bg-(--foreground)">
            <div class="neon-stroke w-0.5 self-stretch"></div>

            <div class="flex flex-col justify-center">
                <h3 class="text-base">{{ props.title }}</h3>
                <p v-if="props.subtitle" class="text-sm font-light">{{ props.subtitle }}</p>
            </div>

            <CloseButton @click="handleClickClose" :size="16" class="top-1! right-1!" />
        </div>
    </div>
</template>


<style scoped>
    .popup{
        --popup-anim-duration: 0.15s;

        max-height: 99px;
        transition: max-height var(--popup-anim-duration);

        &.closing{
            max-height: 0px;
        };
    }

    .popup {
        background-image: linear-gradient(
            -45deg, 
            color(from var(--type-color) srgb r g b / 0.5)  0%, 
            rgba(255,255,255, 10%)                        50%, 
            color(from var(--type-color) srgb r g b / 0.5)  100%
        );

        .neon-stroke { background-color: color(from var(--type-color) srgb r g b / 1); }
        .popup-content { box-shadow: 0px 0px 6px color(from var(--type-color) srgb r g b / 0.2) inset; }
    }

    .success {
        --type-color: var(--success-color);
    }

    .warning {
        --type-color: var(--warning-color);
    }

    .error {
        --type-color: var(--error-color);
    }
</style>