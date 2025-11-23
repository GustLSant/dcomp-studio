<script setup lang="ts">
    import { useRoute, useRouter } from 'vue-router';
    import Button from '../common/Button.vue';
    import CloseButton from '../common/CloseButton.vue';
    import FileNameContainer from '../common/FileNameContainer.vue';
    import type { FileType } from '../../types/entities';
    import { onBeforeUnmount, onMounted, ref, type ComponentPublicInstance } from 'vue';
    import { getFileById } from '../../services/files';
    import { formatDate } from '../../utils/date';
    import HoverableIcon from '../common/HoverableIcon.vue';
    import ShinyContainer from '../common/shinyContainer/ShinyContainer.vue';

    const file = ref<FileType | undefined>(undefined);
    const loading = ref<boolean>(false);
    const route = useRoute();
    const router = useRouter();
    const menuRef = ref<ComponentPublicInstance | null>(null);

    onMounted(getFileFromDB);

    onMounted(() => { document.body.style.overflow = "hidden"; });
    onBeforeUnmount(() => { document.body.style.overflow = ""; });

    const handleClickOutsideModal = (_event: MouseEvent) => {
        if(!menuRef.value) { return; }

        const element = (menuRef.value as any).$el ?? menuRef.value;
        
        if (!element) return;

        if (!element.contains(_event.target as Node)) { handleClickCloseMenu(); }
    }
    

    function handleClickReturnToHome() {
        router.push('/home');
    }

    function handleClickCloseMenu() {
        router.back();
    }

    
    async function getFileFromDB() {
        loading.value = true;

        getFileById(Number(route.params.id))
        .then((_response: FileType) => {
            file.value = _response
        })
        .catch((_error) => {
            console.error(_error);
            handleClickCloseMenu();
        })
        .finally(() => {
            loading.value = false;
        })
    }
</script>


<template>
    <div class="fixed top-0 bottom-0 left-0 right-0 p-2 bg-black/60 backdrop-blur-sm z-50" @click="handleClickOutsideModal">
        <ShinyContainer class="rounded-md" ref="menuRef">
            <div class="flex flex-col gap-4 p-2 rounded-md bg-(--foreground)">
                <Button variant="primary-outlined" icon="mdi:arrow-back" @click="handleClickReturnToHome" class="self-start">
                    Voltar para Home
                </Button>

                <CloseButton @click="handleClickCloseMenu" />

                <div v-if="file" class="flex flex-col gap-2">
                    <div class="flex flex-col gap-1">
                        <p class="font-light opacity-60 text-sm">Arquivo:</p>
                        <div class="flex items-center gap-2">
                            <FileNameContainer class="grow">
                                {{ file.name }}
                            </FileNameContainer>

                            <HoverableIcon icon="mdi:edit" :size="22" />
                        </div>
                    </div>

                    <div class="flex flex-col">
                        <p class="font-light opacity-60 text-sm">Data de criação:</p>
                        <p class="font-mono">{{ formatDate(file.creationDate) }}</p>
                    </div>
                </div>
            </div>
        </ShinyContainer>
    </div>
</template>


<style scoped>

</style>