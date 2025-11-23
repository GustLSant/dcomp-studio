<script setup lang="ts">

</script>


<template>
    <div class="green shiny-gradient p-px">
        <slot />
    </div>
</template>


<style scoped>
    .green {
        --highlight-color: var(--success-color);
    }
</style>