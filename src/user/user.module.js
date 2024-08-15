const router = require('express').Router();
const userController = require('./user.controller')

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)

module.exports = router;
