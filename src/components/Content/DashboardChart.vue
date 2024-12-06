<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { getMarketOverview } from '@/api/coins/marketOverview';
  import { getHistoricalMarketCaps } from '@/api/coins/marketCaps'; // Импорт вашей функции
  import type { TopCoinsResponse, TopCoin } from '@/interface/topCoins.interface';
  import type { MarketCapEntry } from '@/interface/marketCaps.interface';
  import MarketOverviewChart from '@/components/Content/MarketOverviewChart.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';

  // Определяем строгий тип для временных диапазонов
  type TimeRange = '1d' | '7d' | '1m';

  const marketData = ref<TopCoin[]>([]);
  const historicalData = ref<MarketCapEntry[]>([]);
  const isLoading = ref<boolean>(true);
  const error = ref<string | null>(null);
  const selectedTimeRange = ref<TimeRange>('1m'); // Активный интервал по умолчанию

  // Возможные диапазоны
  const timeRanges: TimeRange[] = ['1d', '7d', '1m'];

  // Получение данных при загрузке компонента
  const fetchMarketOverview = async () => {
    try {
      const data = (await getMarketOverview()) as TopCoinsResponse;
      marketData.value = data.Data;

      // Извлечение символов криптовалют
      const symbols = marketData.value.map((coin) => coin.CoinInfo.Name);

      // Получение исторических данных по этим символам
      historicalData.value = await getHistoricalMarketCaps(symbols);
    } catch (err) {
      error.value = 'Failed to load market data';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  // Обновление данных при переключении диапазона
  const updateTimeRange = (range: TimeRange) => {
    selectedTimeRange.value = range;
  };

  onMounted(fetchMarketOverview);
</script>

<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div class="dashboard-chart" v-else>
      <app-title>
        Market Capitalization Dynamics
      </app-title>
      <div class="dashboard-char__buttons">
        <app-button
          v-for="range in timeRanges"
          :key="range"
          :class="{ active: selectedTimeRange === range }"
          class="dashboard-char__button"
          @click="updateTimeRange(range)"
        >
          {{ range === '1d' ? '1 Day' : range === '7d' ? '7 Days' : '1 Month' }}
        </app-button>
      </div>
      
      <market-overview-chart
        :historicalData="historicalData"
        :selectedTimeRange="selectedTimeRange"
      />
      <p class="dashboard-char__text">
        This chart shows the dynamics of the market capitalization of assets over a selected time range (1 day, 7 days, or 1 month). Each line represents a single asset, and the dots on it show the value of the market capitalization or price of the asset at a certain point in time. Bitcoin (BTC) and other major assets are presented for comparison, which allows you to assess their relative change and popularity among investors.
      </p>
    </div>
  </div>
</template>

<style scoped>
  .dashboard-chart {
    margin-top: 30px;
  }
  .dashboard-char__buttons {
    margin: 20px auto 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 260px;
    width: 100%;
  }
  .dashboard-char__button {
    font-size: 16px;
    font-weight: 400;
    font-family: "Source Code Pro", monospace;
    background: rgba(10, 12, 29, 0.8);
    border-radius: 10px;
    letter-spacing: -2px;
    padding: 6px 12px;
  }
  .active {
    background: var(--color-gradient);
  }
  .dashboard-char__text {
    margin-top: -15px;
    font-size: 14px;
    font-weight: 400;
    color: var(--color-gray);
    letter-spacing: -0.02em;
  }
  @media (max-width: 499px) {
    .dashboard-chart {
      margin-top: 20px;
    }
  } 
</style>
