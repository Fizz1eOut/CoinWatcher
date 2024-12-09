<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { webSocketService } from '@/api/webSocket/websocketService';

interface AppCoinVolumeProps {
  coinName: string; // Имя монеты
}

const props = defineProps<AppCoinVolumeProps>();

// Реактивные данные
const volume24h = ref<number | null>(null); // Текущий объем торгов
const previousVolume = ref<number | null>(null); // Предыдущий объем торгов
const volumeChange = ref<'up' | 'down' | null>(null); // Направление изменения объема
const isLoading = ref<boolean>(true); // Флаг загрузки данных

// Callback для обработки обновлений объема торгов
const handleVolumeUpdate = (update: { coinName: string; volume24h: number }) => {
  if (update.coinName === props.coinName) {
    if (volume24h.value !== null) {
      volumeChange.value = update.volume24h > volume24h.value ? 'up' : 'down';
    }
    previousVolume.value = volume24h.value;
    volume24h.value = update.volume24h;
    isLoading.value = false;
  }
};

// Подписка на обновления
onMounted(() => {
  webSocketService.subscribe(props.coinName, handleVolumeUpdate);
});

// Отписка при уничтожении компонента
onUnmounted(() => {
  webSocketService.unsubscribe(props.coinName, handleVolumeUpdate);
});

// Обновление подписки при изменении имени монеты
watch(
  () => props.coinName,
  (newCoinName, oldCoinName) => {
    webSocketService.unsubscribe(oldCoinName, handleVolumeUpdate);
    webSocketService.subscribe(newCoinName, handleVolumeUpdate);
    // Сброс состояния
    volume24h.value = null;
    previousVolume.value = null;
    volumeChange.value = null;
    isLoading.value = true;
  }
);

// функция для сокращения чисел
const formatCompactNumber = (value: number): string => {
  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(2) + 'B'; // Миллиарды
  } else if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(2) + 'M'; // Миллионы
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(2) + 'K'; // Тысячи
  }
  return value.toFixed(2); // Обычное число
};

// Функция для форматирования объема
const formatVolume = (value: number | null): string => {
  if (value === null) {
    return 'N/A';
  }
  return formatCompactNumber(value); // Используем сокращенное форматирование
};
</script>

<template>
  <div>
    <div v-if="isLoading">Loading volume data for {{ coinName }}...</div>
    <div v-else>
      <span
        class="app-coint-volume"
        :class="{
          'volume-up': volumeChange === 'up',
          'volume-down': volumeChange === 'down'
        }"
      >
        {{ formatVolume(volume24h) }}$
      </span>
    </div>
  </div>
</template>

<style scoped>
.volume-up {
  color: var(--color-green);
  font-weight: bold;
}
.volume-down {
  color: var(--color-red);
  font-weight: bold;
}
</style>
