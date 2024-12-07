<script setup lang="ts">
  import AppLink from '@/components/Base/AppLink.vue';
</script>

<template>
  <div class="nav">
    <div class="nav__body">
      <div class="nav__item">
        <router-link to="/">
          <app-link>
            Home
          </app-link>
        </router-link>
      </div>

      <div class="nav__item">
        <router-link to="/coins">
          <app-link>
            Coins
          </app-link>
        </router-link>
      </div>

      <div class="nav__item">
        <router-link to="/exchangers">
          <app-link>
            Exchangers
          </app-link>
        </router-link>
      </div>

      <div class="nav__item">
        <router-link to="/converter">
          <app-link>
            Converter
          </app-link>
        </router-link>
      </div>

      <div class="nav__item">
        <router-link to="/comparison">
          <app-link>
            Comparison
          </app-link>
        </router-link>
      </div>

      <div class="nav__item">
        <router-link to="/news">
          <app-link>
            News
          </app-link>
        </router-link>
      </div>
    </div>
  </div>
</template>


<style scoped>
  .nav__body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
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
</style>
