<script setup lang="ts">
    import type { ExerciseDifficulty } from '../../types/exercises';

    const props = defineProps<{ difficulty: ExerciseDifficulty }>();
</script>


<template>
    <div
        class="border rounded-lg text-xs px-1.5"
        :class="[
            props.difficulty === 'Easy'   ? 'border-emerald-400 text-emerald-300 bg-emerald-400/10' : '',
            props.difficulty === 'Medium' ? 'border-amber-400 text-amber-300 bg-amber-400/10'       : '',
            props.difficulty === 'Hard'   ? 'border-rose-500 text-rose-400 bg-rose-500/10'          : '',
        ]"
    >
        <p>{{ props.difficulty }}</p>
    </div>
</template>


<style scoped>

</style>