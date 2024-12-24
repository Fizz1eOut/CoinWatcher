<script setup lang="ts">
  import { ref, onMounted, onUnmounted, watch } from 'vue';
  import { webSocketService } from '@/api/webSocket/websocketService';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';
  import { formatVolume } from '@/utils/numberFormatter';

  interface AppCoinmarketCapProps {
    coinName: string; // Имя монеты
  }

  const props = defineProps<AppCoinmarketCapProps>();

  // Реактивные данные
  const marketCap = ref<number | null>(null); // Текущий объем торгов
  const previousMarketCap = ref<number | null>(null); // Предыдущий объем торгов
  const volumeChange = ref<'up' | 'down' | null>(null); // Направление изменения объема
  const isLoading = ref<boolean>(true); // Флаг загрузки данных

  // Callback для обработки обновлений объема торгов
  const handleVolumeUpdate = (update: { coinName: string; marketCap: number }) => {
    if (update.coinName === props.coinName) {
      if (marketCap.value !== null) {
        volumeChange.value = update.marketCap > marketCap.value ? 'up' : 'down';
      }
      previousMarketCap.value = marketCap.value;
      marketCap.value = update.marketCap;
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
      marketCap.value = null;
      previousMarketCap.value = null;
      volumeChange.value = null;
      isLoading.value = true;
    }
  );
</script>

<template>
  <div>
    <app-loading-spinner size="20px" v-if="isLoading">Loading data for {{ coinName }}...</app-loading-spinner>
    <div v-else>
      <span
        class="app-coint-volume"
        :class="{
          'volume-up': volumeChange === 'up',
          'volume-down': volumeChange === 'down'
        }"
      >
        {{ formatVolume(marketCap) }}
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
