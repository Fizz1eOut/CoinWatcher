<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { getCoinSearch } from '@/api/coins/coinSearch';
  import { getHistoricalMarketCaps } from '@/api/coins/marketCaps';
  import type { HistoricalData } from '@/interface/marketCaps.interface';
  import type { CoinDetail } from '@/interface/coinSearch.interface';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';
  import CoinDetails from '@/components/Content/CoinDetails/CoinDetails.vue';

  interface CoinDetailProps {
    name: string;
  }
  defineProps<CoinDetailProps>();

  const coin = ref<CoinDetail | null>(null);
  const isLoading = ref(true);
  const error = ref<string | null>(null);
  const historicalData = ref<HistoricalData[]>([]);
  const route = useRoute();

  const fetchCoinDetails = async (name: string) => {
    error.value = null;
    try {
      const data = await getCoinSearch(name);
      if (data && data.RAW && data.RAW[name]) {
        coin.value = {
          id: route.params.name as string,
          Name: name,
          ImageUrl: data.RAW[name].USD.IMAGEURL,
          DISPLAY: data.RAW[name].USD,
        };
      }
    } catch (err) {
      console.error('Failed to fetch data.', err);
    }
  };

  const fetchCoinHistoricalData = async (name: string) => {
    try {
      if (!name) {
        console.warn('No coin symbol provided!');
        return;
      }
      const marketCaps = await getHistoricalMarketCaps([name]);
      const coinData = marketCaps.find((entry) => entry.symbol === name);

      historicalData.value = coinData?.history || [];
    } catch (error) {
      console.error(`Error fetching historical data for ${name}:`, error);
    }
  };

  onMounted(async () => {
    await fetchCoinDetails(route.params.name as string);
    await fetchCoinHistoricalData(route.params.name as string);

    isLoading.value = false;
  });

  watch(
    () => route.params.name,
    (newName) => {
      if (newName) fetchCoinDetails(newName as string);
      if (newName) fetchCoinHistoricalData(newName as string);
      isLoading.value = false;
    }
  );
</script>

<template>
  <app-loading-spinner 
    v-if="isLoading" 
    class="loader" 
    size="70px"
    borderWidth="7px"
    height="100vh" 
  />
  <coin-details v-else :coin="coin" :historical-data="historicalData"/>
</template>
