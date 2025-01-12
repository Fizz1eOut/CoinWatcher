import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AppLoadingSpinner from '@/components/Base/AppLoadingSpinner.vue';

describe('AppLoadingSpinner.vue', () => {
  it('рендерит компонент с дефолтными стилями', () => {
    const wrapper = mount(AppLoadingSpinner);

    const loader = wrapper.find('.loader');
    expect(loader.exists()).toBe(true);

    const spinner = loader.find('.spinner');
    expect(spinner.exists()).toBe(true);

    // Проверяем дефолтные стили
    expect(loader.attributes('style')).toBe(undefined); // Нет стиля height по умолчанию
    expect(spinner.attributes('style')).toBe(undefined); // Нет стилей размера и ширины бордюра
  });

  it('применяет правильные стили контейнера и спиннера при передаче пропсов', () => {
    const wrapper = mount(AppLoadingSpinner, {
      props: {
        size: '50px',
        borderWidth: '5px',
        height: '100px',
      },
    });

    const loader = wrapper.find('.loader');
    expect(loader.exists()).toBe(true);

    // Проверяем стили контейнера
    expect(loader.attributes('style')).toContain('height: 100px;');

    const spinner = loader.find('.spinner');
    expect(spinner.exists()).toBe(true);

    // Проверяем стили спиннера
    expect(spinner.attributes('style')).toContain('width: 50px;');
    expect(spinner.attributes('style')).toContain('height: 50px;');
    expect(spinner.attributes('style')).toContain('border-width: 5px;');
  });
});
