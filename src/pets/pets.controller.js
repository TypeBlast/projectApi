const petsService = require('./pets.service');

const createPetController = async (req, res) => {
  try {
    const petData = req.body;
    const userId = req.userId; 

    const result = await petsService.createPet(petData, userId);

    return res.status(result.status).json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const getAllPetsController = async (req, res) => {
  try {
    const result = await petsService.getAllPets();
    return res.status(result.status).json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const getPetByIdController = async (req, res) => {
  try {
    const petId = req.params.id;
    const result = await petsService.getPetById(petId);
    return res.status(result.status).json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const updatePetController = async (req, res) => {
  try {
    const petId = req.params.id;
    const petData = req.body;
    const result = await petsService.updatePet(petId, petData);
    return res.status(result.status).json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const deletePetController = async (req, res) => {
  try {
    const petId = req.params.id;
    const result = await petsService.deletePet(petId);
    return res.status(result.status).json({ message: result.message });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  createPetController,
  getAllPetsController,
  getPetByIdController,
  updatePetController,
  deletePetController
};
