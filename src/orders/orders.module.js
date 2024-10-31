const express = require('express');
const router = express.Router();
const OrderController = require('./orders.controller');
const authenticate = require('../utils/middleware'); 

router.get('/:paymentId', authenticate, OrderController.getOrderByPaymentId);
router.delete('/:orderId', authenticate, OrderController.deleteOrder);
router.delete('/cancel/:orderId', authenticate, OrderController.cancelOrder);
router.put('/:orderId', authenticate, OrderController.markOrderAsDelivered);
router.get('/', authenticate, OrderController.getAllOrders);
router.get('/all/users',  OrderController.getAllOrdersForAllUsers);
router.delete('/admin/:orderId', OrderController.deleteOrderByAdmin);
router.delete('/admin/cancel/:orderId', OrderController.cancelOrderByAdmin);


module.exports = router;
