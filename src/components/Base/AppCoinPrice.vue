<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { webSocketService } from '@/api/webSocket/websocketService';

interface AppCoinPriceProps {
  coinName: string; // Имя монеты
}

const props = defineProps<AppCoinPriceProps>();

// Реактивные данные
const price = ref<number | null>(null); // Текущая цена
const previousPrice = ref<number | null>(null); // Предыдущая цена
const priceChange = ref<'up' | 'down' | null>(null); // Направление изменения цены
const isLoading = ref<boolean>(true); // Флаг загрузки данных

// Callback для обработки обновлений цены
const handlePriceUpdate = (update: { coinName: string; price: number }) => {
  if (update.coinName === props.coinName) {
    if (price.value !== null) {
      priceChange.value = update.price > price.value ? 'up' : 'down';
    }
    previousPrice.value = price.value;
    price.value = update.price;
    isLoading.value = false;
  }
};

// Подписка на обновления
onMounted(() => {
  webSocketService.subscribe(props.coinName, handlePriceUpdate);
});

// Отписка при уничтожении компонента
onUnmounted(() => {
  webSocketService.unsubscribe(props.coinName, handlePriceUpdate);
});

// Обновление подписки при изменении имени монеты
watch(
  () => props.coinName,
  (newCoinName, oldCoinName) => {
    webSocketService.unsubscribe(oldCoinName, handlePriceUpdate);
    webSocketService.subscribe(newCoinName, handlePriceUpdate);
    // Сброс состояния
    price.value = null;
    previousPrice.value = null;
    priceChange.value = null;
    isLoading.value = true;
  }
);

// Функция для форматирования цены
const formatPrice = (value: number | null): string => {
  if (value === null) {
    return "N/A";
  }
  if (value >= 0.01) {
    return value.toFixed(2);
  } else if (value > 0) {
    return value.toFixed(8);
  }
  return "0.00";
};
</script>

<template>
  <div>
    <div v-if="isLoading">Loading data for {{ coinName }}...</div>
    <div v-else>
      <span
        class="app-coint-price"
        :class="{
          'price-up': priceChange === 'up',
          'price-down': priceChange === 'down'
        }"
      >
        {{ formatPrice(price) }}$
      </span>
    </div>
  </div>
</template>

<style scoped>
.price-up {
  color: var(--color-green);
  font-weight: bold;
}
.price-down {
  color: var(--color-red);
  font-weight: bold;
}
</style>
