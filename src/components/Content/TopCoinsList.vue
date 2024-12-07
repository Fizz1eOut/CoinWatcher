<script setup lang="ts">
  import type { TopCoin } from '@/interface/topCoins.interface';
  import AppCoint from '@/components/Base/AppCoint.vue';

  // Интерфейс для пропсов
  interface TopCoinsProps {
    coins: TopCoin[];
  }

  // Описание пропсов через дженерик
  defineProps<TopCoinsProps>();
</script>

<template>
  <div class="top-coint">
    <ul class="top-coint__list">
      <li
        v-for="coin in coins"
        :key="coin.CoinInfo.Name"
        class="top-coint__item"
      >
        <app-coint :coin="coin" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .top-coint {
  }
  .top-coint__list {
    margin-top: 40px;
  }
  .top-coint__item {

  }
</style>
