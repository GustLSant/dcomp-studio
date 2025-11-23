<script setup lang="ts">

</script>


<template>
    <div class="primary shiny-gradient p-px">
        <slot />
    </div>
</template>


<style scoped>
    .primary {
        --highlight-color: var(--primary);
    }
</style>