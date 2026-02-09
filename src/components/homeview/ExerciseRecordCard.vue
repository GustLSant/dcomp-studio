<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import type { ExerciseData, ExerciseRecord } from '../../types/exercises';
    import { onMounted, ref } from 'vue';
    import { getExerciseDataById } from '../../utils/exercises';
    import ExerciseIncompleteBadge from '../badges/ExerciseIncompleteBadge.vue';
    import ExerciseCompletedBadge from '../badges/ExerciseCompletedBadge.vue';
    import Card from '../common/Card.vue';
    import { type FileType } from '../../types/entities';
    import { getAllFiles } from '../../services/files';
    import { createPopup } from '../../utils/popup';
    import { formatDate } from '../../utils/date';
    import FilePreview from '../entities/FilePreview.vue';
    import Accordion from '../common/Accordion.vue';

    const props = defineProps<{ data: ExerciseRecord }>();
    const exercise = ref<ExerciseData>(getExerciseDataById(props.data.exerciseId!));
    const attemptFiles = ref<FileType[]>([]);
    const lastAttemptDate = ref<Date | undefined>(undefined);

    onMounted(getFilesData);

    async function getFilesData() {
        try {
            const allFiles: FileType[] = await getAllFiles();
            attemptFiles.value = allFiles.filter((_file) => _file.exerciseRecordId === props.data.id!);

            if (attemptFiles.value.length === 0) return;

            lastAttemptDate.value = attemptFiles.value
                .map((_file) => _file.editDate)
                .reduce((latest, current) =>
                    current > latest ? current : latest
                );
        }
        catch (_error) {
            console.error(_error);
            createPopup('error', 'Erro ao obter os arquivos', 'Por favor, tente novamente');
        }
    }
</script>


<template>
    <Card class="bg-white/5 gap-4! p-2!">
        <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-1">
                <Icon icon="mdi:book-outline" width="24" height="24" />
                <p>{{ exercise.name }}</p>
            </div>

            <ExerciseCompletedBadge v-if="props.data.completed" class="text-success" />
            <ExerciseIncompleteBadge v-else />
        </div>

        <div v-if="lastAttemptDate" class="flex items-center justify-between gap-2 text-sm opacity-80">
            <p>Data da última tentativa:</p>
            <p class="text-right">{{ formatDate(lastAttemptDate) }}</p>
        </div>

        <Accordion v-if="attemptFiles.length > 0" title="Arquivos de tentativas" max-height="160px">
            <template #body>
                <FilePreview v-for="file in attemptFiles" :entity="file" :interactable="true" />
            </template>
        </Accordion>
    </Card>
</template>


<style scoped>
    .accordion {
        transition: max-height 0.15s;
    }
</style>