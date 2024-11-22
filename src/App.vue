<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from '@/components/Base/AppHeader.vue';
import AppContainer from '@/components/Base/AppContainer.vue';
</script>

<template>
  <app-header />

  <main>
    <app-container>
      <router-view />
    </app-container>
  </main>

  <app-footer />
</template>


<style scoped>

</style>
