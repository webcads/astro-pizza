// server/index.js
import express from 'express';
import { getOracleConnection } from './db.js';

const app = express();
const port = process.env.PORT || 3001;

// Nueva ruta para obtener la lista de productos
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

// Ruta para obtener las funciones del usuario
app.get('/api/funciones', async (req, res) => {
    let connection;
    try {
        connection = await getOracleConnection();
        const result = await connection.execute(`
            SELECT 
                object_name, 
                object_type 
            FROM 
                user_objects 
            WHERE 
                object_type = 'FUNCTION'
            ORDER BY 
                object_name
        `);
        res.json(result.rows); 
    } catch (error) {
        console.error('Error en la conexión:', error);
        res.status(500).json({ error: 'Error al obtener las funciones' });
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

// Ruta para obtener los procedimientos del usuario
app.get('/api/procedimientos', async (req, res) => {
    let connection;
    try {
        connection = await getOracleConnection();
        const result = await connection.execute(`
            SELECT 
                object_name, 
                object_type 
            FROM 
                user_objects 
            WHERE 
                object_type = 'PROCEDURE'
            ORDER BY 
                object_name
        `);
        res.json(result.rows);
    } catch (error) {
        console.error('Error en la conexión:', error);
        res.status(500).json({ error: 'Error al obtener los procedimientos' });
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

// Ruta para obtener los disparadores y las tablas asociadas
app.get('/api/disparadores', async (req, res) => {
    let connection;
    try {
        connection = await getOracleConnection();
        const result = await connection.execute(`
            SELECT 
                trigger_name, 
                table_name 
            FROM 
                user_triggers 
            ORDER BY 
                trigger_name
        `);
        res.json(result.rows); // Devolver los resultados en formato JSON
    } catch (error) {
        console.error('Error en la conexión:', error);
        res.status(500).json({ error: 'Error al obtener los disparadores' });
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

// Ruta para obtener las vistas del usuario
app.get('/api/vistas', async (req, res) => {
    let connection;
    try {
        connection = await getOracleConnection();
        const result = await connection.execute(`
            SELECT 
                view_name 
            FROM 
                user_views 
            ORDER BY 
                view_name
        `);
        res.json(result.rows);
    } catch (error) {
        console.error('Error en la conexión:', error);
        res.status(500).json({ error: 'Error al obtener las vistas' });
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

// Ruta para obtener las tablas filtradas por nombre
app.get('/api/tablafiltro', async (req, res) => {
    const { filtro } = req.query; // Obtener filtro desde la query string
    let connection;
    try {
        connection = await getOracleConnection();

        let query = `
            SELECT 
                table_name,
                column_name,
                data_type,
                nullable
            FROM 
                all_tab_columns
            WHERE 
                table_name IN ('CARGO', 'EMPLEADO')
            ORDER BY 
                table_name, column_id
        `;
        
        // Si hay filtro, agregarlo a la consulta
        if (filtro) {
            query = query + ` AND table_name LIKE '%${filtro}%'`;
        }

        const result = await connection.execute(query);
        res.json(result.rows); 
    } catch (error) {
        console.error('Error en la conexión:', error);
        res.status(500).json({ error: 'Error al obtener las tablas' });
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

// Ruta para obtener las tablas con exactamente 5 columnas
app.get('/api/tablas-filtro', async (req, res) => {
    let connection;
    try {
        connection = await getOracleConnection();
        const result = await connection.execute(`
            SELECT 
                table_name, 
                COUNT(column_name) AS num_columns
            FROM 
                user_tab_columns
            GROUP BY 
                table_name
            HAVING 
                COUNT(column_name) = 5
            ORDER BY 
                table_name
        `);
        res.json(result.rows); // Devolver las tablas con exactamente 5 columnas
    } catch (error) {
        console.error('Error en la conexión:', error);
        res.status(500).json({ error: 'Error al obtener las tablas con 5 columnas' });
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


app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
