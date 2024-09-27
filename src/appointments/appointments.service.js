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

   
    const currentDateTime = new Date();
    const appointmentDateTime = new Date(`${appointment_date}T${appointment_time}`);

    
    if (appointmentDateTime < currentDateTime) {
      throw new Error('Não é possível agendar em uma data anterior à atual.');
    }

    
    const appointmentHour = appointmentDateTime.getHours();
    if (appointmentHour < 8 || appointmentHour >= 18) {
      throw new Error('O horário de agendamento deve estar entre 08:00 e 18:00.');
    }

    
    const existingAppointment = await Appointments.findOne({
      where: {
        appointment_date,
        appointment_time,
        employer_id,
        service_id,
      }
    });

    if (existingAppointment) {
      throw new Error('Já existe um agendamento para este serviço, empregador e horário.');
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
