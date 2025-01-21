<script setup lang="ts">
  import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
  import { webSocketService } from '@/api/webSocket/websocketService';
  import { getTopCoins } from '@/api/coins/topCoins';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';
  import { formatPrice, formatVolume } from '@/utils/numberFormatter';

  interface AppCoinDataProps {
    coinName: string; // Имя монеты
    dataType: 'price' | 'volume24h' | 'marketCap'; // Тип данных для отображения
  }
  const props = defineProps<AppCoinDataProps>();

  type PriceUpdate = {
    coinName: string;
    price: number;
    volume24h: number;
    marketCap: number;
  };

  // Реактивные данные
  const dataValue = ref<number | null>(null); // Текущее значение данных
  const previousValue = ref<number | null>(null); // Предыдущее значение данных
  const changeDirection = ref<'up' | 'down' | null>(null); // Направление изменения данных
  const isLoading = ref<boolean>(true); // Флаг загрузки данных

  // Тайм-аут для WebSocket
  const fallbackTimeout = ref<NodeJS.Timeout | null>(null); // Ссылка на таймер
  const fallbackTriggered = ref(false); // Флаг для резервного запроса

  // Callback для обработки обновлений WebSocket
  const handleDataUpdate = (update: PriceUpdate) => {
    if (update.coinName === props.coinName) {
      const newValue =
        props.dataType === 'price'
          ? update.price
          : props.dataType === 'volume24h'
            ? update.volume24h
            : update.marketCap;

      if (dataValue.value !== null) {
        changeDirection.value = newValue > dataValue.value ? 'up' : 'down';
      }
      previousValue.value = dataValue.value;
      dataValue.value = newValue;
      isLoading.value = false;

      // Очищаем тайм-аут, если данные поступают
      if (fallbackTimeout.value) {
        clearTimeout(fallbackTimeout.value);
        fallbackTimeout.value = null;
      }
    }
  };

  // Функция для загрузки данных через HTTP в случае отсутствия данных WebSocket
  const loadFallbackData = async () => {
    isLoading.value = true;
    fallbackTriggered.value = true;

    try {
      const response = await getTopCoins();
      const coinData = response.Data.find((coin) => coin.CoinInfo.Name === props.coinName);

      if (coinData && coinData.DISPLAY && coinData.DISPLAY.USD) {
        const fallbackValue =
          props.dataType === 'price'
            ? parseFloat(coinData.DISPLAY.USD.PRICE?.replace(/[^0-9.-]+/g, '') || '0')
            : props.dataType === 'volume24h'
              ? parseFloat(coinData.DISPLAY.USD.TOTALVOLUME24H?.replace(/[^0-9.-]+/g, '') || '0')
              : parseFloat(coinData.DISPLAY.USD.MKTCAP?.replace(/[^0-9.-]+/g, '') || '0');

        dataValue.value = fallbackValue;
      } else {
        console.warn('Fallback data is missing or incomplete for coin:', props.coinName);
      }
      isLoading.value = false;
    } catch (error) {
      console.error('Failed to load fallback data:', error);
      isLoading.value = false;
    }
  };


  // Подписка на обновления
  onMounted(() => {
    webSocketService.subscribe(props.coinName, handleDataUpdate);

    // Устанавливаем тайм-аут для WebSocket
    fallbackTimeout.value = setTimeout(() => {
      if (isLoading.value) {
        loadFallbackData();
      }
    }, 5000); // 5 секунд на получение данных через WebSocket
  });

  // Отписка при уничтожении компонента
  onUnmounted(() => {
    webSocketService.unsubscribe(props.coinName, handleDataUpdate);
    if (fallbackTimeout.value) {
      clearTimeout(fallbackTimeout.value);
    }
  });

  // Обновление подписки при изменении имени монеты
  watch(
    () => props.coinName,
    (newCoinName, oldCoinName) => {
      webSocketService.unsubscribe(oldCoinName, handleDataUpdate);
      webSocketService.subscribe(newCoinName, handleDataUpdate);

      // Сброс состояния
      dataValue.value = null;
      previousValue.value = null;
      changeDirection.value = null;
      isLoading.value = true;

      // Сброс таймера и флага
      if (fallbackTimeout.value) {
        clearTimeout(fallbackTimeout.value);
      }
      fallbackTriggered.value = false;

      // Устанавливаем новый тайм-аут
      fallbackTimeout.value = setTimeout(() => {
        if (isLoading.value) {
          loadFallbackData();
        }
      }, 5000);
    }
  );

  // Форматирование данных в зависимости от типа
  const formattedData = computed(() => {
    if (props.dataType === 'price') {
      return `${formatPrice(dataValue.value)}$`;
    } else if (props.dataType === 'volume24h' || props.dataType === 'marketCap') {
      return formatVolume(dataValue.value);
    }
    return null;
  });
</script>

<template>
  <div>
    <app-loading-spinner size="20px" v-if="isLoading">Loading data for {{ coinName }}...</app-loading-spinner>
    <div v-else>
      <span
        class="app-coint-data"
        :class="{
          'data-up': changeDirection === 'up',
          'data-down': changeDirection === 'down'
        }"
      >
        {{ formattedData }}
      </span>
    </div>
  </div>
</template>

<style scoped>
  .data-up {
    color: var(--color-green);
    font-weight: bold;
  }
  .data-down {
    color: var(--color-red);
    font-weight: bold;
  }
</style>

