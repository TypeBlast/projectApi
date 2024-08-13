const express = require('express');
const router = express.Router();

const userModule =  require('./user/user.module');

router.use('/user', userModule);

module.exports = router;
