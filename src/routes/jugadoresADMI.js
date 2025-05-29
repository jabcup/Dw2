const express = require('express');
const router = express.Router();

const {
    obtenerJugadores,
    crearJugador,
    actualizarJugador,
    eliminarJugador
} = require('../controllers/jugadorControllerADMI');
router.get('/', obtenerJugadores);

router.post('/', crearJugador);

router.put('/:id', actualizarJugador);

router.delete('/:id', eliminarJugador);

module.exports = router;

