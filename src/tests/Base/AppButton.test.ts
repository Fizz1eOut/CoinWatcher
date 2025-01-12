import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AppButton from '@/components/Base/AppButton.vue';

describe('AppButton.vue', () => {
  it('рендерится с правильным классом по умолчанию', () => {
    const wrapper = mount(AppButton);
    expect(wrapper.classes()).toContain('button');
  });

  it('применяет класс button-gradient, если передан проп gradient', () => {
    const wrapper = mount(AppButton, {
      props: { gradient: true },
    });
    expect(wrapper.classes()).toContain('button-gradient');
  });

  it('применяет класс button-outline, если передан проп outline', () => {
    const wrapper = mount(AppButton, {
      props: { outline: true },
    });
    expect(wrapper.classes()).toContain('button-outline');
  });

  it('применяет класс button-disabled, если передан проп disabled', () => {
    const wrapper = mount(AppButton, {
      props: { disabled: true },
    });
    expect(wrapper.classes()).toContain('button-disabled');
    expect(wrapper.attributes('disabled')).toBeDefined();
  });

  it('корректно комбинирует классы при нескольких пропсах', () => {
    const wrapper = mount(AppButton, {
      props: {
        gradient: true,
        outline: true,
        disabled: true,
      },
    });
    // Проверяем, что все соответствующие классы добавлены
    expect(wrapper.classes()).toContain('button-gradient');
    expect(wrapper.classes()).toContain('button-outline');
    expect(wrapper.classes()).toContain('button-disabled');
  });

  it('отображает содержимое слота', () => {
    const slotContent = '<span>Нажми меня</span>';
    const wrapper = mount(AppButton, {
      slots: {
        default: slotContent,
      },
    });
    // Проверяем, что контент отображается
    expect(wrapper.html()).toContain(slotContent);
  });

  it('не добавляет ненужные классы, если пропсы не переданы', () => {
    const wrapper = mount(AppButton);
    expect(wrapper.classes()).not.toContain('button-gradient');
    expect(wrapper.classes()).not.toContain('button-outline');
    expect(wrapper.classes()).not.toContain('button-disabled');
  });
});
