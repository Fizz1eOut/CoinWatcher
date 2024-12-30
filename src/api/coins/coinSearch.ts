import { fetchData } from '@/components/modules/http';
import type { CoinSearchResponse } from '@/interface/coinSearch.interface';

export const getCoinSearch = async (coinName: string): Promise<CoinSearchResponse> => {
  const url = `${import.meta.env.VITE_BASE_URL}data/pricemultifull?fsyms=${coinName}&tsyms=USD&api_key=${import.meta.env.VITE_API_KEY}`;
  const data = await fetchData<CoinSearchResponse>(url);
  return data;
};
