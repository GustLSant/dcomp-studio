<script setup lang="ts">
    import PageHeader from '../components/common/PageHeader.vue';
    import type { AlgorithmCollection } from '../types/classicAlgorithms';
    import { CLASSIC_ALGORITHMS } from '../data/classicAlgorithms';
    import { ref } from 'vue';
    import PageContainer from '../components/common/PageContainer.vue';
    import AlgorithmCollectionViewer from '../components/classicAlgorithmView/AlgorithmCollectionViewer.vue';
    import Accordion from '../components/common/Accordion.vue';
    import Separator from '../components/common/Separator.vue';

    const algorithmCollections = ref<AlgorithmCollection[]>(CLASSIC_ALGORITHMS);
</script>


<template>
    <PageContainer class="gap-6!">
        <PageHeader icon="mdi:book-open-variant" title="Algoritmos clássicos" />

        <Accordion title="Fundamentação Teórica" icon="mdi:script-text-outline" max-height="600px">
            <template #body>
                <p>
                    A análise da complexidade de algoritmos é uma forma de medir o custo de execução de um algoritmo, normalmente em termos de tempo ou uso de memória,
                    conforme o tamanho da entrada cresce. Em vez de medir o tempo real em segundos, a análise de complexidade observa quantas operações o algoritmo
                    executa à medida que a quantidade de dados aumenta, permitindo comparar algoritmos de forma mais abstrata e independente de hardware ou linguagem.
                </p>
                <p>
                    A notação Big O (O-grande) é usada para representar essa taxa de crescimento no pior caso. Ela descreve como o desempenho de um algoritmo escala, ignorando
                    constantes e detalhes de implementação, e focando apenas no comportamento dominante. Por exemplo, um algoritmo O(1) executa em tempo constante, O(n) cresce
                    linearmente com a entrada, O(n²) cresce quadraticamente e O(n log n) é comum em algoritmos de ordenação eficientes. Entender Big O é essencial para escolher
                    algoritmos mais eficientes e evitar soluções que não escalam bem.
                </p>
            </template>
        </Accordion>

        <Separator />

        <div class="flex flex-col gap-2">
            <AlgorithmCollectionViewer v-for="collection in algorithmCollections" :key="collection.complexity" :data="collection" />
        </div>
    </PageContainer>
</template>


<style scoped>

</style>