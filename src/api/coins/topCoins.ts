import { fetchData } from '@/components/modules/http';
import type { TopCoinsResponse } from '@/interface/topCoins.interface';

class ApiClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = `${import.meta.env.VITE_BASE_URL}data/`;
    this.apiKey = `&api_key=${import.meta.env.VITE_API_KEY}`;
  }

  async get(url: string): Promise<TopCoinsResponse> {
    const fullUrl = `${this.baseUrl}${url}${this.apiKey}`;
    return fetchData<TopCoinsResponse>(fullUrl);
  }
}

const apiClient = new ApiClient();

export const getTopCoins = async (): Promise<TopCoinsResponse> => {
  const url = 'top/mktcapfull?limit=50&tsym=USD';
  const data = await apiClient.get(url);

  const filteredData = {
    ...data,
    Data: data.Data.filter((coin) => coin.DISPLAY),
  };

  return filteredData;
};
