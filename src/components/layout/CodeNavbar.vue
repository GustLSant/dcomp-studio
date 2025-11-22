<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { useRouter } from 'vue-router';

    const router = useRouter()
    const emit = defineEmits(['runCode', 'saveFile']);

    function handleClickMenu() {
        router.push({ name: 'FileMenu' });
    }
    function handleClickSave() {
        emit('saveFile');
    }
    function handleClickRun() {
        emit('runCode');
    }    
</script>


<template>
    <div class="fixed top-0 left-0 right-0 z-50 flex flex-col items-end gap-1.5 p-2 pointer-events-none">
        <div class="button" @click="handleClickMenu">
            <Icon icon="mdi:menu" width="24" height="24" />
        </div>
        <div class="button" @click="handleClickSave">
            <Icon icon="mdi:content-save-outline" width="24" height="24" />
        </div>
        <div class="button" @click="handleClickRun">
            <Icon icon="mdi:play-circle-outline" width="24" height="24" />
        </div>
    </div>
</template>


<style scoped>
    .button {
        padding: 6px;
        border-width: 1px;
        border-radius: 999px;
        box-shadow: 4px 4px 4px rgba(0,0,0, 0.1);
        background-color: #171717;
        border-color: #3a3a3a;
        pointer-events: auto;
    }
</style>