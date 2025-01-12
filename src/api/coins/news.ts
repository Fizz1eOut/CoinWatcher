import { fetchData } from '@/components/modules/http';
import type { NewsResponse } from '@/interface/news.interface';

class ApiClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = `${import.meta.env.VITE_BASE_URL}data/v2/news/?lang=EN`;
    this.apiKey = `&api_key=${import.meta.env.VITE_API_KEY}`;
  }

  async get(url: string): Promise<NewsResponse> {
    const fullUrl = `${this.baseUrl}${url}${this.apiKey}`;
    return fetchData<NewsResponse>(fullUrl);
  }
}

const apiClient = new ApiClient();

export const getNews = async (cryptoName?: string): Promise<NewsResponse> => {
  const url = cryptoName ? `&categories=${cryptoName}` : '';
  return apiClient.get(url);
};
