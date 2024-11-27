import { fetchData } from '@/components/modules/http';

// Функция для получения последних новостей
export const getNews = async () => {
  const url = `${import.meta.env.VITE_BASE_URL}data/v2/news/?lang=EN&api_key=${import.meta.env.VITE_API_KEY}`;
  return fetchData(url);
};
