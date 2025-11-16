<script setup lang="ts">
    import GridElement from './GridElement.vue';

    const rowsCount: number = 24;
    const columnsCount: number = 16;
</script>


<template>
    <div class="pulsing-grid absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-4 bg-black">
        <div v-for="_count in rowsCount" class="flex gap-4">
            <GridElement v-for="_count2 in columnsCount" :style="{ animationDelay: `${Math.random()*10.0}s` }" :max-opacity="Math.round(Math.random() * 100)" />
        </div>
    </div>

    <div class="inner-shadow absolute top-0 bottom-0 left-0 right-0">
    </div>
</template>


<style scoped>
    .pulsing-grid {
        transform-style: preserve-3d;
        /* perspective: 1000px; */
        transform: rotateX(-45deg) rotateY(15deg);
    }

    .inner-shadow{
        box-shadow: 0px 0px 40px 40px rgba(0,0,0, 0.75) inset;
    }
</style>