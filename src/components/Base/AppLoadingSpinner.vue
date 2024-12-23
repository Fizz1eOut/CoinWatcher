<script setup lang="ts">
  import { computed } from 'vue';

  interface LoadingSpinnerProps {
    size?: string;
    borderWidth?: string;
    height?: string;
  }

  // Определяем пропсы
  const props = defineProps<LoadingSpinnerProps>();

  // Создаем вычисляемый объект стилей для контейнера
  const containerStyle = computed(() => ({
    height: props.height
  }));

  // Создаем вычисляемый объект стилей для спиннера
  const spinnerStyle = computed(() => ({
    width: props.size,
    height: props.size,
    borderWidth: props.borderWidth,
  }));
</script>

<template>
  <div class="loader" :style="containerStyle">
    <div class="spinner" :style="spinnerStyle"></div>
  </div>
</template>

<style scoped>
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  border: solid rgba(0, 0, 0, 0.1);
  border-top-color: #3498db;
  border-radius: 50%;
  animation: spinner 1s linear infinite;
}
</style>

