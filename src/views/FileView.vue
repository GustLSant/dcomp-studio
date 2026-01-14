<script setup lang="ts">
    import { onMounted, onUnmounted, ref } from 'vue';
    import CodeEditor from '../components/codeEditor/CodeEditor.vue';
    import { useRoute, useRouter } from 'vue-router';
    import { type FileType } from '../types/entities';
    import { getFileById, updateFile } from '../services/files';
    import { runPythonCode } from '../utils/code';
    import CodeOutputModal from '../components/file/CodeOutputModal.vue';
    import LoadingOverlay from '../components/common/LoadingOverlay.vue';
    import type { CodeOutput } from '../types/code';
    import CodeNavbar from '../components/layout/CodeNavbar.vue';
    import { createPopup } from '../utils/popup';
    import EditorFooter from '../components/file/EditorFooter.vue';
    import eventBus from '../eventBus';
    import { EVENT_SAVE_FILE } from '../events/entities';

    const file = ref<FileType | undefined>(undefined);
    const codeMirrorTextElement = ref<any>(null);
    const codeOutput = ref<CodeOutput>({ type: 'success', content: '' });
    const canShowCodeOutput = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const route = useRoute();
    const router = useRouter();

    
    onMounted(getFileFromDB);

    onMounted(() => { eventBus.addEventListener(EVENT_SAVE_FILE, saveFile); });
    onUnmounted(() => { eventBus.removeEventListener(EVENT_SAVE_FILE, saveFile); });


    async function getFileFromDB() {
        loading.value = true;

        getFileById(Number(route.params.id))
        .then((_response: FileType) => {
            file.value = _response
        })
        .catch((_error) => {
            createPopup('error', 'Erro ao obter o arquivo', _error);
            router.push({ name: 'Home' });
        })
        .finally(() => {
            loading.value = false;
        })
    }


    function saveFile() {
        if (!file.value) { return; } 

        updateFile(file.value)
        .then((_response) => {
            createPopup('success', 'Sucesso', 'Sucesso ao salvar o arquivo');
        })
        .catch((_error) => {
            createPopup('error', 'Erro ao salvar o arquivo', 'Por favor, tente novamente');
        })
    }


    async function runCode() {
        if (!file.value){ return; }
        
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
    <CodeNavbar @run-code="runCode" />
    
    <LoadingOverlay v-if="loading" />
    <router-view />

    <div v-if="file">
        <CodeEditor v-model="file.content" v-model:editor-view="codeMirrorTextElement" />
        <CodeOutputModal v-model="canShowCodeOutput" :file-name="file.name" :code-output="codeOutput" />
        <EditorFooter v-model:editor-view="codeMirrorTextElement" />
    </div>
</template>


<style scoped>

</style>