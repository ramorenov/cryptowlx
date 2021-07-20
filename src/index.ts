import "reflect-metadata";
import express from "express";
import cors from "cors";
import router from "./routes/users";
import { createConnection } from "typeorm";

const app = express();
createConnection();

app.use(cors());
app.use(express.json());

app.use(router);

app.listen(3000, () => {
  console.log("Servidor en el puerto", 3000);
});
