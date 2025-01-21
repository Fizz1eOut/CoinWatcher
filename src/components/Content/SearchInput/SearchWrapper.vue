<script setup lang="ts">
  import { ref, onUnmounted } from 'vue';
  import { debounce } from '@/utils/debounce';
  import { getCoinSuggestions } from '@/api/coins/getCoinSuggestions';
  import type { CoinInfo } from '@/interface/suggestions.interface';
  import { useRouter } from 'vue-router';
  import AppInput from '@/components/Inputs/AppInput.vue';
  import SearchSuggestion from '@/components/Content/SearchInput/SearchSuggestion.vue';

  const search = ref<string>('');
  const isLoading = ref(false);
  const suggestions = ref<CoinInfo[]>([]);
  const isDropdownActive = ref(false);
  const router = useRouter();

  const fetchSuggestions = debounce(async () => {
    const text = search.value.trim();
    if (!text) {
      suggestions.value = [];
      isLoading.value = false;
      isDropdownActive.value = false;
      return;
    }

    try {
      isLoading.value = true;
      const allCoins = await getCoinSuggestions();
      suggestions.value = allCoins
        .filter((coin) =>
          coin.Name.toLowerCase().includes(text.toLowerCase()) ||
          coin.FullName.toLowerCase().includes(text.toLowerCase())
        )
        .slice(0, 20);
      isDropdownActive.value = true;
    } catch (err) {
      console.error('Error loading data', err);
    } finally { 
      isLoading.value = false;
    }
  }, 300);

  const handleSelect = (coin: CoinInfo) => {
    search.value = coin.Name;
    suggestions.value = [];
    isDropdownActive.value = false;
    router.push({ name: 'CoinDetailView', params: { name: coin.Name } });
  };

  const handleInput = (value: string) => {
    search.value = value;
    fetchSuggestions();
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const searchElement = document.querySelector('.search');
    if (searchElement && !searchElement.contains(target)) {
      isDropdownActive.value = false;
    }
  };

  document.addEventListener('click', handleOutsideClick);

  onUnmounted(() => {
    document.removeEventListener('click', handleOutsideClick);
  });
</script>

<template>
  <div class="search">
    <app-input
      placeholder="Enter crypto name"
      v-model="search"
      @update:modelValue="handleInput"
      @focus="isDropdownActive = true"
    />
    <search-suggestion
      v-if="suggestions.length > 0"
      :isLoading="isLoading"
      :suggestions="suggestions"
      :active="isDropdownActive"
      @select="handleSelect"
    />
  </div>
</template>

<style scoped>

</style>
