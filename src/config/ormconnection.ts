import { createConnection, getConnection, getConnectionOptions } from "typeorm";

export const createTypeOrmConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  const conn = await createConnection({ ...connectionOptions, name: "default" });
  console.log("database connect:", conn.options.database, conn.isConnected);
  return conn;
};

export const openTypeOrmConn = async () => {
  const connection = getConnection("default");
  await connection.synchronize(true);
};

export const closeTypeOrmConn = async () => {
  const connection = getConnection("default");
  await connection.close();
};
