const express = require('express');
const router = express.Router();
const { obtenerJuegosDelJugador } = require('../controllers/disp');

router.get('/mis-juegos', obtenerJuegosDelJugador);

module.exports = router;
