<script setup lang="ts">
  import { computed } from 'vue';

  // Определение props
  interface SearchInputProps {
    modelValue: string;
    placeholder?: string;
  }
  const props = defineProps<SearchInputProps>();

  // Определение emit событий
  const emit = defineEmits(['update:modelValue']);

  // Используем computed для работы с двусторонним связыванием (v-model)
  const inputValue = computed({
    get: () => props.modelValue,
    set: (newValue: string | number) => emit('update:modelValue', newValue),
  });

  // Метод для обработки события input
  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
  };
</script>

<template>
  <div class="input-wrapper">
    <div class="icon-wrapper">
      <slot name="icon"></slot>
    </div>
    <input 
      v-model="inputValue"
      type="text" 
      class="input" 
      :placeholder="placeholder"
      @input="handleInput"
    >
    <label for="#" class="label" />
  </div>
</template>

<style scoped>
  .input-wrapper {
    position: relative;
  }
  .icon-wrapper {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
  }
  .input {
    width: 100%;
    padding: 10px 30px;
    background-color: transparent;
    color: var(--color-white);
    outline: none;
    border: 1px solid #3a3d52;
    border-radius: 25px;
  }
  ::-webkit-input-placeholder {
   color: var(--color-gray);
  }
  :-moz-placeholder { 
    color: var(--color-gray);
  }
  ::-moz-placeholder { 
    color: var(--color-gray);
  }
  :-ms-input-placeholder {
    color: var(--color-gray);
  }
  @media (max-width: 360px) {
    .input {
      padding: 8px 12px;
    }
    .icon-input {
      display: none;
    }
  } 
</style>
