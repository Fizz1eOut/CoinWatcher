<script setup lang="ts">
  
</script>

<template>
  <div class="underlay">
    <slot />
  </div>
</template>

<style scoped>
  .underlay {
    border-radius: 10px;
    background-color: var(--color-underlay);
  }
</style>
