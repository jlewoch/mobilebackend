const express = require('express');
const router = express.Router();
/* GET home page. */
router.use('/user', require('./usersRoutes'));
router.use('/pet', require('./petRoutes'));

module.exports = router;
