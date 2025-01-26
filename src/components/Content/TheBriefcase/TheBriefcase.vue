<script setup lang="ts">
  import { computed } from 'vue';
  import { useBriefcaseStore } from '@/stores/briefcaseStore';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppSubtitle from '@/components/Base/AppSubtitle.vue';
  import BriefcaseChart from '@/components/Content/TheBriefcase/BriefcaseChart.vue';
  import CryptoTable from '@/components/Content/CryptoMarketOverview/CryptoTable.vue';
  import BriefcaseManager from '@/components/Content/TheBriefcase/BriefcaseManager.vue';

  const briefcaseStore = useBriefcaseStore();
  const briefcase = computed(() => briefcaseStore.briefcase);

  const formattedBriefcase = computed(() =>
    briefcase.value.map((coin) => ({
      CoinInfo: {
        Name: coin.Name,
        ImageUrl: coin.ImageUrl,
        Id: coin.id,
      },
      DISPLAY: {
        USD: {
          PRICE: String(coin.DISPLAY.PRICE),
          MKTCAP: String(coin.DISPLAY.MKTCAP),
          TOTALVOLUME24H: String(coin.DISPLAY.TOTALVOLUME24H),
          CHANGEPCT24HOUR: parseFloat(coin.DISPLAY.CHANGEPCT24HOUR).toFixed(2),
        },
      },
    }))
  );
</script>

<template>
  <div class="briefcase">
    <div v-if="briefcase.length > 0" class="briefcase__header">
      <app-title >Your Portfolio</app-title>
      <briefcase-manager />
    </div>
    <app-subtitle v-else>No coins in your portfolio yet.</app-subtitle>
    <div v-if="briefcase.length > 0" class="briefcase__body">
      <briefcase-chart :briefcase="briefcase" />
      <crypto-table :topCoins="formattedBriefcase" showLink>
        <template #header>
          Cryptocurrencies in Your Portfolio
        </template>
      </crypto-table>
    </div>
  </div>
</template>

<style scoped>
  .briefcase__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  @media (max-width: 410px) {
    .briefcase__header {
      flex-wrap: wrap;
    }
  }
</style>
