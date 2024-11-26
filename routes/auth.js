const express = require('express');
const router = express.Router();
const { signin } = require('../controllers/auth')

router.post('/login', signin);

module.exports = router;
