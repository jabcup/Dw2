// routes/usuarios.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/usuarioController');
const showGames = require('../controllers/storeController');
// Añade el nuevo controlador
const { addGameToUser } = require('../controllers/gameUserController');

router.post('/register', register);
router.post('/login', login);
router.get('/gamesOnSale', showGames);
// Nueva ruta para añadir juegos
router.post('/add-game', addGameToUser);

router.get('/login', (req, res) => {
    console.log("erererer")
    res.sendFile(path.join(__dirname, '../../login/login.html')); 
});

module.exports = router;