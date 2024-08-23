const express = require('express');
const router = express.Router();

const userModule =  require('./user/user.module');
const authModule = require('./auth/auth.module');
const statesModule = require('./state/states.module')
const citiesModule = require('./city/city.module')

router.use('/user', userModule);
router.use('/auth', authModule);
router.use('/states', statesModule)
router.use('/cities', citiesModule)

module.exports = router;
