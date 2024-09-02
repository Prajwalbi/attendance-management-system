import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

let connection;

async function getConnection() {
  if (!connection || connection.connection._closing) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
      
    });
  }
  return connection;
}

export async function dbQuery(query, params) {
  const conn = await getConnection();
  return drizzle(conn).query(query, params);
}
