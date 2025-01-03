<script setup lang="ts">
  import type { CoinDetail } from '@/interface/coinSearch.interface';
  import CoinSummary from '@/components/Content/CoinDetails/CoinSummary.vue';
  import CoinExchanges from '@/components/Content/CoinDetails/CoinExchanges.vue';

  interface CoinDetailProps {
    coin: CoinDetail;
  }
  defineProps<CoinDetailProps>();

</script>

<template>
  <div class="coin-overview">
    <coin-summary :coin="coin" />
    <coin-exchanges :coin="coin" />
  </div>
</template>

<style scoped>
  .coin-overview {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
  }
  @media (max-width: 930px) {
    .coin-overview {
      flex-wrap: wrap;
    }
  }
  @media (max-width: 499px) {
    .coin-overview {
      justify-content: center;
    }
  }
</style>
