import { fetchData } from '@/components/modules/http';
import type { HistoricalData, MarketCapEntry } from '@/interface/marketCaps.interface';

export const getHistoricalMarketCaps = async (symbols: string[], range: '1d' | '7d' | '1m'): Promise<MarketCapEntry[]> => {
  const marketCaps: MarketCapEntry[] = [];

  const endpointMap = {
    '1d': 'data/v2/histohour', // Запрос по часам
    '7d': 'data/v2/histoday',  // Запрос по дням
    '1m': 'data/v2/histoday',  // Запрос по дням
  };

  for (const symbol of symbols) {
    const params = new URLSearchParams({
      fsym: symbol,
      tsym: 'USD',
      limit: range === '1d' ? '8' : '30', // Для 1d - 24 часа, для других диапазонов - 30 дней
      api_key: import.meta.env.VITE_API_KEY,
    });

    const url = `${import.meta.env.VITE_BASE_URL}${endpointMap[range]}?${params.toString()}`;
    const data = await fetchData<{ Data: { Data: HistoricalData[] } }>(url);

    if (data.Data && data.Data.Data) {
      marketCaps.push({ symbol, history: data.Data.Data });
    }
  }

  return marketCaps;
};

