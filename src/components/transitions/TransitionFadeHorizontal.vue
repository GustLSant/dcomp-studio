<script setup lang="ts">

</script>


<template>
    <Transition name="fade-horizontal">
        <slot />
    </Transition>
</template>


<style scoped>
    .fade-horizontal-enter-to, .fade-horizontal-leave-from {
        opacity: 100%;
        transform: translateX(0px);
    }

    .fade-horizontal-enter-active, .fade-horizontal-leave-active {
        transition: opacity var(--anim-duration-short), transform var(--anim-duration-short);
    }

    .fade-horizontal-enter-from {
        opacity: 0%;
        transform: translateX(-30px);
    }

    .fade-horizontal-leave-to {
        opacity: 0%;
        transform: translateX(30px);
    }
</style>