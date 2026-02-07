<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import type { ExerciseRecord } from '../../types/exercises';
    import { getAllExerciseRecords } from '../../services/exercises';
    import Card from '../common/Card.vue';
    import { Icon } from '@iconify/vue';
    import ExerciseRecordCard from './ExerciseRecordCard.vue';
    import { useRouter } from 'vue-router';

    const exerciseRecords = ref<ExerciseRecord[]>([]);
    const router = useRouter();

    onMounted(async () => { exerciseRecords.value = await getAllExerciseRecords(); })

    function handleClickExploreExercises() {
        router.push({ name: 'Exercises' });
    }
</script>


<template>
    <Card>
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-1">
                <Icon icon="mdi:book-outline" width="20" height="20" />
                <p class="text-lg">Exercícios realizados</p>
            </div>
        </div>

        <template v-if="exerciseRecords.length > 0">
            <div class="flex flex-col gap-2 max-h-[600px] overflow-y-auto">
                <ExerciseRecordCard v-for="exerciseRecord in exerciseRecords" :key="exerciseRecord.id" :data="exerciseRecord" />
            </div>
    
            <div class="flex items-center justify-end hover:cursor-pointer">
                <p @click="handleClickExploreExercises" class="text-sm text-(--primary) underline">Explorar todos os exercícios</p>
            </div>
        </template>

        <template v-else>
            <div class="flex flex-col items-center">
                <p>Você não tentou nenhum exercício ainda</p>
                <RouterLink to="Exercises" class="text-sm opacity-60 underline hover:cursor-pointer">Clique aqui para realizar o primeiro</RouterLink>
            </div>
        </template>
    </Card>
</template>