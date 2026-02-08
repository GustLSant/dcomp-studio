<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import type { ExerciseData } from '../../types/exercises';
    import { useRouter } from 'vue-router';
    import type { FileType } from '../../types/entities';
    import { addFile } from '../../services/files';
    import { Icon } from '@iconify/vue';
    import Button from '../common/Button.vue';
    import { getDefaultFile } from '../../utils/entities';
    import { addFileToExerciseRecord, addNewExerciseRecord } from '../../services/exercises';
    import Accordion from '../common/Accordion.vue';
    import ExerciseDifficultBadge from '../badges/ExerciseDifficultBadge.vue';
    import { checkIsExerciseCompleted } from '../../utils/exercises';

    const props = defineProps<{ data: ExerciseData }>();
    const isCompleted = ref<boolean>(false);
    const router = useRouter();

    onMounted(checkIsCompleted);

    function checkIsCompleted() {
        checkIsExerciseCompleted(props.data.id)
        .then((_response) => { isCompleted.value = _response; })
        .catch((_error) => { console.error(`Erro ao checar se o exercício de Id ${props.data.id} está completo: `, _error); })
    }

    async function openAlgorithm() {
        try {
            const newRecordId = await addNewExerciseRecord(props.data.id);

            const newFile: FileType = getDefaultFile()
            newFile.name = props.data.name
            newFile.content = props.data.startCode.join('\n'),
            newFile.exerciseRecordId = newRecordId

            const newFileId: number = await addFile(newFile);
            addFileToExerciseRecord(newRecordId, newFileId);

            router.push({
                name: 'File',
                params: {
                    id: newFileId
                }
            });
        }
        catch (_error) {
            const message = _error instanceof Error ? _error.message : String(_error);
            throw new Error(message);
        }
    }

    async function openAlgorithmSolution() {
        const newFile: FileType = getDefaultFile()
        newFile.name = 'Solução - ' + props.data.name
        newFile.content = props.data.startCode.join('\n') + "\n \n" + props.data.codeAnswer.join('\n');

        const newFileId: number = await addFile(newFile);

        router.push({
            name: 'File',
            params: {
                id: newFileId
            }
        });
    }
</script>


<template>
    <Accordion :title="props.data.name" max-height="700px" icon="mdi:book-outline" class="bg-(--foreground)">
        <template #header-prefix>
            <ExerciseDifficultBadge :difficulty="props.data.difficulty" />
        </template>

        <template v-if="isCompleted" #header-sulfix>
            <Icon class="text-(--success-color)" icon="mdi:check-circle-outline" width="18" height="18" />
        </template>

        <template #body>
            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                    <h3>Enunciado:</h3>
                    
                    <div class="border border-(--border-02) bg-(--foreground-02) p-3 rounded-sm max-h-[300px] overflow-auto">
                        <p class="whitespace-pre-wrap">
                            {{ props.data.question }}
                        </p> 
                    </div>
                </div>

                <div v-if="props.data.studyMaterialName" class="flex items-center justify-between gap-2 pb-2 flex-wrap">
                    <h3 class="shrink-0">Material de apoio:</h3>
                    <a
                        :href="props.data.studyMaterialLink"
                        target="_blank"
                        rel="noreferrer"
                        class="flex items-center gap-1 underline"
                    >
                        <p>{{ props.data.studyMaterialName }}</p>
                        <Icon icon="mdi:open-in-new" width="24" height="24" />
                    </a>
                </div>

                <div class="flex flex-col items-end gap-2 pb-2">
                    <Button @click="() => { openAlgorithm() }" variant="primary-filled" icon="mdi:file-move-outline">
                        Realizar exercício
                    </Button>
                    <Button @click="() => { openAlgorithmSolution() }" variant="neutral" icon="mdi:file-lock-outline">
                        Abrir gabarito de código
                    </Button>
                </div>
            </div>
        </template>
    </Accordion>
</template>


<style scoped>
    .card {
        transition: max-height 0.15s;
    }

    h3 {
        font-weight: 500;
    }
</style>