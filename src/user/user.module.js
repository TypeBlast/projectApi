const router = require('express').Router();
const userController = require('./user.controller')

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.get('/adresses/:id', userController.getUserByIdUsingRelations); 
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUserById)

router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

module.exports = router;
