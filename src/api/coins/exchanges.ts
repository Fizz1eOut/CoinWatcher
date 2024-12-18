import { fetchData } from '@/components/modules/http';

export const getExchanges = async () => {
  const url = `${import.meta.env.VITE_BASE_URL}data/exchanges/general?api_key=${import.meta.env.VITE_API_KEY}`;
  return fetchData(url);
};
