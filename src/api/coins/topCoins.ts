import { fetchData } from '@/components/modules/http';
import type { TopCoinsResponse } from '@/interface/topCoins.interface';

export const getTopCoins = async (): Promise<TopCoinsResponse> => {
  const params = new URLSearchParams({
    limit: '50',
    tsym: 'USD',
    api_key: import.meta.env.VITE_API_KEY,
  });

  const url = `${import.meta.env.VITE_BASE_URL}data/top/mktcapfull?${params.toString()}`;
  const data = await fetchData<TopCoinsResponse>(url);

  const filteredData = {
    ...data,
    Data: data.Data.filter((coin) => coin.DISPLAY),
  };

  return filteredData;
};
