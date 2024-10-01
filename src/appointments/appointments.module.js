const router = require('express').Router();
const authenticate = require('../utils/middleware');
const {
  createAppointmentController,
  getUserAppointmentsController,
  getAppointmentByIdAndUserIdController,
  updateAppointmentController,
  deleteAppointmentController
} = require('./appointments.controller');


router.post('/', authenticate, createAppointmentController);
router.get('/', authenticate, getUserAppointmentsController);
router.get('/:id', authenticate, getAppointmentByIdAndUserIdController);
router.put('/:id', authenticate, updateAppointmentController);
router.delete('/:id', authenticate, deleteAppointmentController);


module.exports = router;
