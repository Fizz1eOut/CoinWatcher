<script setup lang="ts">
  import { ref } from 'vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppModal from '@/components/Base/AppModal.vue';
  import AuthForm from '@/components/Content/form/AuthForm.vue';

  const isAuthModalOpen = ref(false);
</script>

<template>
  <div class="auth-modal">
    <app-button class="auth-modal__button line" @click="isAuthModalOpen = true">
      Log In / Sign Up
    </app-button>

    <app-modal v-model="isAuthModalOpen">
      <auth-form />
    </app-modal>
  </div>
</template>

<style scoped>
</style>
