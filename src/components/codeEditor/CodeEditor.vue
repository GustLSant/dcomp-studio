<script setup lang="ts">
    import { Codemirror } from 'vue-codemirror'
    import { python } from "@codemirror/lang-python";
    import { codeThemesDict } from '../../utils/codeEditorThemes';

    const code = defineModel<string>();
    const extensions = [ python(), ...codeThemesDict['dracula'] ];
</script>


<template>
    <codemirror
        v-model="code"
        :extensions="extensions"
    />
</template>


<style scoped>
    :deep(.cm-editor) {
        min-height: 100vh;
    }
</style>