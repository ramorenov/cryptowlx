import { Application } from "express";
import * as controllerUser from "../controllers/users/users";
import { verifyToken } from "../middlewares";

export function users(app: Application) {
  app.post("/users", controllerUser.createUser);
  app.get("/users", verifyToken, controllerUser.getUsers);
}
