import { Application } from "express";
import * as controllerCoin from "../controllers/coins/coins";
import { verifyToken } from "../middlewares";

export function coins(app: Application) {
  app.get("/coins", verifyToken, controllerCoin.getCoins);
}
