import { fetchData } from '@/components/modules/http';
import type { HistoricalData, MarketCapEntry } from '@/interface/marketCaps.interface';

// Функция для получения исторических данных по отдельным криптовалютам
// symbols - массив символов криптовалют, для которых нужно получить данные
// Возвращает массив объектов MarketCapEntry, каждый из которых содержит символ криптовалюты и её исторические данные
export const getHistoricalMarketCaps = async (symbols: string[]): Promise<MarketCapEntry[]> => {
  const marketCaps: MarketCapEntry[] = []; // Массив для хранения данных по каждой криптовалюте

  // Перебор всех символов криптовалют
  for (const symbol of symbols) {
    // Формируем URL для получения исторических данных с API
    const url = `${import.meta.env.VITE_BASE_URL}data/v2/histoday?fsym=${symbol}&tsym=USD&limit=30&api_key=${import.meta.env.VITE_API_KEY}`;
    
    // Делаем запрос и ожидаем получения данных с типизацией { Data: { Data: HistoricalData[] } }
    const data = await fetchData<{ Data: { Data: HistoricalData[] } }>(url);

    // Если полученные данные корректные, добавляем их в массив marketCaps
    if (data.Data && data.Data.Data) {
      marketCaps.push({ symbol, history: data.Data.Data });
    }
  }

  return marketCaps; // Возвращаем массив с историческими данными для всех криптовалют
};
