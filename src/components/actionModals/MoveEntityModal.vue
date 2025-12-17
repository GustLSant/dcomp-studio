<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import CloseButton from '../common/CloseButton.vue';
    import LoadingOverlay from '../common/LoadingOverlay.vue';
    import ModalContainer from '../common/ModalContainer.vue';
    import ShinyContainer from '../common/shinyContainer/ShinyContainer.vue';
    import Button from '../common/Button.vue';
    import { createPopup } from '../../utils/popup';
    import type { FileType, FolderType } from '../../types/entities';
    import { onMounted, onUnmounted, ref } from 'vue';
    import eventBus from '../../eventBus';
    import { moveFile } from '../../services/files';
    import { EVENT_MOVE_ENTITY } from '../../events/actionModal';
    import { getAllFolders, getFolderById, getRootFolder } from '../../services/folders';
    import FolderPreview from '../folders/FolderPreview.vue';
import { EVENT_ENTITY_UPDATED } from '../../events/entities';

    const isOpen = ref<boolean>(false);
    const isLoading = ref<boolean>(false);
    const entity = ref<FileType | FolderType | undefined>(undefined);
    const folders = ref<FolderType[]>([]);

    onMounted(() => { eventBus.addEventListener(EVENT_MOVE_ENTITY, openModal) });
    onUnmounted(() => { eventBus.removeEventListener(EVENT_MOVE_ENTITY, openModal) });

    function closeModal() {
        isOpen.value = false;
    }
    
    async function openModal(_event: Event) {
        const event = _event as CustomEvent<{ entity: FileType | FolderType }>;
        
        entity.value = event.detail.entity;

        isLoading.value = true;

        getAllFolders()
        .then((_response) => {
            folders.value = filterCurrentParentFolder(_response);
            isOpen.value = true;
        })
        .catch((_error) => {
            console.error(_error)
            createPopup('error', 'Erro ao obter pastas', 'Por favor, tente novamente');
        })
        .finally(() => {
            isLoading.value = false;
        })
    }

    function handleClickFolder(_newParentFolderId: number | undefined) {
        if (!entity.value || _newParentFolderId === undefined) { console.error('Error on handleClickFolder. entity.value: ',entity.value,' _newParentFolderId: ', _newParentFolderId); return; }

        isLoading.value = true;

        if (entity.value.kind === 'file') {
            moveFile(entity.value, _newParentFolderId)
            .then(() => {
                createPopup('success', 'Sucesso', 'Sucesso ao mover o arquivo');
                eventBus.dispatchEvent(new Event(EVENT_ENTITY_UPDATED));
                isOpen.value = false;
            })
            .catch((_error) => {
                console.error(_error);
                createPopup('error', 'Erro ao deletar o arquivo', 'Por favor, tente novamente');
            })
            .finally(() => {
                isLoading.value = false;
            })
        }
        else {

        }
    }

    function handleClickCancel() {
        closeModal();
    }

    function filterCurrentParentFolder(_foldersArray: FolderType[]): FolderType[] {
        return _foldersArray.filter((folder: FolderType) => (entity.value?.parentFolderId !== folder.id));
    }
</script>


<template>
    <LoadingOverlay v-if="isLoading" />

    <ModalContainer v-if="isOpen" @click-outside="closeModal">
        <ShinyContainer class="rounded-md relative">
            <div class="flex flex-col gap-6 p-2 py-4 rounded-md bg-(--foreground)">
                <CloseButton @click="closeModal" />

                <div class="flex items-center gap-1">
                    <Icon icon="fa7-solid:exchange" width="24" height="24" />
                    <p class="text-xl">Mover Arquivo</p>
                </div>

                <p>Selecione para qual pasta deseja mover o arquivo:</p>

                <div class="flex flex-col gap-1 max-h-[50vh] overflow-y-auto">
                    <FolderPreview v-for="folder in folders" :folder="folder" :interactable="false" @click="() => { handleClickFolder(folder.id) }" />
                </div>

                <Button variant="primary-outlined" @click="handleClickCancel">
                    Cancelar
                </Button>
            </div>
        </ShinyContainer>
    </ModalContainer>
</template>


<style scoped>

</style>