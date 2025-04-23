const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register); // Optional: for testing/demo
router.post('/login', login);

module.exports = router;
