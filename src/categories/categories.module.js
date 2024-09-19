const router = require('express').Router()
const categoriesController = require('./categories.controller');

router.get('/', categoriesController.getAllCategories);

module.exports = router;
