import { Application } from "express";
import { users } from "./users";
import { login } from "./login";

export const routes = (app: Application) => {
  users(app);
  login(app);
};
