<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { addFile } from '../../services/files';
    import { addFolder } from '../../services/folders';
    import type { EntityKind, FileType, FolderType } from '../../types/entities';
    import { getDefaultFile, getDefaultFolder } from '../../utils/entities';
    import { createPopup } from '../../utils/popup';
    import FolderPreview from '../folders/FolderPreview.vue';
    import Button from './Button.vue';
    import CloseButton from './CloseButton.vue';
    import ModalContainer from './ModalContainer.vue';
    import ShinyContainer from './shinyContainer/ShinyContainer.vue';
    import { ref } from 'vue';
import TextInput from './TextInput.vue';

    const props = defineProps<{
        kind: EntityKind,
        parentFolder: FolderType,
    }>();

    const entityName = ref<string>((props.kind === 'file') ? 'Novo Arquivo' : 'Nova Pasta');
    const emit = defineEmits(['closeModal', 'updateContent']);


    function closeModal() {
        emit('closeModal');
    }


    function handleClickButton() {
        if (props.kind === 'file') handleAddFile();
        else handleAddFolder();
    }


    async function handleAddFolder() {
        const newFolder: FolderType = getDefaultFolder();
        newFolder.parentFolderId = props.parentFolder.id!;
        newFolder.name = entityName.value;

        addFolder(newFolder)
        .then((_response: number) => { emit('updateContent'); })
        .catch((_error) => { createPopup('error', 'Erro ao criar nova pasta', 'Por favor, tente novamente'); })
        .finally(() => {  })
    }


    async function handleAddFile() {
        const newFile: FileType = getDefaultFile();
        newFile.parentFolderId = props.parentFolder.id!;
        newFile.name = entityName.value;

        addFile(newFile)
        .then((_response) => { emit('updateContent'); })
        .catch((_error) => { createPopup('error', 'Erro ao criar arquivo', 'Por favor, tente novamente'); })
        .finally(() => {  })
    }
</script>


<template>
    <ModalContainer @click-outside="closeModal">
        <ShinyContainer class="rounded-md max-w-[600px] m-auto">

            <div class="relative flex flex-col gap-4 bg-(--foreground) p-2 rounded-md">
                <CloseButton @click="closeModal" />

                <div class="flex items-center gap-1 text-xl">
                    <Icon icon="mdi:add" width="24" height="24" />
                    <p v-if="props.kind === 'file'">Criar novo arquivo</p>
                    <p v-else>Criar nova pasta</p>
                </div>
    
                <div class="flex flex-col gap-4 my-4">
                    <div class="flex items-center gap-2">
                        <p>Nome:</p>
                        <TextInput v-model="entityName" />
                    </div>
        
                    <div class="flex items-center gap-2">
                        <p>Pasta de origem:</p>
                        <FolderPreview :folder="props.parentFolder" :interactable="false" />
                    </div>
                </div>
                

                <div class="flex items-center justify-end gap-2">
                    <Button variant="danger-outlined" icon="mdi:close" @click="closeModal">
                        Cancelar
                    </Button>
    
                    <Button @click="handleClickButton" variant="primary-filled" icon="mdi:add">
                        Criar
                        {{ (props.kind === 'file') ? 'Arquivo' : 'Pasta' }}
                    </Button>
                </div>
            </div>

        </ShinyContainer>
    </ModalContainer>
</template>


<style scoped>

</style>