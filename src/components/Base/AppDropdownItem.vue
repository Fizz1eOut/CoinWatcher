<script setup lang="ts">

</script>

<template>
  <li class="dropdown-list__item">
    <div href="" class="item line">
      <slot></slot>
    </div>
  </li>
</template>

<style scoped>
.dropdown-list__item:not(:last-child) {
  margin-bottom: 16px;
} 
.item {
  font-size: 14px;
  font-weight: 400;
  color: var(--color-white);
  background-color: transparent;
  cursor: pointer;
}
</style> 
