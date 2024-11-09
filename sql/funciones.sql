CREATE OR REPLACE TRIGGER trg_insert_pedido
BEFORE INSERT ON PEDIDO
FOR EACH ROW
BEGIN
   -- Colocar fecha y hora del sistema
   :NEW.PERFECHAHORAPEDIDO := SYSDATE;

   -- EstablecerNo hay datos para el mes el estado como "no despachado" (0)
   :NEW.PEDESTADO := 0;

   -- Establecer la fecha de entrega como 8 días después de la fecha actual, a las 12:00 p.m.
   :NEW.PERFECHAHORAENTREGA := TRUNC(SYSDATE) + 8 + (12 / 24);

   -- Insertar en la tabla HISTORIAL_PEDIDOS
   INSERT INTO HISTORIAL_PEDIDOS (PEDID, FECHA_ENTREGA, ESTADO, SUCID)
   VALUES (:NEW.PEDID, :NEW.PERFECHAHORAENTREGA, :NEW.PEDESTADO, :NEW.SUCID);
END;