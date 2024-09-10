const serviceService = require('./services.service.js');

class ServiceController {
  async createService(req, res) {
    const { name, description, price, duration } = req.body;
    const result = await serviceService.createService({ name, description, price, duration });
    return res.status(result.status).json({ message: result.message, data: result.data});
  }

  async getAllServices(req, res) {
    const result = await serviceService.getAllServices();
    return res.status(result.status).json({ message: result.message, data: result.data});
  }

  async getServiceById(req, res) {
    const { id } = req.params;
    const result = await serviceService.getServiceById(id);
    return res.status(result.status).json({ message: result.message, data: result.data});
  }

  async updateService(req, res) {
    const { id } = req.params;
    const serviceData = req.body;
    const result = await serviceService.updateService(id, serviceData);
    return res.status(result.status).json({ message: result.message, data: result.data});
  }

  async deleteService(req, res) {
    const { id } = req.params;
    const result = await serviceService.deleteService(id);
    return res.status(result.status).json({ message: result.message, data: result.data});
  }
}

module.exports = new ServiceController();
