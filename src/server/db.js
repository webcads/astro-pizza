// server/db.js
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