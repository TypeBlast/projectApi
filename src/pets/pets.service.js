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

    return { status: 201, data: pet };

  } catch (e) {


    return { status: 400, message: e.message };

  }
};

module.exports = { createPet };
