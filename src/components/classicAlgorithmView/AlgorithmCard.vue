<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import type { AlgorithmData } from '../../types/classicAlgorithms';
    import Button from '../common/Button.vue';
    import type { FileType } from '../../types/entities';
    import { getRootFolder } from '../../services/folders';
    import { addFile } from '../../services/files';
    import { useRouter } from 'vue-router';
    import Accordion from '../common/Accordion.vue';

    const props = defineProps<{ data: AlgorithmData }>();
    const router = useRouter();


    async function openAlgorithm() {
        const newFile: FileType = {
            kind: 'file',
            name: props.data.name,
            content: props.data.code.join('\n'),
            parentFolderId: getRootFolder().id!,
            creationDate: new Date(),
            editDate: new Date(),
        }
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
    <Accordion :title="props.data.name" icon="mdi:file-code-outline" max-height="700px" class="bg-(--foreground)">
        <template #body>
            <div class="flex flex-col gap-2">
                <div class="flex items-end justify-between gap-2">
                    <h3>Código:</h3>
                    <Button @click="() => { openAlgorithm() }" variant="primary-filled" icon="mdi:file-move-outline">
                        Abrir em novo arquivo
                    </Button>
                </div>

                <code class="border border-(--border-02) bg-(--foreground-02) p-3 rounded-sm max-h-[300px] overflow-auto">
                    <p class="whitespace-pre-wrap">
                        {{ props.data.code.join('\n') }}
                    </p> 
                </code>
            </div>

            <div class="flex flex-col gap-2">
                <h3>Resumo:</h3>            
                <p>{{ props.data.abstract }}</p>
            </div>

            <div v-if="props.data.source" class="flex items-center justify-between gap-2 pb-2">
                <h3>Adaptado de:</h3>
                <a
                    :href="props.data.sourceLink"
                    target="_blank"
                    rel="noreferrer"
                    class="flex items-center gap-1 underline"
                >
                    <p>{{ props.data.source }}</p>
                    <Icon icon="mdi:open-in-new" width="24" height="24" />
                </a>
            </div>
        </template>
    </Accordion>
</template>


<style scoped>
    h3 {
        font-weight: 500;
    }
</style>
