<script setup lang="ts">
  import { computed } from 'vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import { useBriefcaseStore } from '@/stores/briefcaseStore';

  const briefcaseStore = useBriefcaseStore();
  const briefcaseCount = computed(() => briefcaseStore.briefcase.length);
</script>

<template>
  <div class="briefcase">
    <app-button>
      <app-icon 
        name="briefcase" 
        size="24px" 
        style="color: var(--color-white)"
        class="icon-briefcase" 
      />
      <span class="briefcase__quantity">{{ briefcaseCount }}</span>
    </app-button>
  </div>
</template>

<style scoped>
  .briefcase {
    position: relative;
    max-width: 24px;
  }
  .briefcase__quantity {
    position: absolute;
    right: -10px;
    top: -5px;
    border-radius: 100%;
    color: var(--color-white);
    font-size: 13px;
    height: 18px;
    width: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-blue);
  }
</style>
