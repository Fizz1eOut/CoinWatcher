<script setup lang="ts">
  import { ref, onMounted, computed, watch } from 'vue';
  import { getTopCoins } from '@/api/coins/topCoins';
  import { getHistoricalMarketCaps } from '@/api/coins/marketCaps';
  import type { TopCoin } from '@/interface/topCoins.interface';
  import type { MarketCapEntry } from '@/interface/marketCaps.interface';
  import MarketOverviewChart from '@/components/Content/MarketOverviewChart.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import { useBriefcaseStore } from '@/stores/briefcaseStore';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';

  // Определяем строгий тип для временных диапазонов
  type TimeRange = '1d' | '7d' | '1m';

  const briefcaseStore = useBriefcaseStore();
  const briefcase = computed(() => briefcaseStore.briefcase);
  const marketData = ref<TopCoin[]>([]);
  const historicalData = ref<MarketCapEntry[]>([]);
  const isLoading = ref<boolean>(true);
  const error = ref<string | null>(null);
  const selectedTimeRange = ref<TimeRange>('1m');

  // Возможные диапазоны
  const timeRanges: TimeRange[] = ['1d', '7d', '1m'];

  // Получение данных при загрузке компонента
  const fetchMarketOverview = async () => {
    if (briefcase.value.length === 0) return;

    try {
      const data = (await getTopCoins());
      marketData.value = data.Data.slice(0, 10);

      // Извлечение символов криптовалют
      // const symbols = marketData.value.map((coin) => coin.CoinInfo.Name);
      const symbols = briefcase.value.map((coin) => coin.Name);

      // Получение исторических данных по этим символам
      historicalData.value = await getHistoricalMarketCaps(symbols, selectedTimeRange.value);
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

  watch(
    selectedTimeRange,
    async (newRange) => {
      isLoading.value = true;
      try {
        const symbols = briefcase.value.map((coin) => coin.Name);
        historicalData.value = await getHistoricalMarketCaps(symbols, newRange); // Обновляем данные
      } catch (err) {
        error.value = 'Failed to load market data';
        console.error(err);
      } finally {
        isLoading.value = false;
      }
    }
  );
</script>

<template>
  <div>
    <app-loading-spinner 
      v-if="isLoading" 
      class="loader" 
      size="70px"
      borderWidth="7px"
      height="100vh" 
    />
    <div class="briefcase-chart" v-else>
      <app-title>
        Dynamics of portfolio market capitalization
      </app-title>
      <div class="briefcase-chart__buttons">
        <app-button
          v-for="range in timeRanges"
          :key="range"  
          :class="{ active: selectedTimeRange === range }"
          class="briefcase-chart__button"
          @click="updateTimeRange(range)"
        >
          {{ range === '1d' ? '1 Day' : range === '7d' ? '7 Days' : '1 Month' }}
        </app-button>
      </div>
      
      <market-overview-chart
        :historicalData="historicalData"
        :selectedTimeRange="selectedTimeRange"
        class="briefcase-chart__overview"
      />
    </div>
  </div>
</template>

<style scoped>
  .briefcase-chart {
    margin-top: 40px;
  }
  .briefcase-chart__buttons {
    margin: 30px auto 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 260px;
    width: 100%;
  }
  .briefcase-chart__button {
    font-size: 16px;
    font-weight: 400;
    font-family: "Source Code Pro", monospace;
    background: rgba(10, 12, 29, 0.8);
    border-radius: 25px;
    letter-spacing: -2px;
    padding: 6px 12px;
  }
  .active {
    background: var(--color-gradient);
  }
  .briefcase-chart__overview {
    max-height: 300px;
  }
</style>
