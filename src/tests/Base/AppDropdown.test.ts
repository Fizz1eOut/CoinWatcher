import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AppDropdown from '@/components/Base/AppDropdown.vue';

describe('AppDropdown.vue', () => {
  it('должен отображаться, если active = true', async () => {
    const wrapper = mount(AppDropdown, {
      props: {
        active: true,
      },
      slots: {
        default: '<li>Item 1</li><li>Item 2</li>',
      },
    });

    expect(wrapper.find('.dropdown').exists()).toBe(true);
    expect(wrapper.findAll('li')).toHaveLength(2);
  });

  it('не должен отображаться, если active = false', async () => {
    const wrapper = mount(AppDropdown, {
      props: {
        active: false,
      },
    });

    expect(wrapper.find('.dropdown').exists()).toBe(false);
  });
});
