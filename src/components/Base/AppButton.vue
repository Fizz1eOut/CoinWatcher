<script setup lang="ts">
  import { computed } from 'vue';

  // Определение пропсов без лишних дефолтных значений
  const props = defineProps<{
    gradient?: boolean;
    outline?: boolean;
    disabled?: boolean;
  }>();

  // Вычисляемый объект классов
  const classes = computed(() => ({
    'button-gradient': props.gradient,
    'button-outline': props.outline,
    'button-disabled': props.disabled,
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
    width: 100%;
    height: 100%;
    color: var(--color-white);
    background-color: transparent;
    cursor: pointer;
    border-radius: 0;
    border: none;
    padding: 0;
  }
  .button:hover {
    background-color: transparent
  }
  .button-outline {
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
  .button-outline:hover {
    background-color: var(--color-blue);
  }
  .button-gradient {
    padding: 6px;
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
