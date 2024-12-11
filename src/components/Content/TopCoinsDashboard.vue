<script setup lang="ts">
  import { ref, onMounted, onUnmounted, computed } from 'vue';
  import type { TopCoin } from '@/interface/topCoins.interface';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppSubtitle from '@/components/Base/AppSubtitle.vue';
  import AppTable from '@/components/Base/AppTable.vue';
  import AppImageCoins from '@/components/Base/AppImageCoin.vue';
  import AppCoinPrice from '@/components/Base/AppCoinPrice.vue';
  import AppCoinVolume from '@/components/Base/AppCoinVolume.vue';
  import AppCoinMarketCap from '@/components/Base/AppCoinMarketCap.vue';

  // Интерфейс для пропсов
  interface CryptoDashboardProps {
    topCoins: TopCoin[];
  }

  const props = defineProps<CryptoDashboardProps>();

  // Реактивная ширина экрана
  const screenWidth = ref(window.innerWidth);
  // Отслеживание ширины экрана
  const updateScreenWidth = () => {
    screenWidth.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', updateScreenWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateScreenWidth);
  });

  // Определение видимых колонок на основе ширины экрана
  const visibleColumns = computed(() => {
    if (screenWidth.value <= 480) {
      // Меньше 480px: показываем только Name и Price
      return columns.filter(col => ['name', 'price', 'change'].includes(col.key));
    } else if (screenWidth.value <= 600) {
      // Меньше 600px: скрываем Market Cap и Volume
      return columns.filter(col => !['volume'].includes(col.key));
    }
    // По умолчанию: показываем все колонки
    return columns;
  });

  // Конфигурация колонок
  const columns = [
    { label: 'Name', key: 'name', slotName: 'name' },
    { label: 'Price', key: 'price', slotName: 'price' },
    { label: '24h Change', key: 'change', },
    { label: 'Market Cap', key: 'marketCap', slotName: 'marketCap', },
    { label: '24h Volume', key: 'volume', slotName: 'volume' },
  ];

  // Подготовка данных
  const tableData = props.topCoins.map(coin => ({
    name: coin.CoinInfo.Name,
    imageUrl: coin.CoinInfo.ImageUrl,
    change: `${coin.DISPLAY?.USD?.CHANGEPCT24HOUR}%`,
  }));
</script>

<template>
  <div class="dashboard">
    <app-title v-if="topCoins.length > 0">Top 10 Cryptocurrencies</app-title>
    <app-subtitle v-else>No data on cryptocurrencies</app-subtitle>
    <div class="dashboard__body">
      <app-table :data="tableData" :columns="visibleColumns">
        <template #name="{ row }">
          <div class="row">
            <app-image-coins :imageUrl="String(row.imageUrl)" />
            <div class="name">{{ row.name }}</div>
          </div>
        </template>
        <template #price="{ row }">
          <app-coin-price :coinName="String(row.name)" />
        </template>

        <template #marketCap="{ row }">
          <AppCoinMarketCap :coinName="String(row.name)" />
        </template>

        <template #volume="{ row }">
          <app-coin-volume :coinName="String(row.name)" />
        </template>
      </app-table>
    </div>
  </div>
</template>

<style scoped>
  .dashboard__body {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .row {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
    max-width: 80px;
    width: 100%;
  }
  .name {
    width: 100%;
  }
  @media (max-width: 480px) {
    .dashboard__body {
      margin-top: 20px;
    }
  }
</style>
