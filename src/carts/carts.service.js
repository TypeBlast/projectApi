const { Carts, Cart_items, Products } = require('../database/index');

class CartService {

  async addToCart(userId, productId, quantity) {
    try {
      let cart = await Carts.findOne({ where: { user_id: userId, status: 'Aberto' } });

      if (!cart) {
        cart = await Carts.create({ user_id: userId });
      }

      const product = await Products.findByPk(productId);
      if (!product) {
        throw new Error('Produto não encontrado.');
      }

      if (quantity > product.stock) {
        throw new Error(`Estoque insuficiente para o produto ${product.name}. Disponível: ${product.stock}`);
      }

      product.stock -= quantity;
      await product.save();

      let cartItem = await Cart_items.findOne({ where: { cart_id: cart.id, product_id: productId } });

      if (cartItem) {
        cartItem.quantity += quantity;
        await cartItem.save();
      } else {
        await Cart_items.create({
          cart_id: cart.id,
          product_id: productId,
          quantity: quantity,
        });
      }

      return { status: 200, message: 'Produto adicionado ao carrinho com sucesso.', data: cart };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  async removeFromCart(userId, productId, quantity) {
    try {
      const cart = await Carts.findOne({ where: { user_id: userId, status: 'Aberto' } });
      if (!cart) {
        throw new Error('Carrinho não encontrado.');
      }

      const cartItem = await Cart_items.findOne({ where: { cart_id: cart.id, product_id: productId } });
      if (!cartItem) {
        throw new Error('Item não encontrado no carrinho.');
      }

      const product = await Products.findByPk(productId);
      if (!product) {
        throw new Error('Produto não encontrado.');
      }

      product.stock += quantity;
      await product.save();

      if (cartItem.quantity <= quantity) {
        await cartItem.destroy();
      } else {
        cartItem.quantity -= quantity;
        await cartItem.save();
      }

      return { status: 200, message: 'Item removido do carrinho com sucesso.', data: cart };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  
  async clearCart(userId) {
    try {
      const cart = await Carts.findOne({ where: { user_id: userId, status: 'Aberto' } });
      if (!cart) {
        throw new Error('Carrinho não encontrado.');
      }

      const cartItems = await Cart_items.findAll({ where: { cart_id: cart.id } });

      for (const cartItem of cartItems) {
        const product = await Products.findByPk(cartItem.product_id);
        if (product) {
          product.stock += cartItem.quantity;
          await product.save();
        }
      }

      await Cart_items.destroy({ where: { cart_id: cart.id } });
      return { status: 200, message: 'Carrinho limpo com sucesso.', data: cart };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }


  async getCart(userId) {
    try {
      const cart = await Carts.findOne({ where: { user_id: userId, status: 'Aberto' } });
      if (!cart) {
        throw new Error('Carrinho não encontrado.');
      }

      const cartItems = await Cart_items.findAll({ where: { cart_id: cart.id } });
      const itemsWithDetails = await Promise.all(cartItems.map(async (item) => {
        const product = await Products.findByPk(item.product_id);
        return {
          productId: item.product_id,
          quantity: item.quantity,
          productName: product.name,
          productPrice: product.price
        };
      }));

      return { status: 200, message: 'Carrinho obtido com sucesso.', data: { cart, items: itemsWithDetails } };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  async deleteCart(userId) {
    try {
      const cart = await Carts.findOne({ where: { user_id: userId, status: 'Aberto' } });
      if (!cart) {
        throw new Error('Carrinho não encontrado.');
      }

      const cartItems = await Cart_items.findAll({ where: { cart_id: cart.id } });

      for (const cartItem of cartItems) {
        const product = await Products.findByPk(cartItem.product_id);
        if (product) {
          product.stock += cartItem.quantity;
          await product.save();
        }
      }

      await Cart_items.destroy({ where: { cart_id: cart.id } });
      await cart.destroy(); 

      return { status: 200, message: 'Carrinho excluído com sucesso.' };
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

}

module.exports = new CartService();
