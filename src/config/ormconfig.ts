import { ConnectionOptions } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

const ORMConfig: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT!),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  synchronize: false,
  migrationsRun: true,
  logging: true,
  migrations: [__dirname + "/../migrations/**/*{.js,.ts}"],
  cli: {
    migrationsDir: `./src/migrations`,
  },
};

export = ORMConfig;
