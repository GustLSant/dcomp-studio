<script setup lang="ts">
    import { useRoute, useRouter } from 'vue-router';
    import { Icon } from '@iconify/vue';
    import FileNameContainer from '../../common/FileNameContainer.vue';
    import FolderPreview from '../../folders/FolderPreview.vue';
    import { type FolderType, type FileType } from '../../../types/entities';
    import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';
    import { getFileById } from '../../../services/files';
    import { formatDate } from '../../../utils/date';
    import HoverableIcon from '../../common/HoverableIcon.vue';
    import ShinyContainer from '../../common/shinyContainer/ShinyContainer.vue';
    import { getFolderById } from '../../../services/folders';
    import { createPopup } from '../../../utils/popup';
    import Modal from '../../common/Modal.vue';
    import Button from '../../common/Button.vue';
    import { openDeleteEntityModal, openMoveEntityModal, openRenameEntityModal } from '../../../utils/actionModal';
    import { EVENT_ENTITY_UPDATED } from '../../../events/entities';
    import EditorThemeAccordion from './EditorThemeAccordion.vue';
    import eventBus from '../../../eventBus';

    const file = ref<FileType | undefined>(undefined);
    const parentFolder = ref<FolderType | undefined>(undefined);
    const loading = ref<boolean>(false);
    const route = useRoute();
    const router = useRouter();

    onMounted(getFileFromDB);

    onMounted(() => { document.body.style.overflow = "hidden"; });
    onBeforeUnmount(() => { document.body.style.overflow = ""; });
    
    onMounted(() => { eventBus.addEventListener(EVENT_ENTITY_UPDATED, getFileFromDB); });
    onUnmounted(() => { eventBus.removeEventListener(EVENT_ENTITY_UPDATED, getFileFromDB); });


    function returnToHome() { router.push('/home'); }
    function closeMenu() { router.back(); }

    
    function getFileFromDB() {
        loading.value = true;

        getFileById(Number(route.params.id))
        .then((_response: FileType) => {
            file.value = _response;
            getParentFolder();
        })
        .catch((_error) => {
            console.error(_error);
            createPopup('error', 'Erro ao obter o arquivo', 'Por favor, tente novamente');
            closeMenu();
        })
        .finally(() => {
            loading.value = false;
        })
    }


    function getParentFolder() {
        getFolderById(file.value!.parentFolderId)
        .then((_response: FolderType) => { parentFolder.value = _response; })
        .catch((_error) => { createPopup('error', 'Erro ao obter a pasta de origem', 'Por favor, recarregue a página'); })
    }


    function handleClickDeleteFile() {
        if (!file.value) return;
        openDeleteEntityModal(file.value);
    }
</script>


<template>
    <Modal :open="true" @close="closeMenu">
        <ShinyContainer class="rounded-md relative fade-in-bottom-short">
            <div class="flex flex-col gap-4 p-2 py-4 rounded-md bg-(--foreground)">

                <div class="flex items-center gap-1">
                    <Icon icon="mdi:file-outline" width="24" height="24" />
                    <p>Menu do Arquivo</p>
                </div>

                <div v-if="file" class="flex flex-col gap-4">
                    <section>
                        <p class="font-light opacity-60 text-sm">Arquivo:</p>
                        <div class="flex items-center gap-2">
                            <FileNameContainer class="grow">
                                {{ file.name }}
                            </FileNameContainer>

                            <HoverableIcon icon="mdi:rename-outline" :size="22" @click="() => { openRenameEntityModal(file!) }" />
                        </div>
                    </section>

                    <section>
                        <p class="font-light opacity-60 text-sm">Data de criação:</p>
                        <p class="font-mono">{{ formatDate(file.creationDate) }}</p>
                    </section>

                    <section v-if="parentFolder">
                        <p>Pasta de origem:</p>
                        <div class="flex items-center justify-between gap-2">
                            <FolderPreview :entity="parentFolder" :interactable="false" />
                            <HoverableIcon icon="fa7-solid:exchange" :size="22" @click="() => { openMoveEntityModal(file!) }" />
                        </div>
                    </section>

                    <EditorThemeAccordion />

                    <section>
                        <Button variant="primary-outlined" icon="mdi:content-save-outline">
                            Salvar
                        </Button>
                        
                        <Button variant="primary-outlined" @click="returnToHome" icon="mdi:home">
                            Sair para Home
                        </Button>

                        <Button variant="danger-filled" @click="handleClickDeleteFile" icon="mdi:file-document-delete-outline">
                            Excluir Arquivo
                        </Button>
                    </section>
                </div>
            </div>
        </ShinyContainer>
    </Modal>
</template>


<style scoped>
    section {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
</style>