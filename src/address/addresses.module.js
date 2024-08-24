const router = require('express').Router()
const { createAddressController } = require('./addresses.controller');
const authenticate = require('../utils/middleware'); 

router.post('/', authenticate, createAddressController);

module.exports = router