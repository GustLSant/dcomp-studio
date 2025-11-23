<script setup lang="ts">
    import type { PopupItemType } from '../../types/popup';
    import { onMounted, onUnmounted, ref } from 'vue';
    import PopupItem from './PopupItem.vue';
    import eventBus from '../../eventBus';

    const popups = ref<PopupItemType[]>([]);


    const addPopup = (_event: Event) => {
        const event = _event as CustomEvent<PopupItemType>;
        
        popups.value.push(
            { ...event.detail }
        );
        
        const item = popups.value[popups.value.length - 1];
        
        if(item){
            setTimeout(() => {
                animateAndClose(item.id);
            }, 5000);
        }
    }


    const animateAndClose = (_id: number) => {
        const popup = popups.value.find((pop)=>pop.id === _id);
        
        if(!popup) return;
        if(popup.isClosing) return;

        popup.isClosing = true;

        setTimeout(() => {
            popups.value = popups.value.filter((p) => p.id !== _id);
        }, 600);
    }


    onMounted(() => { eventBus.addEventListener('create-popup', addPopup)});
    onUnmounted(() => {eventBus.removeEventListener('create-popup', addPopup)});
</script>


<template>
    <div class="fixed top-0 left-0 min-w-screen z-50 flex flex-col gap-1 items-center pointer-events-none pt-4">
        <PopupItem 
            v-for="popup in popups"
            :key="popup.id"
            :id="popup.id"
            :type="popup.type"
            :title="popup.title"
            :subtitle="popup.subtitle"
            :max-width="popup.maxWidth"
            :is-closing="popup.isClosing"
            @close="(_id: number) => {animateAndClose(_id)}"
        />
    </div>
</template>


<style scoped>

</style>