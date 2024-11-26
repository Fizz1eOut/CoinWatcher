<script setup lang="ts">
import AppButton from '@/components/Base/AppButton.vue';
import IconFavorites from '@/components/Icons/IconFavorites.vue';
</script>

<template>
  <div class="favorites">
    <app-button class="search__button" ordinary>
      <icon-favorites class="icon-favorites" />
      <span class="favorites__quantity">0</span>
    </app-button>
  </div>
</template>

<style scoped>
  .favorites {
    position: relative;
    max-width: 24px;
  }
  .icon-favorites {
    width: 24px;
    height: 24px;
    fill: var(--color-white);
  }
  .favorites__quantity {
    position: absolute;
    right: -10px;
    top: -5px;
    border-radius: 100%;
    color: var(--color-white);
    font-size: 13px;
    height: 18px;
    width: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-blue);
  }
  .router-link-active .icon-favorites {
    fill: var(--color-yellow-disabled);
  }
</style>
