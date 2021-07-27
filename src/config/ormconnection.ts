import { createConnection, getConnection, getConnectionOptions } from "typeorm";
import { Coin } from "../entities/coin.entity";

export const createTypeOrmConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  const conn = await createConnection({ ...connectionOptions, name: "default" });
  //console.log("database connect:", conn.options.database, conn.isConnected);
  return conn;
};

export const openTypeOrmConn = async () => {
  await getConnection("default").synchronize();
};

export const closeTypeOrmConn = async () => {
  await getConnection("default").synchronize();
  await getConnection("default").close();
};

export const clearTypeOrmConn = async () => {
  const connection = getConnection("default");
  await connection.getRepository(Coin).clear();
  await connection.close();
};
