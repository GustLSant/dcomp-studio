<script setup lang="ts">

</script>


<template>
    <div class="green shiny-outline-gradient p-px">
        <slot />
    </div>
</template>


<style scoped>
    .green {
        --highlight-color: var(--success-color);
    }
</style>