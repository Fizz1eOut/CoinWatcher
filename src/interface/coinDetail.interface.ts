export interface SeacrchDetail {
  USD: {
    PRICE: number; // Цена
    MKTCAP: string; // Рыночная капитализация
    TOTALVOLUME24H: string; // Объем за 24 часа
    CHANGEPCT24HOUR: string; // Изменение цены за 24 часа
    IMAGEURL: string; // URL изображения
  };
}

// Интерфейс описывает ответ от API, содержащий данные о криптовалюте
export interface CoinDetailResponse {
  RAW: {
    [key: string]: SeacrchDetail; // Динамические ключи (например, "BTC") с данными типа `CoinRawData`
  };
}

// Интерфейс для удобного отображения данных в компоненте
export interface CoinDetail {
  id: string;
  Name: string; // Название криптовалюты
  ImageUrl: string; // URL изображения
  DISPLAY: SeacrchDetail['USD']; // Данные по USD
}
