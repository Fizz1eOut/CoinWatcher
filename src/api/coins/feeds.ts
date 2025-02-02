import { fetchData } from '@/components/modules/http';

export interface NewsFeed {
  key: string;  // Уникальный идентификатор источника
  name: string; // Название источника (человекочитаемое)
}

// Интерфейс для ответа API
interface NewsFeedsResponse {
  Data: {
    Feeds: NewsFeed[];
  };
}

// Функция для получения списка всех доступных источников новостей
export const getNewsFeeds = async (): Promise<NewsFeed[]> => {
  const params = new URLSearchParams({
    api_key: import.meta.env.VITE_API_KEY,
  });

  const fullUrl = `${import.meta.env.VITE_BASE_URL}data/news/feedsandcategories?${params.toString()}`;

  return fetchData<NewsFeedsResponse>(fullUrl)
    .then(response => {

      if (!response?.Data?.Feeds || !Array.isArray(response.Data.Feeds)) {
        return [];
      }

      return response.Data.Feeds;
    })
    .catch(error => {
      console.error('Error fetching news feeds:', error);
      return [];
    });
};

