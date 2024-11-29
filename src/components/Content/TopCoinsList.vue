<script setup lang="ts">
  import type { TopCoin } from '@/interface/topCoins.interface';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppSubtitle from '@/components/Base/AppSubtitle.vue';

  // Интерфейс для пропсов
  interface TopCoinsProps {
    coins: TopCoin[];
    selectedCoin: string;
  }

  // Описание пропсов через дженерик
  defineProps<TopCoinsProps>();

  // Определяем события
  const emit = defineEmits<{
    (e: 'selectCoin', coinName: string): void;
  }>();

  // Функция для обработки выбора монеты
  const selectCoin = (coinName: string) => {
    emit('selectCoin', coinName);
  };
</script>

<template>
  <div class="top-coint">
    <app-title v-if="coins.length > 0">Топ 10 криптовалют</app-title>
    <app-subtitle v-else>Данные о криптовалютах отсутствуют</app-subtitle>
    <ul class="top-coint__list">
      <li
        v-for="coin in coins"
        :key="coin.CoinInfo.Name"
        :class="{ active: selectedCoin === coin.CoinInfo.Name }"
        @click="selectCoin(coin.CoinInfo.Name)"
        class="top-coint__item"
      >
        {{ coin.CoinInfo.Name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .top-coint {
  }
  .top-coint__list {
  }
  .top-coint__item {
  }
</style>
