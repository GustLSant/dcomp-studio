<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import ShinyContainer from '../common/shinyContainer/ShinyContainer.vue';
    import { onMounted, onUnmounted, ref } from 'vue';
    import eventBus from '../../eventBus';
    import Button from '../common/Button.vue';
    import { type FolderType, type FileType, type EntityKind } from '../../types/entities';
    import ActionModalContainer from './ActionModalContainer.vue';
    import FileNameContainer from '../common/FileNameContainer.vue';
    import HoverableIcon from '../common/HoverableIcon.vue';
    import { openDeleteEntityModal, openMoveEntityModal, openRenameEntityModal } from '../../utils/actionModal';
    import { formatDate } from '../../utils/date';
    import FolderPreview from '../folders/FolderPreview.vue';
    import { getFileById } from '../../services/files';
    import { getFolderById } from '../../services/folders';
    import { createPopup } from '../../utils/popup';
    import { EVENT_OPEN_FILE_MENU } from '../../events/entities';
    import { EVENT_ENTITY_TREE_UPDATED } from '../../events/entitiesTree';

    const modalRef = ref<InstanceType<typeof ActionModalContainer> | null>(null);
    const entity = ref<FileType | FolderType | undefined>(undefined);
    const parentFolder = ref<FolderType | undefined>(undefined);

    onMounted(()   => { eventBus.addEventListener(EVENT_OPEN_FILE_MENU, handleOpenEvent); });
    onUnmounted(() => { eventBus.removeEventListener(EVENT_OPEN_FILE_MENU, handleOpenEvent); });

    onMounted(()   => { eventBus.addEventListener(EVENT_ENTITY_TREE_UPDATED, handleEntityTreeUpdatedEvent); });
    onUnmounted(() => { eventBus.removeEventListener(EVENT_ENTITY_TREE_UPDATED, handleEntityTreeUpdatedEvent); })


    function handleOpenEvent(_event: Event) {
        if (!modalRef) { return; }

        const event = _event as CustomEvent<{ id: number, kind: EntityKind }>;        
        
        getData(event.detail.id, event.detail.kind);
    }


    function handleOpenModal() { modalRef.value!.openModal(); }
    function handleCloseModal() { modalRef.value!.closeModal(); }


    async function getData(_id: number, _kind: EntityKind) {
        modalRef.value?.setLoading(true);
        let hasError: boolean = false;

        if (_kind === 'file') {
            await getFileById(_id)
            .then((_response: FileType) => { entity.value = _response; })
            .catch((_error)             => { hasError = true; });
        }
        else {
            await getFolderById(_id)
            .then((_response: FolderType) => { entity.value = _response; })
            .catch((_error)               => { hasError = true; });
        }

        if (entity.value) {
            getFolderById(entity.value.parentFolderId)
            .then((_response: FolderType) => { parentFolder.value = _response; })
            .catch((_error)               => { hasError = true; });
        }

        if (!hasError) {
            modalRef.value?.setLoading(false);
            handleOpenModal();
        }
        else { createPopup('error', 'Erro ao obter os dados', 'Por favor, tente novamente'); }
    }

    function handleClickDeleteEntity() {
        if (!entity.value) return;
        openDeleteEntityModal(entity.value);
    }

    async function handleEntityTreeUpdatedEvent() {
        if (modalRef.value?.checkIsOpen()) {
            const entityStillExists: boolean = await checkEntityStillExists();
            if (!entityStillExists) { handleCloseModal(); }
        }
    }

    async function checkEntityStillExists(): Promise<boolean> {
        try {
            modalRef.value?.setLoading(true);

            if (entity.value?.kind === 'file') { await getFileById(entity.value?.id!); }
            else { await getFolderById(entity.value?.id!); }

            return true;
        }
        catch { return false; }
        finally { modalRef.value?.setLoading(false); }
    }
</script>


<template>
    <ActionModalContainer ref="modalRef">
        <ShinyContainer class="rounded-md relative fade-in-bottom-short">
            <div class="flex flex-col gap-4 p-2 py-4 rounded-md bg-(--foreground)">
                <div class="flex items-center gap-1">
                    <Icon icon="mdi:file-outline" width="24" height="24" />
                    <p>Menu {{ entity?.kind === 'file' ? 'do Arquivo' : 'da Pasta' }}</p>
                </div>

                <div v-if="entity" class="flex flex-col gap-4">
                    <section>
                        <p class="label">Nome:</p>
                        <div class="flex items-center gap-2">
                            <FileNameContainer class="grow">
                                {{ entity.name }}
                            </FileNameContainer>

                            <HoverableIcon icon="mdi:rename-outline" :size="22" @click="() => { openRenameEntityModal(entity!) }" />
                        </div>
                    </section>

                    <section v-if="entity.kind === 'file'">
                        <p class="label">Data de criação:</p>
                        <p class="font-mono">{{ formatDate(entity.creationDate) }}</p>
                    </section>

                    <section v-if="parentFolder">
                        <p class="label">Pasta de origem:</p>
                        <div class="flex items-center justify-between gap-2">
                            <FolderPreview :entity="parentFolder" :interactable="false" />
                            <HoverableIcon icon="fa7-solid:exchange" :size="22" @click="() => { openMoveEntityModal(entity!) }" />
                        </div>
                    </section>

                    <!-- <EditorThemeAccordion /> -->

                    <section class="mt-2">
                        <Button variant="danger-filled" @click="handleClickDeleteEntity" icon="mdi:file-document-delete-outline">
                            {{(entity.kind === 'file') ? 'Excluir Arquivo' : 'Excluir Pasta' }}
                        </Button>
                    </section>
                </div>
            </div>
        </ShinyContainer>
    </ActionModalContainer>
</template>


<style scoped>
    section {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .label {
            opacity: 60%;
            font-size: 14px;
            font-weight: 300;
        }
    }
</style>