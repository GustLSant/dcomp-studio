<script setup lang="ts">
    import PageHeader from '../components/common/PageHeader.vue';
    import AlgorithmCard from '../components/classicAlgorithmView/AlgorithmCard.vue';
    import type { AlgorithmData } from '../types/classicAlgorithms';
    import { CLASSIC_ALGORITHMS } from '../data/classicAlgorithms';
    import { ref } from 'vue';

    const algorithms = ref<AlgorithmData[]>(CLASSIC_ALGORITHMS);
</script>


<template>
    <div class="page-container">
        <PageHeader icon="mdi:book-open-variant" title="Algoritmos clássicos" />
        <div class="flex flex-col gap-2">
            <AlgorithmCard v-for="algorithm in algorithms" :key="algorithm.name" :data="algorithm" />
        </div>
    </div>
</template>


<style scoped>

</style>