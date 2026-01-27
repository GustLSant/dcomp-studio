<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { useRouter } from 'vue-router';
    import eventBus from '../../eventBus';
    import { EVENT_SAVE_FILE } from '../../events/entities';

    const router = useRouter()
    const emit = defineEmits(['runCode']);

    function handleClickMenu() { router.push({ name: 'FileMenu' }); }
    function handleClickSave() { eventBus.dispatchEvent(new Event(EVENT_SAVE_FILE)); };
    function handleClickRun() { emit('runCode'); }    
</script>


<template>
    <div class="fixed top-0 left-0 right-0 z-50 flex flex-col items-end gap-1.5 p-2 pointer-events-none max-w-(--max-app-width) m-auto">
        <div class="button border border-(--border-02)" @click="handleClickMenu">
            <Icon icon="mdi:menu" width="24" height="24" />
        </div>

        <div class="button border border-(--border-02)" @click="handleClickSave">
            <Icon icon="mdi:content-save-outline" width="24" height="24" />
        </div>

        <div class="button border border-(--border-02)" @click="handleClickRun">
            <Icon icon="mdi:play-circle-outline" width="24" height="24" />
        </div>
    </div>
</template>


<style scoped>
    .button {
        padding: 6px;
        border-radius: 999px;
        box-shadow: 4px 4px 4px rgba(0,0,0, 0.1);
        background-color: #171717;
        pointer-events: auto;

        &:hover {
            cursor: pointer;
        }
    }
</style>