<script setup lang="ts">
  import AppLink from '@/components/Base/AppLink.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';

  interface NavMobileProps {
    open: boolean;
  }

  defineProps<NavMobileProps>();

  // Эмиссия событий
  const emit = defineEmits<{
    (e: 'close'): void;
  }>();

  const close = () => {
    emit('close');
  };
</script>

<template>
  <Transition>
    <nav
      v-if="open" 
      class="nav-modile" 
    >
      <app-container>
        <div class="nav-mobile__body">
          <div class="nav-mobile__item">
            <router-link to="/">
              <app-link class="nav-mobile__link" @click="close">
                Home
              </app-link>
            </router-link>
          </div>

          <div class="nav-mobile__item">
            <router-link to="/сoins">
              <app-link @click="close">
                Coins
              </app-link>
            </router-link>
          </div>

          <div class="nav-mobile__item">
            <router-link to="/exchangers">
              <app-link @click="close">
                Exchangers
              </app-link>
            </router-link>
          </div>

          <div class="nav-mobile__item">
            <router-link to="/converter">
              <app-link @click="close">
                Converter
              </app-link>
            </router-link>
          </div>

          <div class="nav-mobile__item">
            <router-link to="/comparison">
              <app-link @click="close">
                Comparison
              </app-link>
            </router-link>
          </div>

          <div class="nav-mobile__item">
            <router-link to="/news">
              <app-link @click="close">
                News
              </app-link>
            </router-link>
          </div>
        </div>
      </app-container>
    </nav>
  </Transition>
</template>

<style scoped>
  .router-link-active .link {
    transition: background 0.3s ease-in-out;
    cursor: pointer;
    background: var(--color-gradient-hover);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
  }

  .router-link-active .link::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 100%;
    height: 2px;
    background: var(--color-gradient-hover);
    transform: scaleX(1);
    transform-origin: left;
    transition: transform 0.4s ease-in-out;
  }
  @media (max-width: 768px) {
    .nav-modile {
      position: fixed;
      left: 0;
      top: 0px;
      max-width: 350px;
      width: 100%;
      height: 100vh;
      z-index: 9;
      box-shadow: 4px 0 9px -7px rgba(0,0,0, 0.8);
      background-color: var(--color-underlay);
      overflow-x: hidden;
      overflow-y: auto;
    }
    .nav-mobile__body {
      margin-top: 80px;
    }
    .nav-mobile__body >*:not(:last-child) {
      margin-bottom: 10px;
    }

    .v-enter-active,
    .v-leave-active {
      transition: opacity 0.9s ease-in-out;
    }

    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }
  }
  @media (max-width: 480px) {
    .nav-modile {
      max-width: 100%;
    }
  }
</style>
