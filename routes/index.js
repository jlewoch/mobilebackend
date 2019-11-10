const express = require('express');
const router = express.Router();
/* GET home page. */
router.use('/user', require('./user.routes'));
router.use('/pet', require('./pet.routes'));
router.use('/request', require('./request.routes'));
// admin requires middleware check to confirm user is an admin
// employee requires middleware check to confirm user is an emplyee
// events

module.exports = router;
