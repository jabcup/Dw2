const db = require('../config/db');

const registrarScore = (req, res) => {
    const idJugador = req.cookies.id;
    const { idJuego, puntaje } = req.body;

    if (!idJugador || !idJuego || puntaje == null) {
        return res.status(400).json({ error: 'Datos incompletos' });
    }

    const sql = 'INSERT INTO tb_Puntajes (ID_Juego, ID_Jugador, Puntaje) VALUES (?, ?, ?)';
    db.query(sql, [idJuego, idJugador, puntaje], (err, result) => {
        if (err) {
            console.error('Error al guardar el puntaje:', err);
            return res.status(500).json({ error: 'Error al guardar el score' });
        }
        res.status(201).json({ mensaje: 'Score guardado exitosamente' });
    });
};

module.exports = { registrarScore };
