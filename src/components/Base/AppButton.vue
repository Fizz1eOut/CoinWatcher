<script setup lang="ts">
  import { computed } from 'vue';

  // Определение пропсов без лишних дефолтных значений
  const props = defineProps<{
    gradient?: boolean;
    outline?: boolean;
    disabled?: boolean;
    remove?: boolean;
  }>();

  // Вычисляемый объект классов
  const classes = computed(() => ({
    'button-gradient': props.gradient,
    'button-outline': props.outline,
    'button-disabled': props.disabled,
    'button-remove': props.remove,
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
    font-family: "Montserrat", sans-serif;
  }
  .button:hover {
    background-color: transparent
  }
  .button-outline {
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 400;
    color: var(--color-white);
    background-color: transparent;
    border: 2px solid transparent;
    transition: border-color 0.3s ease-in-out;
    cursor: pointer;
    position: relative;
  }
  .button-outline::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 25px;
    padding: 2px;
    background: var(--color-gradient);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: -1;
  }
  .button-outline:hover::before {
    background: var(--color-gradient-hover);
  }
  .button-gradient {
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
    background: var(--color-gradient);
    cursor: pointer;
    transition: background 0.3s ease-in-out;
  }
  .button-gradient:hover {
    background: var(--color-gradient-hover);
  }
  .button-remove {
    padding: 8px 16px;
    background: linear-gradient(to right, #ff4d4f, #ff7875);
    color: var(--color-white);
    font-size: 12px;
    font-weight: 400;
    border-radius: 20px;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
  }
  .button-remove:hover {
    transform: scale(1.05);
  }

  .button-disabled {
    background: var(--color-gray);
    border-radius: 25px;
    opacity: 0.3;
    transition: background-color 0.3s ease-in-out, opacity 0.3s ease-in-out;
    cursor: not-allowed;
  }
  .button-disabled:hover {
    opacity: 0.4;
    background: var(--color-gray);
  }
  .button-outline.button-disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .button-outline.button-disabled::before {
    display: none;
  }
  @media (max-width: 499px) {
    .button-outline,
    .button-gradient {
      height: 36px;
      font-size: 14px;
    }
  }
</style>
