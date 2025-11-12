<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import Button from '../common/Button.vue';
    import CodePreview from '../common/CodePreview.vue';
    import type { FileType } from '../../types/entities';

    const lastEditedFile = ref<FileType | undefined>(undefined)

    onMounted(getLastEditedFile)

    function getLastEditedFile() {
        
    }
</script>


<template>
    <section class="flex flex-col items-center justify-center gap-3 py-6">
        <CodePreview />
        <p class="font-mono">file.py</p>

        <Button variant="primary-filled" icon="mdi:login-variant">
            Continuar Editando
        </Button>
    </section>
</template>


<style scoped>

</style>