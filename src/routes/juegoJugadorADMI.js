const express = require('express');
const router = express.Router();
const {
    obtenerRelaciones,
    crearRelacion,
    actualizarRelacion,
    eliminarRelacion
} = require('../controllers/juegoJugadorControllerADMI');

router.get('/', obtenerRelaciones);
router.post('/', crearRelacion);
router.put('/:id', actualizarRelacion);
router.delete('/:id', eliminarRelacion);

module.exports = router;