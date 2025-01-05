<script setup lang="ts">
  import { computed } from 'vue';
  import type { CoinDetail } from '@/interface/coinSearch.interface';
  import AppCoinData from '@/components/Base/AppCoinData.vue';

  interface CoinDetailProps {
    coin: CoinDetail;
  }
  const props = defineProps<CoinDetailProps>();

  // Создаем вычисляемое свойство для форматирования Change (24h)
  const formattedChange = computed(() => {
    const change = parseFloat(props.coin.DISPLAY.CHANGEPCT24HOUR); // Преобразуем значение в число
    return isNaN(change) ? 'N/A' : `${change.toFixed(2)}%`; // Форматируем с двумя знаками после запятой
  });
</script>

<template>
  <div class="coin-summary">
    <div class="coin-summary__content">
      <div class="coin-summary__price">
        <div class="coin-summary__text">Current price:</div>
        <app-coin-data 
          :coinName="coin.Name" 
          dataType="price" 
        />
      </div>

      <div class="coin-summary__items">
        <div class="coin-summary__item">
          <div class="coin-summary__text">24h Volume:</div>
          <app-coin-data 
            :coinName="coin.Name" 
            dataType="volume24h" 
          />
        </div>
        <div class="coin-summary__item">
          <div class="coin-summary__text">Market Cap:</div>
          <app-coin-data 
            :coinName="coin.Name" 
            dataType="marketCap" 
          />
        </div>
        <div class="coin-summary__item">
          <div class="coin-summary__text">Change (24h):</div>
          <div>{{ formattedChange }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .coin-summary__price {
    font-size: 24px;
  }
  .coin-summary__text {
    font-size: 14px;
    color: var(--color-gray);
  }
  .coin-summary__content {
    display: flex;
    align-items: center;
    column-gap: 10px;
    row-gap: 10px;
    flex-wrap: wrap;
  }
  .coin-summary__items {
    display: flex;
    align-items: center;
    column-gap: 10px;
    row-gap: 10px;
  }
  .coin-summary__item {
    font-size: 24px;
  }
  @media (max-width: 768px) {
    .coin-summary__items {
      column-gap: 10px;
      flex-wrap: wrap;
    }
    .coin-summary__item {
      font-size: 18px;
    }
  }
  @media (max-width: 499px) {
    .coin-summary__content{
      justify-content: center;
    }
    .coin-summary__items {
      justify-content: center;
    }
  }
</style>
