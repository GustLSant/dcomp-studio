<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue';
    import CodeEditor from '../components/codeEditor/CodeEditor.vue';
    import { useRoute } from 'vue-router';
    import { type FileType } from '../types/entities';
    import { getFileById, updateFile } from '../services/files';
    import { getDefaultFile } from '../utils/entities';
    import { runPythonCode } from '../utils/code';
    import CodeOutputModal from '../components/files/CodeOutputModal.vue';
    import LoadingOverlay from '../components/common/LoadingOverlay.vue';
    import type { CodeOutput } from '../types/code';
    import CodeNavbar from '../components/layout/CodeNavbar.vue';

    const file = ref<FileType | undefined>(undefined);
    const codeOutput = ref<CodeOutput>({ type: 'success', content: '' });
    const canShowCodeOutput = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const route = useRoute();

    onMounted(getFileFromDB);


    async function getFileFromDB() {
        loading.value = true;

        getFileById(Number(route.params.id))
        .then((_response: FileType) => {
            file.value = _response
        })
        .catch((_error) => {
            console.error(_error)
            file.value = getDefaultFile();
        })
        .finally(() => {
            loading.value = false;
        })
    }


    function saveFile() {
        if(!file.value) { return; } 
        updateFile(file.value)
        .then((_response) => {
            console.log('saving successful');
        })
        .catch((_error) => {
            console.error(_error);
        })
    }


    async function runCode() {
        if(!file.value){ return; }
        
        loading.value = true;

        runPythonCode(file.value.content)
        .then((_response: string) => {
            codeOutput.value = {
                type: 'success',
                content: _response,
            };
        })
        .catch((_error) => {
            codeOutput.value = {
                type: 'error',
                content: _error,
            };
        })
        .finally(() => {
            loading.value = false;
            canShowCodeOutput.value = true;
        })
    }
</script>


<template>
    <CodeNavbar @run-code="runCode" @save-file="saveFile" />
    <LoadingOverlay v-if="loading" />
    <router-view />

    <div v-if="file">
        <CodeEditor v-model="file.content" />
        <CodeOutputModal v-model="canShowCodeOutput" :file-name="file.name" :code-output="codeOutput" />
    </div>
</template>


<style scoped>

</style>