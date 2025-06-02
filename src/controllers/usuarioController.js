const db = require('../config/db');
const kuki = require('cookie-parser')

const register = (req, res) => {
    const { Nombre, Nickname, Correo, Password } = req.body;
    console.log(req.body);
    const query = 'INSERT INTO tb_Jugadores (Nombre, Nickname, Correo, Password) VALUES (?, ?, ?, ?)';

    db.query(query, [Nombre, Nickname, Correo, Password], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({error: 'Correo ya registrado' });
            }
            console.log(err)
            return res.status(500).json({ error: 'Error al registrar' });
        }
        res.status(201).json({ mensaje: 'Jugador registrado correctamente' });
    });
};

const login = (req, res) => {
const { correo, password } = req.body;
const query = 'SELECT * FROM tb_Jugadores WHERE Correo = ? AND Estado = 1 AND Password = ?';

db.query(query, [correo, password], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error del servidor' });
    if (results.length === 0) return res.status(401).json({ error: 'Jugador no encontrado o desactivado' });

    const jugador = results[0];
    if (jugador.Password === password) {
        console.log("obteniendo los juegos del cliente", typeof(jugador.ID_Jugador));

        db.query(`SELECT * FROM tb_Juegos_Jugadores WHERE ID_Jugador = ?`, [jugador.ID_Jugador], (err, resultaos) => {
            if (err) return res.status(500).json({error: 'error al obtener la lista de juegos del usuario'});
            if (!resultaos || resultaos.length === 0) return res.status(401).json({error: 'el jugador no tiene juegos asignados'});

            //const gameList = resultaos;
            let gameList = ""
            resultaos.forEach( item => {
                gameList = gameList + item.ID_Juego + " "
                console.log('el jeugos es', item.ID_Juego)
                console.log("===============", resultaos.length ,"=====================");
            })

            res.cookie('nombre', jugador.Nombre)
            res.cookie('id', jugador.ID_Jugador)
            res.cookie('nick', jugador.Nickname)
            res.cookie('status', jugador.Estado)
            res.cookie('email', jugador.Correo)
            res.cookie('rol', jugador.Rol)
            res.cookie('listaDeJuegos', JSON.stringify(gameList)) 
            res.cookie('eh', 'existe, las, comas?')

            res.json({
                mensaje: 'Login exitoso',
                jugador: {
                    ID_Jugador: jugador.ID_Jugador,
                    Nombre: jugador.Nombre,
                    Correo: jugador.Correo,
                    Rol: jugador.Rol
                }
            });
        })
    } else {
        res.status(401).json({ error: 'Contraseña incorrecta' });
    }
});

};



module.exports = { register, login };
