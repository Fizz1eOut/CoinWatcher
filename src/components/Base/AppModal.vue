<script setup lang="ts">
  import AppContainer from '@/components/Base/AppContainer.vue';

  interface AppModalProps {
    modelValue: boolean;
    contentStyle?: Record<string, string>;
  }
  defineProps<AppModalProps>();
  const emits = defineEmits(['update:modelValue']);

  const close = () => {
    emits('update:modelValue', false);
  };
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div v-if="modelValue" class="modal">
        <div class="overlay" @click.self="close">
          <div :style="contentStyle" class="content">
            <app-container size="md" class="modal-container">

              <div class="content__body">
                <slot />
              </div>
            </app-container>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
  .overlay {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 11;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
  }
  .content {
    border-radius: 20px;
    background: var(--color-underlay);
    max-width: 700px;
    width: 100%;
  }
  @media (max-width: 499px) {
    .modal-container {
      padding: 20px;
    }
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
