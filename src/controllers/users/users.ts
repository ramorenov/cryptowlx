import { Request, Response, NextFunction } from "express";
import * as services from "../../services/users/users";
import { IUser } from "../../interfaces/interfaces";
import * as joi from "../../utils/joi/validate";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body: IUser = req.body;
    const valResult = joi.validateUser(body);
    if (valResult.failed) {
      return next(valResult);
    }
    const response: any = await services.createUser(valResult);
    response.failed
      ? next(response)
      : res.status(201).json({
          message: "El usuario se creó con éxito",
          data: response,
        });
  } catch (error) {
    next({
      status: 400,
      message: error.toString(),
    });
  }
};
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response: any = await services.getUsers();
    response.failed ? next(response) : res.status(200).json({ message: "usuarios encontrados con éxito", data: response });
  } catch (error) {
    next({
      status: 400,
      message: error.toString(),
    });
  }
};
