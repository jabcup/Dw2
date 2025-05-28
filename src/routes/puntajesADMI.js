const express = require('express');
const router = express.Router();
const {
    obtenerPuntajes,
    crearPuntaje,
    actualizarPuntaje,
    eliminarPuntaje
} = require('../controllers/puntajeControllerADMI');

router.get('/', obtenerPuntajes);
router.post('/', crearPuntaje);
router.put('/:id', actualizarPuntaje);
router.delete('/:id', eliminarPuntaje);

module.exports = router;