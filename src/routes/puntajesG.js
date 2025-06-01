const express = require('express');
const router = express.Router();
const { obtenerPuntajesPorJuego } = require('../controllers/puntajesController');

router.get('/:id', obtenerPuntajesPorJuego);

module.exports = router;
