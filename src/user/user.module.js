const router = require('express').Router();
const userController = require('./user.controller');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.get('/email', userController.getUserByEmail);
router.get('/adresses/:id', userController.getUserByIdUsingRelations); 
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUserById);
router.get('/pets/:id', userController.getUserByIdWithPetsAndAppointments);



module.exports = router;
