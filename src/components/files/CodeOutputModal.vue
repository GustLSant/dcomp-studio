<script setup lang="ts">
    import type { CodeOutput } from '../../types/code';
    import { truncate } from '../../utils/text';
    import CloseButton from '../common/CloseButton.vue';
    import ModalContainer from '../common/ModalContainer.vue';

    const open = defineModel<boolean>();
    const props = defineProps<{ fileName: string, codeOutput: CodeOutput }>();

    function close() {
        open.value = false;
    }
</script>


<template>
    <ModalContainer @click-outside="close" v-if="open">
        <div class="relative flex flex-col gap-2 p-2 bg-neutral-600 rounded-md">
            <div class="flex items-center gap-2">
                <p>Arquivo:</p>
                <p class="px-2 py-1 bg-black/15 shadow-inset rounded-sm font-mono">{{ truncate(props.fileName, 25) }}</p>
            </div>

            <div class="flex flex-col gap-2">
                <p>Saída:</p>
                <textarea readonly :rows="(props.codeOutput.type === 'success' ? 5 : 20)" class="bg-neutral-900 p-2 rounded-sm shadow-inner font-mono text-green-500">{{ props.codeOutput.content }}</textarea>
            </div>

            <CloseButton @click="close" />
        </div>
    </ModalContainer>
</template>


<style scoped>

</style>