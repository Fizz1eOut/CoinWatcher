<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import type { TopCoin } from '@/interface/topCoins.interface';
  import type { MarketCapEntry } from '@/interface/marketCaps.interface';
  import TopCoinsList from '@/components/Content/TopCoinsList.vue';
  import HistoricalChart from '@/components/Content/HistoricalChart.vue';

  // Интерфейс для пропсов
  interface CryptoDashboardProps {
    topCoins: TopCoin[];
    historicalData: MarketCapEntry[];
  }
  // Описание пропсов через дженерик
  const props = defineProps<CryptoDashboardProps>();

  // Активная криптовалюта
  const selectedCoin = ref<string>('');

  // Следим за изменением пропса `topCoins` и устанавливаем активную криптовалюту
  watch(
    () => props.topCoins, // Реактивное значение пропса `topCoins`
    (newTopCoins) => {
      if (newTopCoins.length > 0) {
        selectedCoin.value = newTopCoins[0].CoinInfo.Name; // Устанавливаем первую криптовалюту
      }
    },
    { immediate: true } // Выполняется сразу при монтировании компонента
  );

  // Получаем исторические данные для выбранной криптовалюты
  const selectedCoinData = computed(() => {
    return (
      props.historicalData.find(
        (entry: MarketCapEntry) => entry.symbol === selectedCoin.value
      )?.history || [] 
      
    );
  });

  // Обработчик выбора криптовалюты
  const handleSelectCoin = (coinName: string) => {
    selectedCoin.value = coinName;
    console.log(selectedCoin.value)
  };
</script>

<template>
  <div class="dashboard">
    <TopCoinsList
      :coins="props.topCoins"
      :selectedCoin="selectedCoin"
      @selectCoin="handleSelectCoin"
      class="top-coins"
    />
    <HistoricalChart
      :coinName="selectedCoin"
      :history="selectedCoinData"
      class="historical-chart"
    />
  </div>
</template>

<style scoped>
  .dashboard {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .top-coins {
    flex: 0 1 50%;
  }
  .historical-chart {
    flex: 0 1 50%;
  }
</style>

