// Интерфейс описывает информацию о криптовалюте
export interface CoinInfo {
  Name: string; // Название криптовалюты (например, "BTC" для Bitcoin)
  ImageUrl: string;
}

export interface DisplayData {
  USD: {
    MKTCAP: string; // Рыночная капитализация
    TOTALVOLUME24H: string; // Объем торгов за 24 часа
    CHANGEPCT24HOUR: string; // Изменение цены за 24 часа
    [key: string]: string | undefined; // Для возможных дополнительных свойств
  };
}

// Интерфейс описывает одну криптовалюту, объединяя информацию о ней (CoinInfo)
export interface TopCoin {
  CoinInfo: CoinInfo; // Объект с информацией о криптовалюте (например, её название)
  DISPLAY?: DisplayData; // Опциональное свойство с дополнительной информацией
}

// Интерфейс описывает ответ от API, содержащий массив топовых криптовалют
export interface TopCoinsResponse {
  Data: TopCoin[]; // Массив объектов типа `TopCoin`, представляющий список криптовалют
}
