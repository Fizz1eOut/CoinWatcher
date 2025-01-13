import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AppHeader from '@/components/Base/AppHeader.vue';
import AppBurger from '@/components/Base/AppBurger.vue';

// Мокаем window.matchMedia
beforeEach(() => {
  vi.stubGlobal('matchMedia', vi.fn().mockImplementation((query) => ({
    matches: query.includes('(max-width: 768px)'), // Мок состояния мобильной версии
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })));
});

describe('AppHeader.vue', () => {
  it('должен иметь изначально закрытый бургер', () => {
    const wrapper = mount(AppHeader, {
      global: {
        stubs: {
          'router-link': true, // Замена router-link на простой div
        },
      },
    });

    const burger = wrapper.findComponent(AppBurger);

    expect(wrapper.vm.open).toBe(false); // Проверяем начальное состояние
    expect(burger.props('active')).toBe(false); // Проверяем, что бургер не активен
  });

  it('должен обновлять состояние "open" при событии @change из AppBurger', async () => {
    const wrapper = mount(AppHeader, {
      global: {
        stubs: {
          'router-link': true,
        },
      },
    });

    const burger = wrapper.findComponent(AppBurger);

    // Эмитируем событие "change" с новым состоянием
    await burger.vm.$emit('change', true);

    // Проверяем, что состояние open обновилось
    expect(wrapper.vm.open).toBe(true);

    // Эмитируем событие "change" с другим значением
    await burger.vm.$emit('change', false);

    // Проверяем, что состояние open обновилось
    expect(wrapper.vm.open).toBe(false);
  });

  it('должен закрывать бургер при вызове метода closeBurger', () => {
    const wrapper = mount(AppHeader, {
      global: {
        stubs: {
          'router-link': true,
        },
      },
    });

    wrapper.vm.open = true; // Устанавливаем состояние open = true
    wrapper.vm.closeBurger(); // Вызываем метод closeBurger
    expect(wrapper.vm.open).toBe(false); // Проверяем, что open стал false
  });
});
