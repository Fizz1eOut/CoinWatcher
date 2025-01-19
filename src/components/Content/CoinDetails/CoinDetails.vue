<script setup lang="ts">
  import type { CoinDetail } from '@/interface/coinDetail.interface';
  import CoinSidebar from '@/components/Content/CoinDetails/CoinSidebar.vue';
  import CoinOverview from '@/components/Content/CoinDetails/CoinOverview.vue';
  import CoinDetailsChart from '@/components/Content/CoinDetails/CoinDetailsChart.vue';
  import CoinNews from '@/components/Content/CoinDetails/CoinNews.vue';

  interface CoinDetailProps {
    coin: CoinDetail | null;
  }

  defineProps<CoinDetailProps>();
</script>

<template>
  <div v-if="coin" class="coin-details">
    <div class="coin-details__body">
      <div class="coin-details__content">
        <coin-sidebar :coin="coin" />
        <coin-overview :coin="coin" />
      </div>

      <div class="coin-details__chart">
        <coin-details-chart :coin="coin" />
      </div>
      <div class="coin-details__news">
        <coin-news :coin="coin" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .coin-details__content {
    display: flex;
    align-items: flex-start;
    gap: 20px;
  }
  .coin-overview__chart {
    margin-top: 40px;
    width: 100%;
  }
  @media (max-width: 499px) {
    .coin-details__content {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
