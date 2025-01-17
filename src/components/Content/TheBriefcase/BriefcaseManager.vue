<script setup lang="ts">
  import { ref } from 'vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import BriefcaseModalList from '@/components/Content/TheBriefcase/BriefcaseModalList.vue';

  const isModalOpen = ref(false);

  const openModal = () => {
    isModalOpen.value = true;
  };
</script>

<template>
  <div class="briefcase-manager">
    <app-button outline @click="openModal">Edit Your Portfolio</app-button>
    <briefcase-modal-list v-model="isModalOpen" />
  </div>
</template>

<style scoped>
  .briefcase-manager {
    max-width: 200px;
    width: 100%;
  }
  @media (max-width: 499px) {
    .briefcase-manager {
      max-width: 100%;
      width: 100%;
    }
  }
</style>
