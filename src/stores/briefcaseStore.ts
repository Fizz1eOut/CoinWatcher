import { defineStore } from 'pinia';
import type { CoinDetail } from '@/interface/coinSearch.interface';

export const useBriefcaseStore = defineStore('briefcase', {
  state: () => ({
    briefcase: (JSON.parse(localStorage.getItem('briefcase') || '[]') as CoinDetail[]),
  }),
  actions: {
    addCoin(coin: CoinDetail) {
      if (!this.briefcase.find((item) => item.id === coin.id)) {
        this.briefcase.push(coin);
        this.saveToLocalStorage();
      }
    },
    removeCoin(id: string) {
      this.briefcase = this.briefcase.filter((coin) => coin.id !== id);
      this.saveToLocalStorage();
    },

    saveToLocalStorage() {
      localStorage.setItem('briefcase', JSON.stringify(this.briefcase));
    }
  },
});
