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
    import ModalContainer from '../common/ModalContainer.vue';
    import ShinyContainer from '../common/shinyContainer/ShinyContainer.vue';
    import TextInput from '../common/TextInput.vue';
    import eventBus from '../../eventBus';
    import { EVENT_CREATE_ENTITY } from '../../events/actionModal';
    import { EVENT_UPDATE_ENTITY_TREE } from '../../events/entitiesTree';
    import { useRouter } from 'vue-router';

    const isOpen = ref<boolean>(false);
    const entityKind = ref<EntityKind>('file');
    const parentFolder = ref<FolderType | undefined>(undefined);
    const entityName = ref<string>('');
    const router = useRouter();

    onMounted(() => { eventBus.addEventListener(EVENT_CREATE_ENTITY, openModal) });
    onUnmounted(() => { eventBus.removeEventListener(EVENT_CREATE_ENTITY, openModal) });


    function closeModal() {
        isOpen.value = false;
    }


    function openModal(_event: Event) {
        const event = _event as CustomEvent<{ entityKind: EntityKind, parentFolder: FolderType }>;

        entityKind.value = event.detail.entityKind;
        parentFolder.value = event.detail.parentFolder;
        entityName.value = (event.detail.entityKind === 'file') ? 'Novo Arquivo' : 'Nova Pasta';

        if (!parentFolder.value) {
            createPopup('error', 'Erro ao criar entidade', 'Por favor, tente novamente');
            return ;
        }

        isOpen.value = true;
    }


    function handleClickAddButton() {
        if (entityKind.value === 'file') handleAddFile();
        else handleAddFolder();
    }


    async function handleAddFolder() {
        const newFolder: FolderType = getDefaultFolder();
        newFolder.parentFolderId = parentFolder.value!.id!;
        newFolder.name = entityName.value;

        addFolder(newFolder)
        .then((_response: number) => {
            createPopup('success', 'Sucesso', 'Sucesso ao criar a pasta');
            eventBus.dispatchEvent(new Event(EVENT_UPDATE_ENTITY_TREE));

            const id: number = _response;
            router.push({ path: '/folder/' + id });

            closeModal();
        })
        .catch((_error) => { createPopup('error', 'Erro ao criar nova pasta', 'Por favor, tente novamente'); })
        .finally(() => {  })
    }


    async function handleAddFile() {
        const newFile: FileType = getDefaultFile();
        newFile.parentFolderId = parentFolder.value!.id!;
        newFile.name = entityName.value;

        addFile(newFile)
        .then((_response) => {
            createPopup('success', 'Sucesso', 'Sucesso ao criar o arquivo');
            eventBus.dispatchEvent(new Event(EVENT_UPDATE_ENTITY_TREE));

            const id: number = _response;
            router.push({ path: '/file/' + id });
            
            closeModal();
        })
        .catch((_error) => { createPopup('error', 'Erro ao criar arquivo', 'Por favor, tente novamente'); })
        .finally(() => {  })
    }
</script>


<template>
    <ModalContainer v-if="isOpen" @click-outside="closeModal">
        <ShinyContainer class="rounded-md max-w-[600px] m-auto">

            <div class="relative flex flex-col gap-4 bg-(--foreground) p-2 rounded-md">
                <CloseButton @click="closeModal" />

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
                    <Button variant="danger-outlined" icon="mdi:close" @click="closeModal">
                        Cancelar
                    </Button>
    
                    <Button @click="handleClickAddButton" variant="primary-filled" icon="mdi:add">
                        Criar
                        {{ (entityKind === 'file') ? 'Arquivo' : 'Pasta' }}
                    </Button>
                </div>
            </div>

        </ShinyContainer>
    </ModalContainer>
</template>


<style scoped>

</style>