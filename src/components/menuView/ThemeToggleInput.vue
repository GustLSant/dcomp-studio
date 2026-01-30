<script setup lang="ts">
    import { Icon } from '@iconify/vue';
    import { ref, watch } from 'vue';
    import eventBus from '../../eventBus';
    import { EVENT_APP_THEME_CHANGED } from '../../events/general';
    import type { AppThemeType } from '../../types/theme';
    import { getThemeFromLocalStorage } from '../../utils/theme';
    
    const theme = ref<AppThemeType>(getThemeFromLocalStorage());
    
    watch(theme, saveThemeOnLocalStorage);

    function toggleTheme() {
        if (theme.value === 'light') { theme.value = 'dark' }
        else { theme.value = 'light' }
    }

    function saveThemeOnLocalStorage() {
        localStorage.setItem('theme', theme.value);
        eventBus.dispatchEvent(new Event(EVENT_APP_THEME_CHANGED));
    }
</script>


<template>
    <div
        @click="toggleTheme"
        class="flex rounded-full w-12 border border-(--border-02)"
        :class="(theme === 'light') ? 'justify-start' : 'justify-end'"
    >
        <div
            class="w-6 h-6 rounded-full"
            :class="(theme === 'light') ? 'bg-neutral-800 text-white' : 'bg-neutral-200 text-black'"
        >
            <Icon v-if="theme === 'light'" icon="mdi:weather-sunny"        width="24" height="24" />
            <Icon v-if="theme === 'dark'"  icon="mdi:moon-waning-crescent" width="24" height="24" />
        </div>
    </div>
</template>


<style scoped>

</style>