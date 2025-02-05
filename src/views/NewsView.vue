<script setup lang="ts">
  import { onMounted, ref, computed, watch } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import CryptoNews from '@/components/Content/CryptoMarketOverview/CryptoNews.vue';
  import AppPagination from '@/components/Base/AppPagination.vue';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';
  import NewsFilters from '@/components/Content/NewsFilters.vue';
  import { getNewsFeeds } from '@/api/coins/feeds';
  import { getTopCoins } from '@/api/coins/topCoins';
  import { getNews } from '@/api/coins/news';
  import type { NewsFeed } from '@/api/coins/feeds';
  import type { NewsItem } from '@/interface/news.interface';
  import type { TopCoin } from '@/interface/topCoins.interface';
  import AppBreadcrumbs from '@/components/Base/AppBreadcrumbs.vue';
  
  const router = useRouter();
  const route = useRoute();

  const isLoading = ref(true);
  const news = ref<NewsItem[]>([]);
  const currentPage = ref(1);
  const itemsPerPage = 10;
  const selectedCryptos = ref<string[]>([]);
  const selectedFeeds = ref<string[]>([]);
  const cryptoList = ref<string[]>([]);
  const feedsList = ref<NewsFeed[]>([]);

  // Функция обновления query параметров в URL
  const updateQueryParams = () => {
    const query: Record<string, string> = {};

    if (selectedCryptos.value.length) query.cryptos = selectedCryptos.value.join(',');
    if (selectedFeeds.value.length) query.feeds = selectedFeeds.value.join(',');

    router.push({ query });
  };

  // Загружаем фильтры из URL при загрузке страницы
  const loadFiltersFromQuery = () => {
    if (route.query.cryptos) {
      selectedCryptos.value = (route.query.cryptos as string).split(',');
    }
    if (route.query.feeds) {
      selectedFeeds.value = (route.query.feeds as string).split(',');
    }
  };

  const fetchNews = async () => {
    isLoading.value = true;
    try {
      const cryptoParam = selectedCryptos.value.length ? selectedCryptos.value.join(',') : undefined;
      const feedsParam = selectedFeeds.value.length ? selectedFeeds.value.join(',') : undefined;

      const data = await getNews(cryptoParam, feedsParam);
      news.value = data.Data;
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      isLoading.value = false;
    }
  };


  const fetchTopCoins = async () => {
    isLoading.value = true;
    try {
      const data = await getTopCoins();
      cryptoList.value = data.Data.map((coin: TopCoin) => coin.CoinInfo.Name);
    } catch (error) {
      console.error('Error loading cryptocurrency list:', error);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchFeeds = async () => {
    try {
      const data = await getNewsFeeds();
      feedsList.value = data.map(feed => ({ key: feed.key, name: feed.name }));
    } catch (error) {
      console.error('Error loading list of news sources:', error);
    }
  };


  const paginatedNews = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return news.value.slice(start, start + itemsPerPage);
  });

  watch([selectedCryptos, selectedFeeds], () => {
    updateQueryParams();
    fetchNews();
  });

  onMounted(() => {
    loadFiltersFromQuery();
    fetchNews();
    fetchTopCoins();
    fetchFeeds();
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
    <app-breadcrumbs />

    <news-filters 
      v-model:selectedCryptos="selectedCryptos" 
      v-model:selectedFeeds="selectedFeeds" 
      :cryptoList="cryptoList" 
      :feedsList="feedsList"
    />
    <div v-if="news.length > 0">
      <crypto-news :news="paginatedNews" :showLink="false" />
      <app-pagination
        :total-items="news.length"
        :items-per-page="itemsPerPage"
        v-model:currentPage="currentPage"
      />
    </div>
    <p v-else class="no-news">Новости не найдены</p>
  </div>
</template>

<style scoped>

</style>
