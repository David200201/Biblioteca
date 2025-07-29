const express = require('express');
const router = express.Router();
const ejemploController = require('../controllers/ejemploController');

// Ruta para recibir datos desde el frontend
router.post('/endpoint', ejemploController.recibirDatos);

module.exports = router;
