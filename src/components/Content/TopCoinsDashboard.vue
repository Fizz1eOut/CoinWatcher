<script setup lang="ts">
  import type { TopCoin } from '@/interface/topCoins.interface';
  import TopCoinsList from '@/components/Content/TopCoinsList.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppSubtitle from '@/components/Base/AppSubtitle.vue';

  // Интерфейс для пропсов
  interface CryptoDashboardProps {
    topCoins: TopCoin[];
  }
  // Описание пропсов через дженерик
  const props = defineProps<CryptoDashboardProps>();
</script>

<template>
  <div class="dashboard">
    <app-title v-if="topCoins.length > 0">Top 10 Cryptocurrencies</app-title>
    <app-subtitle v-else>No data on cryptocurrencies</app-subtitle>
    <div class="dashboard__body">
      <top-coins-list
        :coins="props.topCoins"
        class="top-coins"
      />
    </div>
  </div>
</template>

<style scoped>
  .dashboard__body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
</style>

