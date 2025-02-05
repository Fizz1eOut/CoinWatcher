<script setup lang="ts">
  import { ref } from 'vue';
  import { useForm, useField } from 'vee-validate';
  import * as yup from 'yup';
  import AppInput from '@/components/Inputs/AppInput.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';

  const validationSchema = yup.object({
    email: yup.string().required('Enter your email').email('Invalid email address'),
    password: yup.string().required('Enter your password'),
  });

  const { handleSubmit } = useForm({ validationSchema });
  const { value: email, errorMessage: emailError } = useField<string>('email', undefined, { initialValue: '' });
  const { value: password, errorMessage: passwordError } = useField<string>('password', undefined, { initialValue: '' });

  const emit = defineEmits(['close', 'showError']);

  const onSubmit = handleSubmit((values) => {
    console.log('Login:', values);
    emit('close');
    emit('showError', 'Login is temporarily unavailable. Please try again later.');
  });

  const showPassword = ref(false);
  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      showPassword.value = !showPassword.value;
    }
  };
</script>

<template>
  <form @submit.prevent="onSubmit" class="form">
    <div class="form__item">
      <app-input 
        v-model="email" 
        placeholder="Email"
        :class="{ 'has-error': emailError }"
      />
      <span class="error-message">{{ emailError }}</span>
    </div>

    <div class="form__item">
      <app-input 
        v-model="password" 
        :type="showPassword ? 'text' : 'password'" 
        placeholder="Password"
        :class="{ 'has-error': passwordError }"
      />
      <app-button class="toggle-password" @click="togglePasswordVisibility('password')">
        <app-icon 
          :name="showPassword ? 'eye-off' : 'eye'"
          size="16px" 
          style="color: var(--color-gray)"
        />
      </app-button>
      <span class="error-message">{{ passwordError }}</span>
    </div>

    <div class="form__button">
      <app-button gradient type="submit">Login</app-button>
    </div>
  </form>
</template>

<style scoped>
  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .has-error {
    border: 1px solid var(--color-red);
    border-radius: 25px;
  }
  .error-message {
    color: var(--color-red);
    font-size: 12px;
  }
  .form__button {
    display: flex;
    justify-content: center;
  }
  .form__button .button {
    max-width: 250px;
    width: 100%;
  }
  .form__item {
    position: relative;
  }
  .toggle-password {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 16px;
    height: 16px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
  }
</style>

