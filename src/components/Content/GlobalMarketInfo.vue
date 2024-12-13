<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { getTopCoins } from '@/api/coins/topCoins';
  import { getTrendingCoins } from '@/api/coins/trendingCoins';
  import { getNews } from '@/api/coins/news';
  import type { TopCoinsResponse, TopCoin } from '@/interface/topCoins.interface';
  import CryptoTable from '@/components/Content/CryptoTable.vue';
  import DashboardChart from '@/components/Content/DashboardChart.vue';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';

  // Топ-10 криптовалют
  const topCoins = ref<TopCoin[]>([]);
  const isLoading = ref<boolean>(true);

  // Функция для запроса рыночной информации и вывода данных в консоль
  const fetchMarketData = async () => {
    try {
      const data = await getTopCoins();
      console.log('market data', data); // Вывод данных в консоль
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  };

  // Функция для получения топ-10 криптовалют
  const fetchTopCoins = async () => {
    try {
      const data = await getTopCoins() as TopCoinsResponse;
      // Фильтруем валюты с наличием RAW и DISPLAY
      const filteredCoins = data.Data.filter(coin => coin.DISPLAY);
      topCoins.value = filteredCoins.slice(0, 10);
      console.log('Top Coins:', topCoins.value);
    } catch (error) {
      console.error('Error fetching top coins:', error);
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
  <app-loading-spinner 
    v-if="isLoading" 
    class="loader" 
    size="70px"
    borderWidth="7px"
    height="100vh" 
  />
  <div v-else>
    <crypto-table :topCoins="topCoins" />
    <dashboard-chart :topCoins="topCoins" />
  </div>
</template> 
