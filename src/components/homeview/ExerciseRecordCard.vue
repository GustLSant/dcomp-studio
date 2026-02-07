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

    const props = defineProps<{ data: ExerciseRecord }>();
    const exercise = ref<ExerciseData>(getExerciseDataById(props.data.exerciseId!));
    const attemptFiles = ref<FileType[]>([]);
    const lastAttemptDate = ref<Date | undefined>(undefined);
    const openFilesAccordion = ref<boolean>(false);

    onMounted(getFilesData);

    async function getFilesData() {
        try {
            const allFiles: FileType[] = await getAllFiles();
            attemptFiles.value = allFiles.filter((_file) => _file.exerciseRecordId === props.data.id!);

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
    <Card class="bg-white/5 gap-4!">
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

        <div
            :class="(openFilesAccordion) ? 'max-h-40 overflow-y-auto' : 'max-h-10 overflow-hidden'"
            class="accordion flex flex-col gap-4 p-2 rounded-md border border-(--border-02)"
        >
            <div @click="() => { openFilesAccordion = !openFilesAccordion }" class="flex items-center justify-between gap-2">
                <p>Arquivos de tentativas:</p>
                <Icon :icon="(openFilesAccordion) ? 'mdi:chevron-up' : 'mdi:chevron-down'" width="24" height="24" />
            </div>

            <div class="flex flex-col gap-2">
                <FilePreview v-for="file in attemptFiles" :entity="file" :interactable="true" />
            </div>
        </div>
    </Card>
</template>


<style scoped>
    .accordion {
        transition: max-height 0.15s;
    }
</style>