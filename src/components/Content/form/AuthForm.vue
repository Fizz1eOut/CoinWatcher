<script setup lang="ts">
  import { ref } from 'vue';
  import LoginForm from '@/components/Content/form/LoginForm.vue';
  import RegisterForm from '@/components/Content/form/RegisterForm.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppTitle from '@/components/Base/AppTitle.vue';

  const isLogin = ref(true);

  const toggleForm = () => {
    isLogin.value = !isLogin.value;
  };
</script>

<template>
  <div class="auth-form">
    <app-title class="auth-form__title">{{ isLogin ? 'Login' : 'Registration' }}</app-title>

    <div class="auth-form__content">
      <LoginForm v-if="isLogin" />
      <RegisterForm v-else />
    </div>

    <div class="auth-form__button">
      <app-button @click="toggleForm" class="toggle-text line">
        {{ isLogin ? 'Don`t have an account? Sign up' : 'Already have an account? Login' }}
      </app-button>
    </div>
  </div>
</template>

<style scoped>
  .auth-form__title {
    text-align: center;
  }
  .auth-form__content {
    margin: 30px 0;
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
