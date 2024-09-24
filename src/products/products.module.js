const router = require('express').Router()
const productController = require('./products.controller');


router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/category/:category_id', productController.getProductsByCategory);
router.get('/search/:name', productController.getProductsByName);
router.get('/filter/:category_id/:species_id', productController.getFilteredProducts);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
