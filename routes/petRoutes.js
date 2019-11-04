const express = require('express');
const router = express.Router();
// controller imports
const {
  addNewPet,
  updatePet,
  removePet
} = require('../controllers/petsController');

router.post('/', addNewPet);
router
  .route('/:id')
  .delete(removePet)
  .put(updatePet);
module.exports = router;
