<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { getCoinSearch } from '@/api/coins/coinSearch';
  import type { CoinDetail } from '@/interface/coinSearch.interface';

  interface CoinDetailProps {
    name: string;
  }

  defineProps<CoinDetailProps>();

  // Состояния компонента
  const coin = ref<CoinDetail>();
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
      console.log(data);

      if (data && data.RAW && data.RAW[name]) {
        coin.value = {
          Name: name,
          ImageUrl: data.RAW[name].USD.IMAGEURL,
          DISPLAY: data.RAW[name].USD,
        };
        console.log(coin.value);
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
  <div>
    <h1>Coin Detail View</h1>

    <!-- Loading State -->
    <div v-if="isLoading">Loading...</div>

    <!-- Error State -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Coin Details -->
    <div v-if="coin">
      <h2>{{ coin.Name }}</h2>
      <img :src="'https://www.cryptocompare.com' + coin.ImageUrl" alt="Coin Image" />
      <ul>
        <li><strong>Market Cap:</strong> {{ coin.DISPLAY.MKTCAP }}</li>
        <li><strong>24h Volume:</strong> {{ coin.DISPLAY.TOTALVOLUME24H }}</li>
        <li><strong>Change (24h):</strong> {{ coin.DISPLAY.CHANGEPCT24HOUR }}%</li>
      </ul>
    </div>
  </div>
</template>
