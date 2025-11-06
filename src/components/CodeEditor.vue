<script setup lang="ts">
    import { Codemirror } from 'vue-codemirror'
    import { python } from "@codemirror/lang-python";
    import { oneDark } from '@codemirror/theme-one-dark'
    import { loadPyodide, type PyodideInterface } from 'pyodide'
    import { onMounted, ref } from 'vue'

    const code = ref("print('Olá Mundo!')");
    const extensions = [ python(), oneDark ];

    let pyodide: PyodideInterface | null = null;

    onMounted(async () => {
        pyodide = await loadPyodide({
            // indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.29.0/full/'
            indexURL: "/pyodide/"
        });
    });

    async function runCode() {
        if (!pyodide) {
            alert('pyodide nao carregado');
            return;
        }
        try {
            const result = pyodide.runPython(code.value);
            console.log(result);
        } catch (err) {
            console.log(String(err));
        }
    };
</script>


<template>
    <codemirror
        v-model="code"
        :extensions="extensions"
        :style="{ minHeight: '300px' }"
    />

    <p @click="runCode">Executar!</p>
</template>


<style scoped>

</style>