<script setup lang="ts">
    import { ref } from 'vue';
    import PageHeader from '../components/common/PageHeader.vue';
    import PageContainer from '../components/common/PageContainer.vue';
    import { EXERCISE_GROUPS } from '../data/exercises';
    import type { ExerciseGroup } from '../types/exercises';
    import ExerciseGroupCard from '../components/exercisesView/ExerciseGroupCard.vue';
    import Separator from '../components/common/Separator.vue';
    import ExerciseFullProgressCard from '../components/exercisesView/ExerciseFullProgressCard.vue';

    const exerciseGroups = ref<ExerciseGroup[]>(EXERCISE_GROUPS);
</script>


<template>
    <PageContainer>
        <PageHeader icon="mdi:book-edit-outline" title="Exercícios de programação" />
        
        <ExerciseFullProgressCard />
        
        <Separator />
        
        <p class="text-lg">Lista de Exercícios</p>

        <div class="flex flex-col gap-3">
            <ExerciseGroupCard v-for="group in exerciseGroups" :key="group.name" :data="group" />
        </div>
    </PageContainer>
</template>


<style scoped>

</style>