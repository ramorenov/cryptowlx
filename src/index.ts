import "reflect-metadata";
import express from "express";
import cors from "cors";
import router from "./routes/users";
import { createConnection } from "typeorm";
import ORMConfig from "./config/ormconfig";
import * as dotenv from "dotenv";
const app = express();
dotenv.config();
createConnection(ORMConfig);
app.use(cors());
app.use(express.json());

app.use(router);

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor en el puerto", process.env.PORT || 3000);
});
