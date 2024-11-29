<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import AppHeader from '@/components/Base/AppHeader.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppSidebarNav from '@/components/Base/AppSidebarNav.vue';
</script>

<template>
  <div class="app">
    <app-sidebar-nav />

  <div class="wrapper">
    <header>
      <app-header />
    </header>

    <main>
      <app-container>
        <router-view />
      </app-container>
    </main>

    <footer>
      
    </footer>
  </div>
  </div>
</template>

<style scoped>
  .app {
    display: flex;
    gap: 10px;
  }
  .wrapper {
    width: 100%;
    max-width: 1280px;
  }
</style>
