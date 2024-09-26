const paymentService = require('./payments.service');

const processPaymentController = async (req, res) => {
  try {
    const { cartId, paymentMethod } = req.body; // Recebe cartId e paymentMethod do body
    const userId = req.userId; // Extrai o ID do usuário do JWT

    // Processa o pagamento usando o serviço
    const payment = await paymentService.processPayment({ userId, cartId, paymentMethod });

    return res.status(201).json({ message: 'Pagamento realizado com sucesso', data: payment });
  } catch (error) {
    return res.status(400).json({ message: 'Erro ao processar pagamento', error: error.message });
  }
};

module.exports = {
  processPaymentController,
};
