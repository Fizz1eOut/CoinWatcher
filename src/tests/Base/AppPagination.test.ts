import { describe, it, expect, beforeAll, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import AppPagination from '@/components/Base/AppPagination.vue';
import AppButton from '@/components/Base/AppButton.vue';
import AppIcon from '@/components/Base/AppIcon.vue';

beforeAll(() => {
  global.scrollTo = vi.fn();
});

describe('AppPagination.vue', () => {
  it('корректно рендерится', () => {
    const wrapper = mount(AppPagination, {
      props: {
        totalItems: 50,
        itemsPerPage: 10,
        currentPage: 1,
      },
      global: {
        components: { AppButton, AppIcon },
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Page:');
    expect(wrapper.text()).toContain('1');
  });

  it('кнопка "Назад" отключена на первой странице', () => {
    const wrapper = mount(AppPagination, {
      props: {
        totalItems: 50,
        itemsPerPage: 10,
        currentPage: 1,
      },
    });

    const prevButton = wrapper.find('.pagination__button:first-child');
    expect(prevButton.attributes('disabled')).toBeDefined();
  });

  it('кнопка "Вперед" отключена на последней странице', () => {
    const wrapper = mount(AppPagination, {
      props: {
        totalItems: 50,
        itemsPerPage: 10,
        currentPage: 5,
      },
    });

    const nextButton = wrapper.find('.pagination__button:last-child');
    expect(nextButton.attributes('disabled')).toBeDefined();
  });

  it('событие update:currentPage эмитится при нажатии на кнопку "Вперед"', async () => {
    const wrapper = mount(AppPagination, {
      props: {
        totalItems: 50,
        itemsPerPage: 10,
        currentPage: 2,
      },
    });

    const nextButton = wrapper.find('.pagination__button:last-child');
    await nextButton.trigger('click');
    
    expect(wrapper.emitted('update:currentPage')).toBeTruthy();
    expect(wrapper.emitted('update:currentPage')?.[0]).toEqual([3]);
  });

  it('событие update:currentPage эмитится при нажатии на кнопку "Назад"', async () => {
    const wrapper = mount(AppPagination, {
      props: {
        totalItems: 50,
        itemsPerPage: 10,
        currentPage: 3,
      },
    });

    const prevButton = wrapper.find('.pagination__button:first-child');
    await prevButton.trigger('click');
    
    expect(wrapper.emitted('update:currentPage')).toBeTruthy();
    expect(wrapper.emitted('update:currentPage')?.[0]).toEqual([2]);
  });
});
