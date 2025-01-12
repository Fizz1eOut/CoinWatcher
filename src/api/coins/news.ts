import { fetchData } from '@/components/modules/http';
import type { NewsResponse } from '@/interface/news.interface';

// Функция для получения последних новостей для конкретной криптовалюты
export const getNews = async (cryptoName?: string): Promise<NewsResponse> => {
  const baseUrl = `${import.meta.env.VITE_BASE_URL}data/v2/news/?lang=EN&api_key=${import.meta.env.VITE_API_KEY}`;

  const url = cryptoName 
    ? `${baseUrl}&categories=${cryptoName}`
    : baseUrl;

  return fetchData<NewsResponse>(url);
};
