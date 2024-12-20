<script setup lang="ts">
  import { computed } from 'vue';

  // Определение props
  const props = defineProps<{
    placeholder: string;
    modelValue: string | number;
  }>();

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
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
  }
  .input {
    width: 100%;
    padding: 10px 20px;
    background-color: transparent;
    color: var(--color-white);
    outline: none;
    border: 2px solid transparent;
    border-image: var(--color-gradient);
    border-image-slice: 1;
  }
  ::-webkit-input-placeholder {
   color: #9EA6B1;
  }
  :-moz-placeholder { 
    color: #9EA6B1;
  }
  ::-moz-placeholder { 
    color: #9EA6B1;
  }
  :-ms-input-placeholder {
    color: #9EA6B1;
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
