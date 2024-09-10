const express = require('express');
const EmployerController = require('./employers.controller');

const router = express.Router();

router.post('/',  EmployerController.createEmployer);
router.get('/', EmployerController.getAllEmployers);
router.get('/:id',  EmployerController.getEmployerById);
router.put('/:id',  EmployerController.updateEmployer);
router.delete('/:id',  EmployerController.deleteEmployer);

module.exports = router;
