<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { getTopCoins } from '@/api/coins/topCoins';
  import { getTrendingCoins } from '@/api/coins/trendingCoins';
  import { getNews } from '@/api/coins/news';
  import { getExchanges } from '@/api/coins/exchanges';
  import type { TopCoin } from '@/interface/topCoins.interface';
  import type { NewsItem } from '@/interface/news.interface';
  import type { ExchangeData } from '@/interface/exchanges.interface';
  import CryptoTable from '@/components/Content/CryptoMarketOverview/CryptoTable.vue';
  import CryptoChart from '@/components/Content/CryptoMarketOverview/CryptoChart.vue';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';
  import TrendingCoinsList from '@/components/Content/TrendingCoinsList.vue';
  import CryptoNews from '@/components/Content/CryptoMarketOverview/CryptoNews.vue';
  import CryptoExchanges from '@/components/Content/CryptoMarketOverview/CryptoExchanges.vue';

  interface Trending {
    topGainers: TopCoin[];
    topLosers: TopCoin[];
  }
  const trendingCoins = ref<Trending>({
    topGainers: [],
    topLosers: [],
  });
  const topCoins = ref<TopCoin[]>([]);
  const news = ref<NewsItem[]>([]);
  const exchanges = ref<ExchangeData[]>([]);
  const isLoading = ref(true);

  // Функция для получения топ-10 криптовалют
  const fetchTopCoins = async () => {
    try {
      const data = await getTopCoins();
      topCoins.value = data.Data.slice(0, 10);
    } catch (error) {
      console.error('Error fetching top coins:', error);
    }
  };

  // Трендовые криптовалюты
  const fetchTrendingCoins = async () => {
    try {
      const data = await getTrendingCoins();

      trendingCoins.value = {
        topGainers: data.topGainers.slice(0, 10),
        topLosers: data.topLosers.slice(0, 10),
      };
    } catch (error) {
      console.error('Error fetching trending coins data:', error);
    }
  };

  const fetchNews = async () => {
    try {
      const data = await getNews();
      news.value = data.Data.slice(0, 6);
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  };

  const fetchExchanges = async () => {
    try {
      const data = await getExchanges();
      exchanges.value = data.slice(0, 10);
    } catch (error) {
      console.error('Error fetching exchanges data:', error);
    }
  };

  onMounted(async () => {
    await fetchTopCoins();
    await fetchTrendingCoins();
    await fetchNews();
    await fetchExchanges();

    isLoading.value = false;
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
    <trending-coins-list v-bind="trendingCoins" />
    <crypto-table :topCoins="topCoins" showLink />
    <crypto-chart :topCoins="topCoins" />
    <crypto-exchanges :exchanges="exchanges" />
    <crypto-news :news="news" />
  </div>
</template>
