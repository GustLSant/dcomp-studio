<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { onMounted, ref } from 'vue';
    import { getFullExercisesProgress } from '../../utils/exercises';
    import { createPopup } from '../../utils/popup';

    const progressPercent = ref<number>(0);

    onMounted(getProgress)

    function getProgress() {
        getFullExercisesProgress()
        .then((_response) => { progressPercent.value = _response; })
        .catch((_error) => { createPopup('error', 'Erro ao obter o progresso dos exercícios', 'Por favor, tente novamente'); })
    }
</script>


<template>
    <div class="flex flex-col items-center gap-1 py-8">
        <Icon icon="mdi:trophy-outline" width="72" height="72" />
        <p class="text-sm opacity-60">Progresso dos exercícios</p>

        <p class="text-xl font-medium primary-text-gradient">{{ progressPercent }}% Concluído</p>

        <div class="w-full h-2 border border-(--border-01) rounded-lg my-2 bg-neutral-800">
            <div class="h-full rounded-lg primary-bg-gradient" :style="{ width: `${progressPercent}%` }"></div>
        </div>

        <p v-if="progressPercent === 100" class="primary-text-gradient">Parabéns!</p>
    </div>
</template>


<style scoped>

</style>