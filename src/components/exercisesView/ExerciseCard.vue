<script setup lang="ts">
    import { ref } from 'vue';
    import type { ExerciseData } from '../../types/exercises';
    import { useRouter } from 'vue-router';
    import type { FileType } from '../../types/entities';
    import { addFile } from '../../services/files';
    import Card from '../common/Card.vue';
    import { Icon } from '@iconify/vue';
    import HoverableIcon from '../common/HoverableIcon.vue';
    import Button from '../common/Button.vue';
    import { getDefaultFile } from '../../utils/entities';
    import { addFileToExerciseRecord, addNewExerciseRecord } from '../../services/exercises';

    const props = defineProps<{ data: ExerciseData }>();
    const isOpen = ref<boolean>(false);
    const router = useRouter();

    function toggleOpen() { isOpen.value = !isOpen.value; }

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
    <Card
        :class="(isOpen) ? 'max-h-[700px]' : 'max-h-[calc(34px+16px)]'"
        class="card overflow-hidden py-2 gap-4"
    >
        <div
            @click="toggleOpen"
            class="flex items-center justify-between gap-2 hover:cursor-pointer hover:underline"
        >
            <div class="flex items-center gap-1">
                <Icon icon="mdi:book-outline" width="24" height="24" />
                <p>{{ props.data.name }}</p>
            </div>
            <HoverableIcon :icon="(!isOpen) ? 'mdi:chevron-down' : 'mdi:chevron-up'" :size="24" />
        </div>

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
    </Card>
</template>


<style scoped>
    .card {
        transition: max-height 0.15s;
    }

    h3 {
        font-weight: 500;
    }
</style>