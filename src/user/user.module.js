const router = require('express').Router();
const userController = require('./user.controller')

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.get('/adresses/:id', userController.getUserByIdUsingRelations); 
router.delete('/:id', userController.deleteUserById)


module.exports = router;
