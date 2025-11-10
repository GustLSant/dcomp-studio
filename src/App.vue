<script setup lang="ts">
  import Navbar from './components/layout/Navbar.vue';

  // npm install codemirror vue-codemirror --save
  // npm install @codemirror/lang-python @codemirror/lang-html @codemirror/lang-markdown
  // npm install @codemirror/theme-one-dark
  // npm install pyodide
</script>


<template>
  <div class="p-4 pt-[calc(52px+16px)] bg-(--background) h-screen dark">
    <Navbar />
    <router-view />
  </div>
</template>


<style scoped>

</style>
