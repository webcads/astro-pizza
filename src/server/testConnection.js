import oracledb from 'oracledb';
import dbConfig from './server/dbConfig.js';

async function testConnection() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    console.log("Conexión exitosa a la base de datos");
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error al cerrar la conexión:", err);
      }
    }
  }
}

testConnection();
