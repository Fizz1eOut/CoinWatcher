<script setup lang="ts">
  import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
  import { webSocketService } from '@/api/webSocket/websocketService';
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

  // Callback для обработки обновлений WebSocket
  const handleDataUpdate = (update: PriceUpdate) => {
    if (update.coinName === props.coinName) {
      // Добавляем строгую проверку для свойства
      const newValue = props.dataType === 'price'
        ? update.price
        : props.dataType === 'volume24h'
          ? update.volume24h
          : update.marketCap;

      if (dataValue.value !== null) {
        changeDirection.value = newValue > dataValue.value ? 'up' : 'down'; // Определяем направление изменения
      }
      previousValue.value = dataValue.value;
      dataValue.value = newValue;
      isLoading.value = false;
    }
  };

  // Подписка на обновления
  onMounted(() => {
    webSocketService.subscribe(props.coinName, handleDataUpdate);
  });

  // Отписка при уничтожении компонента
  onUnmounted(() => {
    webSocketService.unsubscribe(props.coinName, handleDataUpdate);
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

