const express = require('express');
const router = express.Router();
const { obtenerTopPuntajes } = require('../controllers/puntajeGeneralController');

router.get('/top', obtenerTopPuntajes);

module.exports = router;
