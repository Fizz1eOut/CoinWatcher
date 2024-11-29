<script setup lang="ts">
  import AppNav from '@/components/Base/AppNav.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
</script>

<template>
  <div class="sidebar-nav">
    <app-underlay class="sidebar-nav__underlay">
      <app-container>
        <div class="sidebar-nav__img">
          <router-link to="/">
            <img src="../../assets/images/logo.png" alt="Logo">
          </router-link>
        </div>
        <app-nav />
      </app-container>
    </app-underlay>
  </div>
</template>


<style scoped>
  .sidebar-nav {
    max-width: 200px;
    width: 100%;
    height: 100vh;
  }
  .sidebar-nav__img {
    margin-bottom: 40px;
  }
  .sidebar-nav__underlay {
    height: 100%;
  }
</style>
