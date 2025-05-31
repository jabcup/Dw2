const db = require('../config/db');
const kuki = require('cookie-parser')

const obtenerJuegosDelJugador = (req, res) => {
    // 1. Obtenemos el ID del jugador desde las cookies
    const idJugador = req.cookies.id;
    
    // 2. Verificamos que el jugador esté autenticado
    if (!idJugador) {
        return res.status(401).json({ 
            error: 'No autorizado', 
            mensaje: 'Debes iniciar sesión para ver tus juegos' 
        });
    }

    // 3. Consulta SQL para obtener los juegos del jugador
    const query = `
        SELECT j.ID_Juego, j.Nombre, j.Descripcion, j.Reglas, j.Miniatura, j.RutaHTML, 
               jj.Fecha_adquisicion, jj.EsCompra
        FROM tb_Juegos j
        INNER JOIN tb_Juegos_Jugadores jj ON j.ID_Juego = jj.ID_Juego
        WHERE jj.ID_Jugador = ?
        ORDER BY jj.Fecha_adquisicion DESC
    `;

    // 4. Ejecutamos la consulta
    db.query(query, [idJugador], (err, resultados) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ 
                error: 'Error del servidor', 
                mensaje: 'No se pudieron obtener los juegos' 
            });
        }

        // 5. Enviamos la respuesta con los juegos encontrados
        res.json({
            success: true,
            totalJuegos: resultados.length,
            juegos: resultados
        });
    });
};

module.exports = { obtenerJuegosDelJugador };
