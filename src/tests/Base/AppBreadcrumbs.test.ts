import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { createRouter, createWebHashHistory } from 'vue-router';
import AppBreadcrumbs from '@/components/Base/AppBreadcrumbs.vue';
import AppLink from '@/components/Base/AppLink.vue';
import AppIcon from '@/components/Base/AppIcon.vue';
import HomeView from '@/views/HomeView.vue';
import CoinsView from '@/views/CoinsView.vue';
import ExchangersView from '@/views/ExchangersView.vue';
import NewsView from '@/views/NewsView.vue';
import CoinDetailView from '@/views/CoinDetailView.vue';
import BriefcaseView from '@/views/BriefcaseView.vue';

const router = createRouter({
  history: createWebHashHistory('/CoinWatcher'),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Home' } },
    { path: '/coins', name: 'coins', component: CoinsView, meta: { title: 'Coins' } },
    { path: '/exchangers', name: 'exchangers', component: ExchangersView, meta: { title: 'Exchangers' } },
    { path: '/news', name: 'news', component: NewsView, meta: { title: 'News' } },
    { path: '/coin/:name', component: CoinDetailView, name: 'CoinDetailView', props: true },
    { path: '/briefcase', name: 'briefcase', component: BriefcaseView, meta: { title: 'Briefcase' } },
  ],
});

describe('AppBreadcrumbs.vue', () => {
  it('Отображает домашнюю хлебную крошку по умолчанию', async () => {
    router.push('/');
    await router.isReady();
    
    const wrapper = mount(AppBreadcrumbs, {
      global: {
        plugins: [router],
      },
    });
    
    expect(wrapper.findComponent(AppLink).text()).toBe('Home');
  });

  it('Корректно отображает хлебные крошки в зависимости от маршрута', async () => {
    await router.push('/coins');
    await router.isReady();

    const wrapper = mount(AppBreadcrumbs, {
      global: {
        plugins: [router],
      },
    });

    const links = wrapper.findAllComponents(AppLink);
    expect(links).toHaveLength(2);
    expect(links[0].text()).toBe('Home');
    expect(links[1].text()).toBe('Coins');
  });


  it('Добавляет динамическую хлебную крошку при передаче coinName', async () => {
    router.push('/coin/bitcoin');
    await router.isReady();
    
    const wrapper = mount(AppBreadcrumbs, {
      props: { coinName: 'Bitcoin' },
      global: {
        plugins: [router],
      },
    });
    
    const links = wrapper.findAllComponents(AppLink);
    expect(links).toHaveLength(3);
    expect(links[2].text()).toBe('Bitcoin');
  });

  it('Отображает иконки между хлебными крошками, кроме последней', async () => {
    router.push('/exchangers');
    await router.isReady();
    
    const wrapper = mount(AppBreadcrumbs, {
      global: {
        plugins: [router],
      },
    });
    
    const icons = wrapper.findAllComponents(AppIcon);
    expect(icons).toHaveLength(1);
  });
});
