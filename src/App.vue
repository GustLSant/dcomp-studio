<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { getNavbarVariation } from './utils/route';
  import { computed, onMounted, onUnmounted, ref } from 'vue';
  import PopupView from './components/popup/PopupView.vue';
  import Navbar from './components/layout/Navbar.vue';
  import DeleteEntityModal from './components/actionModals/DeleteEntityModal.vue';
  import RenameEntityModal from './components/actionModals/RenameEntityModal.vue';
  import CreateEntityModal from './components/actionModals/CreateEntityModal.vue';
  import MoveEntityModal from './components/actionModals/MoveEntityModal.vue';
  import EntityMenuModal from './components/actionModals/EntityMenuModal.vue';
  import { getThemeFromLocalStorage } from './utils/theme';
  import type { AppThemeType } from './types/theme';
  import eventBus from './eventBus';
  import { EVENT_APP_THEME_CHANGED } from './events/general';

  const route = useRoute();
  const navbarVariation = computed(() => { return getNavbarVariation(route); });
  const appTheme = ref<AppThemeType>(getThemeFromLocalStorage());

  const paddingTop = computed(() => {
    switch (navbarVariation.value) {
      case 'none':    return '0px';
      case 'full':    return '58px';
      default:        return '0px';
    };
  });

  onMounted(() => { eventBus.addEventListener(EVENT_APP_THEME_CHANGED, updateTheme) });
  onUnmounted(() => { eventBus.removeEventListener(EVENT_APP_THEME_CHANGED, updateTheme); })
  function updateTheme() { appTheme.value = getThemeFromLocalStorage(); }
</script>


<template>
  <div class="app bg-(--background) max-w-(--max-app-width) min-h-screen h-full flex flex-col m-auto overflow-hidden" :class="appTheme" :style="{ paddingTop: paddingTop }">
    <Navbar v-if="navbarVariation === 'full'" />
    
    <main class="flex flex-col basis-1 grow overflow-y-auto" :class="(navbarVariation === 'full') ? 'p-4 pt-6' : ''">
      <router-view />
    </main>
    
    <EntityMenuModal />
    <DeleteEntityModal />
    <RenameEntityModal />
    <MoveEntityModal />
    <CreateEntityModal />
    <PopupView />
  </div>
</template>


<style>
  .app {
    background-image: radial-gradient(circle at 10% 10%, rgba(255,255,255, 0.06), transparent);
  }
</style>
