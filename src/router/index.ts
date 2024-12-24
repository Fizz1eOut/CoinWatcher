import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CoinsView from '@/views/CoinsView.vue';
import ExchangersView from '@/views/ExchangersView.vue';
import ConverterView from '@/views/ConverterView.vue';
import ComparisonView from '@/views/ComparisonView.vue';
import NewsView from '@/views/NewsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/coins', name: 'coins', component: CoinsView },
    { path: '/exchangers', name: 'exchangers', component: ExchangersView },
    { path: '/converter', name: 'converter', component: ConverterView },
    { path: '/comparison', name: 'comparison', component: ComparisonView },
    { path: '/news', name: 'news', component: NewsView },
  ],
});

export default router;

