<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { getNavbarVariation } from './utils/route';
  import { computed } from 'vue';
  import PopupView from './components/popup/PopupView.vue';
  import Navbar from './components/layout/Navbar.vue';
  import DeleteFileModal from './components/actionModals/DeleteFileModal.vue';

  const route = useRoute();
  const navbarVariation = computed(() => { return getNavbarVariation(route); });

  const paddingTop = computed(() => {
    switch (navbarVariation.value) {
      case 'none':    return '0px';
      case 'full':    return '52px';
      default:        return '0px';
    };
  });
</script>


<template>
  <div class="app bg-(--background) max-w-(--max-width) min-h-screen m-auto flex flex-col overflow-x-hidden dark" :style="{ paddingTop: paddingTop }">
    <Navbar v-if="navbarVariation === 'full'" />
    
    <main class="grow flex flex-col">
      <router-view />
    </main>
    
    <DeleteFileModal />
    <PopupView />
  </div>
</template>


<style>
  .app {
    background-image: radial-gradient(circle at 10% 10%, rgba(255,255,255, 0.05), transparent, transparent);
  }

  main {
    & > div {
      flex-grow: 1;
    }
  }
</style>
