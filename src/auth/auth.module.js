const router = require('express').Router()
const authController = require('./auth.controller');

router.post('/login', authController.login);


module.exports = router;