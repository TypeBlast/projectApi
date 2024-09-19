const Products = require('./Entities/products.entity');
const { Op } = require('sequelize');

class ProductService {
  async createProduct(productData) {
    try {
      if (typeof productData !== 'object' || productData === null) {
        throw new Error('Dados do produto inválidos.');
      }

      if (!productData.name || typeof productData.name !== 'string' || productData.name.length < 3) {
        throw new Error('O nome do produto é obrigatório e deve ter pelo menos 3 caracteres.');
      }

      if (!productData.price || typeof productData.price !== 'number' || isNaN(productData.price) || productData.price <= 0) {
        throw new Error('O preço é obrigatório e deve ser um número maior que 0.');
      }

      if (!productData.stock || typeof productData.stock !== 'number' || isNaN(productData.stock) || productData.stock < 0) {
        throw new Error('O estoque é obrigatório e deve ser um número maior ou igual a 0.');
      }

      const newProduct = await Products.create(productData);
      return { status: 201, message: 'Produto criado com sucesso.' };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  async getAllProducts() {
    try {
      const products = await Products.findAll();
      return { status: 200, data: products };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  async getProductById(productId) {
    try {
      if (!productId || isNaN(productId)) {
        throw new Error('ID do produto inválido.');
      }

      const product = await Products.findByPk(productId);
      if (!product) {
        return { status: 404, message: 'Produto não encontrado.' };
      }

      return { status: 200, data: product };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  async getProductsByCategory(category_id) {
    try {
      if (!category_id || isNaN(category_id)) {
        throw new Error('ID da categoria inválido.');
      }

      const products = await Products.findAll({
        where: { category_id }
      });

      if (!products.length) {
        return { status: 404, message: 'Nenhum produto encontrado para esta categoria.' };
      }

      return { status: 200, data: products };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  async getProductsByName(name) {
    try {
      if (!name || typeof name !== 'string') {
        return { status: 400, message: 'Nome do produto inválido.', data: null };
      }
      
      const products = await Products.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%` 
          }
        }
      });
  
      if (products.length === 0) {
        return { status: 404, message: 'Nenhum produto encontrado.', data: null };
      }
  
      return { status: 200, data: products };
    } catch (error) {
      return { status: 500, message: error.message, data: null };
    }
  }

  async updateProduct(productId, productData) {
    try {
      if (!productId || isNaN(productId)) {
        throw new Error('ID do produto inválido.');
      }

      const product = await Products.findByPk(productId);
      if (!product) {
        return { status: 404, message: 'Produto não encontrado.' };
      }

      await product.update(productData);
      return { status: 200, message: 'Produto atualizado com sucesso.' };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  async deleteProduct(productId) {
    try {
      if (!productId || isNaN(productId)) {
        throw new Error('ID do produto inválido.');
      }

      const product = await Products.findByPk(productId);
      if (!product) {
        return { status: 404, message: 'Produto não encontrado.' };
      }

      await product.destroy();
      return { status: 200, message: 'Produto deletado com sucesso.' };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }
}

module.exports = new ProductService();


