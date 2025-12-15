<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import ModalContainer from '../common/ModalContainer.vue';
    import ShinyContainer from '../common/shinyContainer/ShinyContainer.vue';
    import CloseButton from '../common/CloseButton.vue';
    import { onMounted, onUnmounted, ref } from 'vue';
    import eventBus from '../../eventBus';
    import Button from '../common/Button.vue';
    import { deleteFile } from '../../services/files';
    import { type FolderType, type FileType } from '../../types/entities';
    import LoadingOverlay from '../common/LoadingOverlay.vue';
    import { createPopup } from '../../utils/popup';
    import { EVENT_DELETE_ENTITY } from '../../events/actionModal';
    import { useRouter } from 'vue-router';

    const isOpen = ref<boolean>(false);
    const isLoading = ref<boolean>(false);
    const entity = ref<FileType | FolderType | undefined>(undefined);
    const router = useRouter();

    onMounted(() => { eventBus.addEventListener(EVENT_DELETE_ENTITY, openModal) });
    onUnmounted(() => { eventBus.removeEventListener(EVENT_DELETE_ENTITY, openModal) });

    function closeModal() {
        isOpen.value = false;
    }
    
    function openModal(_event: Event) {
        const event = _event as CustomEvent<{ entity: FileType | FolderType }>;
        
        entity.value = event.detail.entity;
        
        isOpen.value = true;
    }

    function handleClickDeleteFile() {
        if (!entity.value) return;

        isLoading.value = true;

        if (entity.value.kind === 'file') {
            const parentFolderId: number = entity.value.parentFolderId;

            deleteFile(entity.value)
            .then(() => {
                createPopup('success', 'Sucesso', 'Sucesso ao deletar o arquivo');
                // router.push({ name: 'Home' });
                router.push({ path: '/folder/' + parentFolderId });
                isOpen.value = false;
            })
            .catch((_error) => {
                console.log(_error);
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
</script>


<template>
    <LoadingOverlay v-if="isLoading" />

    <ModalContainer v-if="isOpen" @click-outside="closeModal">
        <ShinyContainer class="rounded-md relative">
            <div class="flex flex-col gap-6 p-2 py-4 rounded-md bg-(--foreground)">
                <CloseButton @click="closeModal" />

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
    </ModalContainer>
</template>


<style scoped>


</style>