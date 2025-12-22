import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type ModalID } from '../enums/modals'
import { defaultModalStore, type ModalEntry, type ModalPayload, type ModalStore } from '../types/modals';


export const useModalStore = defineStore('app', () => {
    const modals = ref<ModalStore>({ ...defaultModalStore });

    function openModal<T extends ModalPayload>(_modalId: ModalID, _payload: T) {
        modals.value[_modalId] = {
            open: true,
            payload: _payload,
        };
    }

    function closeModal(_modalId: ModalID) {
        modals.value[_modalId].open = false;
    }

    function hasAnyModalOpen(): boolean {
        return Object.values(modals.value).some((modalEntry: ModalEntry) => modalEntry.open);
    }

    function closeAllModals(): void {
        Object.keys(modals.value).forEach((modalId: string) => {
            modals.value[modalId as ModalID].open = false;
        });
    }


    return { modals, openModal, closeModal, hasAnyModalOpen, closeAllModals };
})