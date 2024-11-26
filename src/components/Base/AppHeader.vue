<script setup lang="ts">
import { ref } from 'vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppFavorites from '@/components/Base/AppFavorites.vue';
  import AppInput from '@/components/Inputs/AppInput.vue';

  const text = ref<string | number>('');
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

        <div class="header__input">
          <app-input placeholder="BTC" v-model="text" />
        </div>

        <div class="header__favorites favorites">
          <router-link to="/favorites">
            <app-favorites />
          </router-link>
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
  .header__img {
    display: none;
  }
  @media (max-width: 768px) {
    .header__img {
    display: block;
  }
  }
</style>
