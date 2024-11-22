<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import AppContainer from '@/components/Base/AppContainer.vue';
import AppNav from '@/components/Base/AppNav.vue';
import AppNavMobile from '@/components/Base/AppNavMobile.vue';

const mediaQueryList = window.matchMedia('(max-width: 768px)');

const isMobile = ref(false);

// Метод для обработки изменений медиазапроса
const handleMediaChange = (event: MediaQueryListEvent | MediaQueryList) => {
  isMobile.value = event.matches;
};

// Хуки жизненного цикла
onMounted(() => {
  // Инициализация состояния isMobile
  handleMediaChange(mediaQueryList);

  // Подписка на изменения медиазапроса
  mediaQueryList.addEventListener('change', handleMediaChange);
});

onBeforeUnmount(() => {
  // Отписка от слушателя медиазапроса
  mediaQueryList.removeEventListener('change', handleMediaChange);
});
</script>


<template>
  <div class="header">
    <app-container>
      <div class="header__body">
        <div class="header__wrapper">
          <div class="header__img">
            <router-link to="/">
              <img src="../../assets/images/logo.png" alt="Logo">
            </router-link>
          </div>

          <app-nav v-if="!isMobile" class="nav" />
          <!-- <app-nav-mobile v-if="isMobile" class="nav-mobile" /> -->
        </div>
      </div>
    </app-container>
  </div>
</template>

<style scoped>
.header__body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .header__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 400px;
    width: 100%;
  }
  @media (max-width: 768px) {
    .header__wrapper {
      max-width: 100%;
    }
  }
</style>
