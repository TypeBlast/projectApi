const productService = require('./products.service.js');

class ProductController {
  async createProduct(req, res) {
    const { name, description, price, stock, category_id, species_id, url } = req.body;
    const result = await productService.createProduct({ name, description, price, stock, category_id, species_id, url });
    return res.status(result.status).json({ message: result.message, data: result.data });
  }

  async getAllProducts(req, res) {
    const result = await productService.getAllProducts();
    return res.status(result.status).json({ message: result.message, data: result.data });
  }

  async getProductById(req, res) {
    const { id } = req.params;
    const result = await productService.getProductById(id);
    return res.status(result.status).json({ message: result.message, data: result.data });
  }

  async getProductsByCategory(req, res) {
    const { category_id } = req.params;  // Pegando o category_id da rota
    const result = await productService.getProductsByCategory(category_id);
    return res.status(result.status).json({ message: result.message, data: result.data });
  }
  async getProductsByName(req, res) {
    const { name } = req.params; // Captura o parâmetro de nome diretamente da URL
    const result = await productService.getProductsByName(name);
    return res.status(result.status).json({ message: result.message, data: result.data });
  }
  async updateProduct(req, res) {
    const { id } = req.params;
    const productData = req.body;
    const result = await productService.updateProduct(id, productData);
    return res.status(result.status).json({ message: result.message, data: result.data });
  }

  async deleteProduct(req, res) {
    const { id } = req.params;
    const result = await productService.deleteProduct(id);
    return res.status(result.status).json({ message: result.message });
  }

}

module.exports = new ProductController();
