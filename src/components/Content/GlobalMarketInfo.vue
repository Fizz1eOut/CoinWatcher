<script setup lang="ts">
import { onMounted } from 'vue';
import { getMarketOverview } from '@/api/coins/MarketOverview';

// Функция для запроса рыночной информации и вывода данных в консоль
const fetchMarketData = async () => {
  try {
    const data = await getMarketOverview();
    console.log(data); // Вывод данных в консоль
  } catch (error) {
    console.error('Error fetching market data:', error);
  }
};

// Вызываем функцию при монтировании компонента
onMounted(() => {
  fetchMarketData();
});
</script>

<template>
  <div>Check the console for market data.</div>
</template>
