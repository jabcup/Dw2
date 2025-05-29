const db = require('../config/db');

// Obtener todas las relaciones
exports.obtenerRelaciones = (req, res) => {
    db.query('SELECT * FROM tb_Juegos_Jugadores', (err, resultados) => {
        if (err) return res.status(500).json({ error: err });
        res.json(resultados);
    });
};

// Crear nueva relación
exports.crearRelacion = (req, res) => {
    const { ID_Juego, ID_Jugador, EsCompra } = req.body;
    
    db.query(
        'INSERT INTO tb_Juegos_Jugadores (ID_Juego, ID_Jugador, EsCompra) VALUES (?, ?, ?)',
        [ID_Juego, ID_Jugador, EsCompra || false],
        (err, resultado) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ mensaje: 'Relación creada', id: resultado.insertId });
        }
    );
};

// Actualizar relación
exports.actualizarRelacion = (req, res) => {
    const { id } = req.params;
    const { ID_Juego, ID_Jugador, EsCompra } = req.body;
    
    db.query(
        'UPDATE tb_Juegos_Jugadores SET ID_Juego = ?, ID_Jugador = ?, EsCompra = ? WHERE ID_Juego_jugador = ?',
        [ID_Juego, ID_Jugador, EsCompra, id],
        (err, resultado) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ mensaje: 'Relación actualizada' });
        }
    );
};

// Eliminar relación
exports.eliminarRelacion = (req, res) => {
    const { id } = req.params;
    
    db.query(
        'DELETE FROM tb_Juegos_Jugadores WHERE ID_Juego_jugador = ?',
        [id],
        (err, resultado) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ mensaje: 'Relación eliminada' });
        }
    );
};