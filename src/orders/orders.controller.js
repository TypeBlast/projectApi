const OrderService = require('./orders.service');

class OrderController {
  async getOrderByPaymentId(req, res) {
    const { paymentId } = req.params;
    const userId = req.userId; 

    try {
      const orderDetails = await OrderService.getOrderByPaymentId(paymentId, userId);
      return res.status(200).json({
        status: 200,
        message: 'Pedido obtido com sucesso',
        data: orderDetails,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  }

  async deleteOrder(req, res) {
    try {
      const { orderId } = req.params;
      const userId = req.userId; 

      const result = await OrderService.deleteOrder(orderId, userId);
      return res.status(result.status).json({
        message: result.message,
      });
    } catch (error) {
      console.error('Erro ao deletar pedido:', error.message);
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  async cancelOrder(req, res) {
    try {
      const { orderId } = req.params;
      const userId = req.userId; 

      const result = await OrderService.cancelOrder(orderId, userId);
      res.status(result.status).json({ message: result.message });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async markOrderAsDelivered(req, res) {
    const { orderId } = req.params; 
    const userId = req.userId; 

    try {
      const result = await OrderService.markOrderAsDelivered(orderId, userId);
      return res.status(result.status).json(result);
    } catch (error) {
      console.error('Erro ao marcar pedido como entregue:', error);
      return res.status(400).json({ error: error.message });
    }
  }

  async getAllOrders(req, res) {
    const userId = req.userId; 

    try {
      const orders = await OrderService.getAllOrders(userId);
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async getAllOrdersForAllUsers(req, res) {
    try {
      const orders = await OrderService.getAllOrdersForAllUsers();
      return res.status(200).json({
        status: 200,
        message: 'Todos os pedidos obtidos com sucesso',
        data: orders,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  
  async deleteOrderByAdmin(req, res) {
    const { orderId } = req.params;

    try {
      const result = await OrderService.deleteOrderByAdmin(orderId);
      return res.status(result.status).json({ message: result.message });
    } catch (error) {
      console.error('Erro ao deletar pedido como admin:', error.message);
      return res.status(400).json({ error: error.message });
    }
  }

  async cancelOrderByAdmin(req, res) {
    const { orderId } = req.params;

    try {
      const result = await OrderService.cancelOrderByAdmin(orderId);
      return res.status(result.status).json({ message: result.message });
    } catch (error) {
      console.error('Erro ao cancelar pedido como admin:', error.message);
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new OrderController();
