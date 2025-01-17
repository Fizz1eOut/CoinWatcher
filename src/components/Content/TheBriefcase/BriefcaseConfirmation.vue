<script setup lang="ts">
  import { computed } from 'vue';
  import AppModal from '@/components/Base/AppModal.vue';
  import AppButton from '@/components/Base/AppButton.vue';

  interface ModalListProps {
    modelValue: boolean
  }
  const props = defineProps<ModalListProps>();
  const isOpen = computed({
    get: () => props.modelValue,
    set: (value: boolean) => emits('update:modelValue', value),
  });

  const emits = defineEmits(['update:modelValue', 'confirm', 'cancel']);
  const close = () => {
    emits('update:modelValue', false);
    emits('cancel');
  };
  const confirm = () => {
    emits('confirm');
    emits('update:modelValue', false);
  };
</script>

<template>
  <app-modal v-model="isOpen" :contentStyle="{ maxWidth: '300px' }">
    <div class="confirmation__content">
      <p>Are you sure you want to remove this coin?</p>
      <div class="confirmation__actions">
        <app-button remove @click="confirm" class="confirm__btn--confirm">Yes, Remove</app-button>
        <app-button remove @click="close" class="confirm__btn--cancel">Cancel</app-button>
      </div>
    </div>
  </app-modal>
</template>

<style scoped>
  .confirmation__content {
    text-align: center;
    max-width: 300px;
  }
  .confirmation__actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }
  .confirm__btn--confirm {
    max-width: 160px;
    background-color: red;
    color: var(--color-white);
    cursor: pointer;
  }
  .confirm__btn--cancel {
    max-width: 100px;
    border-radius: 25px;
    background: var(--color-gray);
    color: var(--color-white);
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
  }
  .confirm__btn--cancel:hover {
    transform: scale(1.05);
    background-color: var(--color-gray);
  }
</style>
