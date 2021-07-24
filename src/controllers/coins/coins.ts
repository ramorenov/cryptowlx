import { Request, Response, NextFunction } from "express";
import * as services from "../../services/coins/coins";
import * as joi from "../../utils/joi/validate";

export const getCoins = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.query;
    const valCoinList = joi.validateCoinlist(params);
    if (valCoinList.failed) {
      return next(valCoinList);
    }
    const response: any = await services.getCoins(valCoinList);
    response.failed ? next(response) : res.status(200).json({ message: "monedas encontradas con éxito", data: response });
  } catch (error) {
    next({
      status: 400,
      message: error.toString(),
    });
  }
};

export const saveCoin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = { user_id: req.user.id, coin_id: req.body.coin_id };
    const valCoin = joi.validateCoin(body);
    if (valCoin.failed) {
      return next(valCoin);
    }
    console.log(body);
    const response: any = await services.saveCoin(valCoin);
    response.failed ? next(response) : res.status(200).json({ message: "moneda guardada con éxito", data: response });
  } catch (error) {
    next({
      status: 400,
      message: error.toString(),
    });
  }
};
