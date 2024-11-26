import { fetchData } from '@/components/modules/http';

// Функция для получения рыночной информации
export const getMarketOverview = async () => {
  const url = `${import.meta.env.VITE_BASE_URL}data/top/mktcapfull?limit=10&tsym=USD&api_key=${import.meta.env.VITE_API_KEY}`;
  return fetchData(url);
};
