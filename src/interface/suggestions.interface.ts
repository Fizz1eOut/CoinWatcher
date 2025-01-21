export interface CoinInfo {
  Id: string; // Уникальный идентификатор монеты
  Name: string; // Название монеты
  FullName: string; // Полное название монеты
  ImageUrl?: string; // URL изображения монеты (опционально)
}

export interface DisplayData {
  PRICE?: string; // Текущая цена
  MKTCAP?: string; // Рыночная капитализация
  TOTALVOLUME24H?: string; // Объем торгов за 24 часа
  CHANGEPCT24HOUR?: string; // Изменение цены за 24 часа в процентах
  [key: string]: string | undefined; // Для возможных дополнительных свойств
}

export interface CoinSuggestion {
  CoinInfo: CoinInfo; // Информация о монете
  DISPLAY?: DisplayData; // Опциональная дополнительная информация (например, цена и объем)
}
