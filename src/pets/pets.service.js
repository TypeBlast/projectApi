const { ValidationError } = require('sequelize');
const Pets = require('./Entities/pets.entity');

const createPet = async (petData, userId) => {
  try {
    if (!petData || typeof petData !== 'object') {
      throw new Error('Dados do pet inválidos.');
    }

    const { name, age, specie, size } = petData;

    if (!name || !age || !specie) {
      throw new Error('Nome, idade e espécie são informações obrigatórias.');
    }

    if (!['Cachorro', 'Gato'].includes(specie)) {
      throw new Error('Espécie inválida. Deve ser cachorro ou gato.');
    }

    if (size && !['Pequeno', 'Médio', 'Grande'].includes(size)) {
      throw new Error('Tamanho inválido. Deve ser pequeno, médio ou grande.');
    }

    const pet = await Pets.create({
      ...petData,
      user_id: userId
    });

    return { status: 201, message: 'Pet criado com sucesso.' };

  } catch (e) {
    return { status: 400, message: e.message };
  }
};

const getAllPets = async () => {
  try {
    const pets = await Pets.findAll();
    return { status: 200, data: pets };
  } catch (e) {
    return { status: 400, message: e.message };
  }
};

const getPetById = async (petId) => {
  try {
    if (!petId || isNaN(petId)) {
      throw new Error('ID do pet inválido.');
    }

    const pet = await Pets.findByPk(petId);
    if (!pet) {
      return { status: 404, message: 'Pet não encontrado.' };
    }

    return { status: 200, data: pet };
  } catch (e) {
    return { status: 400, message: e.message };
  }
};

const updatePet = async (petId, petData) => {
  try {
    if (!petId || isNaN(petId)) {
      throw new Error('ID do pet inválido.');
    }

    const pet = await Pets.findByPk(petId);
    if (!pet) {
      return { status: 404, message: 'Pet não encontrado.' };
    }

    const { name, age, specie, size } = petData;

    if (name && !name) throw new Error('Nome inválido.');
    if (age && isNaN(age)) throw new Error('Idade inválida.');
    if (specie && !['Cachorro', 'Gato'].includes(specie)) throw new Error('Espécie inválida.');
    if (size && !['Pequeno', 'Médio', 'Grande'].includes(size)) throw new Error('Tamanho inválido.');

    await pet.update(petData);

    return { status: 200, message: 'Pet atualizado com sucesso.' };
  } catch (e) {
    return { status: 400, message: e.message };
  }
};

const deletePet = async (petId) => {
  try {
    if (!petId || isNaN(petId)) {
      throw new Error('ID do pet inválido.');
    }

    const pet = await Pets.findByPk(petId);
    if (!pet) {
      return { status: 404, message: 'Pet não encontrado.' };
    }

    await pet.destroy();

    return { status: 200, message: 'Pet excluído com sucesso.' };
  } catch (e) {
    return { status: 400, message: e.message };
  }
};

module.exports = {
  createPet,
  getAllPets,
  getPetById,
  updatePet,
  deletePet
};
