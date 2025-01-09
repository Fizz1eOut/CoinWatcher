<script setup lang="ts">
  import { ref, defineProps, watch } from 'vue';

  interface Props {
    modelValue: number; // для v-model
    min?: number; // минимальное значение
    max?: number; // максимальное значение
    step?: number; // шаг изменения
  }
  const props = defineProps<Props>();
  const emit = defineEmits(['update:modelValue']);

  // Текущее значение
  const currentValue = ref(props.modelValue);

  // Обновление значения через v-model
  watch(
    () => props.modelValue,
    (newVal) => {
      currentValue.value = newVal;
    }
  );

  // Увеличение значения
  const increment = () => {
    const nextValue = (currentValue.value ?? 0) + (props.step ?? 1);
    if (props.max === undefined || nextValue <= props.max) {
      emit('update:modelValue', nextValue);
    }
  };

  // Уменьшение значения
  const decrement = () => {
    const nextValue = (currentValue.value ?? 0) - (props.step ?? 1);
    if (props.min === undefined || nextValue >= props.min) {
      emit('update:modelValue', nextValue);
    }
  };

  // Изменение значения вручную
  const handleInput = (event: Event) => {
    const newValue = parseFloat((event.target as HTMLInputElement).value);
    if (!isNaN(newValue)) {
      emit('update:modelValue', newValue);
    }
  };
</script>

<template>
  <div class="number-input">
    <button 
      class="number-input__button number-input__button--decrement" 
      @click="decrement"
    >-</button>
    <input 
      class="number-input__input" 
 
      :value="currentValue" 
      @input="handleInput" 
      :min="props.min" 
      :max="props.max"
    />
    <button 
      class="number-input__button number-input__button--increment" 
      @click="increment"
    >+</button>
  </div>
</template>

<style scoped>
  .number-input {
    display: flex;
    align-items: center;
    border: 1px solid #3a3d52;
    border-radius: 8px;
    overflow: hidden;
    width: 100%;
    background-color: var(--color-deep-blue);
    height: 32px;
  }
  .number-input__button {
    background-color: transparent;
    color: var(--color-white);
    border: none;
    width: 32px;
    height: 32px;
    font-size: 18px;
    font-weight: 400;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .number-input__button:hover {
    background-color: var(--color-gray);
  }
  .number-input__input {
    width: 100%;
    text-align: center;
    border: none;
    outline: none;
    font-size: 16px;
    font-weight: bold;
    color: var(--color-white);
    background-color: var(--color-dark);
  }
  .number-input__button--increment {
    border-left: 1px solid #3a3d52;
  }
  .number-input__button--decrement {
    border-right: 1px solid #3a3d52;
  }
</style>
