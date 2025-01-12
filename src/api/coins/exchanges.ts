import { fetchData } from '@/components/modules/http';
import type { ExchangesResponse } from '@/interface/exchanges.interface';

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

export const getExchanges = async (cryptoName?: string) => {
  const url = `exchanges/general?api_key=${import.meta.env.VITE_API_KEY}${cryptoName ? `&coin=${cryptoName}` : ''}`;

  const data = await apiClient.get<ExchangesResponse>(url);

  const exchangesArray = Object.entries(data.Data).map(([exchangeKey, exchangeData]) => ({
    Id: exchangeKey,
    Name: exchangeData.Name,
    ...exchangeData,
  }));

  const sortedExchanges = exchangesArray.sort((a, b) => b.GradePoints - a.GradePoints);

  return sortedExchanges;
};

