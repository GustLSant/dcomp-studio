<script setup lang="ts">
    import { computed, onUnmounted, ref } from 'vue';
    import { Codemirror } from 'vue-codemirror';
    import { python } from "@codemirror/lang-python";
    import { codeThemesDict, getEditorTheme } from '../../utils/editorTheme';
    import { onMounted } from 'vue';
    import eventBus from '../../eventBus';
    import { history } from "@codemirror/commands";
    import { EVENT_EDITOR_FONT_SIZE_CHANGED, EVENT_EDITOR_THEME_CHANGED } from '../../events/editor';
    import type { EditorTheme } from '../../enums/editorThemes';
    import { lintGutter } from '@codemirror/lint';
    import { pythonLinter } from '../../utils/code';
import { getFontSizeFromLocalStorage } from '../../utils/codeEditor';

    const code = defineModel<string>();
    const editorView = defineModel<any>('editorView');
    const editorTheme = ref<EditorTheme>(getEditorTheme());
    const extensions = computed(() => [
        python(),
        history(),
        lintGutter(),
        pythonLinter,
        ...codeThemesDict[editorTheme.value]
    ]);
    const fontSize = ref<string>('12');

    function onCodeMirrorReady(payload: { view: any }) { editorView.value = payload.view; console.log(editorView.value); };

    onMounted(() => { eventBus.addEventListener(EVENT_EDITOR_FONT_SIZE_CHANGED, getFontSize) });
    onUnmounted(() => { eventBus.removeEventListener(EVENT_EDITOR_FONT_SIZE_CHANGED, getFontSize) });
    function getFontSize() { fontSize.value = getFontSizeFromLocalStorage(); console.log(fontSize.value) }

    onMounted(() => { eventBus.addEventListener(EVENT_EDITOR_THEME_CHANGED, handleEditorThemeChanged); });
    onUnmounted(() => { eventBus.removeEventListener(EVENT_EDITOR_THEME_CHANGED, handleEditorThemeChanged) });
    function handleEditorThemeChanged() { editorTheme.value = getEditorTheme(); }
</script>


<template>
    <codemirror
        ref="editorRef"
        v-model="code"
        @ready="onCodeMirrorReady"
        :extensions="extensions"
        :style="{ fontSize: `${fontSize}px` }"
    />
</template>


<style scoped>
    :deep(.cm-editor) {
        min-height: 100vh;
    }

    :deep(.cm-tooltip, .cm-tooltip-lint) {
        padding: 6px 8px;
        border-radius: 4px;
        background: #292929;
        color: #e5e7eb;
        border: 1px solid #4e4e4e;
        opacity: 75%;
        box-shadow: 0 10px 25px rgba(0,0,0,.4);
        font-family: monospace;
        pointer-events: none !important;
    }

    :deep(.cm-diagnostic-error)   { color: #fca5a5; border-left: 2px solid red; border-radius: 2px solid transparent; }
    :deep(.cm-diagnostic-warning) { color: #fde68a; }
    :deep(.cm-diagnostic-info)    { color: #93c5fd; }
</style>