import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import AppHeader from '@/components/Base/AppHeader.vue';
import AppBurger from '@/components/Base/AppBurger.vue';
import AppNavMobile from '@/components/Base/AppNavMobile.vue';
import { useMediaQuery } from '@/composables/useMediaQuery';

vi.mock('@/composables/useMediaQuery', () => ({
  useMediaQuery: vi.fn(),
}));

describe('AppHeader.vue', () => {
  it('должен рендерить компоненты корректно', () => {
    // Мокаем useMediaQuery для эмуляции desktop режима
    (useMediaQuery as vi.Mock).mockReturnValue({ isMobile: false });

    const wrapper = mount(AppHeader);

    expect(wrapper.findComponent(AppBurger).exists()).toBe(true);
    expect(wrapper.findComponent(AppNavMobile).exists()).toBe(false);
    expect(wrapper.findComponent({ name: 'AppNav' }).exists()).toBe(true);
  });

  it('должен переключать состояние open при клике на AppBurger', async () => {
    (useMediaQuery as vi.Mock).mockReturnValue({ isMobile: true });

    const wrapper = mount(AppHeader);
    const burger = wrapper.findComponent(AppBurger);

    expect(wrapper.vm.open).toBe(false);
    await burger.vm.$emit('change', true);
    expect(wrapper.vm.open).toBe(true);
  });

  it('должен вызывать closeBurger при эмиссии события "close" из AppNavMobile', async () => {
    (useMediaQuery as vi.Mock).mockReturnValue({ isMobile: true });

    const wrapper = mount(AppHeader, {
      data() {
        return {
          open: true,
        };
      },
    });

    const navMobile = wrapper.findComponent(AppNavMobile);
    await navMobile.vm.$emit('close');

    expect(wrapper.vm.open).toBe(false);
  });

  it('должен отображать AppNavMobile вместо AppNav в мобильном режиме', () => {
    (useMediaQuery as vi.Mock).mockReturnValue({ isMobile: true });

    const wrapper = mount(AppHeader);

    expect(wrapper.findComponent({ name: 'AppNav' }).exists()).toBe(false);
    expect(wrapper.findComponent(AppNavMobile).exists()).toBe(true);
  });
});
