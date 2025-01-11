import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AppNavMobile from '@/components/Base/AppNavMobile.vue';

describe('AppNavMobile.vue', () => {
  it('должен эмитировать событие "close" при закрытии меню', async () => {
    const wrapper = mount(AppNavMobile, {
      props: {
        open: true, // Передаем, что меню открыто
      },
    });

    // Выполняем действие, которое должно вызвать закрытие меню (например, клик по кнопке закрытия)
    await wrapper.vm.$emit('close');

    // Проверяем, что событие "close" было эмитировано
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
