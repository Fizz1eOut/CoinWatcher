// src/composables/useMediaQuery.ts
import { ref, onMounted, onBeforeUnmount } from 'vue';

export const useMediaQuery = (query: string) => {
  const isMobile = ref(false);
  const mediaQueryList: MediaQueryList = window.matchMedia(query);

  const handleMediaChange = (event: MediaQueryListEvent) => {
    isMobile.value = event.matches;
  };

  onMounted(() => {
    isMobile.value = mediaQueryList.matches;
    mediaQueryList.addEventListener('change', handleMediaChange);
  });

  onBeforeUnmount(() => {
    mediaQueryList.removeEventListener('change', handleMediaChange);
  });

  return {
    isMobile
  };
};
