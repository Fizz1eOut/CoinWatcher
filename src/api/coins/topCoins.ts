import { fetchData } from '@/components/modules/http';
import type { TopCoinsResponse } from '@/interface/topCoins.interface';

export const getTopCoins = async (): Promise<TopCoinsResponse> => {
  const url = `${import.meta.env.VITE_BASE_URL}data/top/mktcapfull?limit=50&tsym=USD&api_key=${import.meta.env.VITE_API_KEY}`;
  const data = await fetchData<TopCoinsResponse>(url);

  // Фильтрация валют с наличием DISPLAY
  const filteredData = {
    ...data,
    Data: data.Data.filter((coin) => coin.DISPLAY),
  };

  return filteredData;
};
