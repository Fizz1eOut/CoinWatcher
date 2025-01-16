<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { getCoinSearch } from '@/api/coins/coinSearch';
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

  onMounted(async () => {
    await fetchCoinDetails(route.params.name as string);

    isLoading.value = false;
  });

  watch(
    () => route.params.name,
    (newName) => {
      if (newName) fetchCoinDetails(newName as string);
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
  <coin-details v-else :coin="coin"/>
</template>
