import "reflect-metadata";
import express from "express";
import cors from "cors";
import { routes } from "./routes";
import { createConnection } from "typeorm";
import ORMConfig from "./config/ormconfig";
import * as dotenv from "dotenv";
import { handlerError } from "./middlewares";
const app = express();
dotenv.config();
createConnection(ORMConfig);
app.use(cors());
app.use(express.json());
routes(app);
app.use(handlerError);

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor en el puerto", process.env.PORT || 3000);
});
