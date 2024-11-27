import { fetchData } from '@/components/modules/http';

// Функция для получения топ-10 криптовалют
export const getTopCoins = async () => {
  const url = `${import.meta.env.VITE_BASE_URL}data/top/totalvolfull?limit=10&tsym=USD&api_key=${import.meta.env.VITE_API_KEY}`;
  return fetchData(url);
};
