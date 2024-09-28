const Species = require('./Entities/species.entity');

class SpecieService {
  async getAllSpecies() {
    try {
      const species = await Species.findAll({
        attributes: ['id', 'name'], 
      });

      if (!species.length) {
        return { status: 404, message: 'Nenhuma espécie encontrada.' };
      }

      return { status: 200, data: species };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }
}

module.exports = new SpecieService();