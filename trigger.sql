
DELIMITER $$

CREATE DEFINER=`jh`@`localhost` TRIGGER asignar_juegos_iniciales
AFTER INSERT ON tb_Jugadores
FOR EACH ROW
BEGIN
    INSERT INTO tb_Juegos_Jugadores (ID_Juego, ID_Jugador, EsCompra)
    VALUES
        (1, NEW.ID_Jugador, 0),
        (2, NEW.ID_Jugador, 0),
        (3, NEW.ID_Jugador, 0);
END$$

DELIMITER ;

