<script setup lang="ts">
    import { Icon } from '@iconify/vue';

    const props = defineProps<{
        type?: "button" | "submit" | "reset",
        variant: 'primary-outlined' | 'secondary-outlined' | 'danger-outlined' | 'primary-filled' | 'secondary-filled' | 'mixed-filled' | 'danger-filled',
        size?: 'small' | 'normal',
        icon?: string,
        disabled?: boolean
    }>();

    function isOutlinedVariant() {
        return (props.variant === 'secondary-outlined' || props.variant === 'danger-outlined' || props.variant === 'primary-outlined')
    }
</script>


<template>
    <button
        :type="props.type ?? 'button'"
        class="flex items-center justify-center gap-2 font-normal rounded-sm whitespace-nowrap transition-all duration-150 hover:underline hover:cursor-pointer"
        :class="[
            (props.size === 'small') ? 'p-1 px-2 text-sm' : 'p-2 px-4',

            (props.disabled) ? 'contrast-75 select-none pointer-events-none' : '',
            (props.disabled && isOutlinedVariant())  ? 'bg-black/7.5' : '',

            (props.variant === 'primary-outlined')   ? 'text-(--primary) border border-(--primary) hover:bg-(--primary)/10' : '',
            (props.variant === 'secondary-outlined') ? 'text-(--secondary) border border-(--secondary) hover:bg-(--secondary)/10 ' : '',
            (props.variant === 'danger-outlined')    ? 'text-red-600 border border-red-600 hover:bg-red-600/3' : '',
            (props.variant === 'primary-filled')     ? 'text-white primary-bg-gradient hover:brightness-110' : '',
            (props.variant === 'secondary-filled')   ? 'text-white secondary-bg-gradient hover:brightness-130' : '',
            (props.variant === 'mixed-filled')       ? 'text-white mixed-bg-gradient hover:brightness-130' : '',
            (props.variant === 'danger-filled')      ? 'text-white bg-linear-to-r from-red-500 to-red-700 hover:brightness-110' : '',
        ]"
    >
        <Icon v-if="props.icon" :icon="props.icon" width="24" height="24" class="shrink-0" />
        <slot />
    </button>
</template>


<style scoped>
    :deep(svg){
        margin-left: -6px;
    }

    @media (max-width: 340px) {
        button{
            white-space: wrap;
        }
    }
</style>