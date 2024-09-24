const { ValidationError } = require('sequelize');
const Addresses = require('./Entities/addresses.entity');

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

    
    const existingAddresses = await Addresses.findAll({
      where: { user_id: userId },
    });

    if (existingAddresses.length >= 3) {
      return { status: 400, message: 'Você só pode criar até 3 endereços.' };
    }

    
    const duplicateAddress = await Addresses.findOne({
      where: { 
        user_id: userId, 
        number: number, 
        cep: cep, 
        city_id: city_id 
      },
    });

    if (duplicateAddress) {
      return { status: 400, message: 'Este endereço já está cadastrado.' };
    }

    const address = await Addresses.create({
      ...addressData,
      user_id: userId
    });

    return { status: 201, message: 'Endereço criado com sucesso.' };

  } catch (e) {
    return { status: 400, message: e.message };
  }
};

const getAllAddresses = async () => {
  try {
    const addresses = await Addresses.findAll();
    return { status: 200, data: addresses };
  } catch (e) {
    return { status: 400, message: e.message };
  }
};

const getAddressById = async (addressId) => {
  try {
    if (!addressId || isNaN(addressId)) {
      throw new Error('ID de endereço inválido.');
    }

    const address = await Addresses.findByPk(addressId);
    if (!address) {
      return { status: 404, message: 'Endereço não encontrado.' };
    }

    return { status: 200, data: address };
  } catch (e) {
    return { status: 400, message: e.message };
  }
};

const updateAddress = async (addressId, addressData) => {
  try {
    if (!addressId || isNaN(addressId)) {
      throw new Error('ID de endereço inválido.');
    }

    const address = await Addresses.findByPk(addressId);
    if (!address) {
      return { status: 404, message: 'Endereço não encontrado.' };
    }

    await address.update(addressData);

    return { status: 200, message: 'Endereço atualizado com sucesso.' };
  } catch (e) {
    return { status: 400, message: e.message };
  }
};

const deleteAddress = async (addressId) => {
  try {
    if (!addressId || isNaN(addressId)) {
      throw new Error('ID de endereço inválido.');
    }

    const address = await Addresses.findByPk(addressId);
    if (!address) {
      return { status: 404, message: 'Endereço não encontrado.' };
    }

    await address.destroy();

    return { status: 200, message: 'Endereço excluído com sucesso.' };
  } catch (e) {
    return { status: 400, message: e.message };
  }
};

module.exports = {
  createAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
  deleteAddress
};
