import { Application } from "express";
import * as controllerLogin from "../controllers/login/login";

export function login(app: Application) {
  app.post("/login", controllerLogin.userLogin);
}
