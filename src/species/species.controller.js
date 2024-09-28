const speciesService = require('./species.service.js');

class SpecieController {
  async getAllSpecies(req, res) {
    const result = await speciesService.getAllSpecies();
    return res.status(result.status).json({ message: result.message, data: result.data });
  }
}

module.exports = new SpecieController();



