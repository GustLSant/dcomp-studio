<script setup lang="ts">
  import Navbar from './components/layout/Navbar.vue';

  // npm install codemirror vue-codemirror --save
  // npm install @codemirror/lang-python @codemirror/lang-html @codemirror/lang-markdown
  // npm install @codemirror/theme-one-dark
  // npm install pyodide
</script>


<template>
  <div class="app pt-[calc(52px)] bg-(--background) min-h-screen dark">
    <Navbar />
    <router-view />
  </div>
</template>


<style>
  .app {
    background-image: radial-gradient(circle at 10% 90%, rgba(255,255,255, 0.1), transparent);
  }
</style>
