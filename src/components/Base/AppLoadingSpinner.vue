<script setup lang="ts">
  interface LoadingSpinnerProps {
    size?: string;        // Размер спиннера (например, "50px")
    borderWidth?: string; // Толщина обводки (например, "5px")
    height?: string;      // Высота контейнера (например, "100%")
  }

  // Определяем пропсы
  defineProps<LoadingSpinnerProps>();
</script>

<template>
  <div class="loader" :style="{ height: height }">
    <div
      class="spinner"
      :style="{
        width: size,
        height: size,
        borderWidth: borderWidth,
      }"
    ></div>
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

