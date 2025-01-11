import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Burger from '@/components/Base/AppBurger.vue';

describe('Burger.vue', () => {
  it('должен рендериться корректно', () => {
    const wrapper = mount(Burger, {
      props: {
        active: false,
      },
    });

    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.classes()).not.toContain('burger--active');
  });

  it('должен добавлять класс "burger--active", если active=true', async () => {
    const wrapper = mount(Burger, {
      props: {
        active: true,
      },
    });

    expect(wrapper.classes()).toContain('burger--active');
  });

  it('должен эмитить событие "change" с правильным значением при клике', async () => {
    const wrapper = mount(Burger, {
      props: {
        active: false,
      },
    });

    await wrapper.trigger('click');

    expect(wrapper.emitted('change')).toBeTruthy();
    expect(wrapper.emitted('change')![0]).toEqual([true]);
  });

  it('должен обновлять стиль overflow у body при изменении active', async () => {
    const mockBodyStyle = vi.spyOn(document.body.style, 'overflow', 'set');

    const wrapper = mount(Burger, {
      props: {
        active: false,
      },
    });

    await wrapper.setProps({ active: true });
    expect(mockBodyStyle).toHaveBeenCalledWith('hidden');

    await wrapper.setProps({ active: false });
    expect(mockBodyStyle).toHaveBeenCalledWith('');
  });
});
