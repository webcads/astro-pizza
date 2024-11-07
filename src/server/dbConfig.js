// server/dbConfig.js
export const dbConfig = {
  user: process.env.DB_USER || "system",
  password: process.env.DB_PASSWORD || "oracle",
  connectString: process.env.DB_CONNECT_STRING || "localhost:1521/xe"
};

// server/db.js
import oracledb from 'oracledb';
import { dbConfig } from './dbConfig.js';

export async function getOracleConnection() {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    console.log('Conexión a Oracle establecida');
    return connection;
  } catch (error) {
    console.error('Error al conectar con Oracle:', error);
    throw error;
  }
}
