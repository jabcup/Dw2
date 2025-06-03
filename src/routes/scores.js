const express = require('express');
const router = express.Router();
const { registrarScore } = require('../controllers/scoresController');

router.post('/', registrarScore);

module.exports = router;
