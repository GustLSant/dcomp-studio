<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import CodeFileCard from './CodeFileCard.vue';


</script>


<template>
    <section class="flex flex-col gap-6 bg-(--foreground) p-4 shadow-md rounded-md border border-neutral-600">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-1">
                <Icon icon="mdi:file" width="20" height="20" />
                <p class="text-lg">Arquivos Recentes</p>
            </div>

            <div class="py-1 px-2 border bg-(--primary) border-(--primary) rounded-sm">
                <Icon icon="mdi:add" width="24" height="24" class="shrink-0" />
            </div>
        </div>

        <div class="flex flex-col gap-2 max-h-[312px] overflow-y-auto">
            <CodeFileCard file-name="file.py" :creation-date="new Date()" />
            <CodeFileCard file-name="file.py" :creation-date="new Date()" />
            <CodeFileCard file-name="file.py" :creation-date="new Date()" />
            <CodeFileCard file-name="file.py" :creation-date="new Date()" />
            <CodeFileCard file-name="file.py" :creation-date="new Date()" />
            <CodeFileCard file-name="file.py" :creation-date="new Date()" />
        </div>

        <div class="flex items-center justify-end">
            <p class="text-sm text-(--primary) underline">Explorar todos os arquivos</p>
        </div>
    </section>
</template>


<style scoped>

</style>