import { fetchData } from '@/components/modules/http';
import type { ExchangesResponse } from '@/interface/exchanges.interface';

export const getExchanges = async () => {
  const url = `${import.meta.env.VITE_BASE_URL}data/exchanges/general?api_key=${import.meta.env.VITE_API_KEY}`;
  const data = await fetchData<ExchangesResponse>(url);

  // Преобразуем объект бирж в массив и добавляем ключ ID
  const exchangesArray = Object.entries(data.Data).map(([exchangeKey, exchangeData]) => ({
    Id: exchangeKey,
    Name: exchangeData.Name,
    ...exchangeData,
  }));

  // Сортируем биржи по GradePoints в убывающем порядке
  const sortedExchanges = exchangesArray.sort((a, b) => b.GradePoints - a.GradePoints);

  return sortedExchanges;
};
