<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import Navbar from './components/layout/Navbar.vue';
  import { computed } from 'vue';

  const route = useRoute();
  const isStartPage = computed<boolean>(() => route.path === '/');

  // npm install codemirror vue-codemirror --save
  // npm install @codemirror/lang-python @codemirror/lang-html @codemirror/lang-markdown
  // npm install @codemirror/theme-one-dark
  // npm install pyodide
</script>


<template>
  <div class="app bg-(--background) min-h-screen max-w-[800px] m-auto overflow-x-hidden dark" :class="isStartPage ? '' : 'pt-[calc(52px)]'">
    <Navbar v-if="!isStartPage" />
    <router-view />
  </div>
</template>


<style>
  .app {
    background-image: radial-gradient(circle at 10% 90%, rgba(255,255,255, 0.1), transparent);
  }
</style>
