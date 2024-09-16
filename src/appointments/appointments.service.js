const { ValidationError } = require('sequelize');
const Appointments = require('./Entities/appointments.entity'); 

const createAppointment = async (appointmentData, userId) => {
  try {
    if (!appointmentData || typeof appointmentData !== 'object') {
      throw new Error('Dados do agendamento inválidos.');
    }

    const { service_id, employer_id, pet_id, appointment_date, appointment_time } = appointmentData;

    if (!service_id || !employer_id || !pet_id || !appointment_date || !appointment_time) {
      throw new Error('Todos os campos são obrigatórios.');
    }

    const appointment = await Appointments.create({
      ...appointmentData,
      user_id: userId
    });

    return { status: 201, message: 'Agendamento criado com sucesso.' };

  } catch (e) {
    return { status: 400, message: e.message };
  }
};

const getAllAppointments = async () => {
  try {
    const appointments = await Appointments.findAll();
    return { status: 200, data: appointments };
  } catch (e) {
    return { status: 400, message: e.message };
  }
};

const getAppointmentById = async (appointmentId) => {
  try {
    if (!appointmentId || isNaN(appointmentId)) {
      throw new Error('ID do agendamento inválido.');
    }

    const appointment = await Appointments.findByPk(appointmentId);
    if (!appointment) {
      return { status: 404, message: 'Agendamento não encontrado.' };
    }

    return { status: 200, data: appointment };
  } catch (e) {
    return { status: 400, message: e.message };
  }
};

const updateAppointment = async (appointmentId, appointmentData) => {
  try {
    if (!appointmentId || isNaN(appointmentId)) {
      throw new Error('ID do agendamento inválido.');
    }

    const appointment = await Appointments.findByPk(appointmentId);
    if (!appointment) {
      return { status: 404, message: 'Agendamento não encontrado.' };
    }

    const { service_id, employer_id, pet_id, appointment_date, appointment_time } = appointmentData;

    if (service_id && !service_id) throw new Error('ID do serviço inválido.');
    if (employer_id && !employer_id) throw new Error('ID do empregador inválido.');
    if (pet_id && !pet_id) throw new Error('ID do pet inválido.');
    if (appointment_date && !appointment_date) throw new Error('Data do agendamento inválida.');
    if (appointment_time && !appointment_time) throw new Error('Hora do agendamento inválida.');

    await appointment.update(appointmentData);

    return { status: 200, message: 'Agendamento atualizado com sucesso.' };
  } catch (e) {
    return { status: 400, message: e.message };
  }
};

const deleteAppointment = async (appointmentId) => {
  try {
    if (!appointmentId || isNaN(appointmentId)) {
      throw new Error('ID do agendamento inválido.');
    }

    const appointment = await Appointments.findByPk(appointmentId);
    if (!appointment) {
      return { status: 404, message: 'Agendamento não encontrado.' };
    }

    await appointment.destroy();

    return { status: 200, message: 'Agendamento excluído com sucesso.' };
  } catch (e) {
    return { status: 400, message: e.message };
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment
};
