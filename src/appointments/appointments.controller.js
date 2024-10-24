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

const getUserAppointmentsController = async (req, res) => {
  try {
    const userId = req.userId; 
    const result = await appointmentsService.getUserAppointments(userId);
    return res.status(result.status).json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const result = await appointmentsService.getAllAppointments();
    return res.status(result.status).json({ message: result.message, data: result.data})
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
}

const getAppointmentByIdAndUserIdController = async (req, res) => {
  try {
    const { id } = req.params; 
    const userId = req.userId; 

    const result = await appointmentsService.getAppointmentByIdAndUserId(id, userId);

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
  getUserAppointmentsController,
  getAllAppointments,
  getAppointmentByIdAndUserIdController,
  updateAppointmentController,
  deleteAppointmentController
};
