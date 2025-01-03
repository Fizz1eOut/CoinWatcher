import { fetchData } from '@/components/modules/http';
import type { ExchangesResponse } from '@/interface/exchanges.interface';

export const getExchanges = async (cryptoName?: string) => {
  // Формируем URL с учетом имени криптовалюты, если оно указано
  const baseUrl = `${import.meta.env.VITE_BASE_URL}data/exchanges/general?api_key=${import.meta.env.VITE_API_KEY}`;
  const url = cryptoName 
    ? `${baseUrl}&coin=${cryptoName}` // Добавляем параметр coin, если передано имя криптовалюты
    : baseUrl;

  // Выполняем запрос
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
