<script setup lang="ts">
  import { ref, onMounted, onUnmounted, watch } from 'vue';
  import { webSocketService } from '@/api/webSocket/websocketService';

  // Интерфейс для входных параметров (пропсов)
  interface AppCointProps {
    coinName: string; // Название криптовалюты
  }

  const props = defineProps<AppCointProps>(); // Описание пропсов

  // Реактивные данные
  const price = ref<number | null>(null); // Текущая цена
  const previousPrice = ref<number | null>(null); // Предыдущая цена
  const isLoading = ref<boolean>(true); // Флаг загрузки данных
  const priceChange = ref<'up' | 'down' | null>(null); // Направление изменения цены

  // Callback для обработки обновлений цены через WebSocket
  const handlePriceUpdate = (update: { coinName: string; price: number }) => {
    if (update.coinName === props.coinName) {
      // Сравниваем с предыдущей ценой, если она существует
      if (price.value !== null) {
        priceChange.value = update.price > price.value ? 'up' : 'down'; // Устанавливаем направление изменения
      }
      previousPrice.value = price.value; // Обновляем предыдущую цену
      price.value = update.price; // Устанавливаем новую цену
      isLoading.value = false; // Снимаем флаг загрузки
    }
  };

  // Подписка на обновления через WebSocket
  onMounted(() => {
    webSocketService.subscribe(props.coinName, handlePriceUpdate);
  });

  // Отписка от обновлений при уничтожении компонента
  onUnmounted(() => {
    webSocketService.unsubscribe(props.coinName, handlePriceUpdate);
  });

  // Следим за изменением `coinName` и обновляем подписку
  watch(
    () => props.coinName, // Наблюдаем за изменением имени монеты
    (newCoinName, oldCoinName) => {
      webSocketService.unsubscribe(oldCoinName, handlePriceUpdate); // Удаляем старую подписку
      webSocketService.subscribe(newCoinName, handlePriceUpdate); // Добавляем новую подписку
      // Сбрасываем данные для новой монеты
      price.value = null;
      previousPrice.value = null;
      priceChange.value = null;
    }
  );

  // Функция для форматирования цены
  const formatPrice = (value: number | null): string => {
    if (value === null) {
      return "N/A"; // Если данные отсутствуют
    }

    if (value >= 0.01) {
      return value.toFixed(2); // Если цена больше 0.01, округляем до двух знаков
    } else if (value > 0) {
      return value.toFixed(8); // Для маленьких цен округляем до 8 знаков
    }

    return "0.00"; // Возвращаем 0.00, если цена равна 0
  };
</script>

<template>
  <div class="app-coint">
    <div v-if="isLoading">Загрузка данных для {{ coinName }}...</div>
    <div v-else>
      <p>
        <strong>{{ coinName }}</strong>: 
        <span 
          :class="{
            'price-up': priceChange === 'up',
            'price-down': priceChange === 'down'
          }"
        >
          ${{ formatPrice(price) }}
        </span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.app-coint {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  margin-bottom: 1rem;
}

.price-up {
  color: var(--color-green);
  font-weight: bold;
}

.price-down {
  color: var(--color-red);
  font-weight: bold;
}
</style>

