import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AppModal from '@/components/Base/AppModal.vue';

// Определяем глобальные stub‑ы для Teleport, Transition и app-container,
// чтобы содержимое рендерилось прямо в дереве компонентов.
const globalStubs = {
  Teleport: true,
  Transition: true,
  'app-container': true,
};

describe('AppModal', () => {
  it('рендерит модал, когда modelValue равно true', async () => {
    const wrapper = mount(AppModal, {
      props: { modelValue: true },
      global: { stubs: globalStubs },
    });
    // Проверяем, что элемент с классом .modal отрендерен
    expect(wrapper.find('.modal').exists()).toBe(true);
  });

  it('не рендерит модал, когда modelValue равно false', async () => {
    const wrapper = mount(AppModal, {
      props: { modelValue: false },
      global: { stubs: globalStubs },
    });
    // Элемента .modal не должно быть в DOM
    expect(wrapper.find('.modal').exists()).toBe(false);
  });

  it('излучает "update:modelValue" со значением false, когда кликаем на оверлей', async () => {
    const wrapper = mount(AppModal, {
      props: { modelValue: true },
      global: { stubs: globalStubs },
    });

    // Ищем оверлей внутри модала
    const overlay = wrapper.find('.overlay');
    expect(overlay.exists()).toBe(true);

    // Кликаем по оверлею (используем @click.self, поэтому клик именно по .overlay)
    await overlay.trigger('click');

    // Проверяем, что событие update:modelValue эмитилось с аргументом false
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([false]);
  });

  it('не излучает событие при клике в контентную область', async () => {
    const wrapper = mount(AppModal, {
      props: { modelValue: true },
      global: { stubs: globalStubs },
    });

    const content = wrapper.find('.content');
    expect(content.exists()).toBe(true);

    // Клик по контенту не должен вызывать закрытие модала
    await content.trigger('click');
    expect(wrapper.emitted()['update:modelValue']).toBeUndefined();
  });

  it('применяет проп contentStyle корректно', async () => {
    const wrapper = mount(AppModal, {
      props: {
        modelValue: true,
        contentStyle: { backgroundColor: 'red' },
      },
      global: { stubs: globalStubs },
    });

    const content = wrapper.find('.content');
    expect(content.exists()).toBe(true);

    // Можно проверить, что атрибут style содержит нужное правило.
    // Обратите внимание, что в тестовой среде стили могут задаваться inline в формате CSS.
    const styleAttr = content.attributes('style');
    expect(styleAttr).toContain('background-color: red');
  });
});
