const EmployerService = require('./employers.service');

class EmployerController {
  async createEmployer(req, res) {
    const employerData = req.body;
    const result = await EmployerService.createEmployer(employerData);
    return res.status(result.status).json({ message: result.message, data: result.data});
  }

  async getAllEmployers(req, res) {
    const result = await EmployerService.getAllEmployers();
    return res.status(result.status).json({ message: result.message, data: result.data});
  }

  async getEmployerById(req, res) {
    const { id } = req.params;
    const result = await EmployerService.getEmployerById(id);
    return res.status(result.status).json({ message: result.message, data: result.data});
  }

  async getEmployersByServiceId(req, res) {
    const { serviceId } = req.params;
    const result = await EmployerService.getEmployersByServiceId(serviceId);
    return res.status(result.status).json({ message: result.message, data: result.data });
  }


  async updateEmployer(req, res) {
    const { id } = req.params;
    const employerData = req.body;
    const result = await EmployerService.updateEmployer(id, employerData);
    return res.status(result.status).json({ message: result.message, data: result.data});
  }

  async deleteEmployer(req, res) {
    const { id } = req.params;
    const result = await EmployerService.deleteEmployer(id);
    return res.status(result.status).json({ message: result.message, data: result.data});
  }
}

module.exports = new EmployerController();
