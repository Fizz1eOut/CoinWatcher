<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import AppHeader from '@/components/Base/AppHeader.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
</script>

<template>
  <div class="wrapper">
    <header>
      <app-header />
    </header>

    <main class="main">
      <app-container>
        <router-view />
      </app-container>
    </main>

    <footer>
      
    </footer>
  </div>
</template>

<style scoped>
  .main {
    padding-top: 80px;
  }
</style>
