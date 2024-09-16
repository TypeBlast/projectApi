const router = require('express').Router();
const authenticate = require('../utils/middleware');
const {
  createAppointmentController,
  getAllAppointmentsController,
  getAppointmentByIdController,
  updateAppointmentController,
  deleteAppointmentController
} = require('./appointments.controller');


router.post('/', authenticate, createAppointmentController);
router.get('/', authenticate, getAllAppointmentsController);
router.get('/:id', authenticate, getAppointmentByIdController);
router.put('/:id', authenticate, updateAppointmentController);
router.delete('/:id', authenticate, deleteAppointmentController);


module.exports = router;
