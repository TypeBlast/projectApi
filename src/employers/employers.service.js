const Employer = require('./Entities/employers.entity');

class EmployerService {

  async createEmployer(employerData) {
    try {

      if (!employerData.name || !employerData.phone || !employerData.position || !employerData.service_id) {
        throw new Error('Campos obrigatórios ausentes. Os campos nome, telefone, cargo e ID do serviço são necessários.');
      }


      if (!/^\d{13}$/.test(employerData.phone)) {
        throw new Error('O telefone deve conter 13 dígitos numéricos, incluindo o código postal e seu DDD.');
      }

      const existingEmployerByPhone = await Employer.findOne({ where: { phone: employerData.phone } });
      if (existingEmployerByPhone) {
        throw new Error('Telefone já registrado.');
      }

   
      const newEmployer = await Employer.create(employerData);
      return { status: 201, message: 'Funcionário criado com sucesso.' };
    } catch (e) {
      return { status: 400, message: e.message };
    }
  }

  async getAllEmployers() {
    try {
      const employers = await Employer.findAll();
      return { status: 200, data: employers };
    } catch (e) {
      return { status: 400, message: e.message };
    }
  }

  async getEmployerById(employerId) {
    try {
     
      if (!employerId || isNaN(employerId)) {
        throw new Error('Id do funcionário inválido.');
      }

      const employer = await Employer.findByPk(employerId);
      if (!employer) {
        throw new Error('Funcionário não encontrado.');
      }

      return { status: 200, data: employer };
    } catch (e) {
      return { status: 400, message: e.message };
    }
  }

   async getEmployersByServiceId(serviceId) {
    try {
      if (!serviceId || isNaN(serviceId)) {
        throw new Error('ID do serviço inválido.');
      }

      const employers = await Employer.findAll({
        where: {
          serviceId: serviceId
        }
      });

      if (employers.length === 0) {
        return { status: 404, message: 'Nenhum funcionário encontrado para este serviço.' };
      }

      return { status: 200, data: employers };
    } catch (e) {
      return { status: 400, message: e.message };
    }
  }
  
 async updateEmployer(employerId, employerData) {
    try {
   
      if (!employerId || isNaN(employerId)) {
        throw new Error('Id do funcionário inválido.');
      }

      
      if (employerData.phone && !/^\d{13}$/.test(employerData.phone)) {
        throw new Error('O telefone deve conter 13 dígitos numéricos.');
      }


      const employer = await Employer.findByPk(employerId);
      if (!employer) {
        throw new Error('Funcionário não encontrado.');
      }


      if (employerData.service_id && isNaN(employerData.service_id)) {
        throw new Error('ID do serviço inválido.');
      }


      await employer.update(employerData);
      return { status: 200, message: 'Dados do funcionário atualizados com sucesso' };
    } catch (e) {
      return { status: 400, message: e.message };
    }
  }

  async deleteEmployer(employerId) {
    try {
    
      if (!employerId || isNaN(employerId)) {
        throw new Error('Id do funcionário inválido.');
      }

      const employer = await Employer.findByPk(employerId);
      if (!employer) {
        throw new Error('Funcionário não encontrado.');
      }

      
      await employer.destroy();
      return { status: 200, message: 'Funcionário deletado com sucesso.' };
    } catch (e) {
      return { status: 400, message: e.message };
    }
  }
}

module.exports = new EmployerService();
