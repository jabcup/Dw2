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
    console.log("iniciando el fetch");
    fetch('http://localhost:4000/api/usuarios/add-game', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idUsuario: idUsuario,
            idJuego: idJuego
          })
        })
        .then(response => {
          if (!response.ok) throw new Error('Error en respuesta del servidor');
          return response.json();
        })
        .then(data => console.log('Éxito:', data))
        .catch(error => console.error('Fallo:', error));
};

module.exports = {
    addGameToUser
};