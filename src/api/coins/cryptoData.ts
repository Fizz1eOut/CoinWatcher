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
  Supply : number;
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

export const getCryptoData = async (name: string): Promise<CryptoResponse> => {
  const url = `${import.meta.env.VITE_BASE_URL}data/coin/generalinfo?fsyms=${name}&tsym=USD&api_key=${import.meta.env.VITE_API_KEY}`;
  const data = await fetchData<CryptoResponse>(url);
  return data;
};
