<script setup lang="ts">
    import { ref } from 'vue';
    import PageHeader from '../components/common/PageHeader.vue';
    import PageContainer from '../components/common/PageContainer.vue';
    import ExerciseCard from '../components/exercisesView/ExerciseCard.vue';
    import { EXERCISES } from '../data/exercises';
    import type { ExerciseData } from '../types/exercises';

    const exercises = ref<ExerciseData[]>(EXERCISES);
</script>


<template>
    <PageContainer>
        <PageHeader icon="mdi:book-edit-outline" title="Exercícios de programação" />
        <div class="flex flex-col gap-2">
            <ExerciseCard v-for="exercise in exercises" :key="exercise.name" :data="exercise" />
        </div>
    </PageContainer>
</template>


<style scoped>

</style>