<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { getNews } from '@/api/coins/news';
  import type { NewsItem } from '@/interface/news.interface';
  import type { CoinDetail } from '@/interface/coinSearch.interface';
  import CryptoNews from '@/components/Content/CryptoNews.vue';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';

  interface trendingCoins {
    coin: CoinDetail;
  }
  const props = defineProps<trendingCoins>();

  const news = ref<NewsItem[]>([]);
  const isLoading = ref(true);

  const fetchNews = async (cryptoName?: string) => {
    try {
      const data = await getNews(cryptoName);
      news.value = data.Data.slice(0, 6);
    } catch (error) {
      console.error('Error fetching news data:', error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    fetchNews(props.coin.Name);
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
  <crypto-news v-else :news="news" />
</template>

<style scoped>

</style>
