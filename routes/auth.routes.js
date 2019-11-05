var express = require('express');
var router = express.Router();
const { signup, login } = require('../controllers/auth.controller');

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
