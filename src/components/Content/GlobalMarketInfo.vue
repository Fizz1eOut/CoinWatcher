<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { getTopCoins } from '@/api/coins/topCoins';
  import { getTrendingCoins } from '@/api/coins/trendingCoins';
  import { getNews } from '@/api/coins/news';
  import { getExchanges } from '@/api/coins/exchanges';
  import type { TopCoinsResponse, TopCoin } from '@/interface/topCoins.interface';
  import type { NewsItem, NewsResponse } from '@/interface/news.interface';
  import type { ExchangeData, ExchangesResponse } from '@/interface/exchanges.interface';
  import CryptoTable from '@/components/Content/CryptoTable.vue';
  import DashboardChart from '@/components/Content/DashboardChart.vue';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';
  import TrendingCoinsList from '@/components/Content/TrendingCoinsList.vue';
  import CryptoNews from '@/components/Content/CryptoNews.vue';
  import CryptoExchanges from '@/components/Content/CryptoExchanges.vue';

  const topCoins = ref<TopCoin[]>([]);
  const trendingCoins = ref<{
    topGainers: TopCoin[];
    topLosers: TopCoin[];
  }>({
    topGainers: [],
    topLosers: [],
  });
  const news = ref<NewsItem[]>([]);
  const exchanges = ref<ExchangeData[]>([]);
  const isLoading = ref<boolean>(true);

  // // Функция для запроса рыночной информации и вывода данных в консоль
  // const fetchMarketData = async () => {
  //   try {
  //     const data = await getTopCoins();
  //     console.log('market data', data); // Вывод данных в консоль
  //   } catch (error) {
  //     console.error('Error fetching market data:', error);
  //   }
  // };

  // Функция для получения топ-10 криптовалют
  const fetchTopCoins = async () => {
    try {
      const data = await getTopCoins() as TopCoinsResponse;
      // Фильтруем валюты с наличием DISPLAY
      const filteredCoins = data.Data.filter(coin => coin.DISPLAY);
      topCoins.value = filteredCoins.slice(0, 10);
    } catch (error) {
      console.error('Error fetching top coins:', error);
    }
  };

  // Трендовые криптовалюты
  const fetchTrendingCoins = async () => {
    try {
      const data = await getTrendingCoins() as TopCoinsResponse;
      // Проверяем наличие поля DISPLAY и CHANGEPCT24HOUR, чтобы исключить undefined
      const coinsWithChange = data.Data.filter(coin => 
        coin.DISPLAY?.USD?.CHANGEPCT24HOUR !== undefined
      );

      // лидеры роста
      const topGainers = coinsWithChange
        .sort((a, b) => 
          (b.DISPLAY?.USD?.CHANGEPCT24HOUR ? parseFloat(b.DISPLAY.USD.CHANGEPCT24HOUR) : 0) -
          (a.DISPLAY?.USD?.CHANGEPCT24HOUR ? parseFloat(a.DISPLAY.USD.CHANGEPCT24HOUR) : 0)
        )
        .slice(0, 10);

      // лидеры падения
      const topLosers = coinsWithChange
        .sort((a, b) => 
          (a.DISPLAY?.USD?.CHANGEPCT24HOUR ? parseFloat(a.DISPLAY.USD.CHANGEPCT24HOUR) : 0) -
          (b.DISPLAY?.USD?.CHANGEPCT24HOUR ? parseFloat(b.DISPLAY.USD.CHANGEPCT24HOUR) : 0)
        )
        .slice(0, 10);

      trendingCoins.value = {topGainers, topLosers};
    } catch (error) {
      console.error('Error fetching trending coins data:', error);
    }
  };

  const fetchNews = async () => {
    try {
      const data = await getNews() as NewsResponse;
      news.value = data.Data.slice(0, 6);
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  };

  const fetchExchanges = async () => {
    try {
      const data = await getExchanges() as ExchangesResponse;
      console.log(data);
      const exchangesArray = Object.entries(data.Data).map(([exchangeKey, exchangeData]) => ({
        Id: exchangeKey, 
        Name: exchangeData.Name,
        ...exchangeData, // Все остальные данные
      }));
      // Сортируем биржи по GradePoints в убывающем порядке
      const sortedExchanges = exchangesArray.sort((a, b) => b.GradePoints - a.GradePoints);
      exchanges.value = sortedExchanges.slice(0, 10);
    } catch (error) {
      console.error('Error fetching exchanges data:', error);
    }
  };

  onMounted(async () => {
    try {
      await fetchTopCoins();
      await Promise.all([
        fetchTrendingCoins(),
        fetchNews(),
        fetchExchanges(),
      ]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      isLoading.value = false;
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
    <trending-coins-list 
      :topGainers="trendingCoins.topGainers" 
      :topLosers="trendingCoins.topLosers"
    />
    <crypto-table :topCoins="topCoins" />
    <dashboard-chart :topCoins="topCoins" />
    <crypto-exchanges :exchanges="exchanges" />
    <crypto-news :news="news" />
  </div>
</template>
