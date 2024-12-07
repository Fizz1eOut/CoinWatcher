import { fetchData } from '@/components/modules/http';

// Функция для получения трендовых криптовалют
export const getTrendingCoins = async (limit: number = 50, page: number = 0) => {
  const url = `${import.meta.env.VITE_BASE_URL}data/top/totalvolfull?limit=${limit}&tsym=USD&page=${page}&api_key=${import.meta.env.VITE_API_KEY}`;
  return fetchData(url);
};
