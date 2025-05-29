// controllers/gameUserController.js
const db = require('../config/db');

const addGameToUser = (req, res) => {
    const { idUsuario, idJuego } = req.body;

    // Validación básica
    if (!idUsuario || !idJuego) {
        return res.status(400).json({ 
            error: 'Se requieren idUsuario e idJuego' 
        });
    }

    const query = `
        INSERT INTO tb_Juegos_Jugadores (ID_Jugador, ID_Juego, Fecha_adquisicion, EsCompra)
        VALUES (?, ?, NOW(), TRUE)
        ON DUPLICATE KEY UPDATE Fecha_adquisicion = NOW()
    `;

    db.query(query, [idUsuario, idJuego], (err, results) => {
        if (err) {
            console.error("Error al añadir juego:", err);
            return res.status(500).json({ 
                error: 'Error en la base de datos',
                detalle: err.message
            });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ 
                error: 'No se pudo agregar el juego' 
            });
        }

        res.status(201).json({
            mensaje: 'Juego añadido a la biblioteca',
            idRelacion: results.insertId
        });
    });
    console.log("insertao");
};

module.exports = {
    addGameToUser
};