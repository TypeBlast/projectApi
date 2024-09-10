const express = require('express');
const router = express.Router();

const userModule =  require('./user/user.module');
const authModule = require('./auth/auth.module');
const statesModule = require('./state/states.module')
const citiesModule = require('./city/city.module')
const addressesModule = require('./address/addresses.module')
const employersModule = require('./employers/employers.module')
const servicesModule = require('./services/services.module')
const petsModule = require('./pets/pets.module')

router.use('/user', userModule);
router.use('/auth', authModule);
router.use('/states', statesModule)
router.use('/cities', citiesModule)
router.use('/addresses', addressesModule)
router.use('/employers', employersModule)
router.use('/services', servicesModule)
router.use('/pets', petsModule)

module.exports = router;
