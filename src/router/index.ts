import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouterScrollBehavior } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CoinsView from '@/views/CoinsView.vue';
import ExchangersView from '@/views/ExchangersView.vue';
import NewsView from '@/views/NewsView.vue';
import CoinDetailView from '@/views/CoinDetailView.vue';
import BriefcaseView from '@/views/BriefcaseView.vue';

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  } else if (to.path !== from.path) {
    return { top: 0 };
  }
  return {};
};

const router = createRouter({
  history: createWebHashHistory('/CoinWatcher'),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Home' } },
    { path: '/coins', name: 'coins', component: CoinsView, meta: { title: 'Coins' } },
    { path: '/exchangers', name: 'exchangers', component: ExchangersView, meta: { title: 'Exchangers' } },
    { path: '/news', name: 'news', component: NewsView, meta: { title: 'News' } },
    { path: '/coin/:name', component: CoinDetailView, name: 'CoinDetailView', props: true, },
    { path: '/briefcase', name: 'briefcase', component: BriefcaseView, meta: { title: 'Briefcase' } },
  ],
  scrollBehavior,
});

export default router;
