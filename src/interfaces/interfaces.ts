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

/* export interface RequestC extends Request {
  user: { id?: string; username?: string };
}
 */
