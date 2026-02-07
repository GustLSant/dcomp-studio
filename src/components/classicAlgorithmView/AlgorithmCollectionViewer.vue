<script setup lang="ts">
    import type { AlgorithmCollection } from '../../types/classicAlgorithms';
    import AlgorithmCard from './AlgorithmCard.vue';
    import Accordion from '../common/Accordion.vue';

    const props = defineProps<{ data: AlgorithmCollection }>();
</script>


<template>
    <Accordion :title="data.complexity" icon="mdi:book-open-variant" max-height="1000px">
        <template #body>
            <p>{{ props.data.resume }}</p>
            <AlgorithmCard v-for="algorithm in props.data.algorithms" :key="algorithm.name" :data="algorithm" />
        </template>
    </Accordion>
</template>


<style scoped>

</style>