<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { getNavbarVariation } from './utils/route';
  import { computed } from 'vue';
  import PopupView from './components/popup/PopupView.vue';
  import Navbar from './components/layout/Navbar.vue';
  import DeleteEntityModal from './components/actionModals/DeleteEntityModal.vue';
  import RenameEntityModal from './components/actionModals/RenameEntityModal.vue';
  import CreateEntityModal from './components/actionModals/CreateEntityModal.vue';
  import MoveEntityModal from './components/actionModals/MoveEntityModal.vue';
  import EntityMenuModal from './components/actionModals/EntityMenuModal.vue';

  const route = useRoute();
  const navbarVariation = computed(() => { return getNavbarVariation(route); });

  const paddingTop = computed(() => {
    switch (navbarVariation.value) {
      case 'none':    return '0px';
      case 'full':    return '58px';
      default:        return '0px';
    };
  });
</script>


<template>
  <div class="app bg-(--background) max-w-(--max-app-width) min-h-screen h-full flex flex-col m-auto overflow-hidden dark" :style="{ paddingTop: paddingTop }">
    <Navbar v-if="navbarVariation === 'full'" />
    
    <main class="flex flex-col basis-1 grow overflow-y-auto" :class="(navbarVariation === 'full') ? 'p-2' : ''">
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

  main {
    .page-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }
</style>
