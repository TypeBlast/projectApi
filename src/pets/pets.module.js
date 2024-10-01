const router = require('express').Router();
const authenticate = require('../utils/middleware');

const {
  createPetController,
  getPetByIdAndUserIdController,
  updatePetController,
  deletePetController,
  getPetsByUserIdController
} = require('./pets.controller');


router.post('/', authenticate, createPetController);
router.get('/', authenticate, getPetsByUserIdController); 
router.get('/:id', authenticate, getPetByIdAndUserIdController);
router.put('/:id', authenticate, updatePetController);
router.delete('/:id', authenticate, deletePetController);


module.exports = router;
