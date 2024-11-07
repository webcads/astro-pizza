SELECT * FROM EMPLEADO;
SELECT * FROM CARGO;
describe cargo;
SELECT * FROM CARGOXUBICACION;
SELECT * FROM CLIENTE;

SELECT column_name,
       data_type,
       nullable
FROM user_tab_columns  -- Esto no requiere especificar el owner
WHERE table_name = 'EMPLEADO'  -- Asegúrate de que el nombre de la tabla esté en mayúsculas
ORDER BY column_id;


SELECT table_name,
       column_name,
       data_type,
       nullable
FROM all_tab_columns
WHERE table_name IN ('CARGO','compra', 'producto', 'incluye', 'distribuidor', 'turno','vehiculo', 'sucursal', 'pedido', 'realiza', 'cargoxubicacion', 'cliente')
ORDER BY table_name, column_id;


--  Ruta para obtener las funciones del usuario
 SELECT 
                object_name, 
                object_type 
            FROM 
                user_objects 
            WHERE 
                object_type = 'FUNCTION'
            ORDER BY 
                object_name;


-- procedimientos
   SELECT 
                object_name, 
                object_type 
            FROM 
                user_objects 
            WHERE 
                object_type = 'PROCEDURE'
            ORDER BY 
                object_name;

-- trigger
 SELECT 
                trigger_name, 
                table_name 
            FROM 
                user_triggers 
            ORDER BY 
                trigger_name


-- vistas
 SELECT 
                view_name 
            FROM 
                user_views 
            ORDER BY 
                view_name

-- filtro tables
  SELECT 
                table_name,
                column_name,
                data_type,
                nullable
            FROM 
               all_tab_columns
            WHERE 
                table_name  ('producto')
            ORDER BY 
                table_name, column_id
            

            -- filter 5 
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
    table_name;
