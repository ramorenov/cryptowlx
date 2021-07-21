import { Request, Response, NextFunction } from "express";

export const handlerError = async (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status).json({ ERROR: err.message });
  next();
};
