<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import Navbar from './components/layout/Navbar.vue';
  import { getNavbarVariation } from './utils/route';
  import { computed } from 'vue';
  import CodeNavbar from './components/layout/CodeNavbar.vue';

  const route = useRoute();
  const navbarVariation = computed(() => { return getNavbarVariation(route); });

  const paddingTop = computed(() => {
    switch (navbarVariation.value) {
      case 'none':    return '0px';
      case 'code': return '0px';
      case 'full':    return '52px';
      default:        return '0px';
    };
  });
</script>


<template>
  <div class="app bg-(--background) min-h-screen max-w-[800px] m-auto overflow-x-hidden dark" :style="{ paddingTop: paddingTop }">
    <Navbar v-if="navbarVariation === 'full'" />
    <CodeNavbar v-if="navbarVariation === 'code'" />
    <router-view />
  </div>
</template>


<style>
  .app {
    background-image: radial-gradient(circle at 10% 90%, rgba(255,255,255, 0.1), transparent);
  }
</style>
