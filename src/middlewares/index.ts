import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const handlerError = async (error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status).json({ error: error.name, message: error.message });
  next();
};

export const verifyToken = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "unauthorized" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.KEY_PRIVATE!);
    req.user = { id: decoded.payload.id, username: decoded.payload.username };
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
