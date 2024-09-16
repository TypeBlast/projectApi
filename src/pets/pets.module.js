const router = require('express').Router();
const authenticate = require('../utils/middleware');

const {
  createPetController,
  getAllPetsController,
  getPetByIdController,
  updatePetController,
  deletePetController
} = require('./pets.controller');


router.post('/', authenticate, createPetController);
router.get('/', authenticate, getAllPetsController);
router.get('/:id', authenticate, getPetByIdController);
router.put('/:id', authenticate, updatePetController);
router.delete('/:id', authenticate, deletePetController);


module.exports = router;
