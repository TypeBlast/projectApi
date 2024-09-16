const appointmentsService = require('./appointments.service');

const createAppointmentController = async (req, res) => {
  try {
    const appointmentData = req.body;
    const userId = req.userId; 

    const result = await appointmentsService.createAppointment(appointmentData, userId);

    return res.status(result.status).json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const getAllAppointmentsController = async (req, res) => {
  try {
    const result = await appointmentsService.getAllAppointments();
    return res.status(result.status).json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const getAppointmentByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await appointmentsService.getAppointmentById(id);
    return res.status(result.status).json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const updateAppointmentController = async (req, res) => {
  try {
    const { id } = req.params;
    const appointmentData = req.body;
    const result = await appointmentsService.updateAppointment(id, appointmentData);
    return res.status(result.status).json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const deleteAppointmentController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await appointmentsService.deleteAppointment(id);
    return res.status(result.status).json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  createAppointmentController,
  getAllAppointmentsController,
  getAppointmentByIdController,
  updateAppointmentController,
  deleteAppointmentController
};
