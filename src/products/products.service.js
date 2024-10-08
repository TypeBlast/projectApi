const Products = require('./Entities/products.entity');
const Categories = require('../categories/Entities/categories.entity');
const Species = require('../species/Entities/species.entity');
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
      const products = await Products.findAll({
        include: [
          { model: Categories, as: 'categories', attributes: ['name'] },
          { model: Species, as: 'species', attributes: ['name'] }
        ]
      });
  
  
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
  
      const product = await Products.findByPk(productId, {
        include: [
          { model: Categories, as: 'categories', attributes: ['name'] },
          { model: Species, as: 'species', attributes: ['name'] }
        ]
      });
  
      if (!product) {
        return { status: 404, message: 'Produto não encontrado.' };
      }
  
      return { status: 200, data: productData };
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
        where: { category_id },
        include: [
          { model: Categories, as: 'categories', attributes: ['name'] },
          { model: Species, as: 'species', attributes: ['name'] }
        ]
      });
  
      if (!products.length) {
        return { status: 404, message: 'Nenhum produto encontrado para esta categoria.' };
      }
  
      return { status: 200, data: products };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  async getProductsBySpecie(species_id) {
    try {
      if (!species_id || isNaN(species_id)) {
        throw new Error('ID da espécie inválido.');
      }
  
      const products = await Products.findAll({
        where: { species_id },
        include: [
          { model: Categories, as: 'categories', attributes: ['name'] },
          { model: Species, as: 'species', attributes: ['name'] }
        ]
      });
  
      if (!products.length) {
        return { status: 404, message: 'Nenhum produto encontrado para esta espécie.' };
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
        },
        include: [
          { model: Categories, as: 'categories', attributes: ['name'] },
          { model: Species, as: 'species', attributes: ['name'] }
        ]
      });
  
      if (products.length === 0) {
        return { status: 404, message: 'Nenhum produto encontrado.', data: null };
      }
  
      return { status: 200, data: products };
    } catch (error) {
      return { status: 500, message: error.message, data: null };
    }
  }

  async getFilteredProducts(category_id, species_id, order) {
    try {
      const categoryId = Number(category_id);
      const speciesId = Number(species_id);
  
      if (isNaN(categoryId) || isNaN(speciesId)) {
        throw new Error('ID de categoria ou espécie inválido.');
      }
  
     
      let validOrder = 'ASC'; 
      if (order) {
        const orderUpper = order.toUpperCase();
        if (['ASC', 'DESC'].includes(orderUpper)) {
          validOrder = orderUpper; 
        } else {
          console.warn('Ordem inválida fornecida, usando ASC como padrão.');
        }
      }
  
      const products = await Products.findAll({
        where: {
          category_id: categoryId,
          species_id: speciesId,
        },
        order: [['price', validOrder]], 
      });
  
      if (!products.length) {
        return { status: 404, message: 'Nenhum produto encontrado para essa categoria e espécie.' };
      }
  
      return { status: 200, data: products };
    } catch (error) {
      console.error("Erro ao filtrar produtos:", error.message); 
      return { status: 400, message: error.message };
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


