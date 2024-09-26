const cartService = require('./carts.service');

const addToCartController = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId; 

    const result = await cartService.addToCart(userId, productId, quantity);
    return res.status(result.status).json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(400).json({ message: 'Erro ao adicionar item ao carrinho.' });
  }
};

const removeFromCartController = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    const result = await cartService.removeFromCart(userId, productId, quantity);
    return res.status(result.status).json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(400).json({ message: 'Erro ao remover item do carrinho.' });
  }
};

const clearCartController = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await cartService.clearCart(userId);
    return res.status(result.status).json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(400).json({ message: 'Erro ao limpar carrinho.' });
  }
};


const getCartController = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await cartService.getCart(userId);
    return res.status(result.status).json({ message: result.message, data: result.data });
  } catch (error) {
    return res.status(400).json({ message: 'Erro ao obter o carrinho.' });
  }
};

module.exports = {
  addToCartController,
  removeFromCartController,
  clearCartController,
  getCartController,
};
