const router = require('express').Router()
const paymentController = require('./payments.controller');
const authenticate = require('../utils/middleware'); 

router.post('/pay', authenticate, paymentController.processPayment);
router.get('/:cartId', authenticate, paymentController.getCartSummary);

module.exports = router;
