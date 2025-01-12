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

export const getTrendingCoins = async () => {
  const url = 'top/mktcapfull?limit=50&tsym=USD';
  const data = await apiClient.get(url);

  const coinsWithChange = data.Data.filter(
    (coin) => coin.DISPLAY?.USD?.CHANGEPCT24HOUR !== undefined
  );

  const topGainers = coinsWithChange
    .slice()
    .sort(
      (a, b) =>
        (b.DISPLAY?.USD?.CHANGEPCT24HOUR
          ? parseFloat(b.DISPLAY.USD.CHANGEPCT24HOUR)
          : 0) -
        (a.DISPLAY?.USD?.CHANGEPCT24HOUR
          ? parseFloat(a.DISPLAY.USD.CHANGEPCT24HOUR)
          : 0)
    );

  const topLosers = coinsWithChange
    .slice()
    .sort(
      (a, b) =>
        (a.DISPLAY?.USD?.CHANGEPCT24HOUR
          ? parseFloat(a.DISPLAY.USD.CHANGEPCT24HOUR)
          : 0) -
        (b.DISPLAY?.USD?.CHANGEPCT24HOUR
          ? parseFloat(b.DISPLAY.USD.CHANGEPCT24HOUR)
          : 0)
    );

  return {
    topGainers,
    topLosers,
  };
};
