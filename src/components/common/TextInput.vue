<script setup lang="ts">
    import { Icon } from '@iconify/vue';

    type TextInputProps = {
        modelValue: string,
        placeholder?: string,
        label?: string,
        startIcon?: string,
        endIcon?: string,
        type?: string,
        inputmode?: "text" | "email" | "search" | "tel" | "url" | "none" | "numeric" | "decimal",
        errorMessage?: string,
        mask?: (_val: string) => string,
        maxLength?: number,
    }

    const props = defineProps<TextInputProps>();
    const emit = defineEmits<{
        (e: 'submit'): void
        (e: 'blur', event: FocusEvent): void
        (e: 'focus', event: FocusEvent): void
        (e: 'update:modelValue', value: string): void
    }>();

    const onInput = (_event: Event) => {
        const target = _event.target as HTMLInputElement;
        let newValue = target.value;
        if (props.mask) { newValue = props.mask(target.value); }

        target.value = newValue;
        emit('update:modelValue', newValue);
    };
</script>


<template>
    <div class="flex flex-col gap-[2px]">
        <div class="relative flex shadow-md min-w-[150px] rounded-sm bg-card">
            <p v-if="props.label && props.modelValue.length > 0" class="absolute left-2 top-[2px] text-xs opacity-50">{{ props.label }}</p>
            <input
                :value="props.modelValue"
                @input.prevent="onInput"
                @keydown.enter="() => emit('submit')"
                @blur="(e: FocusEvent) => emit('blur', e)"
                @focus="(e: FocusEvent) => emit('focus', e)"
                :type="props.type || 'text'"
                :inputmode="props.inputmode || 'text'"
                :maxlength="props.maxLength || undefined"
                :placeholder="props.placeholder"
                class="w-full border border-border hover:border-primary !rounded-sm !text-base !py-2 outline-0"
                :class="[
                    (props.label && props.modelValue.length > 0) ? '!pt-[14px] !pb-[2px]' : '',
                    props.startIcon ? 'pl-10' : 'pl-2',
                    props.endIcon ? '!rounded-r-none !border-r-0 pr-10' : 'pr-2',
                    props.errorMessage ? '!border-red-500/50' : ''
                ]"
            />
            <Icon v-if="props.startIcon" :icon="props.startIcon" width="24" height="24" class="absolute left-2 top-1/2 -translate-y-1/2 opacity-50" />

            <div
                v-if="props.endIcon"
                class="flex items-center justify-center rounded-r-md primary-bg-gradient text-white px-2 transition duration-150 hover:cursor-pointer hover:brightness-110"
                @click="() => emit('submit')"
            >
                <Icon :icon="props.endIcon" width="24" height="24" />
            </div>
        </div>

        <p v-if="props.errorMessage" class="text-start text-sm text-red-500/75">
            {{ props.errorMessage }}
        </p>
    </div>
</template>


<style scoped>
    /* Chrome, Edge, Safari */
    :deep(input::-webkit-outer-spin-button),
    :deep(input::-webkit-inner-spin-button) {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    :deep(input[type="number"]) {
        appearance: textfield;
        -moz-appearance: textfield;
    }
</style>