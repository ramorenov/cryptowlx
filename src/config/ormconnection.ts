import { createConnection, getConnectionOptions } from "typeorm";

export const createTypeOrmConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  const conn = await createConnection({ ...connectionOptions, name: "default" });
  console.log("database connect:", conn.isConnected);
  return conn;
};
