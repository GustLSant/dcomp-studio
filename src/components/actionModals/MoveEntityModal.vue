<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import Button from '../common/Button.vue';
    import { createPopup } from '../../utils/popup';
    import type { FileType, FolderType } from '../../types/entities';
    import { onMounted, onUnmounted, ref } from 'vue';
    import eventBus from '../../eventBus';
    import { moveFile } from '../../services/files';
    import { EVENT_MOVE_ENTITY } from '../../events/actionModal';
    import { getAllFolders, getRootFolder, moveFolder } from '../../services/folders';
    import FolderPreview from '../entities/FolderPreview.vue';
    import { EVENT_ENTITY_UPDATED } from '../../events/entities';
    import ActionModalContainer from './ActionModalContainer.vue';
    import { openCreateEntityModal } from '../../utils/actionModal';
    import { EVENT_ENTITY_TREE_UPDATED } from '../../events/entitiesTree';

    const modalRef = ref<InstanceType<typeof ActionModalContainer> | null>(null);
    const entity = ref<FileType | FolderType | undefined>(undefined);
    const folders = ref<FolderType[]>([]);

    onMounted(() => { eventBus.addEventListener(EVENT_MOVE_ENTITY, handleOpenModal) });
    onUnmounted(() => { eventBus.removeEventListener(EVENT_MOVE_ENTITY, handleOpenModal) });
    
    // pq se nao tiver nenhuma pasta, vai indicar criar uma, ai precisa ouvir o evento de criacao de entidade
    onMounted(() => { eventBus.addEventListener(EVENT_ENTITY_TREE_UPDATED, getFoldersList); });
    onUnmounted(() => { eventBus.removeEventListener(EVENT_ENTITY_TREE_UPDATED, getFoldersList); });

    
    function handleOpenModal(_event: Event) {
        const event = _event as CustomEvent<{ entity: FileType | FolderType }>;
        entity.value = event.detail.entity;

        modalRef.value?.openModal();
        getFoldersList();
    }

    function handleCloseModal() { modalRef.value?.closeModal(); }


    function getFoldersList() {
        if (!modalRef.value?.checkIsOpen()) return;

        modalRef.value?.setLoading(true);

        getAllFolders()
        .then((_response) => { folders.value = filterCurrentParentFolder(_response); })
        .catch((_error)   => { createPopup('error', 'Erro ao obter pastas', 'Por favor, tente novamente'); })
        .finally(()       => { modalRef.value?.setLoading(false); })
    }


    function handleClickFolder(_newParentFolderId: number | undefined) {
        if (!entity.value || _newParentFolderId === undefined) { console.error('Error on handleClickFolder. entity.value: ',entity.value,' _newParentFolderId: ', _newParentFolderId); return; }

        modalRef.value?.setLoading(true);

        if (entity.value.kind === 'file') {
            moveFile(entity.value, _newParentFolderId)
            .then(()        => { performSuccessEffect() })
            .catch((_error) => { createPopup('error', 'Erro ao mover o arquivo', 'Por favor, tente novamente'); })
            .finally(()     => { modalRef.value?.setLoading(false); })
        }
        else {
            moveFolder(entity.value, _newParentFolderId)
            .then(()        => { performSuccessEffect() })
            .catch((_error) => { createPopup('error', 'Erro ao mover a pasta', 'Por favor, tente novamente'); })
            .finally(()     => { modalRef.value?.setLoading(false); })
        }
    }
    

    function filterCurrentParentFolder(_foldersArray: FolderType[]): FolderType[] {
        return _foldersArray.filter((folder: FolderType) => (entity.value?.parentFolderId !== folder.id));
    }


    function performSuccessEffect() {
        const popupSubtitle: string = (entity.value?.kind === 'file') ? 'Sucesso ao mover o arquivo' : 'Sucesso ao mover a pasta';

        createPopup('success', 'Sucesso', popupSubtitle);
        eventBus.dispatchEvent(new Event(EVENT_ENTITY_UPDATED));
        
        handleCloseModal();
    }


    function handleClickNewFolder() {
        openCreateEntityModal('folder', getRootFolder());
    }
</script>


<template>
    <ActionModalContainer ref="modalRef">
        <div class="flex flex-col gap-6 p-2 py-4 rounded-md bg-(--foreground)" >
            <div class="flex items-center gap-1">
                <Icon icon="fa7-solid:exchange" width="24" height="24" />
                <p class="text-xl">Mover Arquivo</p>
            </div>

            <p>Selecione para qual pasta deseja mover o arquivo:</p>

            <div v-if="folders.length !== 0" class="flex flex-col gap-1 max-h-[50vh] overflow-y-auto">
                <FolderPreview
                    v-for="folder in folders"
                    :entity="folder"
                    :interactable="false"
                    @click="() => { handleClickFolder(folder.id) }"
                    class="hover:brightness-130 hover:cursor-pointer"
                />
            </div>

            <div v-else class="text-center">
                <p class="text-sm opacity-60">Não existe nenhuma outra pasta nos seus arquivos</p>
            </div>

            <div class="flex flex-col gap-1">
                <Button @click="handleClickNewFolder" variant="primary-outlined" icon="mdi:create-new-folder-outline">
                    Nova Pasta
                </Button>
                <Button variant="primary-outlined" @click="handleCloseModal" icon="mdi:arrow-back">
                    Voltar
                </Button>
            </div>
        </div>
    </ActionModalContainer>
</template>


<style scoped>

</style>