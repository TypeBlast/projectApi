const Orders = require('./Entities/orders.entity');
const OrderItems = require('./Entities/order_items.entity');
const Payments = require('../payments/Entities/payments.entity');
const Addresses = require('../address/Entities/addresses.entity');
const Products = require('../products/Entities/products.entity');
const Cities = require('../city/Entities/cities.entity');

class OrderService {
  async getOrderByPaymentId(paymentId, userId) {
    if (!paymentId) {
      throw new Error('ID do pagamento é obrigatório');
    }

    if (!userId) {
      throw new Error('ID do usuário é obrigatório');
    }

    const order = await Orders.findOne({
      where: { payment_id: paymentId, user_id: userId },
      include: [
        {
          model: Payments,
          as: 'payments',
          attributes: ['payment_method', 'status', 'payment_date'],
        },
        {
          model: Addresses,
          as: 'addresses',
          attributes: ['complement', 'number', 'cep', 'city_id'],
          include: [
            {
              model: Cities,
              as: 'cities',
              attributes: ['name'],
            }
          ]
        },
        {
          model: OrderItems,
          as: 'order_items',
          include: [
            {
              model: Products,
              as: 'products',
              attributes: ['name', 'price'],
            }
          ],
        }
      ]
    });

    if (!order) {
      throw new Error('Pedido não encontrado para o ID de pagamento e usuário fornecido');
    }

    const payments = order.payments || {};
    const totalQuantity = order.order_items
      ? order.order_items.reduce((acc, item) => acc + item.quantity, 0)
      : 0;

    const totalValue = order.order_items
      ? order.order_items.reduce((acc, item) => acc + (item.products.price * item.quantity), 0)
      : 0;

    const formatBrazilianDate = (date) => {
      return date ? new Date(date).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }) : 'Data não disponível';
    };

    const orderDetails = {
      totalValue: totalValue,
      totalQuantity: totalQuantity,
      orderDate: formatBrazilianDate(order.order_date),
      status: order.status,
      paymentMethod: payments.payment_method || 'Método de pagamento não disponível',
      paymentStatus: payments.status || 'Status não disponível',
      paymentDate: formatBrazilianDate(payments.payment_date),
      addresses: order.addresses
        ? {
            complement: order.addresses.complement,
            number: order.addresses.number,
            cep: order.addresses.cep,
            city: order.addresses.cities.name,
          }
        : 'Endereço não disponível',
      items: order.order_items
        ? order.order_items.map(item => ({
            productName: item.products.name,
            quantity: item.quantity,
            price: item.products.price,
          }))
        : [],
    };

    return orderDetails;
  }

  async deleteOrder(orderId, userId) {
    const order = await Orders.findOne({
      where: { id: orderId, user_id: userId },
    });

    if (!order) {
      throw new Error('Pedido não encontrado ou não pertence ao usuário');
    }

    await OrderItems.destroy({
      where: { order_id: orderId },
    });

    await Orders.destroy({
      where: { id: orderId, user_id: userId },
    });

    await Payments.destroy({
      where: { id: order.payment_id },
    });

    return {
      status: 200,
      message: 'Pedido, itens e pagamento excluídos com sucesso',
    };
  }

  async cancelOrder(orderId, userId) {
    const order = await Orders.findOne({
      where: { id: orderId, user_id: userId },
      include: [
        {
          model: OrderItems,
          as: 'order_items',
          include: [
            {
              model: Products,
              as: 'products',
              attributes: ['id', 'stock'],
            },
          ],
        },
      ],
    });

    if (!order) {
      throw new Error('Pedido não encontrado ou não pertence ao usuário');
    }

    if (order.status === 'Entregue') {
      throw new Error('Pedido entregue não pode ser cancelado');
    }

    for (const item of order.order_items) {
      const product = item.products;
      const newStock = product.stock + item.quantity;

      await Products.update(
        { stock: newStock },
        { where: { id: product.id } }
      );
    }

    await Orders.update(
      { status: 'Cancelado' },
      { where: { id: orderId, user_id: userId } }
    );

    await Payments.update(
      { status: 'Cancelado' },
      { where: { id: order.payment_id } }
    );

    return {
      status: 200,
      message: 'Pedido e pagamento cancelados com sucesso.',
    };
  }

  async markOrderAsDelivered(orderId, userId) {
    const order = await Orders.findOne({
      where: { id: orderId, user_id: userId },
    });

    if (!order) {
      throw new Error('Pedido não encontrado ou não pertence ao usuário');
    }

    if (order.status === 'Cancelado') {
      throw new Error('Pedido cancelado não pode ser marcado como entregue');
    }

    await Orders.update(
      { status: 'Entregue' },
      { where: { id: orderId, user_id: userId } }
    );

    return {
      status: 200,
      message: 'Pedido entregue com sucesso',
    };
  }

  async getAllOrders(userId) {
    if (!userId) {
      throw new Error('ID do usuário é obrigatório');
    }

    const formatBrazilianDate = (date) => {
      return date ? new Date(date).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }) : 'Data não disponível';
    };

    const orders = await Orders.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Payments,
          as: 'payments',
          attributes: ['payment_method', 'status', 'payment_date'],
        },
        {
          model: OrderItems,
          as: 'order_items',
          include: [
            {
              model: Products,
              as: 'products',
              attributes: ['name', 'price'],
            },
          ],
        },
      ],
    });

    if (!orders || orders.length === 0) {
      throw new Error('Nenhum pedido encontrado para o usuário fornecido');
    }

    const orderDetails = orders.map(order => {
      const totalValue = order.order_items.reduce((acc, item) => acc + item.price * item.quantity, 0);

      return {
        id: order.id,
        orderDate: formatBrazilianDate(order.order_date),
        status: order.status,
        totalValue: totalValue,
        paymentMethod: order.payments ? order.payments.payment_method : 'Método de pagamento não disponível',
        paymentStatus: order.payments ? order.payments.status : 'Status não disponível',
        items: order.order_items.map(item => ({
          productName: item.products.name,
          quantity: item.quantity,
          price: item.price,
        })),
      };
    });

    return orderDetails;
  }

  async getAllOrdersForAllUsers() {
    const formatBrazilianDate = (date) => {
      return date ? new Date(date).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }) : 'Data não disponível';
    };

    const orders = await Orders.findAll({
      include: [
        {
          model: Payments,
          as: 'payments',
          attributes: ['payment_method', 'status', 'payment_date'],
        },
        {
          model: OrderItems,
          as: 'order_items',
          include: [
            {
              model: Products,
              as: 'products',
              attributes: ['name', 'price'],
            },
          ],
        },
        {
          model: Addresses,
          as: 'addresses',
          attributes: ['complement', 'number', 'cep'],
          include: [
            {
              model: Cities,
              as: 'cities',
              attributes: ['name'],
            }
          ]
        }
      ],
    });

    if (!orders || orders.length === 0) {
      throw new Error('Nenhum pedido encontrado.');
    }

    const orderDetails = orders.map(order => {
      const totalValue = order.order_items.reduce((acc, item) => acc + item.products.price * item.quantity, 0);

      return {
        orderId: order.id,
        userId: order.user_id,
        orderDate: formatBrazilianDate(order.order_date),
        status: order.status,
        totalValue: totalValue,
        paymentMethod: order.payments ? order.payments.payment_method : 'Método de pagamento não disponível',
        paymentStatus: order.payments ? order.payments.status : 'Status não disponível',
        addresses: order.addresses ? {
          complement: order.addresses.complement,
          number: order.addresses.number,
          cep: order.addresses.cep,
          city: order.addresses.cities.name,
        } : 'Endereço não disponível',
        items: order.order_items.map(item => ({
          productName: item.products.name,
          quantity: item.quantity,
          price: item.products.price,
        })),
      };
    });

    return orderDetails;
  }

  async deleteOrderByAdmin(orderId) {
    const order = await Orders.findOne({
        where: { id: orderId },
        include: [{
            model: Payments,
            as: 'payments',
        }],
    });

    if (!order) {
        throw new Error('Pedido não encontrado');
    }

    
    await OrderItems.destroy({
        where: { order_id: orderId },
    });


    await Orders.destroy({
        where: { id: orderId },
    });

   
    if (order.payment_id) {
        await Payments.destroy({
            where: { id: order.payment_id },
        });
    }

    return {
        status: 200,
        message: 'Pedido, itens e pagamento excluídos com sucesso',
    };
}


  async cancelOrderByAdmin(orderId) {
    const order = await Orders.findOne({
      where: { id: orderId },
      include: [
        {
          model: OrderItems,
          as: 'order_items',
          include: [
            {
              model: Products,
              as: 'products',
              attributes: ['id', 'stock'],
            },
          ],
        },
      ],
    });

    if (!order) {
      throw new Error('Pedido não encontrado');
    }

    if (order.status === 'Entregue') {
      throw new Error('Pedido entregue não pode ser cancelado');
    }

    for (const item of order.order_items) {
      const product = item.products;
      const newStock = product.stock + item.quantity;

      await Products.update(
        { stock: newStock },
        { where: { id: product.id } }
      );
    }

    await Orders.update(
      { status: 'Cancelado' },
      { where: { id: orderId } }
    );

    await Payments.update(
      { status: 'Cancelado' },
      { where: { id: order.payment_id } }
    );

    return {
      status: 200,
      message: 'Pedido e pagamento cancelados com sucesso.',
    };
  }
}

module.exports = new OrderService();
