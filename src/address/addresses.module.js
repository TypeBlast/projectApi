const router = require('express').Router();
const { createAddressController,
     getAddressByIdAndUserIdController,
     updateAddressController,
     deleteAddressController,
     getAddressesByUserIdController
     } = require('./addresses.controller');
     
const authenticate = require('../utils/middleware');

router.post('/', authenticate, createAddressController);
router.get('/:id', authenticate, getAddressByIdAndUserIdController);
router.put('/:id', authenticate, updateAddressController);
router.delete('/:id', authenticate, deleteAddressController);
router.get('/', authenticate, getAddressesByUserIdController);

module.exports = router;
