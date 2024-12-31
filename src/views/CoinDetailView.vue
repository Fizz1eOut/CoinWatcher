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

  // Состояния компонента
  const coin = ref<CoinDetail | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Получение данных из маршрута
  const route = useRoute();

  // Функция для загрузки данных
  const fetchCoinDetails = async (name: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await getCoinSearch(name);

      if (data && data.RAW && data.RAW[name]) {
        coin.value = {
          Name: name,
          ImageUrl: data.RAW[name].USD.IMAGEURL,
          DISPLAY: data.RAW[name].USD,
        };
      } else {
        error.value = `Cryptocurrency "${name}" not found.`;
      }
    } catch (err) {
      console.error('Failed to fetch data.', err);
      error.value = 'An error occurred while fetching data.';
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    fetchCoinDetails(route.params.name as string);
  });

  watch(
    () => route.params.name,
    (newName) => {
      if (newName) fetchCoinDetails(newName as string);
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

  <coin-details :coin="coin" />
</template>
