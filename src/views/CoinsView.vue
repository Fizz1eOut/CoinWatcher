<script setup lang="ts">
  import { onMounted, ref, computed } from 'vue';
  import { getTopCoins } from '@/api/coins/topCoins';
  import type { TopCoin } from '@/interface/topCoins.interface';
  import CryptoTable from '@/components/Content/CryptoMarketOverview/CryptoTable.vue';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';
  import AppPagination from '@/components/Base/AppPagination.vue';

  const isLoading = ref(true);
  const topCoins = ref<TopCoin[]>([]);
  const currentPage = ref(1);
  const itemsPerPage = 30;

  const fetchCoins = async (apiPage: number) => {
    isLoading.value = true;
    try {
      const data = await getTopCoins(apiPage, 100);
      topCoins.value = [
        ...topCoins.value,
        ...data.Data,
      ];
    } catch (error) {
      console.error('Error fetching coins:', error);
    } finally {
      isLoading.value = false;
    }
  };

  const paginatedCoins = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    // Если требуемые монеты ещё не загружены — загружаем
    if (end > topCoins.value.length) {
      const neededApiPage = Math.ceil(end / 100); // Рассчитываем API-страницу
      fetchCoins(neededApiPage);
    }

    return topCoins.value.slice(start, end);
  });

  onMounted(() => {
    fetchCoins(1);
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
    <crypto-table :topCoins="paginatedCoins" :showLink="false" />
    <app-pagination
      :total-items="topCoins.length"
      :items-per-page="itemsPerPage"
      v-model:currentPage="currentPage"
    />
  </div>
</template>

<style scoped>

</style>
