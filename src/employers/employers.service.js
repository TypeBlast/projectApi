const Employer = require('./Entities/employers.entity');

class EmployerService {
  async createEmployer(employerData) {
    try {

      if (!employerData.name || !employerData.phone || !employerData.position) {
        throw new Error('Campos obrigatórios ausentes. Os campos nome, telefone e cargo são necessários.');
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
