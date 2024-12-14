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
      <div class="app-coint__name">
        <app-image-coin class="app-coint__image" :imageUrl="coin.CoinInfo.ImageUrl" />
        {{ coin.CoinInfo.Name }}:
      </div>
      <div class="app-coint__row">
        <div class="app-coint__price">
          <app-coin-price :coinName="coin.CoinInfo.Name" />
        </div>
        <div class="app-coint__change">{{ coin.DISPLAY?.USD?.CHANGEPCT24HOUR }}%</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .app-coint {
    display: flex;
    width: 100%;
  }
  .app-coint__group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
  }
  .app-coint__name {
    width: 75%;
  }
  .app-coint__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
  }
</style>

