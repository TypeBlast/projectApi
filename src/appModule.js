const express = require('express');
const router = express.Router();

const userModule =  require('./user/user.module');
const authModule = require('./auth/auth.module');

router.use('/user', userModule);
router.use('/auth', authModule)

module.exports = router;
