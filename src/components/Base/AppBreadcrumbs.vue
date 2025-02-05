<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import AppLink from '@/components/Base/AppLink.vue';
  import AppIcon from '@/components/Base/AppIcon.vue';

  interface Breadcrumb {
    title: string;
    path: string;
  }

  interface BreadcrumbProps {
    coinName?: string;
  }
  const props = defineProps<BreadcrumbProps>();

  const route = useRoute();

  const breadcrumbs = computed<Breadcrumb[]>(() => {
    const matchedRoutes = route.matched.filter(({ meta }) => !!meta.title);
  
    const crumbs: Breadcrumb[] = matchedRoutes.map(routeRecord => ({
      title: routeRecord.meta.title as string,
      path: routeRecord.path,
    }));

    crumbs.unshift({ title: 'Home', path: '/' });

    if (props.coinName) {
      crumbs.push({ title: props.coinName, path: route.path });
    }

    return crumbs;
  });
</script>

<template>
  <div class="breadcrumbs">
    <div class="breadcrumbs__items">
      <div 
        v-for="(breadcrumb, index) in breadcrumbs" 
        :key="index" 
        class="breadcrumbs__item"
      >
        <router-link :to="breadcrumb.path">
          <app-link :class="{ 'active-link': index === breadcrumbs.length - 1 }" class="breadcrumbs__link">
            {{ breadcrumb.title }}
          </app-link>
        </router-link>
        <app-icon 
          v-if="index < breadcrumbs.length - 1"
          name="arrow" 
          size="20px" 
          style="color: var(--color-white)"
          class="icon-arrow"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .breadcrumbs {
    margin-bottom: 30px;
  }
  .breadcrumbs__items {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .breadcrumbs__item {
    display: flex;
    align-items: center;
  }
  .breadcrumbs__link {
    margin-right: 5px;
  }
  .active-link {
    color: var(--color-gray);
  }
  .icon-arrow {
    width: 8px;
    height: 8px;
    fill: var(--color-black);
    transform: rotate(90deg);
  }
</style>
