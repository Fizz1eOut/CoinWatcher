<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import type { CoinDetail } from '@/interface/coinSearch.interface';
  import { getHistoricalMarketCaps } from '@/api/coins/marketCaps';
  import type { MarketCapEntry } from '@/interface/marketCaps.interface';
  import MarketOverviewChart from '@/components/Content/MarketOverviewChart.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';

  interface CoinDetailProps {
    coin: CoinDetail | null;
  }

  const props = defineProps<CoinDetailProps>();

  // Определяем строгий тип для временных диапазонов
  type TimeRange = '1d' | '7d' | '1m';
  const historicalData = ref<MarketCapEntry[]>([]);
  const isLoading = ref<boolean>(true);
  const error = ref<string | null>(null);
  const selectedTimeRange = ref<TimeRange>('1m');

  // Возможные диапазоны
  const timeRanges: TimeRange[] = ['1d', '7d', '1m'];

  // Получение данных при загрузке компонента
  const fetchMarketOverview = async () => {
    try {
      if (props.coin?.Name) {
        // Оборачиваем в массив, так как getHistoricalMarketCaps ожидает string[]
        historicalData.value = await getHistoricalMarketCaps([props.coin.Name]);
      } else {
        throw new Error('Coin name is not available');
      }
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
    <app-loading-spinner 
      v-if="isLoading" 
      class="loader" 
      size="30px"
      borderWidth="5px"
      height="200px" 
    />
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
        :showMarkers="true"
      />
    </div>
  </div>
</template>

<style scoped>
  .dashboard-chart {
    margin-top: 40px;
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
</style>
