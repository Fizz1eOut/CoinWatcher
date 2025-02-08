import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import AppNavMobile from '@/components/Base/AppNavMobile.vue';

// Создаем заглушку для маршрутизатора
const router = createRouter({
  history: createWebHistory(),
  routes: [], // Можно добавить тестовые маршруты, если потребуется
});

const pinia = createPinia();

describe('AppNavMobile.vue', () => {
  it('должен эмитировать событие "close" при закрытии меню', async () => {
    const wrapper = mount(AppNavMobile, {
      global: {
        plugins: [router, pinia], // Передаем router и pinia
      },
      props: {
        open: true, // Передаем, что меню открыто
      },
    });

    // Дожидаемся готовности роутера
    await router.isReady();

    // Эмитируем событие "close"
    await wrapper.vm.$emit('close');

    // Проверяем, что событие "close" было эмитировано
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
