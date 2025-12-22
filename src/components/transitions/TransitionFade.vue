<script setup lang="ts">

</script>


<template>
    <Transition name="fade">
        <slot />
    </Transition>
</template>


<style scoped>
    .fade-enter-to, .fade-leave-from {
        opacity: 100%;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity var(--anim-duration-short);
    }

    .fade-enter-from {
        opacity: 0%;
    }

    .fade-leave-to {
        opacity: 0%;
    }
</style>