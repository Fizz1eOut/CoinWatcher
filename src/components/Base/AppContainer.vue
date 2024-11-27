<script setup lang="ts">
  import { computed, defineProps } from 'vue';

  // Определяем свойства
  const props = defineProps<{
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  }>();

  // Устанавливаем значение по умолчанию для size
  const size = props.size || 'xs';

  // Создаем вычисляемое свойство
  const container = computed(() => `size-${size}`);
</script>

<template>
  <div :class="container" class="container">
    <slot />
  </div>
</template>

<style scoped>
  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 15px;
  }

  .size-xl {
    padding: 50px;
  }

  .size-lg {
    padding: 40px;
  }

  .size-md {
    padding: 30px;
  }

  .size-sm {
    padding: 20px;
  }

  .size-xs {
    padding: 16px;
  }

  @media (max-width: 768px) {
    .size-xl {
      padding: 30px;
    }
  }

  @media (max-width: 499px) {
    .size-md {
      padding: 16px;
    }
    .size-xl {
      padding: 20px;
    }
  }
</style>
