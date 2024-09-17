const router = require('express').Router();
const {
  addToCartController,
  removeFromCartController,
  clearCartController,
  getCartController,
  deleteCartController
} = require('./carts.controller');

const authenticate = require('../utils/middleware');

router.post('/add', authenticate, addToCartController);
router.post('/remove', authenticate, removeFromCartController);
router.delete('/clear', authenticate, clearCartController);
router.get('/', authenticate, getCartController);
router.delete('/delete', authenticate, deleteCartController)

module.exports = router;
