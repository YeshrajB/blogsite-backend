const express = require('express');
const router = express.Router();
const { getPermissions } = require('../controllers/roles');

router.get('/all', getPermissions);

module.exports = router;