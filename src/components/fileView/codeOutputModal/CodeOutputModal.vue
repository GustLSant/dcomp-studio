<script setup lang="ts">
    import { ref, watch } from 'vue';
    import type { CodeOutput } from '../../../types/code';
    import type { FileType } from '../../../types/entities';
    import { createPopup } from '../../../utils/popup';
    import { truncate } from '../../../utils/text';
    import HoverableIcon from '../../common/HoverableIcon.vue';
    import Modal from '../../common/Modal.vue';
    import { getExerciseDataById } from '../../../services/exercises';
    import type { ExerciseData } from '../../../types/exercises';
    import { normalizeCodeOutput } from '../../../utils/exercises';
    import ExerciseAccordion from './ExerciseAccordion.vue';

    const open = defineModel<boolean>();
    const props = defineProps<{ file: FileType, codeOutput: CodeOutput }>();

    const exerciseData = ref<ExerciseData | null>(getExerciseDataById(props.file.exerciseId));

    watch(open, checkExerciseIsCompleted)

    function checkExerciseIsCompleted() {
        if (!exerciseData.value || open.value === false || props.codeOutput.type === 'error') return;

        if (normalizeCodeOutput(exerciseData.value.expectedCodeOutput) === normalizeCodeOutput(props.codeOutput.content)) {
            exerciseData.value.completed = true;
            createPopup('success', 'Parabéns!', 'Exercício concluído com sucesso');
        }
        else { exerciseData.value.completed = false; }
    }
    
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
        <div class="flex flex-col gap-4 p-2 bg-(--foreground) rounded-md">
            <div class="flex items-center gap-2">
                <p>Arquivo:</p>
                <p class="px-2 py-1 bg-black/15 shadow-inset rounded-sm font-mono">{{ truncate(props.file.name, 25) }}</p>
            </div>

            <div class="flex flex-col gap-1">
                <div class="flex items-center justify-between gap-2">
                    <p>Output:</p>
                    <HoverableIcon @click="copyOutput" icon="mdi:content-copy" :size="18" />
                </div>
                <textarea readonly :rows="(props.codeOutput.type === 'success' ? 5 : 20)" class="bg-neutral-950 p-2 rounded-sm shadow-inner font-mono text-green-500">{{ props.codeOutput.content }}</textarea>
            </div>

            <ExerciseAccordion v-if="exerciseData" :exercise-data="exerciseData" />
        </div>
    </Modal>
</template>


<style scoped>

</style>