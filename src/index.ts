import "reflect-metadata";
import express from "express";
import cors from "cors";
import { routes } from "./routes";
import { createConnection } from "typeorm";
import * as dotenv from "dotenv";
import { handlerError } from "./middlewares";
import { createTypeOrmConn } from "./config/ormconnection";
const app = express();
dotenv.config();
createTypeOrmConn();
app.use(cors());
app.use(express.json());
routes(app);
app.use(handlerError);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor en el puerto", process.env.PORT || 3000);
});

module.exports = { app, server };
