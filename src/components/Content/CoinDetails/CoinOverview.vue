<script setup lang="ts">
  import type { CoinDetail } from '@/interface/coinSearch.interface';
  import CoinSummary from '@/components/Content/CoinDetails/CoinSummary.vue';

  interface trendingCoins {
    coin: CoinDetail;
  }
  defineProps<trendingCoins>();

</script>

<template>
  <div class="coin-overview">
    <coin-summary :coin="coin" />
  </div>
</template>

<style scoped>
  .coin-overview {
    width: 100%;
  }
</style>
