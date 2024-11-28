// Интерфейс для описания структуры данных исторических данных для одной криптовалюты
export interface HistoricalData {
  time: number; // Время (timestamp) для этого дня
  close: number; // Цена закрытия
  high: number;  // Максимальная цена
  low: number;   // Минимальная цена
  open: number;  // Цена открытия
  volumefrom: number; // Объем торговли в валюте исходной криптовалюты
  volumeto: number;   // Объем торговли в валюте назначения (например, USD)
  market_cap?: number; // Рыночная капитализация (опционально)
}

// Интерфейс для описания объекта с историческими данными для одной криптовалюты
export interface MarketCapEntry {
  symbol: string; // Символ криптовалюты (например, 'BTC', 'ETH')
  history: HistoricalData[]; // Исторические данные для этой криптовалюты
}
