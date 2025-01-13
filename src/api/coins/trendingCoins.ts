import { fetchData } from '@/components/modules/http';
import type { TopCoinsResponse } from '@/interface/topCoins.interface';

export const getTrendingCoins = async () => {
  const params = new URLSearchParams({
    limit: '50',
    tsym: 'USD',
    api_key: import.meta.env.VITE_API_KEY,
  });

  const url = `${import.meta.env.VITE_BASE_URL}data/top/mktcapfull?${params.toString()}`;
  const data = await fetchData<TopCoinsResponse>(url);

  const coinsWithChange = data.Data.filter(
    (coin) => coin.DISPLAY?.USD?.CHANGEPCT24HOUR !== undefined
  );

  const topGainers = coinsWithChange
    .slice()
    .sort(
      (a, b) =>
        (b.DISPLAY?.USD?.CHANGEPCT24HOUR
          ? parseFloat(b.DISPLAY.USD.CHANGEPCT24HOUR)
          : 0) -
        (a.DISPLAY?.USD?.CHANGEPCT24HOUR
          ? parseFloat(a.DISPLAY.USD.CHANGEPCT24HOUR)
          : 0)
    );

  const topLosers = coinsWithChange
    .slice()
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

