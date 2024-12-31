<script setup lang="ts">
  import type { CoinDetail } from '@/interface/coinSearch.interface';
  import CoinSidebar from '@/components/Content/CoinDetails/CoinSidebar.vue';
  import CoinOverview from '@/components/Content/CoinDetails/CoinOverview.vue';

  interface trendingCoins {
    coin: CoinDetail | null;
  }
  defineProps<trendingCoins>();
</script>

<template>
  <div v-if="coin" class="coin-details">
    <coin-sidebar :coin="coin" />
    <coin-overview :coin="coin" />
  </div>
</template>

<style scoped>
  .coin-details {
    display: flex;
    align-items: flex-start;
    gap: 20px;
  }
  @media (max-width: 768px) {
    .coin-details {
      flex-direction: column;
    }
  }
  @media (max-width: 480px) {
    .coin-details {
      align-items: center ;
    }
  }
</style>
