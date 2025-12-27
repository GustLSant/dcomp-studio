<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import ShinyContainer from '../common/shinyContainer/ShinyContainer.vue';
    import { onMounted, onUnmounted, ref } from 'vue';
    import eventBus from '../../eventBus';
    import Button from '../common/Button.vue';
    import { updateFile } from '../../services/files';
    import { type FolderType, type FileType } from '../../types/entities';
    import { createPopup } from '../../utils/popup';
    import { EVENT_RENAME_ENTITY } from '../../events/actionModal';
    import TextInput from '../common/TextInput.vue';
    import ActionModalContainer from './ActionModalContainer.vue';
    import { EVENT_ENTITY_TREE_UPDATED } from '../../events/entitiesTree';
    import { updateFolder } from '../../services/folders';

    const modalRef = ref<InstanceType<typeof ActionModalContainer> | null>(null);
    const entity = ref<FileType | FolderType | undefined>(undefined);
    const entityName = ref<string>('');

    onMounted(() => { eventBus.addEventListener(EVENT_RENAME_ENTITY, handleOpenModal) });
    onUnmounted(() => { eventBus.removeEventListener(EVENT_RENAME_ENTITY, handleOpenModal) });


    function handleOpenModal(_event: Event) {
        const event = _event as CustomEvent<{ entity: FileType | FolderType }>;

        entity.value = event.detail.entity;
        entityName.value = entity.value.name;

        modalRef.value!.openModal();
    }


    function handleCloseModal() {
        modalRef.value!.closeModal();
    }


    function handleClickRenameFile() {
        if (!entity.value) return;

        if (entityName.value.length === 0) { createPopup('error', 'Não é possível renomear para " "', 'Por favor, digite outro nome'); return; }

        modalRef.value?.setLoading(true);

        entity.value.name = entityName.value;

        if (entity.value.kind === 'file') {
            updateFile(entity.value)
            .then(() => { performSuccessEffect(); })
            .catch((_error) => { createPopup('error', 'Erro ao renomear o arquivo', _error); })
            .finally(() => { modalRef.value?.setLoading(false); })
        }
        else {
            updateFolder(entity.value)
            .then(() => { performSuccessEffect(); })
            .catch((_error) => { createPopup('error', 'Erro ao renomear a pasta', _error); })
            .finally(() => { modalRef.value?.setLoading(false); })
        }
    }


    function performSuccessEffect() {
        const popupSubtitle: string = (entity.value?.kind === 'file') ? 'Sucesso ao renomear o arquivo' : 'Sucesso ao renomear a pasta';
        createPopup('success', 'Sucesso', popupSubtitle);
        eventBus.dispatchEvent(new Event(EVENT_ENTITY_TREE_UPDATED));
        handleCloseModal();
    }
</script>


<template>
    <ActionModalContainer ref="modalRef">
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
                    <Button @click="handleCloseModal" variant="primary-outlined">
                        Cancelar
                    </Button>

                    <Button @click="handleClickRenameFile" variant="primary-filled" icon="mdi:rename-outline">
                        Renomear arquivo
                    </Button>
                </div>
            </div>
        </ShinyContainer>
    </ActionModalContainer>
</template>


<style scoped>


</style>