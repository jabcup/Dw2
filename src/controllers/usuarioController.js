const db = require('../config/db');
const kuki = require('cookie-parser')

const register = (req, res) => {
    const { nombre, correo, password } = req.body;
    const query = 'INSERT INTO Jugadores (Nombre, Correo, Password) VALUES (?, ?, ?)';

    db.query(query, [nombre, correo, password], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Correo ya registrado' });
            }
            return res.status(500).json({ error: 'Error al registrar' });
        }
        res.status(201).json({ mensaje: 'Jugador registrado correctamente' });
    });
};

const login = (req, res) => {
    const { correo, password } = req.body;
    const query = 'SELECT * FROM Jugadores WHERE Correo = ? AND Estado = 1 AND Password = ?';

    db.query(query, [correo, password], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error del servidor' });
        if (results.length === 0) return res.status(401).json({ error: 'Jugador no encontrado o desactivado' });

        const jugador = results[0];
        if (jugador.Password === password) {

            res.cookie('nombre', jugador.Nombre)
            res.cookie('id', jugador.ID_Jugador) //para el id
            res.cookie('nick', jugador.Nickname) //para el nickname
            res.cookie('status', jugador.Estado) //para el estado
            res.cookie('email', jugador.Correo) //para el correo
            

            res.json({
                mensaje: 'Login exitoso',
                jugador: {
                    ID_Jugador: jugador.ID_Jugador,
                    Nombre: jugador.Nombre,
                    Correo: jugador.Correo
                }
            });
        } else {
            res.status(401).json({ error: 'Contraseña incorrecta' });
        }
    });
};

module.exports = { register, login };
