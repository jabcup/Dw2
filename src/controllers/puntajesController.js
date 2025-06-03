const db = require('../config/db');

const obtenerPuntajesPorJuego = (req, res) => {
  const idJuego = req.params.id;

  const query = `
    SELECT j.Nickname, p.Puntaje, p.Fecha
    FROM tb_Puntajes p
    INNER JOIN tb_Jugadores j ON p.ID_Jugador = j.ID_Jugador
    WHERE p.ID_Juego = ?
    ORDER BY p.Puntaje DESC, p.Fecha ASC
    LIMIT 3
  `;

  db.query(query, [idJuego], (err, resultados) => {
    if (err) {
      console.error('Error al obtener puntajes:', err);
      return res.status(500).json({ error: 'Error del servidor' });
    }

    res.json({
      success: true,
      puntajes: resultados
    });
  });
};

module.exports = { obtenerPuntajesPorJuego };
