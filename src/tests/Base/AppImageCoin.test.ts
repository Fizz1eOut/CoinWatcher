import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AppImageCoin from '@/components/Base/AppImageCoin.vue';

describe('AppImageCoin.vue', () => {
  it('рендерит изображение с полным URL, если передан imageUrl', () => {
    const wrapper = mount(AppImageCoin, {
      props: {
        imageUrl: '/media/12345.png',
      },
    });

    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('https://cryptocompare.com/media/12345.png');
  });

  it('рендерит изображение-заглушку, если imageUrl не передан', () => {
    const wrapper = mount(AppImageCoin, {
      props: {
        imageUrl: '',
      },
    });

    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png');
  });

  it('применяет правильные стили к изображению', () => {
    const wrapper = mount(AppImageCoin, {
      props: {
        imageUrl: '/media/12345.png',
      },
    });

    const img = wrapper.find('img');
    expect(img.classes()).toContain('image');
  });
});
