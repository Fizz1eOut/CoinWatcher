import { fetchData } from '@/components/modules/http';
import type { TopCoinsResponse } from '@/interface/topCoins.interface';

export const getTopCoins = async (page: number = 1, limit: number = 100) => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    page: page.toString(),
    tsym: 'USD',
    api_key: import.meta.env.VITE_API_KEY,
  });

  const url = `${import.meta.env.VITE_BASE_URL}data/top/mktcapfull?${params.toString()}`;
  const data = await fetchData<TopCoinsResponse>(url);

  return {
    ...data,
    Data: data.Data.filter((coin) => coin.DISPLAY),
  };
};
