<script setup lang="ts">
    import { editorThemeItems, type EditorTheme } from '../../../enums/editorThemes';
    import { changeEditorTheme } from '../../../utils/editorTheme';
    import Accordion from '../../common/Accordion.vue';

    function handleClickChangeEditorTheme(_theme: EditorTheme) {
        changeEditorTheme(_theme);
    }
</script>


<template>
    <Accordion title="Tema do Editor:" max-height="460px" min-height="44px" class="py-1!">
        <template #body>
            <div class="flex flex-col gap-2 pb-1.5">
                <div v-for="theme in editorThemeItems" @click.stop="() => { handleClickChangeEditorTheme(theme) }" class="border border-(--border-02) bg-white/10 p-2 rounded-sm">{{ theme }}</div>
            </div>
        </template>
    </Accordion>
</template>


<style scoped>
    section {
        transition: max-height var(--anim-duration-short);
    }
</style>