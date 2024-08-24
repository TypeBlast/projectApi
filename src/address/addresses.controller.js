const { createAddress } = require('./addresses.service');

const createAddressController = async (req, res) => {
  try {
    const addressData = req.body;
    const userId = req.userId; 

    const result = await createAddress(addressData, userId);

    return res.status(result.status).json({message: result.message, data: result.data});
  } catch (error) {
    return res.status(result.status).json({message: result.message, data: result.data});
  }
};

module.exports = { createAddressController };
