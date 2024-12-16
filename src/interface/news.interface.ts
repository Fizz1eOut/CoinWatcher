// Интерфейс описывает структуру данных для одной новости
export interface NewsItem {
  id: number;
  title: string;
  body: string;
  imageurl: string;
  source: string;
  date: string;
  tags: string[];
  url: string;
  published_on: number;
}

// Интерфейс описывает ответ от API, содержащий массив новостей
export interface NewsResponse {
  Data: NewsItem[]; // Массив объектов типа `NewsItem`, представляющий список новостей
}
