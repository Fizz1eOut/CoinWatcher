<script setup lang="ts">
  import { onMounted, ref, computed } from 'vue';
  import CryptoNews from '@/components/Content/CryptoMarketOverview/CryptoNews.vue';
  import AppPagination from '@/components/Base/AppPagination.vue';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';
  import { getNews } from '@/api/coins/news';
  import type { NewsItem } from '@/interface/news.interface';

  const isLoading = ref(true);
  const news = ref<NewsItem[]>([]);
  const currentPage = ref(1);
  const itemsPerPage = 10;

  const fetchNews = async () => {
    try {
      const data = await getNews();
      news.value = data.Data;
    } catch (error) {
      console.error('Error fetching news data:', error);
    } finally {
      isLoading.value = false;
    }
  };

  const paginatedNews = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return news.value.slice(start, start + itemsPerPage);
  });

  onMounted(() => {
    fetchNews();
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
    <crypto-news :news="paginatedNews" :showLink="false" />
    <app-pagination
      :total-items="news.length"
      :items-per-page="itemsPerPage"
      v-model:currentPage="currentPage"
    />
  </div>
</template>

<style scoped>

</style>
