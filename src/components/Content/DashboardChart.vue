<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getMarketOverview } from '@/api/coins/marketOverview';
import { getHistoricalMarketCaps } from '@/api/coins/marketCaps'; // Импорт вашей функции
import type { TopCoinsResponse, TopCoin } from '@/interface/topCoins.interface';
import type { MarketCapEntry } from '@/interface/marketCaps.interface';
import MarketOverviewChart from '@/components/Content/MarketOverviewChart.vue';

const marketData = ref<TopCoin[]>([]);
const historicalData = ref<MarketCapEntry[]>([]);
const isLoading = ref<boolean>(true);
const error = ref<string | null>(null);

// Получение данных при загрузке компонента
const fetchMarketOverview = async () => {
  try {
    const data = (await getMarketOverview()) as TopCoinsResponse;
    marketData.value = data.Data;

    // Извлечение символов криптовалют
    const symbols = marketData.value.map((coin) => coin.CoinInfo.Name);

    // Получение исторических данных по этим символам
    historicalData.value = await getHistoricalMarketCaps(symbols);
    console.log('Market Data:', marketData.value);
    console.log('Historical Data:', historicalData.value);
  } catch (err) {
    error.value = 'Failed to load market data';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchMarketOverview);
</script>

<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <!-- Передача исторических данных в компонент графика -->
      <market-overview-chart :historicalData="historicalData" />
    </div>
  </div>
</template>


