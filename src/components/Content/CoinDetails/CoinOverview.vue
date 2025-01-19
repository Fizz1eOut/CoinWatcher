<script setup lang="ts">
  import type { CoinDetail } from '@/interface/coinDetail.interface';
  import CoinSummary from '@/components/Content/CoinDetails/CoinSummary.vue';
  import CoinExchanges from '@/components/Content/CoinDetails/CoinExchanges.vue';
  import CoinData from '@/components/Content/CoinDetails/CoinData.vue';

  interface CoinDetailProps {
    coin: CoinDetail;
  }
  defineProps<CoinDetailProps>();

</script>

<template>
  <div class="coin-overview">
    <div class="coin-overview__body">
      <coin-summary :coin="coin" />
      <coin-exchanges :coin="coin" />
    </div>
    <coin-data :coin="coin" />
  </div>
</template>

<style scoped>
  .coin-overview {
    width: 100%;
  }
  .coin-overview__body {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
  }
  @media (max-width: 930px) {
    .coin-overview__body {
      flex-wrap: wrap;
    }
  }
  @media (max-width: 499px) {
    .coin-overview__body {
      justify-content: center;
    }
  }
</style>
