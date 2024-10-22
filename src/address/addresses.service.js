const { ValidationError } = require('sequelize');
const Addresses = require('./Entities/addresses.entity');
const Cities = require('../city/Entities/cities.entity');
const Orders = require('../orders/Entities/orders.entity')

const createAddress = async (addressData, userId) => {
  try {
    if (!addressData || typeof addressData !== 'object') {
      throw new Error('Dados de endereço inválidos.');
    }

    const { number, cep, city_id, state_id } = addressData;

    if (!number || !cep || !city_id || !state_id) {
      throw new Error('Número, CEP, cidade e estado são informações obrigatórias.');
    }

    if (!/^[0-9]{8,10}$/.test(cep)) {
      throw new Error('O CEP deve conter apenas números e ter entre 8 a 10 dígitos.');
    }

    
    const city = await Cities.findByPk(city_id);
    if (!city) {
      throw new Error('Cidade não encontrada.');
    }
    if (city.state_id !== state_id) {
      throw new Error('A cidade fornecida não pertence ao estado especificado.');
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
        number, 
        cep, 
        city_id,
        state_id 
      },
    });

    if (duplicateAddress) {
      return { status: 400, message: 'Este endereço já está cadastrado.' };
    }

    const address = await Addresses.create({
      ...addressData,
      user_id: userId
    });

    return { status: 201, message: 'Endereço criado com sucesso.', data: address };

  } catch (e) {
    return { status: 400, message: e.message };
  }
};


const getAddressByIdAndUserId = async (addressId, userId) => {
  try {
    if (!addressId || isNaN(addressId)) {
      throw new Error('ID de endereço inválido.');
    }

    if (!userId || isNaN(userId)) {
      throw new Error('ID de usuário inválido.');
    }

    const address = await Addresses.findOne({
      where: {
        id: addressId,
        user_id: userId
      }
    });

    if (!address) {
      return { status: 404, message: 'Endereço não encontrado para este usuário.' };
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

    const { city_id, state_id } = addressData;

    if (city_id && state_id) {
    
      const city = await Cities.findByPk(city_id);
      if (!city) {
        throw new Error('Cidade não encontrada.');
      }
      if (city.state_id !== state_id) {
        throw new Error('A cidade fornecida não pertence ao estado especificado.');
      }
    }

    await address.update(addressData);

    return { status: 200, message: 'Endereço atualizado com sucesso.', data: address };
  } catch (e) {
    return { status: 400, message: e.message };
  }
};

const deleteAddress = async (addressId, userId) => {
  try {
    if (!addressId || isNaN(addressId)) {
      throw new Error('ID de endereço inválido.');
    }

    const address = await Addresses.findByPk(addressId);
    if (!address) {
      return { status: 404, message: 'Endereço não encontrado.' };
    }

   
    const orders = await Orders.findAll({
      where: { address_id: addressId },
    });

    if (orders.length > 0) {
      return { status: 400, message: 'Não é possível excluir este endereço porque ele está relacionado a um pedido.' };
    }

    await address.destroy();

    return { status: 200, message: 'Endereço excluído com sucesso.' };
  } catch (e) {
    return { status: 400, message: e.message };
  }
};


const getAddressesByUserId = async (userId) => {
  try {
    const addresses = await Addresses.findAll({
      where: { user_id: userId },
    });

    return { status: 200, data: addresses };
  } catch (e) {
    return { status: 400, message: 'Não existe nenhum endereço para este usuário.' };
  }
};

module.exports = {
  createAddress,
  getAddressesByUserId,
  updateAddress,
  deleteAddress,
  getAddressByIdAndUserId
};
