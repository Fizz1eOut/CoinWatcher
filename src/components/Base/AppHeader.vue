<script setup lang="ts">
  import { ref } from 'vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppBriefcase from '@/components/Base/AppBriefcase.vue';
  import AppNav from '@/components/Base/AppNav.vue';
  import AppNavMobile from '@/components/Base/AppNavMobile.vue';
  import AppBurger from '@/components/Base/AppBurger.vue';
  import SearchWrapper from '@/components/Content/SearchInput/SearchWrapper.vue';
  import AuthModal from '@/components/Content/form/AuthModal.vue';
  import { useMediaQuery } from '@/composables/useMediaQuery';

  const open = ref<boolean>(false);
  const { isMobile } = useMediaQuery('(max-width: 768px)');

  const closeBurger = (): void => {
    open.value = false;
  };
  defineExpose({
    open,
    closeBurger,
  });
</script>


<template>
  <div class="header">
    <app-container>
      <div class="header__body">
        <div class="header__img">
          <app-burger :active="open" @change="open = $event" />
          
          <router-link to="/">
            <img src="../../assets/images/logo.png" alt="Logo">
          </router-link>
        </div>

        <app-nav v-if="!isMobile" class="nav" />
        <app-nav-mobile 
          v-if="isMobile" 
          :open="open" 
          @close="closeBurger"
        />

        <div class="header__group">
          <div class="header__input">
            <search-wrapper />
          </div>
          <div class="header__briefcase briefcase">
            <router-link to="/briefcase">
              <app-briefcase />
            </router-link>
          </div>
          
          <div class="header__auth">
            <auth-modal />
          </div>
        </div>
      </div>
    </app-container>
  </div>
</template>

<style scoped>
  .header {
    position: fixed;
    width: 100%;
    z-index: 10;
    background-color: rgba(20, 22, 39, 0.7);
    backdrop-filter: blur(4px);
  }
  .header__body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }
  .header__img {
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
    z-index: 10;
  }
  .header__group {
    min-width: 220px;
    display: flex;
    align-items: center;
    gap: 20px;
    z-index: 8;
  }
  .header__input {
    width: 200px;
  }
  @media (max-width: 499px) {
    .header__group  {
      z-index: 9;
    }
    .header__auth {
      display: none;
    }
  }
</style>
