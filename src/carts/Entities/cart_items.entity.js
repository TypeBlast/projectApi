const Sequelize = require('sequelize');

class Cart_items extends Sequelize.Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cart_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'carts',
          key: 'id',
        }
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        }
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 1,
        },
      },
    }, {
      sequelize,
      tableName: 'cart_items',
      timestamps: false,
    });

    return this;
  }
}

module.exports = Cart_items;
