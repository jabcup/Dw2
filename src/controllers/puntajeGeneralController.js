const db = require('../config/db');

const obtenerTopPuntajes = (req, res) => {
    const query = `
        SELECT 
            p.ID_Puntaje,
            jg.Nombre AS Nombre_Jugador,
            jj.Nombre AS Nombre_Juego,
            p.Puntaje,
            p.Fecha
        FROM 
            tb_Puntajes p
        JOIN 
            tb_Jugadores jg ON p.ID_Jugador = jg.ID_Jugador
        JOIN 
            tb_Juegos jj ON p.ID_Juego = jj.ID_Juego
        ORDER BY 
            p.Puntaje DESC
        LIMIT 10;
    `;

    db.query(query, (err, resultados) => {
        if (err) {
            console.error('Error al obtener los puntajes:', err);
            return res.status(500).json({ error: 'Error del servidor' });
        }

        res.json({
            success: true,
            top: resultados.length,
            puntajes: resultados
        });
    });
};

module.exports = { obtenerTopPuntajes };
