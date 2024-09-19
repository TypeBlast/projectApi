const router = require('express').Router()
const EmployerController = require('./employers.controller');

router.post('/',  EmployerController.createEmployer);
router.get('/', EmployerController.getAllEmployers);
router.get('/:id',  EmployerController.getEmployerById);
router.get('/service/:serviceId', EmployerController.getEmployersByServiceId);
router.put('/:id',  EmployerController.updateEmployer);
router.delete('/:id',  EmployerController.deleteEmployer);

module.exports = router;
