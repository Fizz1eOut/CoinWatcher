<script setup lang="ts">
  import type { CoinDetail } from '@/interface/coinSearch.interface';
  import AppImageCoin from '@/components/Base/AppImageCoin.vue';
  import AppSubtitle from '@/components/Base/AppSubtitle.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppButton from '@/components/Base/AppButton.vue';

  interface trendingCoins {
    coin: CoinDetail | null;
  }
  defineProps<trendingCoins>();
</script>

<template>
  <div v-if="coin" class="coin-sidebar">
    <app-underlay>
      <app-container>
        <div class="coin-sidebar__content">
          <app-image-coin :imageUrl="coin.ImageUrl" class="coin-sidebar__img" />
          <app-subtitle>{{ coin.Name }}</app-subtitle>
          <div class="coin-sidebar__buttons">
            <app-button gradient>Add to Portfolio</app-button>
          </div>
        </div>
      </app-container>
    </app-underlay>
  </div>
</template>

<style scoped>
  .coin-sidebar {
    text-align: center;
  }
  .coin-sidebar__img {
    width: 200px;
    height: 200px;
  }
  .coin-sidebar__buttons {
    margin-top: 20px;
  }
</style>
