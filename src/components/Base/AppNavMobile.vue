<script setup lang="ts">
import AppLink from '@/components/Base/AppLink.vue';
</script>

<template>
  <div class="nav-mobile">
    <div class="nav-mobile__wrapper">
      <div class="nav-mobile__body">
        <div class="nav-mobile__item">
          <router-link to="/">
            <app-link class="nav-mobile__link">
              <!-- <icon-home class="icon-home" /> -->
              Home
            </app-link>
          </router-link>
        </div>

        <div class="nav-mobile__item">
          <router-link to="">
            <app-link class="nav-mobile__link">
              <!-- <icon-movie class="icon-movie" /> -->
              Coins
            </app-link>
          </router-link>
        </div>

        <div class="nav-mobile__item">
          <router-link to="">
            <app-link class="nav-mobile__link">
              <!-- <icon-cartoons class="icon-cartoons" /> -->
              Exchangers
            </app-link>
          </router-link>
        </div>

        <div class="nav-mobile__item">
          <router-link to="            ">
            <app-link class="nav-mobile__link">
              <!-- <app-favorites /> -->
              Comparison
            </app-link>
          </router-link> 
        </div>

        <div class="nav-mobile__item">
          <router-link to="">
            <app-link class="nav-mobile__link">
              <!-- <app-favorites /> -->
              News
            </app-link>
          </router-link>
        </div>

        <div class="nav-mobile__item">
          <router-link to="">
            <app-link class="nav-mobile__link">
              <!-- <app-favorites /> -->
              Favorites
            </app-link>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .nav-mobile__underlay {
    border-radius: 0;
  }
  .nav-mobile {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
  }
  .nav-mobile__wrapper {
    display: flex;
    justify-content: center;
  }
  .nav-mobile__body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    max-width: 400px;
    width: 100%;
    text-align: center;
    padding: 7px;
  }
  .nav-mobile__link {
    font-size: 13px;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .icon-home,
  .icon-movie,
  .icon-series,
  .icon-cartoons,
  .icon-favorites {
    width: 20px;
    height: 20px;
    fill: var(--color-white);
  }
  .router-link-active .nav-mobile__link {
    color: var(--color-yellow-disabled);
  }
  .router-link-active svg {
    fill: var(--color-yellow-disabled);
  }
</style>
