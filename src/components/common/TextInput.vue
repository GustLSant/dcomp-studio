<script setup lang="ts">
    import { Icon } from '@iconify/vue';

    type TextInputProps = {
        modelValue: string,
        placeholder?: string,
        icon?: string,
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
    <div class="flex flex-col gap-0.5">
        <div class="relative flex shadow-md min-w-[150px] rounded-sm bg-card">
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
                class="w-full border border-(--border-01) bg-(--bg-input) hover:border-primary rounded-sm text-base py-2 outline-0"
                :class="[
                    props.icon ? 'pl-9' : 'pl-2',
                    props.errorMessage ? 'border-red-500/50' : ''
                ]"
            />
            <Icon v-if="props.icon" :icon="props.icon" width="24" height="24" class="absolute left-2 top-1/2 -translate-y-1/2 opacity-50" />
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