import { Request, Response, NextFunction } from "express";
import * as services from "../../services/login/login";
import { Ilogin, IResp } from "../../interfaces/interfaces";

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body: Ilogin = req.body;
    const response = await services.userLogin(body);
    const result = <IResp>response;
    result.failed
      ? next(response)
      : res.status(201).json({
          message: "Usuario logeado con éxito",
          token: response,
        });
  } catch (error) {
    next({
      status: 400,
      message: error.toString(),
    });
  }
};
