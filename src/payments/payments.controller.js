const paymentService = require('./payments.service');

class PaymentController {
  async processPayment(req, res) {
    const { cartId, paymentMethod, addressId } = req.body; 
    const userId = req.userId; 

    try {
      const result = await paymentService.processPayment({ userId, cartId, paymentMethod, addressId });
      return res.status(result.status).json({ message: result.message, data: result.data });
    } catch (error) {
      console.error('Erro ao processar pagamento:', error.message);
      return res.status(400).json({ message: error.message });
    }
  }

  async getCartSummary(req, res) {
    const cartId = req.params.cartId; 
    const userId = req.userId; 

    try {
      const result = await paymentService.getCartSummary(userId, cartId);
      return res.status(result.status).json({ message: result.message, data: result.data });
    } catch (error) {
      console.error('Erro ao obter resumo do carrinho:', error.message);
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new PaymentController();
