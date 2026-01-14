<script setup lang="ts">
    import { ref } from 'vue';
    import { editorThemeItems, type EditorTheme } from '../../../enums/editorThemes';
    import { changeEditorTheme } from '../../../utils/editorTheme';
    import { Icon } from '@iconify/vue';

    const isOpen = ref<boolean>(false);

    function handleClickChangeEditorTheme(_theme: EditorTheme) {
        changeEditorTheme(_theme);
    }
</script>


<template>
    <section :class="(isOpen) ? 'max-h-[600px]' : 'max-h-10'" class="overflow-y-hidden border border-white/20 rounded-md p-2 gap-2!">
        <div @click.stop="() => { isOpen = !isOpen; }" class="flex items-center justify-between">
            <p>Tema do Editor:</p>
            <Icon v-if="isOpen" icon="mdi:chevron-up" width="24" height="24" />
            <Icon v-else icon="mdi:chevron-down" width="24" height="24" />
        </div>
        <div v-for="theme in editorThemeItems" @click="() => { handleClickChangeEditorTheme(theme) }" class="bg-neutral-600 p-2 rounded-sm">{{ theme }}</div>
    </section>
</template>


<style scoped>
    section {
        transition: max-height var(--anim-duration-short);
    }
</style>