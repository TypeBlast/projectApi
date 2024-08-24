const { ValidationError } = require('sequelize');
const Addresses = require('./Entities/addresses.entity')

const createAddress = async (addressData, userId) => {
  try {

    if (!addressData || typeof addressData !== 'object') {
      throw new Error('Dados de endereço inválidos.');
    }
    
    const { number, cep, city_id } = addressData;
    
    if (!number || !cep || !city_id) {
      throw new Error('Número, CEP e a cidade são informações obrigatórias.');
    }


    if (!/^[0-9]{8,10}$/.test(cep)) {
      throw new Error('O CEP deve conter apenas números e ter entre 8 a 10 dígitos.');
    }


    const address = await Addresses.create({
      ...addressData,
      user_id: userId 
    });

    return {status: 201, data: address};

  } catch (e) {
    
    return {status: 400, message: e.message};

  }
};

module.exports = { createAddress };
