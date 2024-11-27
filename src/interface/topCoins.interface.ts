export interface CoinInfo {
  Name: string;
}

export interface TopCoin {
  CoinInfo: CoinInfo;
}

export interface TopCoinsResponse {
  Data: TopCoin[];
}
