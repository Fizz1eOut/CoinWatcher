<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { getMarketOverview } from '@/api/coins/marketOverview';
  import { getTopCoins } from '@/api/coins/topCoins';
  import { getHistoricalMarketCaps } from '@/api/coins/marketCaps';
  import { getTrendingCoins } from '@/api/coins/trendingCoins';
  import { getNews } from '@/api/coins/news';
  import type { TopCoinsResponse } from '@/interface/topCoins.interface';

  const topCoinsSymbols = ref<string[]>([]);

  // Функция для запроса рыночной информации и вывода данных в консоль
  const fetchMarketData = async () => {
    try {
      const data = await getMarketOverview();
      console.log('market data', data); // Вывод данных в консоль
    } catch (error) {
      console.error('Error fetching market data:', error);
    }
  };

  const fetchTopCoins = async () => {
    try {
      const data = await getTopCoins() as TopCoinsResponse;
      topCoinsSymbols.value = data.Data.map((coin) => coin.CoinInfo.Name);
      console.log('top coins value', topCoinsSymbols.value);
    } catch (error) {
      console.error('Error fetching top coins data:', error);
    }
  };

  const fetchGlobalMarketCap = async () => {
    try {
      if (!topCoinsSymbols.value.length) {
        console.warn('No top coins symbols found!');
        return;
      }

      const historicalData = await getHistoricalMarketCaps(topCoinsSymbols.value);
      console.log('Global market cap:', historicalData);
    } catch (error) {
      console.error('Error fetching global market cap:', error);
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

  // Вызываем функцию при монтировании компонента
  onMounted(async () => {
    await fetchMarketData();
    await fetchTopCoins();
    await fetchGlobalMarketCap();
    await fetchTrendingCoins();
    await fetchNews();
  });
</script>

<template>
  <div>Check the console for market data.</div>
</template> 
