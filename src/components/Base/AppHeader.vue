<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppFavorites from '@/components/Base/AppFavorites.vue';
  import AppInput from '@/components/Inputs/AppInput.vue';
  import AppNav from '@/components/Base/AppNav.vue';
  // import AppNavMobile from '@/components/Base/AppNavMobile.vue';

  // Определяем тип для события медиазапроса
  interface MediaQueryEvent extends Event {
    matches: boolean;
  }

  const isMobile = ref(false);
  const mediaQueryList = window.matchMedia('(max-width: 768px)');
  const text = ref<string | number>('');

  // Обработчик изменения состояния медиазапроса
  const handleMediaChange = (event: MediaQueryEvent) => {
    isMobile.value = event.matches;
  };

  onMounted(() => {
    // Инициализация значения isMobile при монтировании компонента
    handleMediaChange({ matches: mediaQueryList.matches } as MediaQueryEvent);
    // Подписываемся на событие изменения медиазапроса
    mediaQueryList.addEventListener('change', handleMediaChange);
  });

  onBeforeUnmount(() => {
    // Отписываемся от события изменения медиазапроса
    mediaQueryList.removeEventListener('change', handleMediaChange);
  });
  </script>


<template>
  <div class="header">
    <app-container>
      <div class="header__body">
        <div class="header__img">
          <router-link to="/">
            <img src="../../assets/images/logo.png" alt="Logo">
          </router-link>
        </div>

        <app-nav v-if="!isMobile" class="nav" />
        <!-- <app-nav-mobile v-if="isMobile" class="nav-mobile" /> -->

        <div class="header__group">
          <div class="header__input">
            <app-input placeholder="BTC" v-model="text" />
          </div>
          <div class="header__favorites favorites">
            <router-link to="/favorites">
              <app-favorites />
            </router-link>
          </div>
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
  .header__group {
    display: flex;
    align-items: center;
    gap: 10px;
  }
</style>
