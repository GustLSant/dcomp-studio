<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue';
    import { Icon } from '@iconify/vue';
    import { addFile } from '../../services/files';
    import { addFolder } from '../../services/folders';
    import type { Entity, EntityKind, FileType, FolderType } from '../../types/entities';
    import { getDefaultFile, getDefaultFolder } from '../../utils/entities';
    import { createPopup } from '../../utils/popup';
    import FolderPreview from '../folders/FolderPreview.vue';
    import Button from '../common/Button.vue';
    import ShinyContainer from '../common/shinyContainer/ShinyContainer.vue';
    import TextInput from '../common/TextInput.vue';
    import eventBus from '../../eventBus';
    import { EVENT_CREATE_ENTITY } from '../../events/actionModal';
    import { EVENT_ENTITY_TREE_UPDATED } from '../../events/entitiesTree';
    import { useRoute, useRouter } from 'vue-router';
    import ActionModalContainer from './ActionModalContainer.vue';

    const modalRef = ref<InstanceType<typeof ActionModalContainer> | null>(null);
    const router = useRouter();
    const route = useRoute();

    const entityKind = ref<EntityKind>('file');
    const parentFolder = ref<FolderType | undefined>(undefined);
    const entityName = ref<string>('');


    onMounted(() => { eventBus.addEventListener(EVENT_CREATE_ENTITY, handleOpenModal) });
    onUnmounted(() => { eventBus.removeEventListener(EVENT_CREATE_ENTITY, handleOpenModal) });


    function handleOpenModal(_event: Event) {
        if (!modalRef) { return; }

        const event = _event as CustomEvent<{ entityKind: EntityKind, parentFolder: FolderType }>;

        entityKind.value = event.detail.entityKind;
        parentFolder.value = event.detail.parentFolder;
        entityName.value = (event.detail.entityKind === 'file') ? 'Novo Arquivo' : 'Nova Pasta';

        if (!parentFolder.value) {
            createPopup('error', `Erro ao criar ${(entityKind.value === 'file') ? 'Arquivo' : 'Pasta'}`, 'Por favor, tente novamente');
            return ;
        }

        modalRef.value!.openModal();
    }


    function handleCloseModal() {
        modalRef.value!.closeModal();
    }


    function handleAddEntity() {
        let newEntity: Entity;

        if (entityKind.value === 'file') newEntity = getDefaultFile();
        else newEntity = getDefaultFolder();

        newEntity.parentFolderId = parentFolder.value!.id!;
        newEntity.name = entityName.value;

        modalRef.value?.setLoading(true);

        if (entityKind.value === 'file') {
            addFile(newEntity as FileType)
            .then((_response) => { performSuccessEffect(_response); })
            .catch((_error)   => { createPopup('error', 'Erro ao criar arquivo', 'Por favor, tente novamente'); })
            .finally(()       => { modalRef.value?.setLoading(false); })
        }
        else {
            addFolder(newEntity as FolderType)
            .then((_response: number) => { performSuccessEffect(_response); })
            .catch((_error)           => { createPopup('error', 'Erro ao criar nova pasta', 'Por favor, tente novamente'); })
            .finally(()               => { modalRef.value?.setLoading(false); })
        }
    }


    function performSuccessEffect(_id: number) {
        const popupSubtitle: string = (entityKind.value === 'file') ? 'Sucesso ao criar o arquivo' : 'Sucesso ao criar a pasta';

        createPopup('success', 'Sucesso', popupSubtitle);
        eventBus.dispatchEvent(new Event(EVENT_ENTITY_TREE_UPDATED));
        
        handleCloseModal();
        if (route.name !== 'FileMenu') { router.push({ path: `/${entityKind.value}/${_id}`}); }
    }
</script>


<template>
    <ActionModalContainer ref="modalRef">
        <ShinyContainer class="rounded-md max-w-[600px] m-auto">

            <div class="relative flex flex-col gap-4 bg-(--foreground) p-2 rounded-md">
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
                        <FolderPreview :entity="parentFolder!" :interactable="false" />
                    </div>
                </div>
                

                <div class="flex items-center justify-end gap-2">
                    <Button variant="danger-outlined" icon="mdi:close" @click="handleCloseModal">
                        Cancelar
                    </Button>
    
                    <Button @click="handleAddEntity" variant="primary-filled" icon="mdi:add">
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