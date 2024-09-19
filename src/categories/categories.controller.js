const categoriesService = require('./categories.service.js');

class CategoryController {
  async getAllCategories(req, res) {
    const result = await categoriesService.getAllCategories();
    return res.status(result.status).json({ message: result.message, data: result.data });
  }
}

module.exports = new CategoryController();



