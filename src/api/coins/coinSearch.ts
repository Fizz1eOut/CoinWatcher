import { fetchData } from '@/components/modules/http';
import type { CoinSearchResponse } from '@/interface/coinSearch.interface';

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

export const getCoinSearch = async (coinName: string): Promise<CoinSearchResponse> => {
  const url = `pricemultifull?fsyms=${coinName}&tsyms=USD`;
  const data = await apiClient.get<CoinSearchResponse>(url);
  return data;
};
