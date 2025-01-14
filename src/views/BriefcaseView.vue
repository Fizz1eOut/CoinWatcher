<script setup lang="ts">
  import { computed } from 'vue';
  import { useBriefcaseStore } from '@/stores/briefcaseStore';

  const briefcaseStore = useBriefcaseStore();
  const briefcase = computed(() => briefcaseStore.briefcase);

  const removeFromBriefcase = (id: string) => {
    briefcaseStore.removeCoin(id);
  };
</script>

<template>
  <div class="briefcase">
    <h1>Your Portfolio</h1>
    <div v-if="briefcase.length > 0">
      <div v-for="coin in briefcase" :key="coin.Name" class="briefcase__item">
        <img :src="coin.ImageUrl" alt="" class="briefcase__image" />
        <div class="briefcase__name">{{ coin.Name }}</div>
        <button @click="removeFromBriefcase(coin.id)">Remove</button>
      </div>
    </div>
    <p v-else>No coins in your portfolio yet.</p>
  </div>
</template>

<style scoped>
.briefcase {
  padding: 20px;
}
.briefcase__item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.briefcase__image {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.briefcase__name {
  margin-right: 20px;
}
</style>
