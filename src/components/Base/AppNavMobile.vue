<script setup lang="ts">
  import AppLink from '@/components/Base/AppLink.vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import AppBriefcase from '@/components/Base/AppBriefcase.vue';

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
            <router-link to="/" @click="close">
              <div class="nav-mobile__row">
                <app-icon 
                  name="home" 
                  size="24px" 
                  style="color: var(--color-white)"
                  class="icon" 
                />
                <app-link class="nav-mobile__link">
                  Home
                </app-link>
              </div>
            </router-link>
          </div>

          <div class="nav-mobile__item">
            <router-link to="/coins" @click="close">
              <div class="nav-mobile__row">
                <app-icon 
                  name="coins" 
                  size="24px" 
                  style="color: var(--color-white)"
                  class="icon" 
                />
                <app-link class="nav-mobile__link">
                  Coins
                </app-link>
              </div>
            </router-link>
          </div>

          <div class="nav-mobile__item">
            <router-link to="/exchangers" @click="close">
              <div class="nav-mobile__row">
                <app-icon 
                  name="exchanger" 
                  size="24px" 
                  style="color: var(--color-white)"
                  class="icon" 
                />
                <app-link class="nav-mobile__link">
                  Exchangers
                </app-link>
              </div>
            </router-link>
          </div>

          <div class="nav-mobile__item">
            <router-link to="/news" @click="close">
              <div class="nav-mobile__row">
                <app-icon 
                  name="news" 
                  size="24px" 
                  style="color: var(--color-white)"
                  class="icon" 
                />
                <app-link class="nav-mobile__link">
                  News
                </app-link>
              </div>
            </router-link>
          </div>
          <div class="nav-mobile__item">
            <router-link to="/briefcase" @click="close">
              <div class="nav-mobile__row">
                <app-briefcase />
                <app-link class="nav-mobile__link">
                  Briefcase
                </app-link>
              </div>
            </router-link>
          </div>
        </div>
      </app-container>
    </nav>
  </Transition>
</template>

<style scoped>
  .nav-mobile__row {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 164px;
  }
  .nav-mobile__row .nav-mobile__link {
    font-size: 20px;
  }
  .nav-mobile__link {
    pointer-events: none;
  }
  .router-link-active .nav-mobile__link {
    transition: background 0.3s ease-in-out;
    cursor: pointer;
    background: var(--color-gradient-hover);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    position: relative;
  }

  .router-link-active .nav-mobile__link::after {
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
  .router-link-active .icon {
    color: #459bc0 !important;
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
    }
    .nav-mobile__body {
      /* margin-top: 120px; */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .nav-mobile__body >*:not(:last-child) {
      margin-bottom: 40px;
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
  @media (max-width: 499px) {
    .nav-modile {
      max-width: 100%;
    }
  }
</style>
