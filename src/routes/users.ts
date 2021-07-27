import { Application } from "express";
import * as controllerUser from "../controllers/users/users";

export function users(app: Application) {
  app.post("/users", controllerUser.createUser);
  app.get("/users", controllerUser.getUsers);
}
