const express = require('express');
const router = express.Router();
const { updateUser, getUsers } = require('../controllers/user')

router.patch('/:id', updateUser);
router.get('/all', getUsers);

module.exports = router;