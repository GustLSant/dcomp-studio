<script setup lang="ts">
    import { Icon } from '@iconify/vue';
</script>


<template>
    <div class="code-preview p-2 border border-(--border-01) rounded-sm">
        <Icon icon="mdi:file-code-outline" width="36" height="36" />
    </div>
</template>


<style scoped>
    .code-preview {
        background-image: 
            linear-gradient(to right, rgba(0,0,0, 0.75)),
            url('../../assets/images/code_preview.png')
        ;
    }
</style>