<script setup lang="ts">
  import { computed } from 'vue';
  import type { CoinDetail } from '@/interface/coinSearch.interface';
  import AppCoinData from '@/components/Base/AppCoinData.vue';

  interface trendingCoins {
    coin: CoinDetail;
  }
  const props = defineProps<trendingCoins>();

  // Создаем вычисляемое свойство для форматирования Change (24h)
  const formattedChange = computed(() => {
    const change = parseFloat(props.coin.DISPLAY.CHANGEPCT24HOUR); // Преобразуем значение в число
    return isNaN(change) ? 'N/A' : `${change.toFixed(2)}%`; // Форматируем с двумя знаками после запятой
  });
</script>

<template>
  <div class="coin-summary">
    <div class="coin-summary__content">
      <div class="coin-summary__item">
        <span>Current price:</span>
        <app-coin-data 
          :coinName="coin.Name" 
          dataType="price" 
        />
      </div>

      <div class="coin-summary__item">
        <span>24h Volume:</span>
        <app-coin-data 
          :coinName="coin.Name" 
          dataType="volume24h" 
        />
      </div>
      <div class="coin-summary__item">
        <span>Market Cap:</span>
        <app-coin-data 
          :coinName="coin.Name" 
          dataType="marketCap" 
        />
      </div>
      <div class="coin-summary__item">
        <span>Change (24h):</span>
        <div>{{ formattedChange }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .coin-summary__price {
    font-size: 25px;
  }
  .coin-summary__content {
    display: flex;
    align-items: center;
    gap: 40px;
  }
  .coin-summary__item {
    font-size: 24px;
  }
  .coin-summary__item span {
    font-size: 16px;
    color: var(--color-gray);
  }
  @media (max-width: 991px) {
    .coin-summary__item span {
      font-size: 14px;
    }
    .coin-summary__content {
      gap: 20px;
    }
  }
  @media (max-width: 480px) {
    .coin-summary__content {
      flex-wrap: wrap;
      justify-content: center;
    }
    .coin-summary__item {
      font-size: 18px;
    }
  } 
</style>
