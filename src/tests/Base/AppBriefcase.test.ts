import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useBriefcaseStore } from '@/stores/briefcaseStore';
import AppBriefcase from '@/components/Base/AppBriefcase.vue';
import type { CoinDetail } from '@/interface/coinDetail.interface';

describe('AppBriefcase.vue', () => {
  it('должен отображать количество элементов в портфеле', async () => {
    setActivePinia(createPinia()); // Активируем новый экземпляр Pinia

    const store = useBriefcaseStore();

    // Создаем тестовые данные с типом CoinDetail
    const testCoins: CoinDetail[] = [
      {
        id: 'btc',
        Name: 'Bitcoin',
        ImageUrl: 'https://example.com/btc.png',
        DISPLAY: {
          PRICE: 50000,
          MKTCAP: '900B',
          TOTALVOLUME24H: '50B',
          CHANGEPCT24HOUR: '2%',
          IMAGEURL: 'https://example.com/btc.png',
        },
      },
      {
        id: 'eth',
        Name: 'Ethereum',
        ImageUrl: 'https://example.com/eth.png',
        DISPLAY: {
          PRICE: 3000,
          MKTCAP: '350B',
          TOTALVOLUME24H: '20B',
          CHANGEPCT24HOUR: '1%',
          IMAGEURL: 'https://example.com/eth.png',
        },
      },
    ];

    // Добавляем тестовые данные в store
    store.briefcase = testCoins;

    const wrapper = mount(AppBriefcase);

    const quantity = wrapper.find('.briefcase__quantity');
    expect(quantity.exists()).toBe(true);
    expect(quantity.text()).toBe('2'); // Проверяем, что отобразилось корректное число
  });

  it('должен отображать 0, если портфель пуст', () => {
    setActivePinia(createPinia()); // Активируем новый экземпляр Pinia

    const store = useBriefcaseStore();
    store.briefcase = []; // Пустой портфель

    const wrapper = mount(AppBriefcase);

    expect(wrapper.find('.briefcase__quantity').text()).toBe('0');
  });
});
