<script setup lang="ts">
    import { computed } from 'vue';

    const props = withDefaults(
        defineProps<{ direction?: 'horizontal' | 'vertical' }>(),
        {
            direction: 'horizontal'
        }
    );

    const computedStyle = computed(() => {
        if (props.direction === 'horizontal') {
            return { height: '1px' };
        }
        else {
            return {  width: '1px' };
        }
    })
</script>


<template>
    <div
        class="bg-white/20 self-stretch fade-in-short"
        :style="computedStyle"
    ></div>
</template>