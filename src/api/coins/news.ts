import { fetchData } from '@/components/modules/http';
import type { NewsResponse } from '@/interface/news.interface';

export const getNews = async (cryptoName?: string, feeds?: string): Promise<NewsResponse> => {
  const params = new URLSearchParams({
    lang: 'EN',
    api_key: import.meta.env.VITE_API_KEY,
  });

  if (cryptoName) {
    params.append('categories', cryptoName);
  }

  if (feeds) {
    params.append('feeds', feeds);
  }

  const fullUrl = `${import.meta.env.VITE_BASE_URL}data/v2/news/?${params.toString()}`;
  return fetchData<NewsResponse>(fullUrl);
};
