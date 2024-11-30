interface PriceUpdate {
  coinName: string;
  price: number;
}

type Callback = (update: PriceUpdate) => void;

class WebSocketService {
  private socket: WebSocket | null = null; // WebSocket-соединение
  private subscriptions: Map<string, Callback[]> = new Map(); // Список подписчиков для каждой монеты
  private isConnected = false; // Флаг состояния соединения

  constructor() {
    // URL WebSocket с API ключом из .env файла
    const url = `wss://streamer.cryptocompare.com/v2?api_key=${import.meta.env.VITE_API_KEY}`;
    this.socket = new WebSocket(url); // Создаем WebSocket-соединение

    // Обработчик события при успешном подключении
    this.socket.onopen = () => {
      console.log("WebSocket connected."); // Лог успешного соединения
      this.isConnected = true; // Устанавливаем флаг подключения
    };

    // Обработчик входящих сообщений
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data); // Парсим входящие данные
      if (data.TYPE === "5" && data.PRICE) {
        // Проверяем, что тип сообщения соответствует цене
        const coinName = data.FROMSYMBOL; // Извлекаем название монеты
        const price = data.PRICE; // Извлекаем цену
        this.notifySubscribers(coinName, price); // Уведомляем подписчиков
      }
    };

    // Обработчик события закрытия соединения
    this.socket.onclose = () => {
      console.log("WebSocket disconnected."); // Лог отключения
      this.isConnected = false; // Сбрасываем флаг подключения
    };

    // Обработчик ошибки WebSocket
    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error); // Лог ошибки
    };
  }

  // Подписка на обновления цен для конкретной монеты
  subscribe(coinName: string, callback: Callback) {
    if (!this.isConnected) {
      console.error("WebSocket is not connected."); // Ошибка, если соединение отсутствует
      return;
    }

    // Если подписчиков для монеты еще нет, добавляем
    if (!this.subscriptions.has(coinName)) {
      this.subscriptions.set(coinName, []); // Создаем список подписчиков
      this.sendSubscriptionRequest(coinName); // Отправляем запрос на подписку
    }

    // Добавляем callback в список подписчиков для монеты
    this.subscriptions.get(coinName)?.push(callback);
  }

  // Отписка от обновлений цен для монеты
  unsubscribe(coinName: string, callback: Callback) {
    const subscribers = this.subscriptions.get(coinName); // Получаем список подписчиков
    if (subscribers) {
      const index = subscribers.indexOf(callback); // Ищем callback в списке
      if (index !== -1) {
        subscribers.splice(index, 1); // Удаляем callback из списка
      }
      // Если больше нет подписчиков, удаляем монету из подписок
      if (subscribers.length === 0) {
        this.subscriptions.delete(coinName); // Удаляем из Map
        this.sendUnsubscriptionRequest(coinName); // Отправляем запрос на отписку
      }
    }
  }

  // Уведомление всех подписчиков об изменении цены
  private notifySubscribers(coinName: string, price: number) {
    const subscribers = this.subscriptions.get(coinName); // Получаем подписчиков монеты
    if (subscribers) {
      subscribers.forEach((callback) => callback({ coinName, price })); // Вызываем каждый callback
    }
  }

  // Отправка запроса на подписку для монеты
  private sendSubscriptionRequest(coinName: string) {
    const subscription = {
      action: "SubAdd", // Тип действия
      subs: [`5~CCCAGG~${coinName}~USD`], // Формат подписки
    };
    this.socket?.send(JSON.stringify(subscription)); // Отправляем запрос через WebSocket
  }

  // Отправка запроса на отписку для монеты
  private sendUnsubscriptionRequest(coinName: string) {
    const unsubscription = {
      action: "SubRemove", // Тип действия
      subs: [`5~CCCAGG~${coinName}~USD`], // Формат отписки
    };
    this.socket?.send(JSON.stringify(unsubscription)); // Отправляем запрос через WebSocket
  }
}

// Экспортируем singleton WebSocket-сервиса
export const webSocketService = new WebSocketService();

