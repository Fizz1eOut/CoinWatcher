<script setup lang="ts">
  import { computed } from 'vue';
  import { useBriefcaseStore } from '@/stores/briefcaseStore';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppSubtitle from '@/components/Base/AppSubtitle.vue';
  import BriefcaseChart from '@/components/Content/TheBriefcase/BriefcaseChart.vue';

  const briefcaseStore = useBriefcaseStore();
  const briefcase = computed(() => briefcaseStore.briefcase);

  // const removeFromBriefcase = (id: string) => {
  //   briefcaseStore.removeCoin(id);
  // };
  // <button @click="removeFromBriefcase(coin.id)">Remove</button>
</script>

<template>
  <div class="briefcase">
    <app-title>Your Portfolio</app-title>
    <briefcase-chart v-if="briefcase.length > 0" :briefcase="briefcase" />
    <app-subtitle v-else>No coins in your portfolio yet.</app-subtitle>
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
