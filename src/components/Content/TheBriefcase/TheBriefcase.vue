<script setup lang="ts">
  import { computed } from 'vue';
  import { useBriefcaseStore } from '@/stores/briefcaseStore';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppSubtitle from '@/components/Base/AppSubtitle.vue';
  import BriefcaseChart from '@/components/Content/TheBriefcase/BriefcaseChart.vue';
  import CryptoTable from '@/components/Content/CryptoTable.vue';
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
          MKTCAP: coin.DISPLAY.MKTCAP,
          TOTALVOLUME24H: coin.DISPLAY.TOTALVOLUME24H,
          CHANGEPCT24HOUR: parseFloat(coin.DISPLAY.CHANGEPCT24HOUR).toFixed(2),
        },
      },
    }))
  );
  // const removeFromBriefcase = (id: string) => {
  //   briefcaseStore.removeCoin(id);
  // };
  // <button @click="removeFromBriefcase(coin.id)">Remove</button>
</script>

<template>
  <div class="briefcase">
    <app-title v-if="briefcase.length > 0" >Your Portfolio</app-title>
    <app-subtitle v-else>No coins in your portfolio yet.</app-subtitle>
    <div v-if="briefcase.length > 0" class="briefcase__body">
      <briefcase-manager />
      <briefcase-chart :briefcase="briefcase" />
      <crypto-table :topCoins="formattedBriefcase">
        <template #header>
          Cryptocurrencies in Your Portfolio
        </template>
      </crypto-table>
    </div>
  </div>
</template>

<style scoped>
</style>
