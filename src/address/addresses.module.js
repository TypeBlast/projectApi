const router = require('express').Router();
const { createAddressController,
     getAllAddressesController,
      getAddressByIdController,
       updateAddressController,
        deleteAddressController
     } = require('./addresses.controller');
     
const authenticate = require('../utils/middleware');

router.post('/', authenticate, createAddressController);
router.get('/', authenticate, getAllAddressesController);
router.get('/:id', authenticate, getAddressByIdController);
router.put('/:id', authenticate, updateAddressController);
router.delete('/:id', authenticate, deleteAddressController);

module.exports = router;
