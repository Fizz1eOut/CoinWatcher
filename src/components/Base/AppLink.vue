<script setup lang="ts">
  
</script>

<template>
  <div class="link line">
    <slot></slot>
  </div>
</template>

<style scoped>
.link {
  font-family: "Source Code Pro", monospace;
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
  color: var(--color-white);
  transition: background 0.3s ease-in-out;
  cursor: pointer;
}

.link:hover {
  background: var(--color-gradient-hover);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
