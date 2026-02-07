<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import type { ExerciseData, ExerciseRecord } from '../../../types/exercises';
    import ExerciseCompletedBadge from '../../badges/ExerciseCompletedBadge.vue';
    import ExerciseIncompleteBadge from '../../badges/ExerciseIncompleteBadge.vue';
    import { computed, ref } from 'vue';
    import { compareCodeOutputs, getExerciseDataById } from '../../../utils/exercises';
    import type { CodeOutput } from '../../../types/code';

    const props = defineProps<{ exerciseRecord: ExerciseRecord, codeOutput: CodeOutput }>();
    const exerciseData = ref<ExerciseData>(getExerciseDataById(props.exerciseRecord.exerciseId));
    const successOnThisTrial = computed(() => compareCodeOutputs(exerciseData.value.expectedCodeOutput, props.codeOutput.content));
    
    const open = ref<boolean>(false);

    function toggleOpen() { open.value = !open.value; }
</script>


<template>
    <div class="flex flex-col gap-2 rounded-md border border-(--border-02) p-2 accordion" :class="(open) ? 'max-h-[300px] overflow-y-auto' : 'max-h-[42px] overflow-y-hidden'">
        <div @click="toggleOpen" class="flex items-center justify-between gap-2">
            <p>Exercício:</p>
            <div class="flex items-center gap-1">
                <p>{{ exerciseData.name }}</p>
                <Icon v-if="successOnThisTrial" class="text-(--success-color)" icon="mdi:check-circle-outline" width="18" height="18" />
                <Icon :icon="(open) ? 'mdi:chevron-up' : 'mdi:chevron-down'" width="24" height="24" />
            </div>
        </div>

        <div class="flex flex-col gap-1">
            <p class="text-sm">Output esperado:</p>
            <div class="bg-neutral-950 p-2 rounded-sm shadow-inner font-mono text-green-500">
                <p class="whitespace-pre">{{ exerciseData.expectedCodeOutput }}</p>
            </div>
        </div>

        <div class="flex items-center justify-between gap-2">
            <p>Status:</p>
            <ExerciseCompletedBadge v-if="successOnThisTrial" class="text-success" />
            <ExerciseIncompleteBadge v-else />
        </div>
    </div>
</template>


<style scoped>
    .accordion {
        transition: max-height 0.15s;
    }
</style>