const Service = require('./Entities/services.entity'); 

class ServiceService {
  async createService(serviceData) {
    try {
      if (typeof serviceData !== 'object' || serviceData === null) {
        throw new Error('Dados do serviço inválidos.');
      }


      if (!serviceData.name || typeof serviceData.name !== 'string' || serviceData.name.length < 3) {
        throw new Error('O nome do serviço é obrigatório e deve ter pelo menos 3 caracteres.');
      }

      if (!serviceData.description || typeof serviceData.description !== 'string' || serviceData.description.length < 10) {
        throw new Error('A descrição é obrigatória e deve ter pelo menos 10 caracteres.');
      }

      if (typeof serviceData.price !== 'number' || isNaN(serviceData.price) || serviceData.price <= 0) {
        throw new Error('O preço é obrigatório e deve ser um número maior que 0.');
      }

      if (!serviceData.duration || typeof serviceData.duration !== 'string' || serviceData.duration.length < 5) {
        throw new Error('A duração é obrigatória e deve ter pelo menos 5 caracteres.');
      }


      const newService = await Service.create(serviceData);
      return { status: 201, message: 'Serviço criado com sucesso.'};
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  async getAllServices() {
    try {
      const services = await Service.findAll();
      return { status: 200, data: services };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  async getServiceById(serviceId) {
    try {
      if (!serviceId || isNaN(serviceId)) {
        throw new Error('ID do serviço inválido.');
      }

      const service = await Service.findByPk(serviceId);
      if (!service) {
        return { status: 404, message: 'Serviço não encontrado.' };
      }

      return { status: 200, data: service };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  async updateService(serviceId, serviceData) {
    try {
      if (!serviceId || isNaN(serviceId)) {
        throw new Error('ID do serviço inválido.');
      }

      const service = await Service.findByPk(serviceId);
      if (!service) {
        return { status: 404, message: 'Serviço não encontrado.' };
      }

    
      if (serviceData.name && (typeof serviceData.name !== 'string' || serviceData.name.length < 3)) {
        throw new Error('O nome do serviço deve ter pelo menos 3 caracteres.');
      }

      if (serviceData.description && (typeof serviceData.description !== 'string' || serviceData.description.length < 10)) {
        throw new Error('A descrição deve ter pelo menos 10 caracteres.');
      }

      if (serviceData.price && (typeof serviceData.price !== 'number' || isNaN(serviceData.price) || serviceData.price <= 0)) {
        throw new Error('O preço deve ser um número maior que 0.');
      }

      if (serviceData.duration && (typeof serviceData.duration !== 'string' || serviceData.duration.length < 5)) {
        throw new Error('A duração deve ter pelo menos 5 caracteres.');
      }

      await service.update(serviceData);
      return { status: 200, message: 'Serviço atualizado com sucesso.'};
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  async deleteService(serviceId) {
    try {
      if (!serviceId || isNaN(serviceId)) {
        throw new Error('ID do serviço inválido.');
      }

      const service = await Service.findByPk(serviceId);
      if (!service) {
        return { status: 404, message: 'Serviço não encontrado.' };
      }

      await service.destroy();
      return { status: 200, message: 'Serviço deletado com sucesso.' };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }
}

module.exports = new ServiceService();
