<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { getCoinDetail } from '@/api/coins/coinDetail';
  import type { CoinDetail } from '@/interface/coinDetail.interface';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';
  import CoinDetails from '@/components/Content/CoinDetails/CoinDetails.vue';
  import AppBreadcrumbs from '@/components/Base/AppBreadcrumbs.vue';

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
      const data = await getCoinDetail(name);
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
  <div v-else>
    <app-breadcrumbs :coinName="coin?.Name" />
    <coin-details  :coin="coin"/>
  </div>
</template>
