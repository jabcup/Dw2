const db = require('../config/db');

exports.obtenerJuegos = (req, res) => {
    db.query('SELECT ID_Juego as id, Nombre as nombre, Descripcion as descripcion, Precio as precio FROM tb_Juegos', 
    (err, resultados) => {
        if (err) return res.status(500).json({ error: err });
        res.json(resultados); // Corregido el typo
    });
};

exports.crearJuego = (req, res) => {
    const { nombre, descripcion, precio } = req.body;
    db.query(
        'INSERT INTO tb_Juegos (Nombre, Descripcion, Precio) VALUES (?, ?, ?)', 
        [nombre, descripcion, precio],
        (err, resultado) => {
            if(err) return res.status(500).json({ error: err });
            res.json({ mensaje: 'Juego creado', id: resultado.insertId });
        }
    );
};

exports.actualizarJuego = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio } = req.body;

    db.query(
        'UPDATE tb_Juegos SET Nombre = ?, Descripcion = ?, Precio = ? WHERE ID_Juego = ?',
        [nombre, descripcion, precio, id],
        (err, resultado) => {
            if(err) return res.status(500).json({ error: err });
            res.json({ mensaje: 'Juego actualizado' });
        }
    );
};

exports.eliminarJuego = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tb_Juegos WHERE ID_Juego = ?', [id], (err, resultado) => {
        if(err) return res.status(500).json({ error: err });
        res.json({ mensaje: 'Juego eliminado' });
    });
};