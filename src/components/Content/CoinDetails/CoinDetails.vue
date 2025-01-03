<script setup lang="ts">
  import type { CoinDetail } from '@/interface/coinSearch.interface';
  import type { HistoricalData } from '@/interface/marketCaps.interface';
  import CoinSidebar from '@/components/Content/CoinDetails/CoinSidebar.vue';
  import CoinOverview from '@/components/Content/CoinDetails/CoinOverview.vue';
  import HistoricalChart from '@/components/Content/HistoricalChart.vue';

  interface CoinDetailProps {
    coin: CoinDetail | null;
    historicalData: HistoricalData[];
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
        <historical-chart
          :coinName="coin.Name" 
          :history="historicalData"
          class="coin-overview__chart" 
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .coin-details__content {
    display: flex;
    align-items: flex-start;
    gap: 10px;
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
