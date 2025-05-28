const express = require('express');
const router = express.Router();
const {
    obtenerJuegos,
    crearJuego,
    actualizarJuego,
    eliminarJuego
} = require('../controllers/juegoControllerADMI'); // Asegúrate que el nombre del archivo coincida

router.get('/', obtenerJuegos);
router.post('/', crearJuego);
router.put('/:id', actualizarJuego);
router.delete('/:id', eliminarJuego);

module.exports = router;