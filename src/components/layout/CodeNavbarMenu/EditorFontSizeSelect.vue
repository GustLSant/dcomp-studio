<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { getFontSizeFromLocalStorage } from '../../../utils/codeEditor';
    import eventBus from '../../../eventBus';
    import { EVENT_EDITOR_FONT_SIZE_CHANGED } from '../../../events/editor';

    const fontSize = ref<string>(getFontSizeFromLocalStorage());
    const options = ['10', '12', '14', '16', '18', '20'];

    watch(() => fontSize.value, () => {
        localStorage.setItem('fontSize', fontSize.value);
        eventBus.dispatchEvent(new Event(EVENT_EDITOR_FONT_SIZE_CHANGED));
    });
</script>


<template>
    <section class="flex-row! gap-2!">
        <p>Tamanho da fonte:</p>

        <div class="grow"></div>

        <select v-model="fontSize" class="bg-white/10 p-1 rounded-sm shadow-inset">
            <option v-for="value in options" :key="value" :value="value" class="text-white bg-neutral-900">
                {{ value }}
            </option>
        </select>
        <p>px</p>
    </section>
</template>


<style scoped>

</style>