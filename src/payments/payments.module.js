const router = require('express').Router()
const paymentController = require('./payments.controller');
const authenticate = require('../utils/middleware'); 

router.post('/pay', authenticate, paymentController.processPaymentController);
router.get('/summary/:cartId', authenticate, paymentController.getCartSummaryController);

module.exports = router;
