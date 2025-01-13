<script setup lang="ts">
  import { computed } from 'vue';
  import AppContainer from '@/components/Base/AppContainer.vue';
  import AppLink from '@/components/Base/AppLink.vue';

  const currentYear = computed(() => new Date().getFullYear());
</script>

<template>
  <app-container>
    <div class="footer-nav">
      <div class="footer-nav__body">
        <div class="footer-nav__item">
          <router-link to="/">
            <app-link>
              Home
            </app-link>
          </router-link>
        </div>

        <div class="footer-nav__item">
          <router-link to="/coins">
            <app-link>
              Coins
            </app-link>
          </router-link>
        </div>

        <div class="footer-nav__item">
          <router-link to="/exchangers">
            <app-link>
              Exchangers
            </app-link>
          </router-link>
        </div>

        <div class="footer-nav__item">
          <router-link to="/converter">
            <app-link>
              Converter
            </app-link>
          </router-link>
        </div>

        <div class="footer-nav__item">
          <router-link to="/comparison">
            <app-link>
              Comparison
            </app-link>
          </router-link>
        </div>

        <div class="footer-nav__item">
          <router-link to="/news">
            <app-link>
              News
            </app-link>
          </router-link>
        </div>
      </div>
    </div>
    <div class="copyright">
      © {{ currentYear }} CryptoApp. All rights reserved.
    </div> 
  </app-container>
</template>

<style scoped>
  .footer-nav {
    display: flex;
    justify-content: center;
  }
  .footer-nav__body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    max-width: 768px;
    width: 100%;
  }
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
  .copyright {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    color: var(--color-gray);
  }
  @media (max-width: 499px) {
    .footer-nav__body {
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
    }
  } 
</style>
