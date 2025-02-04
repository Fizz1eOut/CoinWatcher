<script setup lang="ts">
  import { useForm, useField } from 'vee-validate';
  import * as yup from 'yup';
  import AppInput from '@/components/Inputs/AppInput.vue';
  import AppButton from '@/components/Base/AppButton.vue';

  const validationSchema = yup.object({
    email: yup.string().required('Enter your email').email('Invalid email address'),
    password: yup.string().required('Enter your password').min(6, 'At least 6 characters'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm your password'),
  });

  const { handleSubmit } = useForm({ validationSchema });
  const { value: email, errorMessage: emailError } = useField('email', undefined, { initialValue: '' });
  const { value: password, errorMessage: passwordError } = useField('password', undefined, { initialValue: '' });
  const { value: confirmPassword, errorMessage: confirmPasswordError } = useField('confirmPassword', undefined, { initialValue: '' });

  const emit = defineEmits(['close', 'showError']);

  const onSubmit = handleSubmit((values) => {
    console.log('Register:', values);
    emit('close');
    emit('showError', 'Registration is temporarily unavailable. Please try again later.');
  });
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
        type="password" 
        placeholder="Password"
        :class="{ 'has-error': passwordError }"
      />
      <span class="error-message">{{ passwordError }}</span>
    </div>

    <div class="form__item">
      <app-input 
        v-model="confirmPassword" 
        type="password" 
        placeholder="Confirm password"
        :class="{ 'has-error': confirmPasswordError }"
      />
      <span class="error-message">{{ confirmPasswordError }}</span>
    </div>

    <div class="form__button">
      <app-button gradient type="submit">Sign Up</app-button>
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
</style>
