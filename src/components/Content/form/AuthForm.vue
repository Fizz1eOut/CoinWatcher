<script setup lang="ts">
  import { ref } from 'vue';
  import LoginForm from '@/components/Content/form/LoginForm.vue';
  import RegisterForm from '@/components/Content/form/RegisterForm.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';

  const isLogin = ref(true);

  const toggleForm = () => {
    isLogin.value = !isLogin.value;
  };
  const emit = defineEmits(['close', 'showError']);
  const handleShowError = (message: string) => {
    emit('showError', message);
  };
</script>

<template>
  <div class="auth-form">
    <div class="auth-form__header">
      <app-title>{{ isLogin ? 'Login' : 'Registration' }}</app-title>
      <app-button class="auth-form__close" @click="$emit('close')">
        <app-icon
          name="cross"
          size="18px"
          style="color: var(--color-white)"
        />
      </app-button>
    </div>

    <div class="auth-form__content">
      <LoginForm v-if="isLogin" @close="$emit('close')" @showError="handleShowError" />
      <RegisterForm v-else @close="$emit('close')" @showError="handleShowError" />
    </div>

    <div class="auth-form__button">
      <app-button @click="toggleForm" class="toggle-text line">
        {{ isLogin ? 'Don`t have an account? Sign up' : 'Already have an account? Login' }}
      </app-button>
    </div>
  </div>
</template>

<style scoped>
  .auth-form__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .auth-form__content {
    margin: 30px 0;
  }
  .auth-form__close {
    width: 18px;
    height: 18px;
  }
  .auth-form__button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .auth-form__button .button {
    max-width: 220px;
    width: 100%;
  }
</style>
