<script setup lang="ts">
  import { computed, defineProps } from 'vue';

  // Интерфейс для входных параметров (пропсов)
  interface AppImageCoinProps {
    imageUrl: string; // URL изображения
  }

  const props = defineProps<AppImageCoinProps>();

  const fullImageUrl = computed<string>(() => {
    // Добавляем базовый URL только если imageUrl существует
    return props.imageUrl ? 'https://cryptocompare.com' + props.imageUrl : '';
  });
</script>

<template>
  <img
    v-if="fullImageUrl"
    class="image"
    :src="fullImageUrl"
    alt="Image"
  >
  <img
    v-else
    class="image"
    src="https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
    alt="Image not available"
  >
</template>

<style scoped>
.image {
  width: 25px;
  height: 25px;
}
</style>

