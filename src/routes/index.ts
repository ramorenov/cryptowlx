import { Application } from "express";
import { users } from "./users";

export const routes = (app: Application) => {
  users(app);
};
