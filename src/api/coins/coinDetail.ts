import { fetchData } from '@/components/modules/http';
import type { CoinDetailResponse } from '@/interface/coinDetail.interface';

export const getCoinDetail = async (coinName: string): Promise<CoinDetailResponse> => {
  const params = new URLSearchParams({
    fsyms: coinName,
    tsyms: 'USD',
    api_key: import.meta.env.VITE_API_KEY,
  });

  const url = `${import.meta.env.VITE_BASE_URL}data/pricemultifull?${params.toString()}`;
  return fetchData<CoinDetailResponse>(url);
};
