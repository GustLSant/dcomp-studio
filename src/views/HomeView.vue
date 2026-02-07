<script setup lang="ts">
    import RecentFileViewer from '../components/homeview/RecentFileViewer.vue';
    import FileList from '../components/homeview/FileList.vue';
    import { onMounted, ref } from 'vue';
    import { getAllFiles } from '../services/files';
    import { createPopup } from '../utils/popup';
    import LoadingComponent from '../components/common/LoadingComponent.vue';
    import Button from '../components/common/Button.vue';
    import { openCreateEntityModal } from '../utils/actionModal';
    import { getRootFolder } from '../services/folders';
    import PageContainer from '../components/common/PageContainer.vue';
    import ExerciseRecordsList from '../components/homeview/ExerciseRecordsList.vue';

    const fileCount = ref<number | undefined>(undefined);
    const loading = ref<boolean>(false);
    
    onMounted(getFileCount);

    function getFileCount() {
        loading.value = true;

        getAllFiles()
        .then((_response) => {
            fileCount.value = _response.length;
        })
        .catch((_error) => {
            console.error(_error);
            createPopup('error', 'Erro ao obter os arquivos', 'Por favor, recarregue a página');
        })
        .finally(() => {
            loading.value = false;
        })
    }
</script>


<template>
    <PageContainer v-if="loading" class="flex flex-col justify-center items-center">
        <LoadingComponent />
    </PageContainer>

    <PageContainer v-if="!loading && fileCount !== undefined && fileCount > 0">
        <RecentFileViewer />
        <FileList />
        <ExerciseRecordsList />
    </PageContainer>

    <PageContainer v-if="!loading && fileCount !== undefined && fileCount === 0" class="items-center justify-center">
        <div class="flex flex-col items-center gap-1">
            <p class="text-lg">Você ainda não possui nenhum arquivo</p>
            <p class="text-sm opacity-60">Clique no botão abaixo para criar um arquivo</p>
        </div>
        <Button @click="() => { openCreateEntityModal('file', getRootFolder()) }" variant="primary-filled" icon="mdi:file-plus-outline" >
            Criar Arquivo
        </Button>
    </PageContainer>
</template>


<style scoped>

</style>