<script setup lang="ts">
    import { Codemirror } from 'vue-codemirror'
    import { python } from "@codemirror/lang-python";
    import { oneDark } from '@codemirror/theme-one-dark'

    const code = defineModel<string>();
    const extensions = [ python(), oneDark ];
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