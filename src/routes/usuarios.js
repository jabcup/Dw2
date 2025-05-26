const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/usuarioController');

router.post('/register', register);
router.post('/login', login);

router.get('/login', (req, res) => {
	console.log("erererer")
    res.sendFile(path.join(__dirname, '../../login/login.html')); 
});

module.exports = router;
