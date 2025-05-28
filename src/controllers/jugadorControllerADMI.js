const db = require('../config/db');

exports.obtenerJugadores = (req, res) => {
    db.query('SELECT ID_Jugador as id, Nombre as nombre, Nickname as nickname, Correo as correo, Password as password FROM tb_Jugadores', 
    (err, resultados) => {
        if (err) return res.status(500).json({ error: err });
        res.json(resultados);
    });
};

exports.crearJugador = (req, res) => {
    const { nombre, nickname, correo, password } = req.body;
    db.query(
        'INSERT INTO tb_Jugadores (Nombre, Nickname, Correo, Password) VALUES (?, ?, ?, ?)', [nombre, nickname, correo, password],
        (err, resultado) => {
            if(err) return res.status(500).json({ error: err });
            res.json({ mensaje: 'Usuario creado', id: resultado.insertId });
        }
    );
};

exports.actualizarJugador = (req, res) => {
    const { id } = req.params;
    const {nombre, nickname, correo, password} = req.body;

    db.query(
        'UPDATE tb_Jugadores SET Nombre = ?, Nickname = ?, Correo = ?, Password = ? WHERE ID_Jugador = ?',
        [nombre, nickname, correo, password, id], // Añadir id al final
        (err, resultado) => {
            if(err) return res.status(500).json({ error: err});
            res.json({ mensaje: 'Usuario actualizado'});
        }
    );
};

exports.eliminarJugador = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tb_Jugadores WHERE ID_Jugador = ?', [id], (err, resultado) => {
        if(err) return res.status(500).json({ error: err});
        res.json({ mensaje: 'Usuario eliminado'});
    });
};