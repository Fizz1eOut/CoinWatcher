<script setup lang="ts">
import { defineProps } from 'vue';
import AppImageCoin from '@/components/Base/AppImageCoin.vue';
import AppCoinPrice from '@/components/Base/AppCoinPrice.vue';
import type { TopCoin } from '@/interface/topCoins.interface';

defineProps<{ coin: TopCoin }>();

</script>

<template>
  <div class="app-coint">
    <div class="app-coint__group">
      <div class="app-coint__name">{{ coin.CoinInfo.Name }}</div>:
      <app-coin-price :coinName="coin.CoinInfo.Name" />
    </div>
    <app-image-coin :imageUrl="coin.CoinInfo.ImageUrl" />
    <p>24h Change: {{ coin.DISPLAY?.USD?.CHANGEPCT24HOUR }}%</p>
    <p><strong>Market Cap:</strong> {{ coin.DISPLAY?.USD?.MKTCAP }}</p>
    <p><strong>24h Volume:</strong> ${{ coin.DISPLAY?.USD?.TOTALVOLUME24H }}</p>
  </div>
</template>

<style scoped>
.app-coint {
  display: flex;
}
</style>

