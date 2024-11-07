import express from 'express';
import { getOracleConnection } from './db.js';
import bcrypt from 'bcryptjs'; // Para la seguridad de las contraseñas
import jwt from 'jsonwebtoken'; // Si deseas manejar un sistema de tokens (JWT)

const app = express();
const port = process.env.PORT || 3001;

// Middleware para parsear el cuerpo de las peticiones (JSON)
app.use(express.json());

// Ruta de login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Faltan las credenciales' });
    }

    let connection;
    try {
        connection = await getOracleConnection();
        
        // Consulta para verificar si el usuario existe
        const query = `
            SELECT username, password FROM usuarios WHERE username = :username
        `;
        const result = await connection.execute(query, [username]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const storedPassword = result.rows[0][1]; // Suponiendo que la contraseña está en la segunda columna
        
        // Compara la contraseña proporcionada con la almacenada (usa bcrypt para comparar)
        const passwordMatch = await bcrypt.compare(password, storedPassword);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // Si las credenciales son correctas, generar un token JWT (opcional)
        const token = jwt.sign({ username }, 'secreto', { expiresIn: '1h' });

        // Enviar la respuesta con el token
        res.json({ message: 'Autenticación exitosa', token });

    } catch (error) {
        console.error('Error al autenticar usuario:', error);
        res.status(500).json({ error: 'Error en la autenticación' });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.error('Error al cerrar la conexión:', error);
            }
        }
    }
});

// Ruta para obtener la lista de productos
app.get('/api/productos', async (req, res) => {
    let connection;
    try {
        connection = await getOracleConnection();
        const result = await connection.execute('SELECT * FROM producto');
        res.json(result.rows); // Solo envía los productos, sin mensaje adicional
    } catch (error) {
        console.error('Error en la conexión:', error);
        res.status(500).json({ error: 'Error al conectar con la base de datos' });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.error('Error al cerrar la conexión:', error);
            }
        }
    }
});

// Nueva ruta para obtener las tablas y sus columnas
app.get('/api/tablas', async (req, res) => {
    let connection;
    try {
        connection = await getOracleConnection();

        // Consulta PL/SQL para obtener las tablas y sus columnas
        const query = `
            SELECT 
                table_name,
                column_name,
                data_type,
                nullable
            FROM user_tab_columns
            WHERE table_name IN ('CARGO', 'EMPLEADO')
            ORDER BY table_name, column_id
        `;
        
        const result = await connection.execute(query);
      // Reestructuramos el resultado en un formato legible
      const tables = {};
      result.rows.forEach(([table_name, column_name, data_type, nullable]) => {
          if (!tables[table_name]) {
              tables[table_name] = [];
          }
          tables[table_name].push({
              column_name,
              data_type,
              nullable: nullable === 'Y' ? 'Sí' : 'No'
          });
      });

      // Enviamos el resultado estructurado
      res.json(tables);
  } catch (error) {
      console.error('Error en la conexión:', error);
      res.status(500).json({ error: 'Error al obtener las tablas y columnas' });
  } finally {
      if (connection) {
          try {
              await connection.close();
          } catch (error) {
              console.error('Error al cerrar la conexión:', error);
          }
      }
  }
});

// Otras rutas...

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
