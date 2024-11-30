<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { getMarketOverview } from '@/api/coins/marketOverview';
  import { getAllCoins } from '@/api/coins/AllCoins';
  import { getHistoricalMarketCaps } from '@/api/coins/marketCaps';
  import { getTrendingCoins } from '@/api/coins/trendingCoins';
  import { getNews } from '@/api/coins/news';
  import type { TopCoinsResponse, TopCoin } from '@/interface/topCoins.interface';
  import type { MarketCapEntry } from '@/interface/marketCaps.interface';
  import TopCoinsDashboard from '@/components/Content/TopCoinsDashboard.vue';

  // Топ-10 криптовалют
  const topCoins = ref<TopCoin[]>([]);
  // Исторические данные по криптовалютам
  const historicalData = ref<MarketCapEntry[]>([]);
  const isLoading = ref<boolean>(true);

  // Функция для запроса рыночной информации и вывода данных в консоль
  const fetchMarketData = async () => {
    try {
      const data = await getMarketOverview();
      console.log('market data', data); // Вывод данных в консоль
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  };

  // Функция для получения топ-10 криптовалют
  const fetchTopCoins = async () => {
    try {
      const data = await getAllCoins() as TopCoinsResponse;
      topCoins.value = data.Data.slice(0, 15);
      console.log('Top Coins:', topCoins.value);
    } catch (error) {
      console.error('Error fetching top coins:', error);
    }
  };

  // Функция для получения исторических данных
  const fetchHistoricalData = async () => {
    try {
      if (topCoins.value.length) {
        const symbols = topCoins.value.map((coin) => coin.CoinInfo.Name); // Получаем символы криптовалют
        const data = await getHistoricalMarketCaps(symbols); // Запрашиваем данные
        historicalData.value = data; // Сохраняем исторические данные
        console.log('Historical Data:', historicalData.value);
      }
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  // Трендовые криптовалюты
  const fetchTrendingCoins = async () => {
    try {
      const data = await getTrendingCoins();
      console.log('trending coins data', data); // Вывод данных в консоль
    } catch (error) {
      console.error('Error fetching trending coins data:', error);
    }
  };

  // Новости 
  const fetchNews = async () => {
    try {
      const data = await getNews();
      console.log('news data', data); // Вывод данных в консоль
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  };

  onMounted(async () => {
    try {
      await fetchTopCoins();
      await Promise.all([
        fetchMarketData(),
        fetchHistoricalData(),
        fetchTrendingCoins(),
        fetchNews(),
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      isLoading.value = false; // Сбрасываем флаг загрузки после завершения всех запросов
    }
  });
</script>

<template>
  <div v-if="isLoading">Загрузка данных...</div>
  <div v-else>
    <top-coins-dashboard :topCoins="topCoins" :historicalData="historicalData" />
  </div>
</template> 
