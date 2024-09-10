const petsService = require('./pets.service')

const createPetController = async (req, res) => {
    try {
      const petData = req.body;
      const userId = req.userId; 
  
      const result = await petsService.createPet(petData, userId);
  
      return res.status(result.status).json({ message: result.message, data: result.data });
    } catch (error) {
      return res.status(result.status).json({ message: result.message });
    }
  };

  module.exports = {
    createPetController
  };