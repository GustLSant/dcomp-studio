<script setup lang="ts">
    import { ref } from 'vue';
    import { Codemirror } from 'vue-codemirror';
    import { python } from "@codemirror/lang-python";
    import { codeThemesDict } from '../../utils/codeEditorThemes';
    import { onMounted, onUnmounted } from 'vue';
    import eventBus from '../../eventBus';
    import { editorButtonsMappingToFunctions } from '../../utils/codeEditor';
    import { codeEditorButtonItems, type CodeEditorButton } from '../../enums/codeEditor';
    import { FOOTER_BT_EVENT_SULFIX } from '../../utils/codeEditor';
    import { history } from "@codemirror/commands";

    const code = defineModel<string>();
    const codeMirrorTextElement = ref<any>(null);
    const extensions = [ python(), history(), ...codeThemesDict['dracula'] ];

    function onCodeMirrorReady(payload: { view: any }) { codeMirrorTextElement.value = payload.view; }


    const footerButtonFunctions: (() => void)[] = [
        ...codeEditorButtonItems.map((bt: CodeEditorButton) => {
            return () => { editorButtonsMappingToFunctions[bt](codeMirrorTextElement.value) };
        })
    ]

    onMounted(() => {
        codeEditorButtonItems.forEach((bt: CodeEditorButton, idx: number) => {
            eventBus.addEventListener(
                bt + FOOTER_BT_EVENT_SULFIX,
                footerButtonFunctions[idx]!
            );
        })
    }) 
    onUnmounted(() => {
        codeEditorButtonItems.forEach((bt: CodeEditorButton, idx: number) => {
            eventBus.removeEventListener(
                bt + FOOTER_BT_EVENT_SULFIX,
                footerButtonFunctions[idx]!
            );
        })
    })
</script>


<template>
    <codemirror
        ref="editorRef"
        v-model="code"
        @ready="onCodeMirrorReady"
        :extensions="extensions"
    />
</template>


<style scoped>
    :deep(.cm-editor) {
        min-height: 100vh;
    }
</style>