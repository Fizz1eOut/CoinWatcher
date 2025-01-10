<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
  import { webSocketService } from '@/api/webSocket/websocketService';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';
  import { formatPrice } from '@/utils/numberFormatter';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppUnderlay from '@/components/Base/AppUnderlay.vue';
  import AppNumberInput from '@/components/Inputs/AppNumberInput.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';

  interface Props {
    coinName: string;
  }
  const props = defineProps<Props>();

  const cryptoAmount = ref<number>(0);
  const coinPrice = ref<number | null>(null);
  const totalPrice = ref<number>(0);
  const previousPrice = ref<number | null>(null);
  const changeDirection = ref<'up' | 'down' | null>(null);
  const isLoading = ref<boolean>(true);

  const isAmountMode = ref<boolean>(true);

  // Вычисляемое свойство для привязки к v-model
  const inputValue = computed({
    get: () => (isAmountMode.value ? cryptoAmount.value : totalPrice.value),
    set: (newValue: number) => {
      if (isAmountMode.value) {
        cryptoAmount.value = newValue; // Устанавливаем количество
      } else {
        totalPrice.value = newValue; // Устанавливаем итоговую цену
      }
    },
  });

  // Итоговая стоимость для режима "ввод количества"
  const totalCost = computed(() => {
    return cryptoAmount.value * (coinPrice.value ?? 0);
  });

  // Вычисляем количество на основе введённой цены (для режима "ввод цены")
  const calculatedAmount = computed(() => {
    if (!coinPrice.value) return 0; // Если цена не задана, вернуть 0
    return totalPrice.value / coinPrice.value; // Корректный пересчёт
  });

  const toggleInputMode = () => {
    isAmountMode.value = !isAmountMode.value;
    // Сбрасываем значение, чтобы не было остаточного состояния
    if (isAmountMode.value) {
      totalPrice.value = 0; // Сбрасываем цену
      cryptoAmount.value = calculatedAmount.value; // Пересчёт количества
    } else {
      cryptoAmount.value = 0; // Сбрасываем количество
      totalPrice.value = totalCost.value; // Пересчёт цены
    }
  };

  // Callback для обработки обновлений WebSocket
  const handlePriceUpdate = (update: { coinName: string; price: number }) => {
    if (update.coinName === props.coinName) {
      if (coinPrice.value !== null) {
        changeDirection.value = update.price > coinPrice.value ? 'up' : 'down';
      }
      previousPrice.value = coinPrice.value;
      coinPrice.value = update.price;
      isLoading.value = false;

      // Пересчёт значений в зависимости от текущего режима
      if (!isAmountMode.value) {
        // Если активен режим "ввод цены", пересчитываем количество
        cryptoAmount.value = calculatedAmount.value;
      }
    }
  };
  // Подписка на WebSocket
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
      coinPrice.value = null;
      previousPrice.value = null;
      changeDirection.value = null;
      isLoading.value = true;
    }
  );
</script>

<template>
  <div class="calculator">
    <app-underlay>
      <app-container>
        <div class="calculator__title">{{ isAmountMode ? 'Enter quantity' : 'Enter price in $' }}</div>
        <div class="calculator__input">
          <app-number-input
            v-model="inputValue"
            :min="0"
            :step="1"
          />
          <app-button @click="toggleInputMode" class="calculator__button">
            <app-icon 
              name="exchange"
              size="100%"
              style="color: var(--color-white)"
            />
          </app-button>
        </div>

        <div class="calculator__result">
          <app-loading-spinner size="20px" v-if="isLoading" />
          <div v-else>
            <div
              v-if="isAmountMode"
              :class="{
                'price-up': changeDirection === 'up',
                'price-neutral': (isAmountMode ? totalCost : calculatedAmount) === 0,
                'price-down': changeDirection === 'down'
              }"
            >
              <span>
                Total Cost: ${{ formatPrice(totalCost) }}
              </span>
            </div>
            <span 
              v-else
              :class="{
                'price-up': changeDirection === 'up',
                'price-down': changeDirection === 'down',
                'price-neutral': changeDirection === null
              }"
            >
              Amount: {{ calculatedAmount.toFixed(8) }}
            </span>
          </div>
        </div>
      </app-container>
    </app-underlay>
  </div>
</template>

<style scoped>
  .price-up,
  .price-down,
  .price-neutral {
    transition: color 0.3s ease-in-out;
  }
  .price-up {
    color: var(--color-green);
    font-weight: 500;
  }
  .price-down {
    color: var(--color-red);
    font-weight: 500;
  }
  .price-neutral {
    color: var(--color-white);
  }
  .calculator__title {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 6px;
    text-align: start;
  }
  .calculator__input {
    margin-bottom: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .calculator__button {
    max-width: 30px;
    width: 100%;
    height: 28px; 
  }
  .calculator__result {
    font-size: 16px;
    font-weight: 400;
    margin-top: 10px;
    max-width: 220px;
    width: 100%;
  }
</style>
