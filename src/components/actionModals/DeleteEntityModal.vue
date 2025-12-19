<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import ShinyContainer from '../common/shinyContainer/ShinyContainer.vue';
    import CloseButton from '../common/CloseButton.vue';
    import { onMounted, onUnmounted, ref } from 'vue';
    import eventBus from '../../eventBus';
    import Button from '../common/Button.vue';
    import { deleteFile } from '../../services/files';
    import { type FolderType, type FileType } from '../../types/entities';
    import { createPopup } from '../../utils/popup';
    import { EVENT_DELETE_ENTITY } from '../../events/actionModal';
    import { useRouter } from 'vue-router';
    import ActionModalContainer from './ActionModalContainer.vue';


    const modalRef = ref<InstanceType<typeof ActionModalContainer> | null>(null)
    const entity = ref<FileType | FolderType | undefined>(undefined);
    const loading = ref<boolean>(false);
    const router = useRouter();

    onMounted(() => { modalRef.value?.setModalName('deleteEntityModal'); });

    onMounted(() => { eventBus.addEventListener(EVENT_DELETE_ENTITY, handleOpenModal) });
    onUnmounted(() => { eventBus.removeEventListener(EVENT_DELETE_ENTITY, handleOpenModal) });


    function handleOpenModal(_event: Event) {
        if (!modalRef) { return; }

        const event = _event as CustomEvent<{ entity: FileType | FolderType }>;
        entity.value = event.detail.entity;
        
        modalRef.value!.requestModalOpen();
    }


    function handleClickDeleteFile() {
        if (!entity.value || !modalRef.value) return;

        loading.value = true;

        if (entity.value.kind === 'file') {
            const parentFolderId: number = entity.value.parentFolderId;

            deleteFile(entity.value)
            .then(() => {
                createPopup('success', 'Sucesso', 'Sucesso ao deletar o arquivo');
                router.push({ path: '/folder/' + parentFolderId })
            })
            .catch((_error) => {
                console.log(_error);
                createPopup('error', 'Erro ao deletar o arquivo', 'Por favor, tente novamente');
            })
            .finally(() => {
                loading.value = false;
            })
        }
        else {

        }
    }


    function handleClickCancel() {
        modalRef.value!.requestModalClose();
    }
</script>


<template>
    <LoadingOverlay v-if="loading" />

    <ActionModalContainer ref="modalRef">
        <ShinyContainer class="rounded-md relative">
            <div class="flex flex-col gap-6 p-2 py-4 rounded-md bg-(--foreground)">
                <CloseButton @click="modalRef!.requestModalClose" />

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

                    <Button variant="primary-outlined" @click="handleClickCancel">
                        Cancelar
                    </Button>
                </div>
            </div>
        </ShinyContainer>
    </ActionModalContainer>
</template>


<style scoped>

</style>