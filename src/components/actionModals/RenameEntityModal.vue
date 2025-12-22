<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import Modal from '../common/Modal.vue';
    import ShinyContainer from '../common/shinyContainer/ShinyContainer.vue';
    import { onMounted, onUnmounted, ref } from 'vue';
    import eventBus from '../../eventBus';
    import Button from '../common/Button.vue';
    import { updateFile } from '../../services/files';
    import { type FolderType, type FileType } from '../../types/entities';
    import LoadingOverlay from '../common/LoadingOverlay.vue';
    import { createPopup } from '../../utils/popup';
    import { EVENT_RENAME_ENTITY } from '../../events/actionModal';
    import TextInput from '../common/TextInput.vue';

    const open = ref<boolean>(false);
    const isLoading = ref<boolean>(false);
    const entity = ref<FileType | FolderType | undefined>(undefined);
    const entityName = ref<string>('');

    onMounted(() => { eventBus.addEventListener(EVENT_RENAME_ENTITY, openModal) });
    onUnmounted(() => { eventBus.removeEventListener(EVENT_RENAME_ENTITY, openModal) });

    function closeModal() {
        open.value = false;
    }

    function openModal(_event: Event) {
        const event = _event as CustomEvent<{ entity: FileType | FolderType }>;

        entity.value = event.detail.entity;
        entityName.value = entity.value.name;

        open.value = true;
    }

    function handleClickRenameFile() {
        if (!entity.value) return;

        isLoading.value = true;

        if (entity.value.kind === 'file') {
            entity.value.name = entityName.value;

            updateFile(entity.value)
            .then(() => {
                createPopup('success', 'Sucesso', 'Sucesso ao renomear o arquivo');
                open.value = false;
            })
            .catch((_error) => {
                createPopup('error', 'Erro ao renomear o arquivo', _error);
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

        <Modal :open="open" @close="closeModal">
            <ShinyContainer class="rounded-md relative">
                <div class="flex flex-col gap-6 p-2 py-4 rounded-md bg-(--foreground)">
                    <div class="flex items-center gap-1">
                        <Icon icon="mdi:rename-outline" width="24" height="24" />
                        <p class="text-xl">Renomear {{ (entity?.kind === 'file') ? 'Arquivo' : 'Pasta' }}</p>
                    </div>

                    <div class="flex flex-col">
                        <p>Nome {{ (entity?.kind === 'file' ? 'do arquivo' : 'da pasta') }}:</p>
                        <TextInput v-model="entityName" />
                    </div>

                    <div class="flex items-stretch justify-end flex-wrap gap-2">
                        <Button variant="primary-outlined" @click="handleClickCancel">
                            Cancelar
                        </Button>

                        <Button variant="primary-filled" @click="handleClickRenameFile">
                            Renomear arquivo
                        </Button>
                    </div>
                </div>
            </ShinyContainer>
        </Modal>
</template>


<style scoped>


</style>