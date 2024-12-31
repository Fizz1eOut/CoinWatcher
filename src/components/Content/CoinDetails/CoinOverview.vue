<script setup lang="ts">
  import { ref, watch } from 'vue';
  import type { CoinDetail } from '@/interface/coinSearch.interface';
  import type { HistoricalData } from '@/interface/marketCaps.interface';
  import CoinSummary from '@/components/Content/CoinDetails/CoinSummary.vue';
  import HistoricalChart from '@/components/Content/HistoricalChart.vue';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';
  import { getHistoricalMarketCaps } from '@/api/coins/marketCaps';

  interface trendingCoins {
    coin: CoinDetail;
  }
  const props = defineProps<trendingCoins>();

  const historicalData = ref<HistoricalData[]>([]); // Исторические данные для текущей монеты
  const isLoading = ref(false); // Индикатор загрузки

  // Асинхронная функция для получения исторических данных
  const fetchCoinHistoricalData = async () => {
    try {
      if (!props.coin.Name) {
        console.warn('No coin symbol provided!');
        return;
      }

      isLoading.value = true; // Начало загрузки
      const marketCaps = await getHistoricalMarketCaps([props.coin.Name]);
      const coinData = marketCaps.find((entry) => entry.symbol === props.coin.Name);

      historicalData.value = coinData?.history || [];
    } catch (error) {
      console.error(`Error fetching historical data for ${props.coin.Name}:`, error);
    } finally {
      isLoading.value = false; // Конец загрузки
    }
  };

  // Следим за изменением `coin` и обновляем данные
  watch(
    () => props.coin.Name,
    () => {
      fetchCoinHistoricalData();
    },
    { immediate: true }
  );
</script>

<template>
  <div class="coin-overview">
    <coin-summary :coin="coin" />
    <app-loading-spinner v-if="isLoading" />
    <historical-chart
      v-else
      :coinName="coin.Name" 
      :history="historicalData"
      class="coin-overview__chart" 
    />
  </div>
</template>

<style scoped>
  .coin-overview {
    width: 100%;
  }
  .coin-overview__chart {
    margin-top: 40px;
    width: 100%;
  }
</style>
