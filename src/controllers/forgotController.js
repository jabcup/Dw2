const db = require('../config/db');

const getUserInfo = (req, res) => {
    const { Nickname, Correo } = req.body;
    console.log("Datos recibidos para validación:", { Nickname, Correo });

    if (!Nickname || !Correo) {
        return res.status(400).json({ error: 'Se requiere tanto Nickname como Correo' });
    }

    const query = `
        SELECT ID_Jugador, Nombre 
        FROM tb_Jugadores 
        WHERE Nickname = ? 
        AND Correo = ? 
        AND Estado = 1
    `;

    db.query(query, [Nickname, Correo], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Jugador no encontrado o información no coincide' });
        }

        const jugador = results[0];
        
        res.json({
            mensaje: 'Validación exitosa',
            jugador: {
                ID_Jugador: jugador.ID_Jugador,
                Nombre: jugador.Nombre
            }
        });
    });
};

module.exports = {
    getUserInfo
};