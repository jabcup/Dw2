// routes/forgotRoutes.js
const express = require('express');
const router = express.Router();
const { getUserInfo } = require('../controllers/forgotController'); // Asegúrate de crear este controlador

// Ruta para validar usuario (recuperación de contraseña)
router.post('/verify-user', getUserInfo);

module.exports = router;