import { fetchData } from '@/components/modules/http';

// Интерфейс описывает информацию о криптовалюте
export interface CoinInfo {
  AssetLaunchDate: string; // Дата запуска криптовалюты
  MaxSupply: number; // Общее предложение монет
  Algorithm: string; // Алгоритм, использующийся для криптовалюты
  ProofType: string; // Тип консенсуса криптовалюты (например, PoW)
  Rating?: { // Рейтинг криптовалюты
    Weiss?: {
      Rating: string; // Рейтинг по Weiss
    };
  };
}

// Интерфейс описывает информацию о конверсии (например, для различных валют)
export interface ConversionInfo {
  Supply: number;
  TotalVolume24H: number;
}

// Интерфейс описывает данные криптовалюты
export interface CryptoDetails {
  CoinInfo: CoinInfo;
  ConversionInfo?: ConversionInfo;
}

// Интерфейс описывает ответ от API, содержащий массив данных о криптовалюте
export interface CryptoResponse {
  Data: Array<{
    CoinInfo: CoinInfo;
    ConversionInfo?: ConversionInfo;
  }>;
}

class ApiClient {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = `${import.meta.env.VITE_BASE_URL}data/`;
    this.apiKey = `&api_key=${import.meta.env.VITE_API_KEY}`;
  }

  async get<T>(url: string): Promise<T> {
    const fullUrl = `${this.baseUrl}${url}${this.apiKey}`;
    return fetchData<T>(fullUrl);
  }
}

const apiClient = new ApiClient();

export const getCryptoData = async (name: string): Promise<CryptoResponse> => {
  const url = `coin/generalinfo?fsyms=${name}&tsym=USD`;
  const data = await apiClient.get<CryptoResponse>(url);
  return data;
};
