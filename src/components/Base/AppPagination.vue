<script setup lang="ts">
  import { computed } from 'vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';

  interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
  }

  const props = defineProps<PaginationProps>();

  const emit = defineEmits(['update:currentPage']);

  const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));

  // Функции для переключения страниц
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      emit('update:currentPage', page);

      // Прокрутка вверх страницы
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const isPreviousDisabled = computed(() => props.currentPage === 1);
  const isNextDisabled = computed(() => props.currentPage === totalPages.value);
</script>

<template>
  <div class="pagination">
    <app-button
      outline
      @click="goToPage(props.currentPage - 1)"
      :disabled="isPreviousDisabled"
      class="pagination__button"
    >
      <app-icon 
        name="arrow-right" 
        size="24px" 
        style="color: var(--color-white)"
        class="icon-arrow__left" 
      />
      Prev
    </app-button>

    <div class="pagination__info">
      <span class="pagination__text">Page:</span>
      <span class="pagination__current">{{ currentPage }}</span>
    </div>

    <app-button
      outline
      @click="goToPage(props.currentPage + 1)"
      :disabled="isNextDisabled"
      class="pagination__button"
    >
      Next
      <app-icon 
        name="arrow-right"
        size="24px"
        style="color: var(--color-white)"
      />
    </app-button>
  </div>
</template>

<style scoped>
  .pagination {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .pagination__button {
    font-size: 14px;
    max-height: 36px;
    max-width: 170px;
  }
  .pagination__info {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .pagination__text {
    font-size: 14px;
    font-weight: 400;
    color: var(--color-white);
  }

  .pagination__current {
    font-size: 16px;
    font-weight: 400;
    color: var(--color-white);
  }
  .icon-arrow__left {
    transform: rotate(180deg);
  }
</style>
