const express = require('express');
const router = express.Router();
// controller imports
const {
  getProfile,
  updateProfile
} = require('../controllers/usersControllers');
router
  .route('/')
  .get(getProfile)
  .put(updateProfile);

module.exports = router;
