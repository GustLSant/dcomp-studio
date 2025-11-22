<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { getNavbarVariation } from './utils/route';
  import { computed } from 'vue';
  import PopupView from './components/popup/PopupView.vue';

  const route = useRoute();
  const navbarVariation = computed(() => { return getNavbarVariation(route); });

  const paddingTop = computed(() => {
    switch (navbarVariation.value) {
      case 'none':    return '0px';
      case 'code':    return '0px';
      case 'full':    return '52px';
      default:        return '0px';
    };
  });
</script>


<template>
  <div class="app bg-(--background) min-h-screen max-w-(--max-width) m-auto overflow-x-hidden dark" :style="{ paddingTop: paddingTop }">
    <PopupView />
    <router-view />
  </div>
</template>


<style>
  .app {
    background-image: radial-gradient(circle at 10% 10%, rgba(255,255,255, 0.05), transparent, transparent);
  }
</style>
