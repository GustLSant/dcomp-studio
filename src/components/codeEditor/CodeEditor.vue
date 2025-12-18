<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { Codemirror } from 'vue-codemirror';
    import { python } from "@codemirror/lang-python";
    import { codeThemesDict, getEditorTheme } from '../../utils/editorTheme';
    import { onMounted, onUnmounted } from 'vue';
    import eventBus from '../../eventBus';
    import { editorButtonsMappingToFunctions } from '../../utils/codeEditor';
    import { codeEditorButtonItems, type CodeEditorButton } from '../../enums/codeEditorButtons';
    import { FOOTER_BT_EVENT_SULFIX } from '../../utils/codeEditor';
    import { history } from "@codemirror/commands";
    import { EVENT_EDITOR_THEME_CHANGED } from '../../events/editor';
    import type { EditorTheme } from '../../enums/editorThemes';

    const code = defineModel<string>();
    const codeMirrorTextElement = ref<any>(null);
    const editorTheme = ref<EditorTheme>(getEditorTheme());
    const extensions = computed(() => [ python(), history(), ...codeThemesDict[editorTheme.value] ]);

    function onCodeMirrorReady(payload: { view: any }) { codeMirrorTextElement.value = payload.view; }


    const footerButtonFunctions: (() => void)[] = [
        ...codeEditorButtonItems.map((bt: CodeEditorButton) => {
            return () => { editorButtonsMappingToFunctions[bt](codeMirrorTextElement.value) };
        })
    ]

    onMounted(connectButtonEvents);
    onUnmounted(disconnectButtonEvents);

    onMounted(() => { eventBus.addEventListener(EVENT_EDITOR_THEME_CHANGED, handleEditorThemeChanged); });


    function connectButtonEvents() {
        codeEditorButtonItems.forEach((bt: CodeEditorButton, idx: number) => {
            eventBus.addEventListener(
                bt + FOOTER_BT_EVENT_SULFIX,
                footerButtonFunctions[idx]!
            );
        });
    }

    function disconnectButtonEvents() {
        codeEditorButtonItems.forEach((bt: CodeEditorButton, idx: number) => {
            eventBus.removeEventListener(
                bt + FOOTER_BT_EVENT_SULFIX,
                footerButtonFunctions[idx]!
            );
        });
    }


    function handleEditorThemeChanged() {
        editorTheme.value = getEditorTheme();
    }
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