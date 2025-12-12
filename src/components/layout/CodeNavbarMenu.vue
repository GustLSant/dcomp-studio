<script setup lang="ts">
    import { useRoute, useRouter } from 'vue-router';
    import { Icon } from '@iconify/vue';
    import CloseButton from '../common/CloseButton.vue';
    import FileNameContainer from '../common/FileNameContainer.vue';
    import FolderPreview from '../folders/FolderPreview.vue';
    import { type FolderType, type FileType } from '../../types/entities';
    import { onBeforeUnmount, onMounted, ref } from 'vue';
    import { getFileById } from '../../services/files';
    import { formatDate } from '../../utils/date';
    import HoverableIcon from '../common/HoverableIcon.vue';
    import ShinyContainer from '../common/shinyContainer/ShinyContainer.vue';
    import { getFolderById } from '../../services/folders';
    import { createPopup } from '../../utils/popup';
    import ModalContainer from '../common/ModalContainer.vue';
    import Button from '../common/Button.vue';
    import { deleteFile } from '../../utils/actionModal';

    const file = ref<FileType | undefined>(undefined);
    const parentFolder = ref<FolderType | undefined>(undefined);
    const loading = ref<boolean>(false);
    const route = useRoute();
    const router = useRouter();

    onMounted(getFileFromDB);

    onMounted(() => { document.body.style.overflow = "hidden"; });
    onBeforeUnmount(() => { document.body.style.overflow = ""; });
    

    function handleClickReturnToHome() {
        router.push('/home');
    }

    function handleClickCloseMenu() {
        router.back();
    }

    
    async function getFileFromDB() {
        loading.value = true;

        getFileById(Number(route.params.id))
        .then((_response: FileType) => {
            file.value = _response;

            getFolderById(file.value.parentFolderId)
            .then((_response: FolderType) => { parentFolder.value = _response; })
            .catch((_error) => { createPopup('error', 'Erro ao obter a pasta de origem', 'Por favor, recarregue a página'); })
        })
        .catch((_error) => {
            console.error(_error);
            handleClickCloseMenu();
        })
        .finally(() => {
            loading.value = false;
        })
    }

    function handleClickDeleteFile() {
        if (!file.value) return;
        deleteFile(file.value);
    }
</script>


<template>
    <ModalContainer @click-outside="handleClickCloseMenu">
        <ShinyContainer class="rounded-md relative">
            <div class="flex flex-col gap-4 p-2 py-4 rounded-md bg-(--foreground)">
                <CloseButton @click="handleClickCloseMenu" />

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

                            <HoverableIcon icon="mdi:edit" :size="22" />
                        </div>
                    </section>

                    <section>
                        <p class="font-light opacity-60 text-sm">Data de criação:</p>
                        <p class="font-mono">{{ formatDate(file.creationDate) }}</p>
                    </section>

                    <section v-if="parentFolder">
                        <p>Pasta de origem:</p>
                        <div class="flex items-center justify-between gap-2">
                            <FolderPreview :folder="parentFolder" :interactable="false" />
                            <Icon icon="fa7-solid:exchange" width="22" height="22" />
                        </div>
                    </section>

                    <section>
                        <Button variant="primary-filled">
                            Executar
                        </Button>

                        <Button variant="primary-outlined">
                            Salvar
                        </Button>
                        
                        <Button variant="danger-outlined" @click="handleClickReturnToHome">
                            Sair para Home
                        </Button>

                        <Button variant="danger-filled" @click="handleClickDeleteFile">
                            Excluir Arquivo
                        </Button>
                    </section>
                </div>
            </div>
        </ShinyContainer>
    </ModalContainer>
</template>


<style scoped>
    section {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
</style>