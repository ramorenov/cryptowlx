export interface IUser {
  name: string;
  last_name: string;
  username: string;
  password: string;
  pref_currency: string;
}

export type IUserR = Omit<IUser, "password">;
export interface Ilogin {
  username: string;
  password: string;
}

export interface ICoin {
  user_id: string;
  coin_id: string;
}

export interface ITopCoin {
  user_id: string;
  top_n: number;
  order: string;
}

export interface IResp {
  failed?: boolean;
  status?: number;
  message?: any | string;
}

export interface IRespCoin {
  id: string;
  symbol: string;
  current_price: number;
  name: string;
  image: string;
  last_updated: string;
}

export interface IToken {
  payload: {
    id: string;
    username: string;
  };
  iat: number;
  exp: number;
}
