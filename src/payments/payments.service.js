const Sequelize = require('sequelize');
const Payments = require('./Entities/payments.entity');
const Carts = require('../carts/Entities/carts.entity');
const CartItems = require('../carts/Entities/cart_items.entity');
const Products = require('../products/Entities/products.entity');

class PaymentService {
  // Função para calcular o valor total dos itens no carrinho
  async calculateCartTotal(cartId) {
    console.log(`Calculando o total do carrinho para o ID do carrinho: ${cartId}`);
    
    const cartItems = await CartItems.findAll({
      where: { cart_id: cartId },
      include: [{
        model: Products,
        as: 'products', // Alias 'products' deve ser o mesmo definido nas associações
        attributes: ['price'], // Pegue apenas o preço dos produtos
      }],
    });

    console.log('Itens no carrinho:', cartItems);

    if (!cartItems || cartItems.length === 0) {
      throw new Error('Nenhum item encontrado no carrinho');
    }

    let totalValue = 0;
    cartItems.forEach(item => {
      if (item.products) {
        console.log(`Produto encontrado: ID: ${item.products.id}, Preço: ${item.products.price}`);
        totalValue += item.quantity * item.products.price; // Multiplica a quantidade pelo preço do produto
      } else {
        console.error(`Produto não encontrado para o item de carrinho com ID: ${item.id}`);
        throw new Error(`Produto não encontrado para o item de carrinho com ID: ${item.id}`);
      }
    });

    console.log(`Valor total calculado: ${totalValue}`);
    return totalValue;
  }

  // Função para processar o pagamento
  async processPayment({ userId, cartId, paymentMethod }) {
    console.log(`Processando pagamento para o usuário ID: ${userId}, carrinho ID: ${cartId}`);

    // Verifica se o carrinho existe e pertence ao usuário
    const cart = await Carts.findOne({ where: { id: cartId, user_id: userId } });
    if (!cart) {
      console.error('Carrinho não encontrado', { cartId, userId });
      throw new Error('Carrinho não encontrado');
    }

    console.log('Carrinho encontrado:', cart);

    // Calcula o valor total dos itens no carrinho
    const totalValue = await this.calculateCartTotal(cartId);

    // Cria o pagamento e define o status como aprovado automaticamente
    const payment = await Payments.create({
      cart_id: cartId,
      user_id: userId,
      total_value: totalValue,
      payment_method: paymentMethod,
      status: 'Aprovado', // Aprovado automaticamente
    });

    console.log('Pagamento criado com sucesso:', payment);
    return payment; // Retorna os detalhes do pagamento
  }
}

module.exports = new PaymentService();
