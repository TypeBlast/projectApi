const Categories = require('./Entities/categories.entity');

class CategoryService {
  async getAllCategories() {
    try {
      const categories = await Categories.findAll({
        attributes: ['id', 'name'], 
      });

      if (!categories.length) {
        return { status: 404, message: 'Nenhuma categoria encontrada.' };
      }

      return { status: 200, data: categories };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }
}

module.exports = new CategoryService();