import { Application } from "express";
import { users } from "./users";
import { login } from "./login";
import { coins } from "./coins";

export const routes = (app: Application) => {
  users(app);
  login(app);
  coins(app);
};
