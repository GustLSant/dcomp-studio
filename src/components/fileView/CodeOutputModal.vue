<script setup lang="ts">
    import type { CodeOutput } from '../../types/code';
    import { createPopup } from '../../utils/popup';
    import { truncate } from '../../utils/text';
    import HoverableIcon from '../common/HoverableIcon.vue';
    import Modal from '../common/Modal.vue';

    const open = defineModel<boolean>();
    const props = defineProps<{ fileName: string, codeOutput: CodeOutput }>();

    function close() {
        open.value = false;
    }

    async function copyOutput() {
        try {
            await navigator.clipboard.writeText(props.codeOutput.content);
            createPopup('success', 'Sucesso', 'Output copiado para a área de transferência');
        }
        catch {
            createPopup('error', 'Erro', 'Erro ao copiar o output do código');
        }
    }
</script>


<template>
    <Modal :open="open" @close="close">
        <div class="flex flex-col gap-2 p-2 bg-(--foreground) rounded-md">
            <div class="flex items-center gap-2">
                <p>Arquivo:</p>
                <p class="px-2 py-1 bg-black/15 shadow-inset rounded-sm font-mono">{{ truncate(props.fileName, 25) }}</p>
            </div>

            <div class="flex flex-col gap-2">
                <div class="flex items-center justify-between gap-2">
                    <p>Saída:</p>
                    <HoverableIcon @click="copyOutput" icon="mdi:content-copy" :size="18" />
                </div>
                <textarea readonly :rows="(props.codeOutput.type === 'success' ? 5 : 20)" class="bg-neutral-950 p-2 rounded-sm shadow-inner font-mono text-green-500">{{ props.codeOutput.content }}</textarea>
            </div>
        </div>
    </Modal>
</template>


<style scoped>

</style>