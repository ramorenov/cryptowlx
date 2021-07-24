import { Request } from "express";

export interface IUser {
  name: string;
  last_name: string;
  username: string;
  password: string;
  pref_currency: string;
}

export interface Ilogin {
  username: string;
  password: string;
}

export interface ICoin {
  user_id: string;
  coin_id: string;
}
