// src/routes/api/connect.js

import oracledb from 'oracledb';

export async function post(req, res) {
  const { username, password, host, port } = req.body;

  const connectionConfig = {
    user: username,
    password: password,
    connectString: `${host}:${port}/xe`, // Ajusta el SID si es necesario
  };

  try {
    // Intenta conectarse a Oracle
    const connection = await oracledb.getConnection(connectionConfig);
    await connection.close();
    res.status(200).json({ message: 'Conexión exitosa' });
  } catch (error) {
    console.error('Error de conexión:', error);
    res.status(401).json({ message: 'Credenciales incorrectas o error de conexión' });
  }
}
