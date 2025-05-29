const db = require('../config/db');

// Obtener todos los puntajes
exports.obtenerPuntajes = (req, res) => {
    db.query('SELECT * FROM tb_Puntajes ORDER BY Puntaje DESC', (err, resultados) => {
        if (err) return res.status(500).json({ error: err });
        res.json(resultados);
    });
};

// Crear nuevo puntaje
exports.crearPuntaje = (req, res) => {
    const { ID_Juego, ID_Jugador, Puntaje } = req.body;
    
    db.query(
        'INSERT INTO tb_Puntajes (ID_Juego, ID_Jugador, Puntaje) VALUES (?, ?, ?)',
        [ID_Juego, ID_Jugador, Puntaje],
        (err, resultado) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ mensaje: 'Puntaje creado', id: resultado.insertId });
        }
    );
};

// Actualizar puntaje
exports.actualizarPuntaje = (req, res) => {
    const { id } = req.params;
    const { Puntaje } = req.body;
    
    db.query(
        'UPDATE tb_Puntajes SET Puntaje = ? WHERE ID_Puntaje = ?',
        [Puntaje, id],
        (err, resultado) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ mensaje: 'Puntaje actualizado' });
        }
    );
};

// Eliminar puntaje
exports.eliminarPuntaje = (req, res) => {
    const { id } = req.params;
    
    db.query(
        'DELETE FROM tb_Puntajes WHERE ID_Puntaje = ?',
        [id],
        (err, resultado) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ mensaje: 'Puntaje eliminado' });
        }
    );
};