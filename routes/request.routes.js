const express = require('express');
const router = express.Router();
// controller imports
const {
  submitRequest,
  updateRequest
} = require('../controllers/request.controller');

router.post('/', submitRequest);
router.route('/:id').put(updateRequest);
module.exports = router;
