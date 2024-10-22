const Sequelize = require('sequelize');
const Payments = require('./Entities/payments.entity');
const Carts = require('../carts/Entities/carts.entity');
const CartItems = require('../carts/Entities/cart_items.entity');
const Products = require('../products/Entities/products.entity');
const Addresses = require('../address/Entities/addresses.entity');
const Orders = require('../orders/Entities/orders.entity');
const Order_items = require('../orders/Entities/order_items.entity');

class PaymentService {

  async calculateCartTotal(cartId) {
    const cartItems = await CartItems.findAll({ where: { cart_id: cartId } });

    if (!cartItems || cartItems.length === 0) {
      throw new Error('O carrinho está vazio. Adicione itens antes de prosseguir para o pagamento.');
    }

    const totalValue = cartItems.reduce((acc, item) => {
      const price = parseFloat(item.price) || 0; 
      return acc + (item.quantity * price);
    }, 0).toFixed(2);

    return totalValue;
  }
  
  async getOrderTotal(orderId) {
    const orderItems = await Order_items.findAll({ where: { order_id: orderId } });

    const totalValue = orderItems.reduce((acc, item) => {
      const price = parseFloat(item.price) || 0; 
      return acc + (item.quantity * price);
    }, 0).toFixed(2); 

    return totalValue;
  }

  async processPayment({ userId, cartId, paymentMethod, addressId }) {
    if (!userId || !cartId || !addressId) {
      throw new Error('Valores necessários para o pagamento não estão definidos');
    }
  
    const validPaymentMethods = ['Cartão de Débito', 'Cartão de Crédito', 'Boleto', 'Pix'];
    if (!paymentMethod || !validPaymentMethods.includes(paymentMethod)) {
      throw new Error('Método de pagamento obrigatório e deve ser um dos seguintes: ' + validPaymentMethods.join(', '));
    }
  
    const cart = await Carts.findOne({ where: { id: cartId, user_id: userId } });
    if (!cart) {
      throw new Error('Carrinho não encontrado');
    }
  
    const address = await Addresses.findOne({ where: { id: addressId, user_id: userId } });
    if (!address) {
      throw new Error('Endereço não encontrado ou não pertence ao usuário');
    }
  
    const totalValue = await this.calculateCartTotal(cartId);
  
    
    const payment = await Payments.create({
      cart_id: cartId,
      user_id: userId,
      total_value: totalValue,
      payment_method: paymentMethod,
      status: 'Aprovado',
      payment_date: new Date(),
    });
  
    
    const order = await Orders.create({
      user_id: userId,
      payment_id: payment.id,
      address_id: addressId,
      total_value: totalValue,
      status: 'Processando',
      order_date: new Date(),
    });
  
    const cartItems = await CartItems.findAll({ where: { cart_id: cartId } });
    const orderItems = [];
  
    for (const item of cartItems) {
      const product = await Products.findOne({ where: { id: item.product_id } });
  
      if (!product || product.price == null) {
        throw new Error('Erro ao adicionar item ao pedido: Produto não encontrado ou preço é inválido');
      }
  
      
      const orderItem = await Order_items.create({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: parseFloat(product.price) || 0,
      });
  
      orderItems.push(orderItem);
  
   
    }
  
    
    const finalTotalValue = await this.getOrderTotal(order.id);
  
    await Payments.update({ total_value: finalTotalValue }, { where: { id: payment.id } });
    await Orders.update({ total_value: finalTotalValue }, { where: { id: order.id } });
  
    
    await CartItems.destroy({ where: { cart_id: cartId } });
  
    const formatBrazilianDate = (date) => {
      return date ? new Date(date).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }) : 'Data não disponível';
    };
  
    return {
      status: 201,
      message: 'Pagamento e pedido processados com sucesso',
      data: {
        payment: {
          total_value: finalTotalValue,
          payment_method: paymentMethod,
          status: payment.status,
          payment_date: formatBrazilianDate(payment.payment_date),
        },
        order: { 
          status: order.status,
          order_date: formatBrazilianDate(order.order_date),
          quantity: cartItems.reduce((acc, item) => acc + item.quantity, 0),
          items: orderItems.map(item => ({
            quantity: item.quantity,
            price: item.price.toFixed(2),
          })),
        },
      }
    };
  }
  

  async getCartSummary(userId, cartId) {
    const cart = await Carts.findOne({ where: { id: cartId, user_id: userId } });
    if (!cart) {
      return {
        status: 404,
        message: 'Carrinho não encontrado',
        data: null
      };
    }

    const cartItems = await CartItems.findAll({
      where: { cart_id: cartId },
      include: [{
        model: Products,
        as: 'products',
        attributes: ['id', 'name', 'price'],
      }],
    });

    const payment = await Payments.findOne({
      where: { cart_id: cartId },
      attributes: ['status', 'payment_date'],
    });

    const summary = {
      totalItems: cartItems.length,
      items: cartItems.map(item => {
        const price = parseFloat(item.products.price) || 0;

        return {
          productName: item.products.name,
          quantity: item.quantity,
          price: price.toFixed(2),
          totalItemValue: (item.quantity * price).toFixed(2),
        };
      }),
      totalValue: cartItems.reduce((acc, item) => {
        const price = parseFloat(item.products.price) || 0;
        return acc + (item.quantity * price);
      }, 0).toFixed(2),
    };

    return {
      status: 200,
      data: {
        summary
      },
    };
  }
}

module.exports = new PaymentService();
