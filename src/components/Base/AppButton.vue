<script setup lang="ts">
  import { computed } from 'vue';

  // Определение пропсов с типизацией
  const props = defineProps<{
    gradient?: boolean;
    ordinary?: boolean;
    disabled?: boolean;
  }>();

  // Значения по умолчанию
  const gradient = props.gradient ?? false;
  const ordinary = props.ordinary ?? false;
  const disabled = props.disabled ?? false;

  // Вычисляемый класс
  const classes = computed(() => ({
    'button-gradient': gradient,
    'button-ordinary': ordinary,
    'button-disabled': disabled,
  }));
</script>

<template>
  <button 
    type="button"
    class="button"
    :class="classes"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
  .button {
    padding: 16px 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
    font-family: "Source Code Pro", monospace;
    color: var(--color-white);
    border: 1px solid var(--color-blue);
    background-color: transparent;
    border-radius: 10px;
    transition: background-color 0.3s ease-in-out;
    cursor: pointer;
  }
  .button:hover {
    background-color: var(--color-blue);
  }
  .button-gradient {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background: var(--color-gradient);
    cursor: pointer;
    transition: background 0.3s ease-in-out;
  }
  .button-gradient:hover {
    background: var(--color-gradient-hover);
  }
  .button-ordinary {
    width: 100%;
    height: 100%;
    color: var(--color-white);
    background-color: transparent;
    cursor: pointer;
    border-radius: 0;
    border: none;
    padding: 0;
  }
  .button-ordinary:hover {
    background-color: transparent
  }
  .button-disabled {
    background-color: var(--color-grey);
    opacity: 0.3;
    transition: background-color 0.3s ease-in-out, opacity 0.3s ease-in-out;
    cursor: not-allowed;
  }
  .button-disabled:hover {
    opacity: 0.4;
    background-color: var(--color-grey);
  }
</style>
