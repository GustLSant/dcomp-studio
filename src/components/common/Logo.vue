<script setup lang="ts">
    import Logo from "../../assets/logo/white.png"
    const props = defineProps<{ size?: string }>();
</script>


<template>
    <img :src="Logo" alt="Logo do DcompStudio" class="themed-image" :style="{ width: props.size ?? 'auto' }" />
</template>


<style scoped>

</style>