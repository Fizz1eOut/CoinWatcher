import { fetchData } from '@/components/modules/http';
import type { ExchangesResponse } from '@/interface/exchanges.interface';

export const getExchanges = async (cryptoName?: string) => {
  const params = new URLSearchParams({
    api_key: import.meta.env.VITE_API_KEY,
  });

  if (cryptoName) {
    params.append('coin', cryptoName);
  }

  const url = `${import.meta.env.VITE_BASE_URL}data/exchanges/general?${params.toString()}`;
  const data = await fetchData<ExchangesResponse>(url);

  const exchangesArray = Object.entries(data.Data).map(([exchangeKey, exchangeData]) => ({
    Id: exchangeKey,
    Name: exchangeData.Name,
    ...exchangeData,
  }));

  const sortedExchanges = exchangesArray.sort((a, b) => b.GradePoints - a.GradePoints);

  return sortedExchanges;
};
