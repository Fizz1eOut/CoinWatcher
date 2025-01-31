<script setup lang="ts">
  import { onMounted, ref, computed } from 'vue';
  import { getExchanges } from '@/api/coins/exchanges';
  import type { ExchangeData } from '@/interface/exchanges.interface';
  import CryptoExchanges from '@/components/Content/CryptoMarketOverview/CryptoExchanges.vue';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';
  import AppPagination from '@/components/Base/AppPagination.vue';

  const isLoading = ref(true);
  const exchanges = ref<ExchangeData[]>([]);
  const currentPage = ref(1);
  const itemsPerPage = 30;

  const fetchExchanges = async () => {
    isLoading.value = true;
    try {
      const data = await getExchanges();
      exchanges.value = data;
    } catch (error) {
      console.error('Error fetching exchanges data:', error);
    } finally {
      isLoading.value = false;
    }
  };

  const paginatedExchanges = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return exchanges.value.slice(start, start + itemsPerPage);
  });

  onMounted(() => {
    fetchExchanges();
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
    <crypto-exchanges :exchanges="paginatedExchanges" :showLink="false" >
      <template #header>
        <div>All Exchanges in One Place</div>
      </template>
    </crypto-exchanges>
    <app-pagination
      :total-items="exchanges.length"
      :items-per-page="itemsPerPage"
      v-model:currentPage="currentPage"
    />
  </div>
</template>

<style scoped>

</style>
