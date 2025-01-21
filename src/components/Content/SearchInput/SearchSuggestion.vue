<script setup lang="ts">
  import type { CoinInfo } from '@/interface/suggestions.interface';
  import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';
  import AppDropdown from '@/components/Base/AppDropdown.vue';
  import AppDropdownItem from '@/components/Base/AppDropdownItem.vue';
  import AppImageCoin from '@/components/Base/AppImageCoin.vue';

  interface SearchSuggestionProps {
    suggestions: CoinInfo[];
    isLoading: boolean;
    active: boolean;
  }
  defineProps<SearchSuggestionProps>();

  // Событие выбора
  const emit = defineEmits(['select']);
  const handleSelect = (coin: CoinInfo) => {
    emit('select', coin);
  };
</script>

<template>
  <div class="suggestions">
    <app-dropdown :active="active"  class="suggestion__list">

      <app-loading-spinner
        v-if="isLoading"
        class="loader" 
        size="10px"
        borderWidth="4px"
        height="40px" 
      />

      <app-dropdown-item
        v-else
        v-for="coin in suggestions"
        :key="coin.Id"
        class="suggestion__item"
        @click="handleSelect(coin)"
      >
        <div class="suggestion__content">
          <app-image-coin :imageUrl="coin.ImageUrl ?? ''" class="coin-image" />
          <span class="coin-full-name">{{ coin.FullName }}</span>
        </div>
      </app-dropdown-item>
    </app-dropdown>
  </div>
</template>

<style scoped>
  .suggestions {
    position: relative;
  }
  .suggestio__list {
    width: 100%;
    height: 200px;
    overflow: auto;
  }
  .suggestion__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
  }
  .coin-image {
    width: 20px;
    height: 20px;
  }
</style>
