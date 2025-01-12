import { fetchData } from '@/components/modules/http';
import type { HistoricalData, MarketCapEntry } from '@/interface/marketCaps.interface';

class ApiClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = `${import.meta.env.VITE_BASE_URL}data/`;
    this.apiKey = `&api_key=${import.meta.env.VITE_API_KEY}`;
  }

  async get<T>(url: string): Promise<T> {
    const fullUrl = `${this.baseUrl}${url}${this.apiKey}`;
    return fetchData<T>(fullUrl);
  }
}

const apiClient = new ApiClient();

export const getHistoricalMarketCaps = async (symbols: string[]): Promise<MarketCapEntry[]> => {
  const marketCaps: MarketCapEntry[] = [];

  for (const symbol of symbols) {
    const url = `v2/histoday?fsym=${symbol}&tsym=USD&limit=30`;

    const data = await apiClient.get<{ Data: { Data: HistoricalData[] } }>(url);

    if (data.Data && data.Data.Data) {
      marketCaps.push({ symbol, history: data.Data.Data });
    }
  }

  return marketCaps;
};
