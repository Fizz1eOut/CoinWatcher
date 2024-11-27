<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import AppHeader from '@/components/Base/AppHeader.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppSidebarNav from '@/components/Base/AppSidebarNav.vue';
</script>

<template>
  <app-sidebar-nav />
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
</template>

<style scoped>
</style>
