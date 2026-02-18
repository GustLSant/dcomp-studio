<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import { Icon } from '@iconify/vue';
    import FileNameContainer from '../../common/FileNameContainer.vue';
    import { type FolderType, type FileType } from '../../../types/entities';
    import { onBeforeUnmount, onMounted, ref } from 'vue';
    import { formatDate } from '../../../utils/date';
    import HoverableIcon from '../../common/HoverableIcon.vue';
    import { createPopup } from '../../../utils/popup';
    import Modal from '../../common/Modal.vue';
    import Button from '../../common/Button.vue';
    import { openDeleteEntityModal, openRenameEntityModal } from '../../../utils/actionModal';
    import EditorThemeAccordion from './EditorThemeAccordion.vue';
    import EditorFontSizeSelect from './EditorFontSizeSelect.vue';
    import EditorOriginFolder from './EditorOriginFolder.vue';
    import { exportFile, importFile } from '../../../utils/entities';

    const open = defineModel<boolean>('open');
    const file = defineModel<FileType>('file');
    const parentFolder = ref<FolderType | undefined>(undefined);
    const router = useRouter();


    onMounted(() => { document.body.style.overflow = "hidden"; });
    onBeforeUnmount(() => { document.body.style.overflow = ""; });

    function returnToHome() { router.push('/'); }
    function closeMenu() { open.value = false; }
    

    function handleClickDeleteFile() {
        if (!file.value) return;
        openDeleteEntityModal(file.value);
    }

    function goToExercises() { router.push({ name: 'Exercises' }); }

    function handleClickExportFile() {
        if (!file.value) {
            createPopup('error', 'Erro ao exportar arquivo', 'Por favor, recarregue a página');
            return;
        }

        exportFile(file.value);
    }

    function handleClickImportFile() {
        importFile()
        .then((_response) => { 
            file.value = {
                ..._response,
                id: file.value?.id
            };
            createPopup('success', 'Sucesso', 'Arquivo Importado com sucesso');
            closeMenu();
        })
        .catch((_error) => { createPopup('error', 'Erro ao importar o arquivo', 'Verifique se o arquivo é válido'); })
    }
</script>


<template>
    <Modal :open="open" @close="closeMenu">
        <div class="flex flex-col gap-4 p-2 py-4 rounded-md bg-(--foreground)">

            <div class="flex items-center gap-1">
                <Icon icon="mdi:file-outline" width="24" height="24" />
                <p>Menu do Arquivo</p>
            </div>

            <div v-if="file" class="flex flex-col gap-4">
                <section>
                    <p class="font-light opacity-60 text-sm">Arquivo:</p>
                    <div class="flex items-center gap-2 hover:cursor-pointer" @click="() => { openRenameEntityModal(file!) }">
                        <FileNameContainer class="grow">
                            {{ file.name }}
                        </FileNameContainer>

                        <HoverableIcon icon="mdi:rename-outline" :size="22" />
                    </div>
                </section>

                <section class="flex-row! justify-between items-center">
                    <p>Data de criação:</p>
                    <p class="font-mono">{{ formatDate(file.creationDate) }}</p>
                </section>

                <EditorOriginFolder v-if="parentFolder" :file="file" :parent-folder="parentFolder" />

                <EditorFontSizeSelect />

                <EditorThemeAccordion @theme-changed="closeMenu" />

                <section>                                        
                    <Button variant="neutral" @click="goToExercises" icon="mdi:book-edit-outline">
                        Exercícios
                    </Button>

                    <Button variant="neutral" @click="returnToHome" icon="mdi:home-variant-outline">
                        Home
                    </Button>

                    <div class="flex items-center gap-2">
                        <Button @click="handleClickImportFile" class="basis-1 grow" variant="neutral" icon="mdi:download-circle-outline"> 
                            Importar
                        </Button>

                        <Button @click="handleClickExportFile" class="basis-1 grow" variant="neutral" icon="mdi:upload-circle-outline"> 
                            Exportar
                        </Button>
                    </div>


                    <Button variant="danger-filled" @click="handleClickDeleteFile" icon="mdi:file-document-delete-outline">
                        Excluir Arquivo
                    </Button>
                </section>
            </div>
        </div>
    </Modal>
</template>


<style scoped>
    section {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
</style>