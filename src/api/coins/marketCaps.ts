import { fetchData } from '@/components/modules/http';
import type { HistoricalData, MarketCapEntry } from '@/interface/marketCaps.interface';

export const getHistoricalMarketCaps = async (symbols: string[]): Promise<MarketCapEntry[]> => {
  const marketCaps: MarketCapEntry[] = [];

  for (const symbol of symbols) {
    const params = new URLSearchParams({
      fsym: symbol,
      tsym: 'USD',
      limit: '30',
      api_key: import.meta.env.VITE_API_KEY,
    });

    const url = `${import.meta.env.VITE_BASE_URL}data/v2/histoday?${params.toString()}`;
    const data = await fetchData<{ Data: { Data: HistoricalData[] } }>(url);

    if (data.Data && data.Data.Data) {
      marketCaps.push({ symbol, history: data.Data.Data });
    }
  }

  return marketCaps;
};
