const express = require('express');
const router = express.Router();
const { getRoles, updateRole } = require('../controllers/roles');

router.patch('/:id', updateRole);
router.get('/all', getRoles);

module.exports = router