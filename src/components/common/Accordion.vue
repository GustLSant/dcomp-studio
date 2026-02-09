<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { ref } from 'vue';
    import HoverableIcon from './HoverableIcon.vue';

    const props = defineProps<{
        title: string,
        icon?: string,
        maxHeight: string,
    }>();

    const isOpen = ref<boolean>(false);
</script>


<template>
    <div
        class="accordion flex flex-col gap-2 overflow-y-hidden border border-(--border-02) rounded-md"
        :style="{ maxHeight: isOpen ? props.maxHeight : '50px' }"
    >
        <div @click.stop="() => { isOpen = !isOpen }" class="flex items-center justify-between gap-2 p-2 hover:cursor-pointer">
            <div class="flex items-center gap-2">
                <Icon v-if="props.icon" :icon="props.icon" width="24" height="24" />
                <p :class="(!props.icon) ? 'pl-1.5' : ''">{{ props.title }}</p>
                <slot name="header-prefix" />
            </div>

            <div class="flex items-center gap-1">
                <slot name="header-sulfix" />
                <HoverableIcon :icon="(!isOpen) ? 'mdi:chevron-down' : 'mdi:chevron-up'" :size="24" />
            </div>
        </div>

        <div class="flex flex-col gap-2 p-2 pt-0 overflow-y-auto">
            <slot name="body" />
        </div>
    </div>
</template>


<style scoped>
    .accordion {
        transition: max-height 0.15s;
    }
</style>