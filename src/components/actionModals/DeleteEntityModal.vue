<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import ShinyContainer from '../common/shinyContainer/ShinyContainer.vue';
    import { onMounted, onUnmounted, ref } from 'vue';
    import eventBus from '../../eventBus';
    import Button from '../common/Button.vue';
    import { deleteFile } from '../../services/files';
    import { type FolderType, type FileType } from '../../types/entities';
    import { createPopup } from '../../utils/popup';
    import { useRouter } from 'vue-router';
    import ActionModalContainer from './ActionModalContainer.vue';
    import { EVENT_DELETE_ENTITY } from '../../events/actionModal';
    import { EVENT_ENTITY_TREE_UPDATED } from '../../events/entitiesTree';

    const modalRef = ref<InstanceType<typeof ActionModalContainer> | null>(null);
    const entity = ref<FileType | FolderType | undefined>(undefined);
    const router = useRouter();

    onMounted(() => { eventBus.addEventListener(EVENT_DELETE_ENTITY, handleOpenModal) });
    onUnmounted(() => { eventBus.removeEventListener(EVENT_DELETE_ENTITY, handleOpenModal) });


    function handleOpenModal(_event: Event) {
        if (!modalRef) { return; }

        const event = _event as CustomEvent<{ entity: FileType | FolderType }>;
        entity.value = event.detail.entity;
        
        modalRef.value!.openModal();
    }

    function handleCloseModal() {
        modalRef.value!.closeModal();
    }


    function handleClickDeleteFile() {
        if (!entity.value || !modalRef.value) return;

        modalRef.value?.setLoading(true);

        if (entity.value.kind === 'file') {
            deleteFile(entity.value)
            .then(()        => { performSuccessEffect(); })
            .catch((_error) => { createPopup('error', 'Erro ao deletar o arquivo', 'Por favor, tente novamente'); })
            .finally(()     => { modalRef.value?.setLoading(false); })
        }
        else {

        }
    }


    function performSuccessEffect() {
        const popupSubtitle: string = (entity.value?.kind === 'file') ? 'Sucesso ao deletar o arquivo' : 'Sucesso ao deletar a pasta';

        createPopup('success', 'Sucesso', popupSubtitle);
        eventBus.dispatchEvent(new Event(EVENT_ENTITY_TREE_UPDATED));
        
        handleCloseModal();
        router.push({ path: '/folder/' + entity.value?.parentFolderId });
    }
</script>


<template>
    <ActionModalContainer ref="modalRef">
        <ShinyContainer class="rounded-md relative">
            <div class="flex flex-col gap-6 p-2 py-4 rounded-md bg-(--foreground)">
                <div class="flex items-center gap-1">
                    <Icon icon="mdi:file-document-delete-outline" width="24" height="24" />
                    <p class="text-xl">Deletar Arquivo</p>
                </div>

                <div class="flex flex-col">
                    <p>Tem certeza que deseja deletar o arquivo?</p>
                    <small class="opacity-60">*Esta ação é irreversível</small>
                </div>

                <div class="flex items-stretch justify-end flex-wrap gap-2">
                    <Button variant="danger-filled" @click="handleClickDeleteFile">
                        Deletar arquivo
                    </Button>

                    <Button variant="primary-outlined" @click="handleCloseModal">
                        Cancelar
                    </Button>
                </div>
            </div>
        </ShinyContainer>
    </ActionModalContainer>
</template>


<style scoped>

</style>