// Интерфейс для описания данных о конкретной бирже
export interface ExchangeData {
  Id: string; // Уникальный идентификатор биржи
  Name: string; // Название биржи
  AffiliateURL?: string; // Ссылка на официальный сайт биржи
  Grade: string; // Буквенный рейтинг биржи (например, AA, BB)
  GradePoints: string; // Количество очков рейтинга (числовое значение, например, 92)
  GradeClassification: string; // Классификация рейтинга (например, Excellent, Good)
  Country?: string; // Страна, в которой зарегистрирована биржа (например, USA, Japan)
  Trades: boolean; // бирж, которые поддерживают торги.
  LogoUrl: string; // URL логотипа биржи для отображения в интерфейсе
  TOTALVOLUME24H: number; // Общий объем торгов за последние 24 часа в числовом формате.
  DISPLAYTOTALVOLUME24H: { BTC: string };
};

// Интерфейс для описания ответа API, содержащего данные о биржах 
export interface ExchangesResponse {
  Data: ExchangeData; // Основные данные о биржах, сгруппированные по их названиям
}
