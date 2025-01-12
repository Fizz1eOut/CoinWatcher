import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AppContainer from '@/components/Base/AppContainer.vue';

describe('AppContainer.vue', () => {
  it('рендерится с правильным классом по умолчанию', () => {
    const wrapper = mount(AppContainer);
    expect(wrapper.classes()).toContain('size-xs');
    expect(wrapper.classes()).toContain('container');
  });

  it('применяет класс, соответствующий переданному размеру', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    sizes.forEach((size) => {
      const wrapper = mount(AppContainer, {
        props: { size },
      });
      expect(wrapper.classes()).toContain(`size-${size}`);
    });
  });

  it('отображает содержимое слота', () => {
    const slotContent = '<p>Тестовый контент</p>';
    const wrapper = mount(AppContainer, {
      slots: {
        default: slotContent,
      },
    });
    expect(wrapper.html()).toContain(slotContent);
  });

  it('меняет класс при обновлении пропса size', async () => {
    const wrapper = mount(AppContainer, {
      props: { size: 'sm' },
    });
    expect(wrapper.classes()).toContain('size-sm');

    await wrapper.setProps({ size: 'lg' });
    expect(wrapper.classes()).toContain('size-lg');
  });
});
