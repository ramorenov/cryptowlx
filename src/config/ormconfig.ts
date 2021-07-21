import { ConnectionOptions } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "../entities/user.entity";
dotenv.config();

const ORMConfig: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT!),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + "/../**/*.entity.ts"],
  synchronize: false,
  migrationsRun: true,
  logging: true,
  migrations: ["./src/migrations/**/*{.js}"],
  cli: {
    migrationsDir: "./src/migrations",
  },
};

export = ORMConfig;
