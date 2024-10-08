const router = require('express').Router();
const {
  addToCartController,
  removeFromCartController,
  clearCartController,
  getCartController,
} = require('./carts.controller');

const authenticate = require('../utils/middleware');

router.post('/add', authenticate, addToCartController);
router.post('/remove', authenticate, removeFromCartController);
router.delete('/clear', authenticate, clearCartController);
router.get('/', authenticate, getCartController);


module.exports = router;
