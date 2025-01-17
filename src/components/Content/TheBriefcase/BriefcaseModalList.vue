<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useBriefcaseStore } from '@/stores/briefcaseStore';
  import AppModal from '@/components/Base/AppModal.vue';
  import BriefcaseConfirmation from '@/components/Content/TheBriefcase/BriefcaseConfirmation.vue';
  import AppSubtitle from '@/components/Base/AppSubtitle.vue';
  import AppImageCoin from '@/components/Base/AppImageCoin.vue';
  import AppButton from '@/components/Base/AppButton.vue';

  interface ModalListProps {
    modelValue: boolean
  }
  const props = defineProps<ModalListProps>();
  const emits = defineEmits(['update:modelValue']);

  const isOpen = computed({
    get: () => props.modelValue,
    set: (value: boolean) => emits('update:modelValue', value),
  });

  const closeModal = () => {
    emits('update:modelValue', false);
  };

  const briefcaseStore = useBriefcaseStore();
  const isConfirmationOpen = ref(false);
  const coinToRemove = ref<string | null>(null);

  const openConfirmation = (id: string) => {
    coinToRemove.value = id;
    isConfirmationOpen.value = true;
  };

  const handleRemove = () => {
    if (coinToRemove.value) {
      briefcaseStore.removeCoin(coinToRemove.value);
      coinToRemove.value = null;
      isConfirmationOpen.value = false;
    }
  };

  const cancelRemove = () => {
    coinToRemove.value = null;
    isConfirmationOpen.value = false;
  };
</script>

<template>
  <app-modal v-model="isOpen">
    <div class="briefcase-modal">
      <app-subtitle>Added Cryptocurrencies</app-subtitle>
      <ul class="briefcase-modal__list">
        <li v-for="coin in briefcaseStore.briefcase" :key="coin.id" class="briefcase-modal__item">
          <app-image-coin :imageUrl="coin.ImageUrl" />
          <div class="briefcase-modal__name">{{ coin.Name }}</div>
          <app-button 
            remove
            @click="openConfirmation(coin.id)" 
          >
            Remove
          </app-button>
        </li>
      </ul>
      <briefcase-confirmation 
        v-model="isConfirmationOpen" 
        @confirm="handleRemove" 
        @cancel="cancelRemove"
      />

      <div class="briefcase-modal__button">
        <app-button gradient @click="closeModal">Close</app-button>
      </div>
    </div>
  </app-modal>
</template>

<style scoped>
  .briefcase-modal__list {
    margin: 30px 0;
  }
  .briefcase-modal__list > *:not(:last-child) {
    margin-bottom: 20px;
  }
  .briefcase-modal__item {
    max-width: 180px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .briefcase-modal__name {
    min-width: 55px;
  }
  .briefcase-modal__button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .briefcase-modal__button .button {
    max-width: 200px;
  }
</style>
