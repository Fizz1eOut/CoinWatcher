<script setup lang="ts">
  import { computed } from 'vue';
  import Multiselect from '@vueform/multiselect';
  import '@vueform/multiselect/themes/default.css';

  interface NewsFiltersProps {
    cryptoList: string[];
    feedsList: { key: string; name: string }[];
    selectedCryptos: string[];
    selectedFeeds: string[];
  }
  
  const props = defineProps<NewsFiltersProps>();
  const emit = defineEmits(['update:selectedCryptos', 'update:selectedFeeds']);

  // Прокси-свойство для синхронизации данных с родителем
  const selectedCryptos = computed({
    get: () => props.selectedCryptos  ?? [], // Гарантируем, что всегда массив
    set: (value) => emit('update:selectedCryptos', Array.isArray(value) ? value : [value]) // Преобразуем строку в массив
  });

  // Прокси для бирж (чтобы всегда был массив)
  const selectedFeedsProxy = computed({
    get: () => props.selectedFeeds ?? [],
    set: (value) => emit('update:selectedFeeds', Array.isArray(value) ? value : [value])
  });
</script>

<template>  
  <div class="news-filters">
    <Multiselect
      v-model="selectedCryptos"
      :options="cryptoList"
      :multiple="true" 
      mode="tags"
      :close-on-select="false"
      :searchable="true"
      placeholder="Select coins"
      track-by="name"
      label="name"
      class="custom-multiselect"
    />

    <Multiselect
      v-model="selectedFeedsProxy"
      :options="feedsList.map(feed => feed.key)"
      :multiple="true"
      mode="tags"
      :close-on-select="false"
      :searchable="true"
      placeholder="Select news sources"
      class="custom-multiselect"
    />
  </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
<style>
  .news-filters {
    margin-bottom: 20px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
  }
  .custom-multiselect {
    border-radius: 20px;
    background-color: var(--color-deep-blue);
    color: var(--color-white);
    border: 1px solid #3a3d52;
  }
  .custom-multiselect.is-active {
    border: 1px solid #3a3d52;
    outline: none;
    box-shadow: none;
  }
  .custom-multiselect .multiselect-dropdown {
    border: 1px solid #3a3d52;
    outline: none;
    box-shadow: none;
  }
  .custom-multiselect .multiselect__content {
    background-color: var(--color-deep-blue);
    color: var(--color-white);
  }
  .custom-multiselect .multiselect-dropdown {
    background-color: var(--color-deep-blue);
  }
  .custom-multiselect .is-pointed {
    background-color: var(--color-gray);
  }
  .custom-multiselect .multiselect-tags-search {
    background-color: var(--color-deep-blue);
    color: var(--color-white);
  }

  @media (max-width: 520px) {
    .news-filters {
      flex-wrap: wrap;
    }
  }
</style>
