<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import type { ExerciseGroup } from '../../types/exercises';
    import Accordion from '../common/Accordion.vue';
    import ExerciseCard from './ExerciseCard.vue';
    import { getExerciseGroupProgress } from '../../utils/exercises';
    import { createPopup } from '../../utils/popup';
    import ExerciseGroupProgressBadge from '../badges/ExerciseGroupProgressBadge.vue';

    const props = defineProps<{ data: ExerciseGroup }>();
    const progressPercent = ref<number>(0);

    onMounted(getProgressPercent);

    function getProgressPercent() {
        getExerciseGroupProgress(props.data.id)
        .then((_response) => { progressPercent.value = _response })
        .catch((_error) => { createPopup('error', 'Erro ao obter a progressão dos exercícios', 'Por favor, tente novamente') })
    }
</script>


<template>
    <Accordion :title="props.data.name" max-height="1000px" icon="mdi:script-text-outline">
        <template #header-sulfix>
            <ExerciseGroupProgressBadge :progress="progressPercent" />
        </template>

        <template #body>
            <ExerciseCard v-for="exercise in props.data.exercises" :key="exercise.name" :data="exercise" />
        </template>
    </Accordion>
</template>


<style scoped>

</style>