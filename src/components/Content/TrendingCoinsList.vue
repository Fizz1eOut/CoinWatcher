<script setup lang="ts">
  import type { TopCoin } from '@/interface/topCoins.interface';
  import AppCoint from '@/components/Base/AppCoint.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppSubtitle from '@/components/Base/AppSubtitle.vue';
  import AppLink from '@/components/Base/AppLink.vue';

  // Интерфейс для пропсов
  interface trendingCoins {
    topGainers: TopCoin[];
    topLosers: TopCoin[];
  }

  // Описание пропсов через дженерик
  defineProps<trendingCoins>();
</script>

<template>
  <div v-if="topGainers?.length > 0 || topLosers?.length > 0" class="trending-coint">
    <div class="trending-coint__header">
      <app-title>
        Trending cryptocurrencies
      </app-title>
      <router-link to="/сoins">
        <app-link>View all</app-link>
      </router-link>
    </div>
    <div class="trending-coint__body">
      <div class="trending__group">
        <app-subtitle>
          Top Gainers (24 Hours)
        </app-subtitle>
        <ul class="trending-coint__list">
          <li
            v-for="coin in topGainers"
            :key="coin.CoinInfo.Name"
            class="trending-coint__item"
          >
            <app-coint :coin="coin" />
          </li>
        </ul>
      </div>

      <div class="trending__group">
        <app-subtitle>
          Top Losers (24 Hours)
        </app-subtitle>
        <ul class="trending-coint__list">
          <li
            v-for="coin in topLosers"
            :key="coin.CoinInfo.Name"
            class="trending-coint__item"
          >
            <app-coint class="coint" :coin="coin" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .trending-coint__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    max-width: 1170px;
  }
  .trending-coint__header .link {
    min-width: 76px;
  }
  .trending-coint__body {
    margin-top: 20px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
  }
  .trending__group {
    flex: 0 1 50%;
  }
  .trending-coint__list> *:not(:last-child) {
    margin-bottom: 16px;
  }
  .trending-coint__list {
    margin-top: 20px;
  }
  .trending-coint__item {
    max-width: 500px;
  }
  @media (max-width: 768px) {
    .trending-coint__item {
      font-size: 15px;
    }
  }
  @media (max-width: 600px) {
    .trending-coint__body {
      flex-direction: column;
      align-items: center;
    }
    .trending__group {
      flex: none;
      width: 100%;
    }
    .trending-coint__item {
      max-width: 100%;
    }
  }
</style>
