<script setup lang="ts">
    const props = defineProps<{ maxOpacity: number }>();
    const size: string = '64px';
</script>


<template>
    <div :style="{width: size, height: size, opacity: `${props.maxOpacity}%`}" class="grid-element border-2 rounded-md">
    </div>
</template>


<style scoped>
    .grid-element {
        animation-name: Pulse;
        animation-duration: 2.0s;
        animation-iteration-count: infinite;
    }

    @keyframes Pulse {
        0%{
            border-color: rgba(255, 255, 255, 0.0);
        }
        50%{
            border-color: rgba(255, 255, 255, 1.0);
        }
        100%{
            border-color: rgba(255, 255, 255, 0.0);
        }
    }
</style>