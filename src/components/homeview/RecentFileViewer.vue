<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import Button from '../common/Button.vue';
    import CodePreview from '../common/CodePreview.vue';
    import type { FileType } from '../../types/entities';
    import { useRouter } from 'vue-router';
    import { getLastEditedFile } from '../../services/files';
    import { formatDate } from '../../utils/date';

    const lastEditedFile = ref<FileType | undefined>(undefined);
    const router = useRouter();

    onMounted(getLastFile)

    async function getLastFile() {
        getLastEditedFile()
        .then((_response) => {
            lastEditedFile.value = _response;
        })
        .catch((_error) => {
            console.error(_error);
        })
        .finally(() => {

        })
    }

    function handleClickContinue() {
        router.push('/file/' + lastEditedFile.value?.id);
    }
</script>


<template>
    <section v-if="lastEditedFile" class="flex flex-col items-center justify-center gap-3 py-6">
        <CodePreview />
        <div class="flex flex-col items-center text-center font-mono">
            <p>{{ lastEditedFile.name }}</p>
            <p class="text-xs opacity-50">{{ formatDate(lastEditedFile.editDate) }}</p>
        </div>

        <Button variant="primary-filled" icon="mdi:login-variant" @click="handleClickContinue">
            Continuar Editando
        </Button>
    </section>
</template>


<style scoped>

</style>