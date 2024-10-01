const addressesService = require('./addresses.service');

const createAddressController = async (req, res) => {
  try {
    const addressData = req.body;
    const userId = req.userId;

    const result = await addressesService.createAddress(addressData, userId);
    return res.status(result.status).json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(error.status || 400).json({ message: error.message || 'Erro ao criar endereço.' });
  }
};


const getAddressByIdAndUserIdController = async (req, res) => {
  try {
    const { id } = req.params; 
    const userId = req.userId; 

    const result = await addressesService.getAddressByIdAndUserId(id, userId);

    return res.status(result.status).json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

const updateAddressController = async (req, res) => {
  try {
    const addressId = req.params.id;
    const addressData = req.body;
    const result = await addressesService.updateAddress(addressId, addressData);
    return res.status(result.status).json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(error.status || 400).json({ message: error.message || 'Erro ao atualizar endereço.' });
  }
};

const deleteAddressController = async (req, res) => {
  try {
    const addressId = req.params.id;
    const result = await addressesService.deleteAddress(addressId);
    return res.status(result.status).json({ message: result.message });
  } catch (error) {
    return res.status(error.status || 400).json({ message: error.message || 'Erro ao excluir endereço.' });
  }
};

const getAddressesByUserIdController = async (req, res) => {
  try {
    const userId = req.userId; 
    const result = await addressesService.getAddressesByUserId(userId);

    return res.status(result.status).json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};


module.exports = {
  createAddressController,
  getAddressByIdAndUserIdController,
  updateAddressController,
  deleteAddressController,
  getAddressesByUserIdController
};
