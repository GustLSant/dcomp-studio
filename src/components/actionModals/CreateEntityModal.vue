<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue';
    import { Icon } from '@iconify/vue';
    import { addFile } from '../../services/files';
    import { addFolder } from '../../services/folders';
    import type { EntityKind, FileType, FolderType } from '../../types/entities';
    import { getDefaultFile, getDefaultFolder } from '../../utils/entities';
    import { createPopup } from '../../utils/popup';
    import FolderPreview from '../folders/FolderPreview.vue';
    import Button from '../common/Button.vue';
    import CloseButton from '../common/CloseButton.vue';
    import ShinyContainer from '../common/shinyContainer/ShinyContainer.vue';
    import TextInput from '../common/TextInput.vue';
    import eventBus from '../../eventBus';
    import { EVENT_CREATE_ENTITY } from '../../events/actionModal';
    import { EVENT_ENTITY_TREE_UPDATED } from '../../events/entitiesTree';
    import { useRouter } from 'vue-router';
    import LoadingOverlay from '../common/LoadingOverlay.vue';
    import ActionModalContainer from './ActionModalContainer.vue';

    const modalRef = ref<InstanceType<typeof ActionModalContainer> | null>(null);
    const entityKind = ref<EntityKind>('file');
    const parentFolder = ref<FolderType | undefined>(undefined);
    const entityName = ref<string>('');
    const loading = ref<boolean>(false);
    const router = useRouter();

    onMounted(() => { modalRef.value?.setModalName('createEntityModal'); });

    onMounted(() => { eventBus.addEventListener(EVENT_CREATE_ENTITY, handleOpenModal) });
    onUnmounted(() => { eventBus.removeEventListener(EVENT_CREATE_ENTITY, handleOpenModal) });


    function handleOpenModal(_event: Event) {
        if (!modalRef) { return; }

        const event = _event as CustomEvent<{ entityKind: EntityKind, parentFolder: FolderType }>;

        entityKind.value = event.detail.entityKind;
        parentFolder.value = event.detail.parentFolder;
        entityName.value = (event.detail.entityKind === 'file') ? 'Novo Arquivo' : 'Nova Pasta';

        if (!parentFolder.value) {
            createPopup('error', 'Erro ao criar entidade', 'Por favor, tente novamente');
            return ;
        }

        modalRef.value!.requestModalOpen();
    }


    function handleClickAddButton() {
        if (entityKind.value === 'file') handleAddFile();
        else handleAddFolder();
    }


    async function handleAddFolder() {
        const newFolder: FolderType = getDefaultFolder();
        newFolder.parentFolderId = parentFolder.value!.id!;
        newFolder.name = entityName.value;

        loading.value = true;

        addFolder(newFolder)
        .then((_response: number) => {
            createPopup('success', 'Sucesso', 'Sucesso ao criar a pasta');
            eventBus.dispatchEvent(new Event(EVENT_ENTITY_TREE_UPDATED));

            const id: number = _response;
            router.push({ path: '/folder/' + id });
        })
        .catch((_error) => { createPopup('error', 'Erro ao criar nova pasta', 'Por favor, tente novamente'); })
        .finally(() => { loading.value = false; })
    }


    async function handleAddFile() {
        const newFile: FileType = getDefaultFile();
        newFile.parentFolderId = parentFolder.value!.id!;
        newFile.name = entityName.value;

        loading.value = true;

        addFile(newFile)
        .then((_response) => {
            createPopup('success', 'Sucesso', 'Sucesso ao criar o arquivo');
            eventBus.dispatchEvent(new Event(EVENT_ENTITY_TREE_UPDATED));

            const id: number = _response;
            router.push({ path: '/file/' + id });
        })
        .catch((_error) => { createPopup('error', 'Erro ao criar arquivo', 'Por favor, tente novamente'); })
        .finally(() => { loading.value = false; })
    }


    function handleCloseModal() {
        modalRef.value!.requestModalClose();
    }
</script>


<template>
    <LoadingOverlay v-if="loading" />

    <ActionModalContainer ref="modalRef">
        <ShinyContainer class="rounded-md max-w-[600px] m-auto">

            <div class="relative flex flex-col gap-4 bg-(--foreground) p-2 rounded-md">
                <CloseButton @click="handleCloseModal" />

                <div class="flex items-center gap-1 text-xl">
                    <Icon icon="mdi:add" width="24" height="24" />
                    <p>{{ (entityKind === 'file') ? 'Criar novo arquivo' : 'Criar nova pasta' }}</p>
                </div>
    
                <div class="flex flex-col gap-4 my-4">
                    <div class="flex items-center gap-2">
                        <p>Nome:</p>
                        <TextInput v-model="entityName" />
                    </div>
        
                    <div class="flex items-center gap-2">
                        <p>Pasta de origem:</p>
                        <FolderPreview :folder="parentFolder!" :interactable="false" />
                    </div>
                </div>
                

                <div class="flex items-center justify-end gap-2">
                    <Button variant="danger-outlined" icon="mdi:close" @click="handleCloseModal">
                        Cancelar
                    </Button>
    
                    <Button @click="handleClickAddButton" variant="primary-filled" icon="mdi:add">
                        Criar
                        {{ (entityKind === 'file') ? 'Arquivo' : 'Pasta' }}
                    </Button>
                </div>
            </div>

        </ShinyContainer>
    </ActionModalContainer>
</template>


<style scoped>

</style>