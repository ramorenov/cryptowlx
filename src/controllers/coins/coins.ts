import { Request, Response, NextFunction } from "express";
import { IResp } from "../../interfaces/interfaces";
import * as services from "../../services/coins/coins";
import * as joi from "../../utils/joi/validate";

export const getCoins = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.query;
    const valCoinList = joi.validateCoinList(params);
    if (valCoinList.failed) {
      return next(valCoinList);
    }
    const response: IResp = await services.getCoins(valCoinList);
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
    const data = { user_id: req.user.id, coin_id: req.body.coin_id };
    const valCoin = joi.validateCoin(data);
    if (valCoin.failed) {
      return next(valCoin);
    }
    const response = await services.saveCoin(valCoin);
    const result = <IResp>response;
    result.failed ? next(response) : res.status(200).json({ message: "moneda guardada con éxito", data: response });
  } catch (error) {
    next({
      status: 400,
      message: error.toString(),
    });
  }
};

export const topCoins = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = { user_id: req.user.id, ...req.query };
    const valCoinTop = joi.validateCoinTop(data);
    if (valCoinTop.failed) {
      return next(valCoinTop);
    }
    const response = await services.topCoins(valCoinTop);
    const result = <IResp>response;
    result.failed ? next(response) : res.status(200).json({ message: "top de monedas encontradas con éxito", data: response });
  } catch (error) {
    next({
      status: 400,
      message: error.toString(),
    });
  }
};
