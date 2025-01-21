import { fetchData } from '@/components/modules/http';
import type { CoinInfo } from '@/interface/suggestions.interface';

export const getCoinSuggestions = async (): Promise<CoinInfo[]> => {
  const params = new URLSearchParams({
    api_key: import.meta.env.VITE_API_KEY,
  });

  const url = `${import.meta.env.VITE_BASE_URL}data/all/coinlist?${params.toString()}`;
  const response = await fetchData<{ Data: Record<string, CoinInfo> }>(url);

  return Object.values(response.Data);
};
