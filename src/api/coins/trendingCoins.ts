import { fetchData } from '@/components/modules/http';
import type { TopCoinsResponse } from '@/interface/topCoins.interface';

export const getTrendingCoins = async () => {
  const url = `${import.meta.env.VITE_BASE_URL}data/top/mktcapfull?limit=50&tsym=USD&api_key=${import.meta.env.VITE_API_KEY}`;
  const data = await fetchData<TopCoinsResponse>(url);

  // Фильтрация: только монеты с CHANGEPCT24HOUR
  const coinsWithChange = data.Data.filter(
    (coin) => coin.DISPLAY?.USD?.CHANGEPCT24HOUR !== undefined
  );

  // Лидеры роста
  const topGainers = [...coinsWithChange] // Клонируем массив
    .sort(
      (a, b) =>
        (b.DISPLAY?.USD?.CHANGEPCT24HOUR
          ? parseFloat(b.DISPLAY.USD.CHANGEPCT24HOUR)
          : 0) -
        (a.DISPLAY?.USD?.CHANGEPCT24HOUR
          ? parseFloat(a.DISPLAY.USD.CHANGEPCT24HOUR)
          : 0)
    );

  // Лидеры падения
  const topLosers = [...coinsWithChange] // Клонируем массив
    .sort(
      (a, b) =>
        (a.DISPLAY?.USD?.CHANGEPCT24HOUR
          ? parseFloat(a.DISPLAY.USD.CHANGEPCT24HOUR)
          : 0) -
        (b.DISPLAY?.USD?.CHANGEPCT24HOUR
          ? parseFloat(b.DISPLAY.USD.CHANGEPCT24HOUR)
          : 0)
    );

  return {
    topGainers,
    topLosers,
  };
};

