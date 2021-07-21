import { Request, Response, NextFunction } from "express";

export const handlerError = async (error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status).json({ error: error.name, message: error.message });
  next();
};
