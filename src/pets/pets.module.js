const router = require('express').Router()
const authenticate = require('../utils/middleware'); 
const { createPetController } = require('./pets.controller');

router.post('/', authenticate, createPetController);

module.exports = router