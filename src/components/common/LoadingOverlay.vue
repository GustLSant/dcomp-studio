<script setup lang="ts">
  import Logo from "../../assets/logo/new_white.png";
  import { Icon } from "@iconify/vue";
</script>


<template>
  <div class="loading-overlay fade-in-short fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm select-none">
    <div class="flex flex-col justify-center items-center gap-2 animate-pulse">
      <img alt="Logo Dcomp Studio" :src="Logo" class="w-24" />
      <div class="flex items-center gap-2 font-mono text-white text-xl text-shadow-md ">
        <Icon icon="mdi:loading" class="max-w-[42px] max-h-[42px] spin"/>
        <p>Carregando...</p>
      </div>
    </div>
  </div>
</template>


<style scoped>
  .loading-overlay {
    text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.1);
  }

  .spin{
    animation: Spin 0.75s infinite;
    animation-timing-function: linear;
  }

  @keyframes Spin {
    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }
</style>
