<script setup lang="ts">
  import { ref } from 'vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppModal from '@/components/Base/AppModal.vue';
  import AuthForm from '@/components/Content/form/AuthForm.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';

  const isAuthModalOpen = ref(false);
  const isErrorModalOpen = ref(false);
  const errorMessage = ref('');

  const showErrorModal = (message: string) => {
    isAuthModalOpen.value = false;
    errorMessage.value = message;
    isErrorModalOpen.value = true;
  };
</script>

<template>
  <div class="auth-modal">
    <app-button class="auth-modal__button line" @click="isAuthModalOpen = true">
      Log In / Sign Up
    </app-button>

    <app-modal v-model="isAuthModalOpen">
      <auth-form @close="isAuthModalOpen = false" @showError="showErrorModal" />
    </app-modal>

    <app-modal v-model="isErrorModalOpen">
      <div class="auth-modal__error error">
        <app-title>Service Unavailable</app-title>
        <div class="error__text">{{ errorMessage }}</div>
        <div class="arror__button">
          <app-button gradient @click="isErrorModalOpen = false">Close</app-button>
        </div>
      </div>
    </app-modal>
  </div>
</template>

<style scoped>
  .error {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .arror__button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .arror__button .button {
    max-width: 250px;
    width: 100%;
  }
</style>
