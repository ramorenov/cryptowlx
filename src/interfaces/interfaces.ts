import { Request } from "express";

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
